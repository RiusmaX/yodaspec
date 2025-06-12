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
import { JSX, useState } from 'react'
import { IProject } from '@/types/interfaces'
import { toast } from 'react-toastify'
import { updateProject } from '@/actions/project-actions'
import { Loader2 } from 'lucide-react'
import { ModificationForm } from './modification-form'

// Composant de formulaire pour les informations contextuelles du projet
// Gère à la fois la soumission du formulaire et la génération de l'introduction par l'IA
export function ContextForm ({ project }: { project: IProject }): JSX.Element {
  // Gestion des états pour le chargement et le contenu généré
  const [isLoading, setIsLoading] = useState(false)

  const [introGenerated, setIntroGenerated] = useState(Boolean(project?.step1?.final_introduction?.length))
  const [generatedIntro, setGeneratedIntro] = useState<string>(project?.step1?.final_introduction ?? '')

  // Initialisation du formulaire avec les données existantes du projet ou des valeurs vides
  const form = useForm<IProject>({
    mode: 'onBlur',
    defaultValues: {
      step1: {
        current_situation: project.step1?.current_situation ?? '',
        problematic: project.step1?.problematic ?? '',
        goal: project.step1?.goal ?? '',
        actors: project.step1?.actors ?? '',
        target_users: project.step1?.target_users ?? '',
        scope_included: project.step1?.scope_included ?? '',
        scope_excluded: project.step1?.scope_excluded ?? ''
      }
    }
  })

  // Gestion de la soumission du formulaire, mise à jour du projet et génération de l'introduction
  const onSubmit = async (data: IProject): Promise<void> => {
    setIsLoading(true)
    try {
      await updateProject(project, data)
      toast.success('Les informations ont été enregistrées avec succès !')

      const response = await fetch('/api/gemini-proxy', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data.step1)
      })

      if (!response.ok) {
        throw new Error('Erreur lors de la génération de l\'introduction')
      }

      const result = await response.json()

      setGeneratedIntro(result.final_introduction)
      setIntroGenerated(true)

      // Mise à jour du projet avec l'introduction générée
      const updatedProject = {
        ...data,
        step1: {
          ...data.step1,
          final_introduction: result.final_introduction
        }
      }

      await updateProject(project, updatedProject)
      toast.success('L\'introduction a été générée avec succès !')
    } catch (error) {
      toast.error(`Une erreur est survenue lors de l'enregistrement des informations' ${String(error)}`)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={(e) => { void form.handleSubmit(onSubmit)(e) }} className='space-y-6 min-w-[600px]'>
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

        <Button type='submit' disabled={isLoading}>
          {isLoading ? <Loader2 className='w-4 h-4 mr-2 animate-spin' /> : null}
          Valider
        </Button>
      </form>
      {introGenerated && (
        <div className='mt-6'>
          <h2 className='text-lg font-semibold mb-4'>Introduction générée</h2>
          <ModificationForm
            project={project}
            introduction={generatedIntro}
            onUpdate={(newIntro) => setGeneratedIntro(newIntro)}
          />
        </div>
      )}
    </Form>
  )
}
