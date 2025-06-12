'use client'
import { useRouter } from 'next/navigation'
import { JSX, useState } from 'react'
 
interface Props {
  projectId: string
}
 
// Composant permettant de générer une spécification pour un projet donné
export default function GenerateSpecDialog ({ projectId }: Props): JSX.Element {
  // États pour gérer le chargement, les erreurs, le succès et le résultat
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)
  const [result, setResult] = useState<any>(null)
  const router = useRouter()
 
  // Fonction qui crée des fausses données pour step2
  const generateFakeData = (): Record<string, string> => {
    return {
      title: "Application mobile d'accès au stade du club de foot de Paris",
      context: "Création de l'application mobile pour gérer l'accès au nouveau stade de Paris."
    }
  }
 
  // Fonction appelée lors du clic sur le bouton de génération
  const handleClick = async (): Promise<void> => {
    setLoading(true)
    setError(null)
    setSuccess(false)
 
    const fakeData = generateFakeData()
 
    try {
      // Appel à l'API pour générer la spécification
      const res = await fetch('/api/specs/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          projectId,
          title: fakeData.title,
          context: fakeData.context
        })
      })
 
      // Gestion des erreurs de la réponse
      if (!res.ok) {
        const err = await res.json()
        setError(err.error ?? 'Erreur inconnue')
        return
      }
 
      // Si succès, on stocke le résultat et on affiche la notification
      const data = await res.json()
      console.log('Spécification générée:', data.spec)
      setResult(data.spec)
      setSuccess(true)
    } catch (e) {
      console.error('Erreur réseau ou serveur', e)
      setError('Erreur lors de la requête')
    } finally {
      setLoading(false)
    }
  }
 
  return (
    // Conteneur du formulaire de génération de spécification
      <div className='flex flex-col gap-4  items-center rounded-lg p-6 shadow-md w-full max-w-2xl'>
        {/* Bouton pour lancer la génération */}
        <button
          onClick={(e) => { void handleClick() }}
          disabled={loading}
          className='bg-green-600 text-white px-4 py-2 rounded mt-2 disabled:opacity-50'
        >
          {loading ? 'Génération en cours...' : 'Générer la spécification'}
        </button>
        {/* Notification de succès */}
        {success && (
        <div className="mt-2 px-4 py-2 rounded bg-green-100 text-green-800 font-semibold">
          Spécification générée avec succès !
        </div>
      )}
      {/* Notification d'erreur */}
      {error && (
        <div className="mt-2 px-4 py-2 rounded bg-red-100 text-red-800 font-semibold">
          {error}
        </div>
      )}
      </div>
     
  )
}
 