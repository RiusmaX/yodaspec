'use client'

import { useState } from 'react'
import { IProject, IFeature } from '@/types/interfaces'
import { toast } from 'react-toastify'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { Textarea } from '../ui/textarea'
import { ArrowLeft, Plus, Edit, Trash2, Save, X } from 'lucide-react'
import Link from 'next/link'
import {
  addFeatureToProject,
  updateFeatureInProject,
  deleteFeatureFromProject
} from '@/actions/feature-actions'

interface SpecDataProps {
  project: IProject
  projectId: string
}

const SpecData = ({ project, projectId }: SpecDataProps): React.ReactNode => {
  const [editingIndex, setEditingIndex] = useState<number | null>(null)
  const [showAddForm, setShowAddForm] = useState<boolean>(false)
  const [newFeature, setNewFeature] = useState<{ feature: string, description: string }>({
    feature: '',
    description: ''
  })
  const [editFeature, setEditFeature] = useState<{ feature: string, description: string }>({
    feature: '',
    description: ''
  })
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const features = Array.isArray(project.features) ? project.features : []

  const handleAddFeature = async (): Promise<void> => {
    if (!newFeature.feature.trim() || !newFeature.description.trim()) {
      toast.error('Veuillez remplir tous les champs')
      return
    }

    setIsLoading(true)
    try {
      await addFeatureToProject(projectId, newFeature)
      setNewFeature({ feature: '', description: '' })
      setShowAddForm(false)
      toast.success('Fonctionnalité ajoutée avec succès')
    } catch (error) {
      toast.error('Erreur lors de l\'ajout de la fonctionnalité')
      console.error('Error adding feature:', error)
    } finally {
      setIsLoading(false)
    }
  }

  // ✅ MODIFIER une fonctionnalité
  const handleEditFeature = async (index: number): Promise<void> => {
    if (!editFeature.feature.trim() || !editFeature.description.trim()) {
      toast.error('Veuillez remplir tous les champs')
      return
    }

    setIsLoading(true)
    try {
      await updateFeatureInProject(projectId, index, editFeature)
      setEditingIndex(null)
      toast.success('Fonctionnalité modifiée avec succès')
    } catch (error) {
      toast.error('Erreur lors de la modification de la fonctionnalité')
      console.error('Error updating feature:', error)
    } finally {
      setIsLoading(false)
    }
  }

  // ✅ SUPPRIMER une fonctionnalité
  const handleDeleteFeature = async (index: number): Promise<void> => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer cette fonctionnalité ?')) {
      return
    }

    setIsLoading(true)
    try {
      await deleteFeatureFromProject(projectId, index)
      toast.success('Fonctionnalité supprimée avec succès')
    } catch (error) {
      toast.error('Erreur lors de la suppression de la fonctionnalité')
      console.error('Error deleting feature:', error)
    } finally {
      setIsLoading(false)
    }
  }

  // Commencer l'édition
  const startEdit = (index: number, feature: IFeature): void => {
    setEditingIndex(index)
    setEditFeature({ feature: feature.feature, description: feature.description })
  }

  // Annuler l'édition
  const cancelEdit = (): void => {
    setEditingIndex(null)
    setEditFeature({ feature: '', description: '' })
  }

  return (
    <div className='container mx-auto p-6 space-y-6'>
      {/* Header */}
      <div className='flex items-center gap-4'>
        <Link href='/'>
          <Button variant='outline' size='sm'>
            <ArrowLeft className='h-4 w-4 mr-2' />
            Retour
          </Button>
        </Link>
        <div className='flex-1'>
          <h1 className='text-3xl font-bold'>{project.title}</h1>
          <p className='text-gray-600 mt-2'>{project.description}</p>
        </div>
      </div>

      {/* Section des spécifications */}
      <div className='bg-white rounded-lg border shadow-sm'>
        <div className='p-6 border-b'>
          <div className='flex justify-between items-center'>
            <h2 className='text-2xl font-semibold'>Spécifications fonctionnelles</h2>
            <Button
              onClick={() => setShowAddForm(true)}
              className='flex items-center gap-2'
              disabled={isLoading || showAddForm}
            >
              <Plus className='h-4 w-4' />
              Ajouter une spec
            </Button>
          </div>
        </div>

        <div className='p-6'>
          {/* Formulaire d'ajout */}
          {showAddForm && (
            <div className='mb-6 p-4 border rounded-lg bg-gray-50'>
              <h3 className='font-semibold mb-3'>Nouvelle fonctionnalité</h3>
              <div className='space-y-3'>
                <Input
                  placeholder='Nom de la fonctionnalité'
                  value={newFeature.feature}
                  onChange={(e) => setNewFeature({ ...newFeature, feature: e.target.value })}
                  disabled={isLoading}
                />
                <Textarea
                  placeholder='Description de la fonctionnalité'
                  value={newFeature.description}
                  onChange={(e) => setNewFeature({ ...newFeature, description: e.target.value })}
                  rows={3}
                  disabled={isLoading}
                />
                <div className='flex gap-2'>
                  <Button
                    onClick={handleAddFeature}
                    size='sm'
                    disabled={isLoading}
                  >
                    <Save className='h-4 w-4 mr-2' />
                    {isLoading ? 'Sauvegarde...' : 'Sauvegarder'}
                  </Button>
                  <Button
                    variant='outline'
                    onClick={() => {
                      setShowAddForm(false)
                      setNewFeature({ feature: '', description: '' })
                    }}
                    size='sm'
                    disabled={isLoading}
                  >
                    <X className='h-4 w-4 mr-2' />
                    Annuler
                  </Button>
                </div>
              </div>
            </div>
          )}

          {/* Tableau des fonctionnalités */}
          <div className='overflow-x-auto'>
            <table className='min-w-full border-collapse border border-gray-300'>
              <thead>
                <tr className='bg-gray-100'>
                  <th className='border border-gray-300 p-3 text-left font-semibold'>Fonctionnalité</th>
                  <th className='border border-gray-300 p-3 text-left font-semibold'>Description</th>
                  <th className='border border-gray-300 p-3 text-center font-semibold'>Actions</th>
                </tr>
              </thead>
              <tbody>
                {features.length === 0
                  ? (
                    <tr>
                      <td colSpan={3} className='border border-gray-300 p-6 text-center text-gray-500'>
                        Aucune fonctionnalité. Cliquez sur "Ajouter une spec" pour commencer.
                    </td>
                    </tr>
                    )
                  : (
                      features.map((feature, index) => (
                        <tr key={index} className='hover:bg-gray-50'>
                          <td className='border border-gray-300 p-3'>
                            {editingIndex === index
                          ? (
                            <Input
                              value={editFeature.feature}
                              onChange={(e) => setEditFeature({ ...editFeature, feature: e.target.value })}
                              disabled={isLoading}
                            />
                            )
                          : (
                            <span className='font-medium'>{feature.feature}</span>
                            )}
                          </td>
                          <td className='border border-gray-300 p-3'>
                            {editingIndex === index
                          ? (
                            <Textarea
                              value={editFeature.description}
                              onChange={(e) => setEditFeature({ ...editFeature, description: e.target.value })}
                              rows={2}
                              disabled={isLoading}
                            />
                            )
                          : (
                            <span>{feature.description}</span>
                            )}
                          </td>
                          <td className='border border-gray-300 p-3'>
                            <div className='flex justify-center gap-2'>
                          {editingIndex === index
                            ? (
                              <>
                                <Button
                                  onClick={async () => await handleEditFeature(index)}
                                  size='sm'
                                  variant='default'
                                  disabled={isLoading}
                                >
                                  <Save className='h-4 w-4' />
                                </Button>
                                <Button
                                  onClick={cancelEdit}
                                  size='sm'
                                  variant='outline'
                                  disabled={isLoading}
                                >
                                  <X className='h-4 w-4' />
                                </Button>
                              </>
                              )
                            : (
                              <>
                                <Button
                                  onClick={() => startEdit(index, feature)}
                                  size='sm'
                                  variant='outline'
                                  disabled={isLoading || editingIndex !== null}
                                >
                                  <Edit className='h-4 w-4' />
                                </Button>
                                <Button
                                  onClick={async () => await handleDeleteFeature(index)}
                                  size='sm'
                                  variant='destructive'
                                  disabled={isLoading || editingIndex !== null}
                                >
                                  <Trash2 className='h-4 w-4' />
                                </Button>
                              </>
                              )}
                        </div>
                          </td>
                        </tr>
                      ))
                    )}
              </tbody>
            </table>
          </div>

          {/* Stats simples */}
          <div className='mt-6 p-4 bg-gray-50 rounded-lg'>
            <p className='text-sm text-gray-600'>
              Total: <span className='font-semibold'>{features.length}</span> fonctionnalité(s)
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SpecData
