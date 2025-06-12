'use client'
import { useForm } from 'react-hook-form'
import { Button } from '../ui/button'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '../ui/form'
import { Textarea } from '../ui/textarea'
import { JSX, useEffect } from 'react'
import { IProject } from '@/types/interfaces'
import { toast } from 'react-toastify'
import { updateProject } from '@/actions/project-actions'

export function ModificationForm ({ project, introduction, onUpdate }: { project: IProject, introduction: string, onUpdate: (newIntro: string) => void }): JSX.Element {
  const form = useForm<IProject>({
    mode: 'onBlur',
    defaultValues: {
      step1: {
        ...project?.step1, // On garde les autres valeurs du step1
        final_introduction: introduction // On utilise l'introduction passée en prop
      }
    }
  })

  useEffect(() => {
    form.reset({
      step1: {
        ...project?.step1,
        final_introduction: introduction
      }
    })
  }, [introduction, project?.step1, form])

  // Gestion de l'envoi du formulaire
  const onSubmit = async (data: IProject): Promise<void> => {
    try {
      await updateProject(project, data)
      if (data.step1?.final_introduction !== undefined && data.step1.final_introduction !== '') {
        onUpdate(data.step1.final_introduction)
        toast.success('L\'introduction a été enregistrée avec succès !')
      }
    } catch (error) {
      toast.error(`Une erreur est survenue lors de l'enregistrement de l'introduction' ${String(error)}`)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={(e) => { void form.handleSubmit(onSubmit)(e) }} className='space-y-6'>
        <FormField
          control={form.control}
          name='step1.final_introduction'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Introduction du cahier des charges</FormLabel>
              <FormControl>
                <Textarea {...field} />
              </FormControl>
              <FormDescription>
                Voici l'introduction générée à partir des informations fournies. Vous pouvez la modifier si nécessaire.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type='submit'>Valider</Button>
      </form>
    </Form>
  )
}
