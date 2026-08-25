import { useRef, useState, type ComponentType, type CSSProperties } from 'react'
import { DayPicker } from 'react-day-picker'
import {
  Bell,
  Check,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  FileText,
  Heart,
  Home,
  Image as ImageIcon,
  Inbox,
  Info,
  Mail,
  Menu as MenuIcon,
  Moon,
  MoreHorizontal,
  PawPrint,
  Plus,
  Search,
  Settings,
  Sun,
  UserRound,
} from 'lucide-react'

import LogoBill from '@/assets/logo-bill.png'

export function AccordionExample() {
  return (
    <div className="join join-vertical w-full">
      <div className="collapse-arrow join-item collapse border border-base-300">
        <input type="radio" name="component-accordion" defaultChecked />
        <div className="collapse-title font-semibold">What is included?</div>
        <div className="collapse-content text-sm">A reusable, accessible accordion item.</div>
      </div>
      <div className="collapse-arrow join-item collapse border border-base-300">
        <input type="radio" name="component-accordion" />
        <div className="collapse-title font-semibold">Can it be customized?</div>
        <div className="collapse-content text-sm">Yes. Compose it with any React content.</div>
      </div>
    </div>
  )
}

export function AlertExample() {
  return (
    <div role="alert" className="alert alert-info">
      <Info aria-hidden="true" className="size-5" />
      <span>Your changes have been saved.</span>
    </div>
  )
}

export function AuraExample() {
  return (
    <div className="aura aura-rainbow">
      <button type="button" className="btn btn-neutral">Highlighted action</button>
    </div>
  )
}

export function AvatarExample() {
  return (
    <div className="avatar avatar-online avatar-placeholder">
      <div className="w-16 rounded-full bg-neutral text-neutral-content">
        <UserRound aria-label="User avatar" className="size-8" />
      </div>
    </div>
  )
}

export function BadgeExample() {
  return <span className="badge badge-success gap-1"><CheckCircle2 aria-hidden="true" className="size-3" /> Active</span>
}

export function BreadcrumbsExample() {
  return (
    <div className="breadcrumbs text-sm">
      <ul>
        <li><a href="#components">Components</a></li>
        <li><a href="#navigation">Navigation</a></li>
        <li>Breadcrumbs</li>
      </ul>
    </div>
  )
}

export function ButtonExample() {
  return <button type="button" className="btn btn-primary">Save changes</button>
}

export function CalendarExample() {
  const [selectedDate, setSelectedDate] = useState<Date>()

  return (
    <DayPicker
      className="react-day-picker"
      mode="single"
      selected={selectedDate}
      onSelect={setSelectedDate}
    />
  )
}

export function CardExample() {
  return (
    <article className="card w-full max-w-sm bg-base-100 shadow-sm">
      <figure className="h-36 bg-base-200">
        <img src={LogoBill} alt="Bill the Pomeranian" className="h-full object-contain" />
      </figure>
      <div className="card-body">
        <h3 className="card-title">Neighborhood walks</h3>
        <p>Reliable care shaped around your pet.</p>
        <div className="card-actions justify-end">
          <button type="button" className="btn btn-primary btn-sm">Book</button>
        </div>
      </div>
    </article>
  )
}

export function CarouselExample() {
  return (
    <div className="carousel h-44 w-full rounded-box">
      {['Walks', 'Visits', 'Updates'].map((label, index) => (
        <div key={label} className="carousel-item grid w-4/5 place-items-center bg-base-200 even:bg-neutral even:text-neutral-content">
          <span className="text-2xl font-bold">{index + 1}. {label}</span>
        </div>
      ))}
    </div>
  )
}

export function ChatBubbleExample() {
  return (
    <div className="space-y-2">
      <div className="chat chat-start">
        <div className="chat-header">Care team</div>
        <div className="chat-bubble">Bill had a great walk today.</div>
        <div className="chat-footer opacity-60">Delivered</div>
      </div>
      <div className="chat chat-end">
        <div className="chat-bubble chat-bubble-primary">Thank you for the update!</div>
      </div>
    </div>
  )
}

export function CheckboxExample() {
  return (
    <label className="label cursor-pointer justify-start gap-3">
      <input type="checkbox" defaultChecked className="checkbox checkbox-primary" />
      Send me visit updates
    </label>
  )
}

export function CollapseExample() {
  return (
    <div className="collapse-plus collapse border border-base-300 bg-base-100">
      <input type="checkbox" />
      <div className="collapse-title font-semibold">Optional details</div>
      <div className="collapse-content text-sm">This content expands independently.</div>
    </div>
  )
}

export function CountdownExample() {
  return (
    <span className="countdown font-mono text-5xl" aria-label="42">
      <span style={{ '--value': 42 } as CSSProperties}>42</span>
    </span>
  )
}

export function DiffExample() {
  return (
    <div className="diff aspect-[16/7]" tabIndex={0}>
      <div className="diff-item-1 grid place-content-center bg-primary text-primary-content">
        <span className="text-3xl font-black">AFTER</span>
      </div>
      <div className="diff-item-2 grid place-content-center bg-base-200">
        <span className="text-3xl font-black">BEFORE</span>
      </div>
      <div className="diff-resizer" />
    </div>
  )
}

export function DividerExample() {
  return (
    <div className="flex w-full flex-col">
      <div className="grid h-16 place-items-center bg-base-200">Top</div>
      <div className="divider">OR</div>
      <div className="grid h-16 place-items-center bg-base-200">Bottom</div>
    </div>
  )
}

export function DockExample() {
  return (
    <div className="relative h-24 w-full overflow-hidden rounded-box border border-base-300">
      <nav className="dock absolute">
        <button type="button" className="dock-active"><Home className="size-5" /><span className="dock-label">Home</span></button>
        <button type="button"><Inbox className="size-5" /><span className="dock-label">Inbox</span></button>
        <button type="button"><Settings className="size-5" /><span className="dock-label">Settings</span></button>
      </nav>
    </div>
  )
}

export function DrawerExample() {
  return (
    <div className="drawer relative h-48 overflow-hidden rounded-box border border-base-300">
      <input id="component-drawer" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content grid place-items-center">
        <label htmlFor="component-drawer" className="btn btn-primary drawer-button">Open drawer</label>
      </div>
      <div className="drawer-side absolute">
        <label htmlFor="component-drawer" aria-label="Close drawer" className="drawer-overlay" />
        <ul className="menu min-h-full w-56 bg-base-200 p-4">
          <li><a href="#components">Components</a></li>
          <li><a href="#forms">Forms</a></li>
        </ul>
      </div>
    </div>
  )
}

export function DropdownExample() {
  return (
    <div className="dropdown">
      <div tabIndex={0} role="button" className="btn">Options</div>
      <ul tabIndex={-1} className="dropdown-content menu z-10 mt-2 w-48 rounded-box bg-base-100 p-2 shadow">
        <li><button type="button">Edit</button></li>
        <li><button type="button">Duplicate</button></li>
      </ul>
    </div>
  )
}

export function FabExample() {
  return (
    <div className="relative h-52 w-full overflow-hidden rounded-box border border-base-300">
      <div className="fab absolute z-10">
        <div tabIndex={0} role="button" aria-label="Open quick actions" className="btn btn-circle btn-primary"><Plus /></div>
        <button type="button" aria-label="Messages" className="btn btn-circle"><Mail /></button>
        <button type="button" aria-label="Notifications" className="btn btn-circle"><Bell /></button>
      </div>
    </div>
  )
}

export function FieldsetExample() {
  return (
    <fieldset className="fieldset rounded-box border border-base-300 bg-base-100 p-4">
      <legend className="fieldset-legend">Account</legend>
      <label className="label" htmlFor="fieldset-email">Email</label>
      <input id="fieldset-email" type="email" className="input w-full" placeholder="you@example.com" />
      <p className="label">We will only use this for receipts.</p>
    </fieldset>
  )
}

export function FileInputExample() {
  return <input type="file" aria-label="Upload a file" className="file-input file-input-bordered w-full" />
}

export function FilterExample() {
  return (
    <form className="filter">
      <input className="btn btn-square" type="reset" value="x" aria-label="Clear filter" />
      <input className="btn" type="radio" name="component-filter" aria-label="Walks" />
      <input className="btn" type="radio" name="component-filter" aria-label="Visits" />
      <input className="btn" type="radio" name="component-filter" aria-label="Updates" />
    </form>
  )
}

export function FooterExample() {
  return (
    <footer className="footer bg-neutral p-8 text-neutral-content sm:footer-horizontal">
      <aside><PawPrint className="size-8" /><p>North Side Pet Life<br />Local care since 2024</p></aside>
      <nav><h3 className="footer-title">Services</h3><a href="#walks" className="link link-hover">Walks</a><a href="#visits" className="link link-hover">Visits</a></nav>
    </footer>
  )
}

export function HeroExample() {
  return (
    <section className="hero min-h-56 bg-base-200">
      <div className="hero-content text-center">
        <div className="max-w-md">
          <h3 className="text-3xl font-bold">Care they can count on</h3>
          <p className="py-4">A compact, reusable hero section.</p>
          <button type="button" className="btn btn-primary">Get started</button>
        </div>
      </div>
    </section>
  )
}

export function Hover3DExample() {
  return (
    <div className="hover-3d mx-auto my-4 w-64">
      <figure className="h-48 overflow-hidden rounded-box bg-base-200">
        <img src={LogoBill} alt="Bill the Pomeranian" className="h-full w-full object-contain" />
      </figure>
      {Array.from({ length: 8 }, (_, index) => <div key={index} />)}
    </div>
  )
}

export function HoverGalleryExample() {
  const filters = ['none', 'saturate(0)', 'sepia(0.8)', 'hue-rotate(160deg)']

  return (
    <figure className="hover-gallery mx-auto h-52 w-64 overflow-hidden rounded-box bg-base-200">
      {filters.map((filter) => <img key={filter} src={LogoBill} alt="Bill in the hover gallery" style={{ filter }} className="h-full w-full object-contain" />)}
    </figure>
  )
}

export function IndicatorExample() {
  return (
    <div className="indicator">
      <span className="indicator-item badge badge-secondary">12</span>
      <button type="button" className="btn">Inbox</button>
    </div>
  )
}

export function InputExample() {
  return <input type="text" aria-label="Display name" placeholder="Display name" className="input input-bordered w-full" />
}

export function JoinExample() {
  return (
    <div className="join w-full">
      <input className="input join-item min-w-0 flex-1" aria-label="Search query" placeholder="Search" />
      <button type="button" className="btn btn-primary join-item"><Search className="size-4" /> Search</button>
    </div>
  )
}

export function KbdExample() {
  return <p className="flex items-center gap-2">Save with <kbd className="kbd kbd-sm">cmd</kbd> + <kbd className="kbd kbd-sm">S</kbd></p>
}

export function LabelExample() {
  return <label className="label" htmlFor="label-example">Email address <span className="label-text-alt">Required</span></label>
}

export function LinkExample() {
  return <a href="https://daisyui.com/components/link/" className="link link-primary">Read the component docs</a>
}

export function ListExample() {
  return (
    <ul className="list rounded-box bg-base-100 shadow-sm">
      <li className="p-4 pb-2 text-xs font-semibold tracking-wide opacity-60">Recent files</li>
      <li className="list-row"><FileText className="size-6" /><div><div>proposal.pdf</div><div className="text-xs uppercase opacity-60">2.4 MB</div></div><button type="button" className="btn btn-square btn-ghost"><MoreHorizontal aria-label="File options" /></button></li>
      <li className="list-row"><ImageIcon className="size-6" /><div><div>portrait.jpg</div><div className="text-xs uppercase opacity-60">1.1 MB</div></div><button type="button" className="btn btn-square btn-ghost"><MoreHorizontal aria-label="File options" /></button></li>
    </ul>
  )
}

export function LoadingExample() {
  return <span className="loading loading-spinner loading-lg text-primary" aria-label="Loading" />
}

export function MaskExample() {
  return <img src={LogoBill} alt="Bill the Pomeranian" className="mask mask-squircle size-36 bg-base-200 object-contain" />
}

export function MegamenuExample() {
  return (
    <div className="megamenu max-sm:megamenu-vertical w-full max-w-xl">
      <span className="megamenu-active" />
      <button type="button">Services</button>
      <div><ul className="menu w-48"><li><a href="#walks">Dog walks</a></li><li><a href="#visits">Home visits</a></li></ul></div>
      <button type="button">Resources</button>
      <div><ul className="menu w-48"><li><a href="#guides">Guides</a></li><li><a href="#support">Support</a></li></ul></div>
    </div>
  )
}

export function MenuExample() {
  return (
    <ul className="menu w-56 rounded-box bg-base-200">
      <li className="menu-title">Workspace</li>
      <li><a href="#dashboard"><Home className="size-4" />Dashboard</a></li>
      <li><a href="#settings"><Settings className="size-4" />Settings</a></li>
    </ul>
  )
}

export function BrowserMockupExample() {
  return (
    <div className="mockup-browser w-full border border-base-300">
      <div className="mockup-browser-toolbar"><div className="input">https://example.com</div></div>
      <div className="grid h-32 place-content-center border-t border-base-300">Page content</div>
    </div>
  )
}

export function CodeMockupExample() {
  return (
    <div className="mockup-code w-full text-sm">
      <pre data-prefix="$"><code>bun add daisyui</code></pre>
      <pre data-prefix=">" className="text-success"><code>installed</code></pre>
    </div>
  )
}

export function PhoneMockupExample() {
  return (
    <div className="mockup-phone scale-75">
      <div className="mockup-phone-camera" />
      <div className="mockup-phone-display grid h-96 w-56 place-content-center bg-base-200"><PawPrint className="size-16 text-primary" /></div>
    </div>
  )
}

export function WindowMockupExample() {
  return <div className="mockup-window w-full border border-base-300 bg-base-100"><div className="grid h-32 place-content-center border-t border-base-300 bg-base-200">Application window</div></div>
}

export function ModalExample() {
  const dialogRef = useRef<HTMLDialogElement>(null)

  return (
    <>
      <button type="button" className="btn" onClick={() => dialogRef.current?.showModal()}>Open modal</button>
      <dialog ref={dialogRef} className="modal">
        <div className="modal-box">
          <h3 className="text-lg font-bold">Confirm action</h3>
          <p className="py-4">This dialog uses the native HTML dialog element.</p>
          <div className="modal-action"><form method="dialog"><button className="btn">Close</button></form></div>
        </div>
        <form method="dialog" className="modal-backdrop"><button>Close</button></form>
      </dialog>
    </>
  )
}

export function NavbarExample() {
  return (
    <nav className="navbar rounded-box bg-base-100 shadow-sm">
      <div className="navbar-start"><button type="button" className="btn btn-square btn-ghost"><MenuIcon aria-label="Open menu" /></button></div>
      <div className="navbar-center"><a href="#components" className="text-xl font-bold">PetLife</a></div>
      <div className="navbar-end"><button type="button" className="btn btn-square btn-ghost"><Search aria-label="Search" /></button></div>
    </nav>
  )
}

export function OtpExample() {
  return (
    <label className="otp otp-primary">
      <span /><span /><span /><span />
      <input type="text" autoComplete="one-time-code" inputMode="numeric" maxLength={4} pattern="[0-9]{4}" required aria-label="Four digit verification code" />
    </label>
  )
}

export function PaginationExample() {
  return (
    <div className="join">
      <button type="button" aria-label="Previous page" className="join-item btn"><ChevronLeft /></button>
      <button type="button" className="join-item btn">1</button>
      <button type="button" className="join-item btn btn-active">2</button>
      <button type="button" className="join-item btn">3</button>
      <button type="button" aria-label="Next page" className="join-item btn"><ChevronRight /></button>
    </div>
  )
}

export function ProgressExample() {
  return <progress className="progress progress-primary w-full" value="68" max="100" aria-label="68 percent complete" />
}

export function RadialProgressExample() {
  return <div className="radial-progress text-primary" style={{ '--value': 72 } as CSSProperties} role="progressbar" aria-valuenow={72}>72%</div>
}

export function RadioExample() {
  return (
    <div className="flex gap-5">
      <label className="label gap-2"><input type="radio" name="plan" className="radio radio-primary" defaultChecked />Monthly</label>
      <label className="label gap-2"><input type="radio" name="plan" className="radio radio-primary" />Yearly</label>
    </div>
  )
}

export function RangeExample() {
  return <input type="range" min="0" max="100" defaultValue="40" aria-label="Volume" className="range range-primary w-full" />
}

export function RatingExample() {
  return (
    <div className="rating" aria-label="Rating: four out of five stars">
      {[1, 2, 3, 4, 5].map((rating) => <input key={rating} type="radio" name="component-rating" className="mask mask-star-2 bg-warning" aria-label={`${rating} stars`} defaultChecked={rating === 4} />)}
    </div>
  )
}

export function SelectExample() {
  return (
    <select defaultValue="" aria-label="Choose a service" className="select select-bordered w-full">
      <option value="" disabled>Choose a service</option><option>Dog walk</option><option>Home visit</option>
    </select>
  )
}

export function SkeletonExample() {
  return (
    <div className="flex w-full items-center gap-4">
      <div className="skeleton size-16 shrink-0 rounded-full" />
      <div className="flex-1 space-y-3"><div className="skeleton h-4 w-3/4" /><div className="skeleton h-4 w-full" /></div>
    </div>
  )
}

export function StackExample() {
  return (
    <div className="stack size-40">
      <div className="grid place-content-center rounded-box bg-primary text-primary-content">Top</div>
      <div className="rounded-box bg-secondary" />
      <div className="rounded-box bg-accent" />
    </div>
  )
}

export function StatExample() {
  return (
    <div className="stats w-full shadow-sm">
      <div className="stat"><div className="stat-figure text-primary"><Heart /></div><div className="stat-title">Happy visits</div><div className="stat-value">1,204</div><div className="stat-desc">Up 12% this month</div></div>
    </div>
  )
}

export function StatusExample() {
  return <p className="flex items-center gap-2"><span className="status status-success animate-pulse" aria-label="Online" /> Available now</p>
}

export function StepsExample() {
  return <ul className="steps w-full"><li className="step step-primary">Create</li><li className="step step-primary">Review</li><li className="step">Publish</li></ul>
}

export function SwapExample() {
  return (
    <label className="swap swap-rotate btn btn-circle">
      <input type="checkbox" aria-label="Toggle dark mode icon" />
      <Sun className="swap-on size-6" /><Moon className="swap-off size-6" />
    </label>
  )
}

export function TabsExample() {
  return (
    <div role="tablist" className="tabs tabs-box">
      <button type="button" role="tab" className="tab tab-active">Overview</button>
      <button type="button" role="tab" className="tab">Activity</button>
      <button type="button" role="tab" className="tab">Settings</button>
    </div>
  )
}

export function TableExample() {
  return (
    <div className="overflow-x-auto">
      <table className="table"><thead><tr><th>Name</th><th>Status</th><th>Visits</th></tr></thead><tbody><tr><td>Bill</td><td><span className="badge badge-success badge-sm">Active</span></td><td>24</td></tr><tr><td>Milo</td><td><span className="badge badge-ghost badge-sm">Away</span></td><td>18</td></tr></tbody></table>
    </div>
  )
}

export function TextRotateExample() {
  return (
    <span className="text-rotate text-3xl font-bold">
      <span className="justify-items-center"><span>DESIGN</span><span>DEVELOP</span><span>DELIVER</span></span>
    </span>
  )
}

export function TextareaExample() {
  return <textarea className="textarea textarea-bordered w-full" aria-label="Message" placeholder="Write a message" rows={3} />
}

export function ThemeControllerExample() {
  return (
    <label className="label cursor-pointer justify-start gap-3">
      <input type="checkbox" value="light" className="theme-controller toggle" />
      Preview light theme
    </label>
  )
}

export function TimelineExample() {
  return (
    <ul className="timeline timeline-vertical">
      <li><div className="timeline-start">9:00</div><div className="timeline-middle"><Check className="size-4" /></div><div className="timeline-end timeline-box">Walk completed</div><hr /></li>
      <li><hr /><div className="timeline-start">9:45</div><div className="timeline-middle"><Check className="size-4" /></div><div className="timeline-end timeline-box">Photo sent</div></li>
    </ul>
  )
}

export function ToastExample() {
  return (
    <div className="toast static p-0">
      <div className="alert alert-success"><CheckCircle2 className="size-5" /><span>Message sent.</span></div>
      <div className="alert"><Info className="size-5" /><span>Changes saved.</span></div>
    </div>
  )
}

export function ToggleExample() {
  return <input type="checkbox" defaultChecked className="toggle toggle-primary" aria-label="Enable notifications" />
}

export function TooltipExample() {
  return <div className="tooltip" data-tip="Add to favorites"><button type="button" className="btn btn-circle"><Heart aria-label="Favorite" /></button></div>
}

export function ValidatorExample() {
  return (
    <fieldset className="w-full">
      <input type="email" required className="input validator w-full" placeholder="mail@example.com" aria-label="Email address" />
      <p className="validator-hint">Enter a valid email address.</p>
    </fieldset>
  )
}

export type DaisyExampleGroup = {
  name: string
  examples: ReadonlyArray<{ name: string; Component: ComponentType }>
}

export const daisyExampleGroups: ReadonlyArray<DaisyExampleGroup> = [
  {
    name: 'Actions',
    examples: [
      { name: 'Button', Component: ButtonExample },
      { name: 'Dropdown', Component: DropdownExample },
      { name: 'FAB / Speed Dial', Component: FabExample },
      { name: 'Modal', Component: ModalExample },
      { name: 'Swap', Component: SwapExample },
      { name: 'Theme Controller', Component: ThemeControllerExample },
    ],
  },
  {
    name: 'Data display',
    examples: [
      { name: 'Accordion', Component: AccordionExample },
      { name: 'Aura', Component: AuraExample },
      { name: 'Avatar', Component: AvatarExample },
      { name: 'Badge', Component: BadgeExample },
      { name: 'Card', Component: CardExample },
      { name: 'Carousel', Component: CarouselExample },
      { name: 'Chat bubble', Component: ChatBubbleExample },
      { name: 'Collapse', Component: CollapseExample },
      { name: 'Countdown', Component: CountdownExample },
      { name: 'Diff', Component: DiffExample },
      { name: 'Hover 3D Card', Component: Hover3DExample },
      { name: 'Hover Gallery', Component: HoverGalleryExample },
      { name: 'Indicator', Component: IndicatorExample },
      { name: 'Kbd', Component: KbdExample },
      { name: 'List', Component: ListExample },
      { name: 'Mask', Component: MaskExample },
      { name: 'Stat', Component: StatExample },
      { name: 'Status', Component: StatusExample },
      { name: 'Table', Component: TableExample },
      { name: 'Text Rotate', Component: TextRotateExample },
      { name: 'Timeline', Component: TimelineExample },
    ],
  },
  {
    name: 'Navigation',
    examples: [
      { name: 'Breadcrumbs', Component: BreadcrumbsExample },
      { name: 'Dock', Component: DockExample },
      { name: 'Drawer sidebar', Component: DrawerExample },
      { name: 'Link', Component: LinkExample },
      { name: 'Megamenu', Component: MegamenuExample },
      { name: 'Menu', Component: MenuExample },
      { name: 'Navbar', Component: NavbarExample },
      { name: 'Pagination', Component: PaginationExample },
      { name: 'Steps', Component: StepsExample },
      { name: 'Tabs', Component: TabsExample },
    ],
  },
  {
    name: 'Feedback',
    examples: [
      { name: 'Alert', Component: AlertExample },
      { name: 'Loading', Component: LoadingExample },
      { name: 'Progress', Component: ProgressExample },
      { name: 'Radial progress', Component: RadialProgressExample },
      { name: 'Skeleton', Component: SkeletonExample },
      { name: 'Toast', Component: ToastExample },
      { name: 'Tooltip', Component: TooltipExample },
    ],
  },
  {
    name: 'Data input',
    examples: [
      { name: 'Calendar', Component: CalendarExample },
      { name: 'Checkbox', Component: CheckboxExample },
      { name: 'Fieldset', Component: FieldsetExample },
      { name: 'File Input', Component: FileInputExample },
      { name: 'Filter', Component: FilterExample },
      { name: 'Text Input', Component: InputExample },
      { name: 'Join', Component: JoinExample },
      { name: 'Label', Component: LabelExample },
      { name: 'OTP', Component: OtpExample },
      { name: 'Radio', Component: RadioExample },
      { name: 'Range slider', Component: RangeExample },
      { name: 'Rating', Component: RatingExample },
      { name: 'Select', Component: SelectExample },
      { name: 'Textarea', Component: TextareaExample },
      { name: 'Toggle', Component: ToggleExample },
      { name: 'Validator', Component: ValidatorExample },
    ],
  },
  {
    name: 'Layout',
    examples: [
      { name: 'Divider', Component: DividerExample },
      { name: 'Footer', Component: FooterExample },
      { name: 'Hero', Component: HeroExample },
      { name: 'Stack', Component: StackExample },
    ],
  },
  {
    name: 'Mockup',
    examples: [
      { name: 'Browser mockup', Component: BrowserMockupExample },
      { name: 'Code mockup', Component: CodeMockupExample },
      { name: 'Phone mockup', Component: PhoneMockupExample },
      { name: 'Window mockup', Component: WindowMockupExample },
    ],
  },
]