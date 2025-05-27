'use client'

import { JSX, useState } from 'react'

interface Props {
  projectId: string
}

export default function GenerateSpecDialog ({ projectId }: Props): JSX.Element {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)
  const [result, setResult] = useState<any>(null) // pour afficher la spec générée

  // Fonction qui crée des fausses données faker pour step2
  const generateFakeData = (): Record<string, string> => {
    return {
      title: "Application mobile d'accès au stade du club de foot de Paris",
      context: "Création de l'application mobile pour gérer l'accès au nouveau stade de Paris."
    }
  }

  const handleClick = async (): Promise<void> => {
    setLoading(true)
    setError(null)
    setSuccess(false)

    const fakeData = generateFakeData()

    try {
      const res = await fetch('/api/specs/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          projectId,
          title: fakeData.title,
          context: fakeData.context
        })
      })

      if (!res.ok) {
        const err = await res.json()
        setError(err.error ?? 'Erreur inconnue')
        return
      }

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
    <div className='flex flex-col gap-4 border rounded-lg p-6 shadow-md w-full max-w-2xl'>
      <h2 className='text-xl font-bold'>Générer une spécification</h2>

      <button
        onClick={(e) => { void handleClick() }}
        disabled={loading}
        className='bg-green-600 text-white px-4 py-2 rounded mt-2 disabled:opacity-50'
      >
        {loading ? 'Génération en cours...' : 'Générer une spécification avec faker'}
      </button>

      {error !== null && error !== undefined && <p className='text-red-600 font-semibold'>{error}</p>}
      {success && <p className='text-green-600 font-semibold'>Spécification générée et enregistrée !</p>}

      {result !== null && result !== undefined && (
        <pre className='bg-gray-100 p-4 rounded overflow-x-auto mt-4 text-sm'>
          {JSON.stringify(result, null, 2)}
        </pre>
      )}
    </div>
  )
}
