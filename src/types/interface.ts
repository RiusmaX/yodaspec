export interface IProject {
  _id?: string
  title: string
  description: string
  step1?: string // idée brute + questions
  step2?: Feature[] // Liste des fonctionnalités
  step3?: Spec[] // Spécifications à valider
  step4?: ValidatedSpec [] // à définir
  step5?: object // à définir
  step6?: object // à définir
  createdAt?: Date
  updatedAt?: Date
}

export interface Feature {
  title: string
  description: string
}

export interface Spec {
  _id?: string
  titreSpec: string
  contexte: string
  objectifs: string
  acteurs: string[]
  description: string
  conditionsSucces: string
  preConditions: string
  etapesFlux: string[]
  scenariosErreurs: string[]
  scenariosAlternatifs: string[]
  reglesGestion: string[]
  interfaceUxUi: string
  casTests: string[]
  postCondition: string
  status: 'en cours' | 'validée' | 'brouillon'
}

export interface ValidatedSpec {
  _id?: string // Optionnel si généré par MongoDB

  // Champs de base
  titreSpec: string
  contexte: string
  objectifs: string
  acteurs: string[]
  description: string
  conditionsSucces: string
  preConditions: string
  etapesFlux: string[]
  scenariosErreurs: string[]
  scenariosAlternatifs: string[]
  reglesGestion: string[]
  interfaceUxUi: string
  casTests: string[]
  postCondition: string
  status: 'en cours' | 'validée' | 'brouillon'

  // Champs ajoutés automatiquement par les prompts
  valid_context: boolean // ✅ Prompt 1
  is_modified: boolean // ✅ Prompt 1

  matched_features: string[] // ✅ Prompt 2
  covers_feature: string[] // ✅ Prompt 3
  similar_to: string[] // ✅ Prompt 4

  structure_valid: boolean // ✅ Prompt 5
  structure_errors: string[] // ✅ Prompt 5
}
