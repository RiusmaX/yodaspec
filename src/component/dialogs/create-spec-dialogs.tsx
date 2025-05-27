'use client'

import { JSX, useState } from 'react'
import { IStep3 } from '@/types/interfaces'

interface Props {
  projectId: string
}

export default function CreateSpecDialog ({ projectId }: Props): JSX.Element {
  const [spec, setSpec] = useState<IStep3>({
    id: '',
    titreSpec: '',
    contexte: '',
    objectifs: '',
    acteurs: '',
    description: '',
    conditionsSucces: '',
    preConditions: '',
    etapesFlux: '',
    scenariosErreurs: '',
    scenariosAlternatifs: '',
    reglesGestion: '',
    interfaceUxUi: '',
    casTests: '',
    postCondition: '',
    status: 'draft'
  })

  const handleChange = (field: keyof IStep3, value: string): void => {
    setSpec((prev: any) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (): Promise<void> => {
    try {
      const res = await fetch('/api/specs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ projectId, spec })
      })

      if (!res.ok) {
        const err = await res.json()
        console.error('Erreur:', err.error)
        return
      }

      const data = await res.json()
      console.log('Spécification ajoutée avec succès', data)
      alert('Spécification enregistrée avec succès !')
    } catch (error) {
      console.error('Erreur requête:', error)
    }
  }

  return (
    <div className='flex flex-col gap-4 border rounded-lg p-6 shadow-md w-full max-w-4xl'>
      <h2 className='text-xl font-bold'>Nouvelle Spécification</h2>

      {Object.entries(spec).map(([key, value]) => {
        if (key === 'id' || key === 'status') return null
        return (
          <div key={key} className='flex flex-col gap-1'>
            <label htmlFor={key} className='capitalize text-sm font-semibold'>{key}</label>
            <textarea
              id={key}
              value={value as string | number | readonly string[] | undefined}
              onChange={e => handleChange(key as keyof IStep3, e.target.value)}
              className='border p-2 rounded'
              rows={key.length > 12 ? 4 : 2}
            />
          </div>
        )
      })}

      <button
        onClick={(e) => { void handleSubmit() }}
        className='bg-blue-600 text-white px-4 py-2 rounded mt-4 self-start'
      >
        Enregistrer la spécification
      </button>
    </div>
  )
}
