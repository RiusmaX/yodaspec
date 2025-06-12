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
import { IProject } from '@/types/interfaces'
import { toast } from 'react-toastify'
import { updateProject } from '@/actions/project-actions'
import { JSX } from 'react'

// Composant de formulaire pour la modification de l'introduction générée
// Permet à l'utilisateur de modifier et valider l'introduction proposée par l'IA
export function ModificationForm ({ project, introduction }: { project: IProject, introduction: string }): JSX.Element {
  // Initialisation du formulaire avec l'introduction existante ou une valeur vide
  const form = useForm<IProject>({
    mode: 'onBlur',
    defaultValues: {
      step1: {
        final_introduction: project.step1?.final_introduction ?? ''
      }
    }
  })

  // Gestion de la soumission du formulaire et mise à jour de l'introduction
  const onSubmit = async (data: IProject): Promise<void> => {
    console.log('Form submitted:', data)
    try {
      await updateProject(project, data)
      toast.success('L\'introduction a été enregistrées avec succès !')
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
