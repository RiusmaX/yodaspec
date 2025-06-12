'use client'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '../ui/textarea'
import React, { useState } from 'react'
import { IProject } from '@/types/interface'
import { Loader2 } from 'lucide-react'
import { toast } from 'react-toastify'

function CreateProjectDialog ({ createProject }: Readonly<{ createProject: (project: IProject) => Promise<void> }>): React.ReactNode {
  const [projectData, setProjectData] = useState({
    title: '',
    description: ''
    // step1: 'Contexte enrichi simulé pour test',
    // step2: [
    //   { title: 'Inscription', description: 'Permet aux utilisateurs de s’inscrire' },
    //   { title: 'Connexion', description: 'Connexion sécurisée avec JWT' }
    // ],
    // step3: [
    //   {
    //     titreSpec: 'Formulaire d’inscription',
    //     contexte: 'Page web pour inscrire un utilisateur',
    //     objectifs: 'Créer un compte utilisateur',
    //     acteurs: ['Utilisateur'],
    //     description: 'Le formulaire comporte email, mot de passe, confirmation.',
    //     conditionsSucces: 'Le compte est créé et connecté automatiquement.',
    //     preConditions: 'Aucun utilisateur connecté',
    //     etapesFlux: ['Remplir formulaire', 'Valider', 'Redirection'],
    //     scenariosErreurs: ['Email déjà utilisé', 'Mot de passe trop faible'],
    //     scenariosAlternatifs: ['Connexion avec Google'],
    //     reglesGestion: ['Email unique', 'Longueur minimale du mot de passe'],
    //     interfaceUxUi: 'Simple et responsive',
    //     casTests: ['Créer un compte avec succès', 'Erreur d’email'],
    //     postCondition: 'Utilisateur connecté',
    //     status: 'brouillon'
    //   }
    // ]
  })

  const [isLoading, setisLoading] = useState(false)
  const [isOpen, setisOpen] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault()
    setisLoading(true)
    try {
      await createProject(projectData)
      toast.success('Projet créé avec succès')
      setisOpen(false)
    } catch (error) {
      toast.error('Erreur lors de la création du projet')
    }
    setisLoading(false)
  }
  return (
    <Dialog open={isOpen} onOpenChange={setisOpen}>
      <DialogTrigger asChild>
        <Button variant='outline'>Créer un projet</Button>
      </DialogTrigger>
      <DialogContent className='sm:max-w-[425px]'>
        <DialogHeader>
          <DialogTitle>Créer un projet</DialogTitle>
          <DialogDescription>
            Remplissez les champs ci-dessous pour créer un projet.
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
              <Label htmlFor='description' className='text-right'>
                Description
              </Label>
              <Textarea
                id='description'
                value={projectData.description}
                onChange={(e) => setProjectData({ ...projectData, description: e.target.value })}
                className='col-span-3'
              />
            </div>
          </div>
          <DialogFooter>
            <Button type='submit' className='cursor-pointer' disabled={isLoading}>
              {isLoading ? <Loader2 className='animate-spin' /> : null}
              Charger le projet
            </Button>

          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default CreateProjectDialog
