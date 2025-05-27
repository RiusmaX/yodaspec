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
import { JSX } from 'react'
import { IProject } from '@/types/interfaces'
import { toast } from 'react-toastify'
import { updateProject } from '@/actions/project-actions'

export function ContextForm (): JSX.Element {
  const form = useForm<IProject>({
    mode: 'onBlur',
    defaultValues: {
      step1: {
        current_situation: '',
        problematic: '',
        goal: '',
        actors: '',
        target_users: '',
        scope_included: '',
        scope_excluded: ''
      }
    }
  })

  // Gestion de l'envoi du formulaire
  const onSubmit = async (data: IProject): Promise<void> => {
    console.log('Form submitted:', data)
    try {
      await updateProject(data)
      toast.success('Les informations ont été enregistrées avec succès !')
    } catch (error) {
      toast.error(`Une erreur est survenue lors de l'enregistrement des informations' ${String(error)}`)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={(e) => { void form.handleSubmit(onSubmit)(e) }} className='space-y-6'>
        <FormField
          control={form.control}
          name='step1.current_situation'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Contexte du projet</FormLabel>
              <FormControl>
                <Textarea {...field} />
              </FormControl>
              <FormDescription>
                Dans quelle situation le projet est-il né ?
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='step1.problematic'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Problématique</FormLabel>
              <FormControl>
                <Textarea {...field} />
              </FormControl>
              <FormDescription>
                Quelle est la problématique à résoudre ?
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='step1.goal'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Objectif</FormLabel>
              <FormControl>
                <Textarea {...field} />
              </FormControl>
              <FormDescription>
                Quel est l’objectif principal du projet ?
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='step1.actors'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Acteurs</FormLabel>
              <FormControl>
                <Textarea {...field} />
              </FormControl>
              <FormDescription>
                Qui participe au projet (noms, rôles) ?
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='step1.target_users'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Utilisateurs cibles</FormLabel>
              <FormControl>
                <Textarea {...field} />
              </FormControl>
              <FormDescription>
                À qui s’adresse ce projet ?
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='step1.scope_included'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Périmètre inclus</FormLabel>
              <FormControl>
                <Textarea {...field} />
              </FormControl>
              <FormDescription>
                Ce qui est compris dans le projet.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='step1.scope_excluded'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Périmètre exclu</FormLabel>
              <FormControl>
                <Textarea {...field} />
              </FormControl>
              <FormDescription>
                Ce qui est hors du périmètre.
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
