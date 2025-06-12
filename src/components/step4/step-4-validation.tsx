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
        <div className='mt-6 space-y-6'>
          <h3 className='text-lg font-semibold'>Résultat de la vérification :</h3>

          {results.map((spec, index) => (
            <div
              key={index}
              className='bg-white rounded-lg shadow border border-gray-200 p-4 space-y-2'
            >
              <div className='flex items-center justify-between'>
                <h4 className='text-md text-black font-bold'>{spec.titreSpec}</h4>
                {spec.is_modified && (
                  <span className='bg-yellow-100 text-yellow-800 text-xs font-medium px-2.5 py-0.5 rounded-full'>
                    ✏️ Modifiée par IA
                  </span>
                )}
              </div>

              <p className='text-sm text-gray-600'>
                <span className='font-semibold'>Contexte :</span> {spec.contexte}
              </p>
              <p className='text-sm text-gray-600'>
                <span className='font-semibold'>Objectifs :</span> {spec.objectifs}
              </p>

              <div className='grid grid-cols-2 gap-4 mt-2'>
                <div>
                  <p className='text-xs text-gray-500 font-semibold mb-1'>Préconditions</p>
                  <ul className='list-disc list-inside text-sm text-gray-700'>
                    {Array.isArray(spec.preConditions)
                      ? spec.preConditions.map((item, i) => (
                        <li key={i}>{item}</li>
                      ))
                      : spec.preConditions}
                  </ul>
                </div>
                <div>
                  <p className='text-xs text-gray-500 font-semibold mb-1'>Étapes du flux</p>
                  <ul className='list-disc list-inside text-sm text-gray-700'>
                    {spec.etapesFlux?.map((item, i) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                </div>

                <div>
                  <p className='text-xs text-gray-500 font-semibold mb-1'>Scénarios d’erreurs</p>
                  <ul className='list-disc list-inside text-sm text-red-600'>
                    {spec.scenariosErreurs?.map((item, i) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                </div>

                <div>
                  <p className='text-xs text-gray-500 font-semibold mb-1'>Règles de gestion</p>
                  <ul className='list-disc list-inside text-sm text-gray-700'>
                    {spec.reglesGestion?.map((item, i) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                </div>
              </div>

              <p className='text-sm text-gray-600'>
                <span className='font-semibold'>Postcondition :</span> {spec.postCondition}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
