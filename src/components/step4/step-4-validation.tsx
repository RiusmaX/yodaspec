'use client'

import { useState } from 'react'
import { runAllIaChecks } from '@/db/services/check-services'
import { ValidatedSpec } from '@/types/interface'

export default async function Step4Validation ({
  projectId
}: {
  projectId: string

}): Promise<React.ReactElement> {
  const [loading, setLoading] = useState(false)
  const [results, setResults] = useState<ValidatedSpec[] | null>(null)
  const [error, setError] = useState<string | null>(null)

  const handleRunChecks = async (): Promise<void> => {
    setLoading(true)
    setError(null)
    try {
      const res = await runAllIaChecks(projectId)
      setResults(res)
    } catch (err: any) {
      setError(
        typeof err === 'object' && err !== null && 'message' in err && typeof (err as { message?: unknown }).message === 'string'
          ? (err as { message: string }).message
          : 'Erreur inconnue'
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

      {error == null && <p className='text-red-500'>Erreur : {error}</p>}

      {(results != null) && (
        <div>
          <h3 className='text-lg font-semibold mt-4'>Résultat de la vérification :</h3>
          <pre className='bg-gray-100 p-4 rounded text-sm max-h-[500px] overflow-y-auto'>
            {JSON.stringify(results, null, 2)}
          </pre>
        </div>
      )}
    </div>
  )
}
