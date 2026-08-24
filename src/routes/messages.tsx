import { createFileRoute } from '@tanstack/react-router'
import { ContactsList } from '@/components/contacts-list'

export const Route = createFileRoute('/messages')({
  component: MessagesPage,
})

function MessagesPage() {
  return (
    <div className="flex w-full flex-col items-center gap-6">
      <h1 className="text-2xl font-semibold">Submitted messages</h1>
      <ContactsList />
    </div>
  )
}
