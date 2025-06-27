'use client'
import { ScrollArea } from '../ui/scroll-area'
import FeatureCardSkeleton from '../skeletons/feature-card-skeleton'
import { useCallback, useMemo, useState } from 'react'
import ValidationBar from '../validation/validation-bar'
import { ClientFeature } from '@/types/interfaces'
import { updateSelectedFeatures } from '@/actions/feature-actions'
import { Button } from '../ui/button'
import { toast } from 'react-toastify'

function FeaturesList({
  projectId,
  features
}: Readonly<{ projectId: string, features: ClientFeature[] }>): React.ReactNode {
  const [selected, setSelected] = useState<Record<string, boolean>>(
    Object.fromEntries(features.map((f) => [f._id, true]))
  )
  const [isLoading, setIsLoading] = useState(false)
  const [editedFeatures, setEditedFeatures] = useState<ClientFeature[]>(features)
  const [showAdd, setShowAdd] = useState(false)
  const [newFeature, setNewFeature] = useState({
    feature: '',
    description: ''
  })
  const [isValidating, setIsValidating] = useState(false)
  const [formattedFeatures, setFormattedFeatures] = useState<ClientFeature[] | null>(
    null
  )
  const [formatLog, setFormatLog] = useState<string>('')

  // Fonction pour basculer la sélection d'une fonctionnalité
  const toggle = (id: string): void => {
    setSelected((prev) => ({
      ...prev,
      [id]: !prev[id]
    }))
  }

  // Fonction pour éditer une fonctionnalité
  const handleEdit = (
    id: string,
    newValues: { feature: string, description: string }
  ): void => {
    setEditedFeatures((prev) =>
      prev.map((f) => (f._id === id ? { ...f, ...newValues } : f))
    )
  }

  // Fonction pour ajouter une nouvelle fonctionnalité
  const handleAddFeature = (): void => {
    if (newFeature.feature.trim() === '') return
    const id = `${Date.now()}-${Math.random()}`
    setEditedFeatures((prev) => [...prev, { ...newFeature, _id: id }])
    setSelected((prev) => ({ ...prev, [id]: true }))
    setNewFeature({ feature: '', description: '' })
    setShowAdd(false)
    toast.success('Fonctionnalité ajoutée avec succès !')
  }

  // Sélection des fonctionnalités actuellement sélectionnées
  const selection = useMemo(
    () => editedFeatures.filter((f) => selected[f._id]),
    [selected, editedFeatures]
  )

  // Fonction pour valider les fonctionnalités sélectionnées
  const handleValidate = useCallback(() => {
    setIsValidating(true)
    sendAndFormatFeatures(selection, projectId)
      .catch((error) => {
        toast.error('Erreur lors de la validation des fonctionnalités')
        console.error('Erreur lors de la validation des fonctionnalités:', error)
        setFormatLog('Erreur lors de la validation des fonctionnalités')
      })

      .finally(() => setIsValidating(false))
  }, [selection, projectId])

  // Fonction pour envoyer les fonctionnalités à Gemini et les formater
  async function sendAndFormatFeatures(features: ClientFeature[], projectId: string): Promise<void> {
    setIsLoading(true)
    
    // Créer un ID unique pour ce toast de loading
    const loadingToastId = toast.loading('Début de la requête Gemini pour formatage...')
    
    console.log('[Gemini] Envoi des features à formater:', features)
    
    try {
      // Ajout d'un prompt explicite pour le formatage
      const prompt = `Formate proprement la liste suivante de fonctionnalités pour un projet. Pour chaque fonctionnalité, corrige le nom et la description pour qu'ils soient clairs, concis, cohérents et professionnels. Retourne un tableau JSON d'objets {feature, description} sans autre texte.\n\nListe à formater :\n${features
        .map((f, i) => `${i + 1}. ${f.feature} : ${f.description}`)
        .join('\n')}`
      
      const response = await fetch('/api/gemini-proxy-step-2', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          promptType: 'format',
          features,
          prompt
        })
      })
      
      if (!response.ok) {
        throw new Error('Erreur lors de la requête Gemini')
      }
      
      const formatted: ClientFeature[] = (await response.json()).map((f: any) => ({
        ...f,
        _id: `${String(f.feature)}-${String(f.description)}` // ou utilise un vrai uuid si dispo
      }))
      
      console.log('[Gemini] Réponse formatée:', formatted)
      setFormattedFeatures(formatted)
      setEditedFeatures(formatted)
      setSelected(Object.fromEntries(formatted.map((f) => [f._id, true])))
      
      // ✅ Dismiss du toast de loading et affichage du succès
      toast.dismiss(loadingToastId)
      toast.success('La mise en forme de vos fonctionnalités est terminée !')
      
    } catch (error) {
      // ✅ Dismiss du toast de loading et affichage de l'erreur
      toast.dismiss(loadingToastId)
      toast.error('Erreur lors de la requête Gemini')
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  // Fonction pour sauvegarder la sélection de fonctionnalités
  async function saveFeatureSelection(selection: ClientFeature[], projectId: string): Promise<void> {
    // Conversion ClientFeature -> IFeature (on enlève _id)
    const featuresToSave = selection.map(({ feature, description }) => ({ feature, description }))
    await updateSelectedFeatures(projectId, featuresToSave)
    toast.success('Fonctionnalités sauvegardées avec succès !')
  }

  return (
    <div className='flex flex-col gap-4'>
      <div className='flex justify-between items-center mb-2'>
        <h2 className='text-lg font-bold'>Fonctionnalités</h2>
        <button
          className='self-end bg-secondary text-primary px-3 py-1 rounded-lg hover:bg-secondary/70 transition-colors flex items-center gap-2'
          onClick={() => setShowAdd((v) => !v)}
        >
          {!showAdd && (
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='h-4 w-4'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M12 4v16m8-8H4'
              />
            </svg>
          )}
          {showAdd ? 'Annuler' : 'Ajouter une fonctionnalité'}
        </button>
      </div>
      {showAdd && (
        <div className='flex flex-col gap-2 p-4 border rounded-xl mb-2 bg-muted'>
          <input
            className='border rounded-lg px-2 py-1'
            placeholder='Nom de la fonctionnalité'
            value={newFeature.feature}
            onChange={(e) =>
              setNewFeature((f) => ({ ...f, feature: e.target.value }))}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault()
                handleAddFeature()
              }
            }}
          />
          <textarea
            className='border rounded-lg px-2 py-1'
            placeholder='Description'
            value={newFeature.description}
            onChange={(e) =>
              setNewFeature((f) => ({ ...f, description: e.target.value }))}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault()
                handleAddFeature()
              }
            }}
          />
          <button
            className='self-end px-6 bg-white text-black py-1 rounded-lg hover:bg-gray-300 transition-colors mt-1'
            onClick={handleAddFeature}
          >
            Ajouter
          </button>
        </div>
      )}

      <ScrollArea className='h-[80hv] gap-4'>
        <div className='flex flex-col gap-2 '>
          {(formattedFeatures ?? editedFeatures).map((feature: ClientFeature) => (
            <FeatureCardSkeleton
              key={feature._id}
              feature={feature}
              checked={selected[feature._id]}
              onCheckedChange={() => toggle(feature._id)}
              onEdit={(newValues) => handleEdit(feature._id, newValues)}
            />
          ))}
        </div>
      </ScrollArea>
      {formatLog !== '' && <div className='text-xs text-blue-600'>{formatLog}</div>}

      <div className='flex flex-row justify-between gap-2 mb-2'>
        <Button
          variant='outline'
          disabled={isValidating}
          onClick={handleValidate}
        >
          Mettre en forme
        </Button>
        <ValidationBar
          disabled={selection.length === 0 || isValidating}
          onValidate={async () => {
            await saveFeatureSelection(selection, projectId)
            // Ajouter la logique de navigation
          }}
        />
      </div>

    </div>
  )
}

export default FeaturesList
