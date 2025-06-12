'use client'

import { useState } from 'react'
import { ValidatedSpec } from '@/types/interface'
import { verifiedSpecAction } from '@/app/actions/check-actions'

export default function Step4Validation ({
  projectId
}: {
  projectId: string
}): React.ReactElement {
  const [loading, setLoading] = useState(false)
  const [results, setResults] = useState<ValidatedSpec[] | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [modificationDetected, setModificationDetected] = useState<boolean | null>(null)

  const handleRunChecks = async (): Promise<void> => {
    setLoading(true)
    setError(null)
    try {
      const { hasAnyModification, enrichedSpecs } = await verifiedSpecAction(projectId)

      setResults(enrichedSpecs)
      setModificationDetected(hasAnyModification)
    } catch (err: any) {
      setError(
        typeof err?.message === 'string' ? err.message : 'Erreur inconnue'
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='space-y-6'>
      <h2 className='text-xl font-bold'>Étape 4 – Vérification IA des spécifications</h2>

      <div className='flex gap-4'>
        <button className='px-4 py-2 bg-gray-300 rounded' onClick={() => {}}>
          ⬅️ Précédent
        </button>

        <button
          className='px-4 py-2 bg-blue-600 text-white rounded'
          onClick={() => { void handleRunChecks() }}
          disabled={loading}
        >
          {loading ? 'Analyse en cours...' : 'Lancer la vérification IA'}
        </button>

        <button className='px-4 py-2 bg-gray-300 rounded' onClick={() => {}}>
          Suivant ➡️
        </button>
      </div>

      {error != null && <p className='text-red-500'>Erreur : {error}</p>}

      {modificationDetected !== null && (
        <p className='text-sm'>
          {modificationDetected
            ? '✔️ Modifications détectées et enregistrées.'
            : '✅ Aucune modification détectée. Spécifications déjà cohérentes.'}
        </p>
      )}

      {results != null && (
        <div className='mt-6'>
          <h3 className='text-lg font-semibold mb-2'>Résultat de la vérification :</h3>
          <div className='bg-zinc-900 text-green-300 rounded-lg p-4 text-sm font-mono overflow-auto max-h-[600px] whitespace-pre-wrap border border-zinc-700 shadow'>
            <code>
              {JSON.stringify(results, null, 2)}
            </code>
          </div>
        </div>
      )}
    </div>
  )
}
