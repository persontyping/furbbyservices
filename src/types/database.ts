export type ContactRow = {
  id: string
  name: string
  email: string
  subject: string
  message: string
  created_at: string
  emailed_at: string | null
}

export type ContactInsert = Omit<ContactRow, 'id' | 'created_at' | 'emailed_at'>
export type ContactUpdate = Partial<ContactInsert>

// Minimal typed schema for the Supabase client generic.
// Regenerate with `supabase gen types typescript` once the project is linked.
export type Database = {
  __InternalSupabase: {
    PostgrestVersion: '13'
  }
  public: {
    Tables: {
      contacts: {
        Row: ContactRow
        Insert: ContactInsert
        Update: ContactUpdate
        Relationships: []
      }
    }
    Views: Record<string, never>
    Functions: Record<string, never>
    Enums: Record<string, never>
    CompositeTypes: Record<string, never>
  }
}
