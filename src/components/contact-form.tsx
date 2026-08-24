import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { useCreateContact } from '@/hooks/use-contacts'
import { supabase } from '@/lib/supabase'
import { contactFormSchema, type ContactFormValues } from '@/lib/contact-schema'

export function ContactForm() {
  const createContact = useCreateContact()

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
  })

  const onSubmit = async (values: ContactFormValues) => {
    try {
      // 1. Persist the message in Supabase (CRUD "create").
      const saved = await createContact.mutateAsync(values)

      // 2. Ask the Supabase Edge Function to deliver the email via Amazon SES.
      const { error: fnError } = await supabase.functions.invoke(
        'send-contact-email',
        { body: { contactId: saved.id, ...values } },
      )

      if (fnError) throw fnError

      toast.success("Message sent — we'll get back to you soon.")
      reset()
    } catch (err) {
      console.error(err)
      toast.error('Something went wrong sending your message. Please try again.')
    }
  }

  return (
    <Card className="w-full max-w-xl">
      <CardHeader>
        <CardTitle>Contact us</CardTitle>
        <CardDescription>
          Fill out the form below and we&apos;ll respond by email.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <Label htmlFor="name">Name</Label>
            <Input id="name" placeholder="Jane Doe" {...register('name')} />
            {errors.name && (
              <p className="text-sm text-destructive">{errors.name.message}</p>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="jane@example.com"
              {...register('email')}
            />
            {errors.email && (
              <p className="text-sm text-destructive">{errors.email.message}</p>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="subject">Subject</Label>
            <Input id="subject" placeholder="How can we help?" {...register('subject')} />
            {errors.subject && (
              <p className="text-sm text-destructive">{errors.subject.message}</p>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="message">Message</Label>
            <Textarea
              id="message"
              placeholder="Tell us more..."
              {...register('message')}
            />
            {errors.message && (
              <p className="text-sm text-destructive">{errors.message.message}</p>
            )}
          </div>

          <Button type="submit" disabled={isSubmitting} className="mt-2">
            {isSubmitting ? 'Sending…' : 'Send message'}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
