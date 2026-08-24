import { useState } from 'react'
import { toast } from 'sonner'

import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Textarea } from '@/components/ui/textarea'
import {
  useContacts,
  useDeleteContact,
  useUpdateContact,
} from '@/hooks/use-contacts'
import type { ContactRow } from '@/types/database'

export function ContactsList() {
  const { data: contacts, isLoading, isError } = useContacts()
  const deleteContact = useDeleteContact()

  if (isLoading) return <p className="text-muted-foreground">Loading messages…</p>
  if (isError) return <p className="text-destructive">Failed to load messages.</p>
  if (!contacts?.length)
    return <p className="text-muted-foreground">No messages yet.</p>

  return (
    <div className="flex w-full max-w-2xl flex-col gap-4">
      {contacts.map((contact) => (
        <ContactRowCard
          key={contact.id}
          contact={contact}
          onDelete={() =>
            deleteContact.mutate(contact.id, {
              onSuccess: () => toast.success('Message deleted'),
              onError: () => toast.error('Failed to delete message'),
            })
          }
        />
      ))}
    </div>
  )
}

function ContactRowCard({
  contact,
  onDelete,
}: {
  contact: ContactRow
  onDelete: () => void
}) {
  const [isEditing, setIsEditing] = useState(false)
  const [message, setMessage] = useState(contact.message)
  const updateContact = useUpdateContact()

  const handleSave = () => {
    updateContact.mutate(
      { id: contact.id, message },
      {
        onSuccess: () => {
          toast.success('Message updated')
          setIsEditing(false)
        },
        onError: () => toast.error('Failed to update message'),
      },
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{contact.subject}</CardTitle>
        <CardDescription>
          {contact.name} · {contact.email} ·{' '}
          {new Date(contact.created_at).toLocaleString()}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-3">
        {isEditing ? (
          <Textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
        ) : (
          <p className="whitespace-pre-wrap text-sm">{contact.message}</p>
        )}

        <div className="flex gap-2">
          {isEditing ? (
            <>
              <Button size="sm" onClick={handleSave} disabled={updateContact.isPending}>
                Save
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={() => {
                  setMessage(contact.message)
                  setIsEditing(false)
                }}
              >
                Cancel
              </Button>
            </>
          ) : (
            <Button size="sm" variant="outline" onClick={() => setIsEditing(true)}>
              Edit
            </Button>
          )}
          <Button size="sm" variant="destructive" onClick={onDelete}>
            Delete
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
