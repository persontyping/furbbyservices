import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

import { supabase } from '@/lib/supabase'
import type { ContactInsert, ContactRow, ContactUpdate } from '@/types/database'

const CONTACTS_KEY = ['contacts'] as const

export function useContacts() {
  return useQuery({
    queryKey: CONTACTS_KEY,
    queryFn: async (): Promise<ContactRow[]> => {
      const { data, error } = await supabase
        .from('contacts')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) throw error
      return data
    },
  })
}

export function useContact(id: string) {
  return useQuery({
    queryKey: [...CONTACTS_KEY, id],
    queryFn: async (): Promise<ContactRow> => {
      const { data, error } = await supabase
        .from('contacts')
        .select('*')
        .eq('id', id)
        .single()

      if (error) throw error
      return data
    },
    enabled: Boolean(id),
  })
}

export function useCreateContact() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (input: ContactInsert): Promise<ContactRow> => {
      const { data, error } = await supabase
        .from('contacts')
        .insert(input)
        .select()
        .single()

      if (error) throw error

      const { error: emailError } = await supabase.functions.invoke('send-contact-email', {
        body: {
          contactId: data.id,
          name: data.name,
          email: data.email,
          subject: data.subject,
          message: data.message,
        },
      })

      if (emailError) throw emailError
      return data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: CONTACTS_KEY })
    },
  })
}

export function useUpdateContact() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({
      id,
      ...input
    }: ContactUpdate & { id: string }): Promise<ContactRow> => {
      const { data, error } = await supabase
        .from('contacts')
        .update(input)
        .eq('id', id)
        .select()
        .single()

      if (error) throw error
      return data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: CONTACTS_KEY })
    },
  })
}

export function useDeleteContact() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (id: string): Promise<void> => {
      const { error } = await supabase.from('contacts').delete().eq('id', id)
      if (error) throw error
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: CONTACTS_KEY })
    },
  })
}
