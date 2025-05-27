import React from 'react'
import { IStep3 } from '@/types/interfaces'

interface FunctionalSpecificationsListProps {
  specifications: IStep3[]
}

const SpecificationsList: React.FC<FunctionalSpecificationsListProps> = ({ specifications }) => {
  return (
    <div className='w-full flex flex-col gap-6'>
      {specifications.map((spec, idx) => (
        <div key={idx} className='border rounded-lg p-4 shadow bg-dark '>
          <h2 className='text-xl mb-2 '>{spec.titreSpec}</h2>
          <p><strong>Contexte :</strong> {spec.contexte}</p>
          <p><strong>Objectifs :</strong> {spec.objectifs}</p>
          <p><strong>Acteurs :</strong> {spec.acteurs}</p>
          <p><strong>Description :</strong> {spec.description}</p>
          <p><strong>Conditions de succès :</strong> {spec.conditionsSucces}</p>
          <p><strong>Pré-conditions :</strong> {spec.preConditions}</p>
          <p><strong>Étapes principales :</strong> {spec.etapesFlux}</p>
          <p><strong>Scénarios d'erreur :</strong> {spec.scenariosErreurs}</p>
          <p><strong>Scénarios alternatifs :</strong> {spec.scenariosAlternatifs}</p>
          <p><strong>Règles métier :</strong> {spec.reglesGestion}</p>
          <p><strong>Interface UX/UI :</strong> {spec.interfaceUxUi}</p>
          <p><strong>Cas de test :</strong> {spec.casTests}</p>
          <p><strong>Post-condition :</strong> {spec.postCondition}</p>
          <p><strong>Statut :</strong> {spec.status}</p>
        </div>
      ))}
    </div>
  )
}

export default SpecificationsList
