'use client'

import { JSX, useState } from 'react'

interface Props {
  projectId: string
}

export default function GenerateSpecDialog ({ projectId }: Props): JSX.Element {
  const [title, setTitle] = useState('')
  const [context, setContext] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  const handleSubmit = async (): Promise<void> => {
    setLoading(true)
    setError(null)
    setSuccess(false)

    try {
      const res = await fetch('/api/specs/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ projectId, title, context })
      })

      if (!res.ok) {
        const err = await res.json()
        setError(err.error !== null && err.error !== undefined ? err.error : 'Erreur inconnue')
        return
      }

      const data = await res.json()
      console.log('Spécification générée:', data.spec)
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

      <div className='flex flex-col gap-1'>
        <label htmlFor='title' className='text-sm font-semibold'>Titre de la fonctionnalité</label>
        <input
          type='text'
          id='title'
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className='border p-2 rounded'
        />
      </div>

      <div className='flex flex-col gap-1'>
        <label htmlFor='context' className='text-sm font-semibold'>Contexte du projet</label>
        <textarea
          id='context'
          value={context}
          onChange={(e) => setContext(e.target.value)}
          className='border p-2 rounded'
          rows={4}
        />
      </div>

      <button
        onClick={(e) => { void handleSubmit() }}
        disabled={loading || title === '' || context === ''}
        className='bg-green-600 text-white px-4 py-2 rounded mt-2 disabled:opacity-50'
      >
        {loading ? 'Génération en cours...' : 'Générer la spécification'}
      </button>

      {error !== null && error !== undefined && <p className='text-red-600 font-semibold'>{error}</p>}
      {success && <p className='text-green-600 font-semibold'>Spécification générée et enregistrée !</p>}
    </div>
  )
}
