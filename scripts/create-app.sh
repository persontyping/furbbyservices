#!/usr/bin/env bash

set -Eeuo pipefail

readonly MIN_BUN_VERSION="1.4.0"
readonly SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd -P)"
readonly TEMPLATE_ROOT="$(cd "$SCRIPT_DIR/.." && pwd -P)"

target_dir=""
install_dependencies=true
initialize_git=true
require_local_supabase=false
check_only=false

usage() {
  printf '%s\n' \
    'Usage:' \
    '  scripts/create-app.sh <target-directory> [options]' \
    '  scripts/create-app.sh --check [--local-supabase]' \
    '' \
    'Options:' \
    '  --check             Check prerequisites without creating a project.' \
    '  --local-supabase    Require Supabase CLI, Docker CLI, and a running Docker daemon.' \
    '  --skip-install      Copy the template without installing or validating dependencies.' \
    '  --no-git            Do not initialize a Git repository in the new project.' \
    '  -h, --help          Show this help.' \
    '' \
    'The creator copies this repository as a safe template. It excludes Git history,' \
    'node_modules, build output, local Supabase state, and all secret environment files.'
}

fail() {
  printf 'error: %s\n' "$*" >&2
  exit 1
}

info() {
  printf '==> %s\n' "$*"
}

command_exists() {
  command -v "$1" >/dev/null 2>&1
}

version_at_least() {
  local current_version="$1"
  local minimum_version="$2"
  local current_major current_minor current_patch
  local minimum_major minimum_minor minimum_patch
  local original_ifs="$IFS"

  IFS=.
  set -- ${current_version#v}
  current_major="${1:-0}"
  current_minor="${2:-0}"
  current_patch="${3:-0}"
  set -- ${minimum_version#v}
  minimum_major="${1:-0}"
  minimum_minor="${2:-0}"
  minimum_patch="${3:-0}"
  IFS="$original_ifs"
  current_patch="${current_patch%%[^0-9]*}"
  minimum_patch="${minimum_patch%%[^0-9]*}"

  current_minor="${current_minor:-0}"
  current_patch="${current_patch:-0}"
  minimum_minor="${minimum_minor:-0}"
  minimum_patch="${minimum_patch:-0}"

  (( current_major > minimum_major )) ||
    (( current_major == minimum_major && current_minor > minimum_minor )) ||
    (( current_major == minimum_major && current_minor == minimum_minor && current_patch >= minimum_patch ))
}

check_prerequisites() {
  local bun_version

  case "$(uname -s)" in
    Darwin|Linux) ;;
    *) fail "supported operating systems are macOS and Linux" ;;
  esac

  command_exists bun || fail "Bun ${MIN_BUN_VERSION}+ is required: https://bun.sh/docs/installation"
  bun_version="$(bun --version)"
  version_at_least "$bun_version" "$MIN_BUN_VERSION" ||
    fail "Bun ${MIN_BUN_VERSION}+ is required; found ${bun_version}"

  if "$initialize_git"; then
    command_exists git || fail "Git is required unless --no-git is used: https://git-scm.com/downloads"
  fi

  if "$require_local_supabase"; then
    command_exists supabase ||
      fail "Supabase CLI is required for local services: https://supabase.com/docs/guides/local-development/cli/getting-started"
    command_exists docker ||
      fail "Docker is required for local Supabase: https://docs.docker.com/get-docker/"
    docker info >/dev/null 2>&1 || fail "Docker is installed but its daemon is not running"
  fi

  info "Bun ${bun_version}"
  if "$initialize_git"; then
    info "$(git --version)"
  fi
  if "$require_local_supabase"; then
    info "Supabase CLI $(supabase --version)"
    info "$(docker --version)"
  else
    info "Supabase CLI and Docker are optional; use --local-supabase to require them"
  fi
}

copy_template() {
  local entry
  local entries=(
    .env.example
    .gitignore
    README.md
    bun.lock
    index.html
    setup.html
    package.json
    public
    scripts
    src
    supabase
    tsconfig.app.json
    tsconfig.json
    tsconfig.node.json
    vite.config.ts
  )

  for entry in "${entries[@]}"; do
    [[ -e "$TEMPLATE_ROOT/$entry" ]] || fail "template entry is missing: $entry"
    cp -R "$TEMPLATE_ROOT/$entry" "$target_dir/$entry"
  done
}

configure_project() {
  local package_name
  package_name="$(basename "$target_dir" | tr '[:upper:]' '[:lower:]' | sed -E 's/[^a-z0-9._-]+/-/g; s/^-+|-+$//g')"
  [[ -n "$package_name" ]] || package_name="vite-supabase-app"

  PACKAGE_FILE="$target_dir/package.json" PACKAGE_NAME="$package_name" bun -e '
    const packageFile = Bun.env.PACKAGE_FILE
    const packageJson = await Bun.file(packageFile).json()
    packageJson.name = Bun.env.PACKAGE_NAME
    await Bun.write(packageFile, `${JSON.stringify(packageJson, null, 2)}\n`)
  '

  cp "$target_dir/.env.example" "$target_dir/.env.local"
  cp "$target_dir/supabase/functions/.env.example" "$target_dir/supabase/functions/.env.local"
}

create_project() {
  local parent_dir

  [[ -n "$target_dir" ]] || fail "a target directory is required"
  parent_dir="$(dirname "$target_dir")"
  mkdir -p "$parent_dir"
  parent_dir="$(cd "$parent_dir" && pwd -P)"
  target_dir="$parent_dir/$(basename "$target_dir")"

  [[ "$target_dir" != "$TEMPLATE_ROOT" ]] || fail "target cannot be the template directory"
  [[ "$target_dir" != "$TEMPLATE_ROOT/"* ]] || fail "target cannot be inside the template directory"

  if [[ -d "$target_dir" ]]; then
    [[ -z "$(find "$target_dir" -mindepth 1 -maxdepth 1 -print -quit)" ]] ||
      fail "target directory must be empty: $target_dir"
  else
    mkdir -p "$target_dir"
  fi

  info "Copying template to $target_dir"
  copy_template
  configure_project

  if "$install_dependencies"; then
    info "Installing locked dependencies"
    (cd "$target_dir" && bun install --frozen-lockfile)

    info "Building and type-checking"
    (cd "$target_dir" && bun run build)

    info "Linting"
    (cd "$target_dir" && bun run lint)
  fi

  if "$initialize_git"; then
    info "Initializing Git repository"
    (cd "$target_dir" && git init --quiet)
  fi

  printf '%s\n' \
    '' \
    "Created $target_dir" \
    '' \
    'Next steps:' \
    "  1. Replace placeholders in $target_dir/.env.local." \
    '  2. Create a Supabase project and run: supabase link --project-ref <project-ref>' \
    '  3. Apply the schema with: supabase db push' \
    "  4. Replace placeholders in $target_dir/supabase/functions/.env.local." \
    '  5. Upload secrets with: supabase secrets set --env-file supabase/functions/.env.local' \
    '  6. Deploy email with: supabase functions deploy send-contact-email --no-verify-jwt' \
    "  7. Start Vite with: cd \"$target_dir\" && bun dev"
}

while (($# > 0)); do
  case "$1" in
    --check) check_only=true ;;
    --local-supabase) require_local_supabase=true ;;
    --skip-install) install_dependencies=false ;;
    --no-git) initialize_git=false ;;
    -h|--help) usage; exit 0 ;;
    -*) fail "unknown option: $1" ;;
    *)
      [[ -z "$target_dir" ]] || fail "only one target directory may be provided"
      target_dir="$1"
      ;;
  esac
  shift
done

check_prerequisites

if "$check_only"; then
  info "Prerequisite check passed"
  exit 0
fi

create_project