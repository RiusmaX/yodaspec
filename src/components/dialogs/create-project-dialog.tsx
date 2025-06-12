'use client'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger, DialogFooter, DialogHeader } from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { useState } from 'react'
import { IProject } from '@/types/interfaces'
import { Loader2 } from 'lucide-react'
import { toast } from 'react-toastify'
import { Textarea } from '@/components/ui/textarea'

function CreateProjectDialog ({
  createProject
}: Readonly<{
  createProject: (project: IProject) => Promise<void>
}>): React.ReactNode {
  // État pour les données du projet et le statut de chargement
  const [projectData, setProjectData] = useState<IProject>({
    title: '',
    description: ''
  })
  const [isLoading, setIsLoading] = useState(false)

  // Fonction pour appeler l'API Gemini
  const fetchFeaturesFromGemini = async (title: string, description: string): Promise<string[]> => {
    try {
      const response = await fetch('/api/gemini-proxy', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ title, description })
      })
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      const fetchedFeatures = await response.json()
      return fetchedFeatures
    } catch (error) {
      console.error('Erreur lors de l\'appel à l\'API Gemini:', error)
      throw error
    }
  }

  // Fonction pour enregistrer le projet dans la base de données
  const saveProjectToDB = async (project: IProject): Promise<void> => {
    try {
      await createProject(project)
    } catch (error) {
      console.error('Erreur lors de l\'enregistrement du projet:', error)
      throw error
    }
  }

  // Fonction pour gérer la soumission du formulaire
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault()
    setIsLoading(true)
    try {
      const featuresFromGemini = await fetchFeaturesFromGemini(projectData.title, projectData.description)

      // Formatage des fonctionnalités -> string en objets avec feature et description
      const featuresFormatted = featuresFromGemini.map((feature: string) => ({
        feature,
        description: '' // Utilisation de la même valeur pour la description
      }))

      const newProject = {
        ...projectData,
        features: featuresFormatted // Format parfait, pas de transformation
      }

      await saveProjectToDB(newProject)
      toast.success('Projet créé avec succès')
    } catch (error) {
      toast.error(`Une erreur est survenue lors de la création du projet: ${String(error)}`)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant='outline'>Créer un projet</Button>
      </DialogTrigger>
      <DialogContent className='sm:max-w-[425px]'>
        <DialogHeader>
          <DialogTitle>Créer un projet</DialogTitle>
          <DialogDescription>
            Remplissez les informations ci-dessous pour créer un projet.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={(e) => { void handleSubmit(e) }}>
          <div className='grid gap-4 py-4'>
            <div className='grid grid-cols-4 items-center gap-4'>
              <Label htmlFor='name' className='text-right'>
                Titre
              </Label>
              <Input
                id='name'
                value={projectData.title}
                onChange={(e) => setProjectData({ ...projectData, title: e.target.value })}
                className='col-span-3'
              />
            </div>
            <div className='grid grid-cols-4 items-center gap-4'>
              <Label htmlFor='username' className='text-right'>
                Description
              </Label>
              <Textarea
                id='username'
                value={projectData.description}
                onChange={(e) => setProjectData({ ...projectData, description: e.target.value })}
                className='col-span-3'
                rows={6}
              />
            </div>
          </div>
          <DialogFooter>
            <Button type='submit' disabled={isLoading}>
              {isLoading ? <Loader2 className='w-4 h-4 mr-2 animate-spin' /> : null}
              Créer le projet
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default CreateProjectDialog
