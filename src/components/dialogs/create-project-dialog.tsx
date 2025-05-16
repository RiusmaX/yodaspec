'use client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { IProject } from '@/types/interfaces'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter
} from '@/components/ui/dialog'
import { toast } from 'react-toastify'
import { useState } from 'react'
import { Loader2 } from 'lucide-react'

function CreateProjectDialogue ({ createProject }: Readonly<{ createProject: (project: IProject) => Promise<void> }>): React.ReactElement {
  const [projectData, setprojectData] = useState({
    title: '',
    description: ''
  })
  const [isloader, setisloader] = useState(false)
  const handlesubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault()
    setisloader(true)
    try {
      await createProject(projectData)
      toast.success('Projet créé avec succès')
    } catch (error) {
      toast.error('Erreur lors de la création du projet')
    }
    setisloader(false)
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
            Remplissez les champs ci-dessous
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={(e) => { void handlesubmit(e) }}>
          <div className='grid gap-4 py-4'>
            <div className='grid grid-cols-4 items-center gap-4'>
              <Label htmlFor='name' className='text-right'>
                Titre
              </Label>
              <Input id='name' value={projectData.title} onChange={(e) => setprojectData({ ...projectData, title: e.target.value })} className='col-span-3' />
            </div>
            <div className='grid grid-cols-4 items-center gap-4'>
              <Label htmlFor='username' className='text-right'>
                Description
              </Label>
              <Textarea id='username' value={projectData.description} onChange={(e) => setprojectData({ ...projectData, description: e.target.value })} className='col-span-3' rows={4} />
            </div>
          </div>
          <DialogFooter>
            <Button type='submit' className='cursor-pointer'>
              {isloader ? <Loader2 className='w-4 h-4 mr-2 animate-spin' /> : 'Save changes'}

            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
export default CreateProjectDialogue
