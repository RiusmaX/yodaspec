export interface IProject {
  _id?: string
  title: string
  description: string
  step1?: Step1 // idée brute + questions
  step2?: Step2
  step3?: Step3
  step4?: object // à définir
  step5?: object // à définir
  step6?: object // à définir
  createdAt?: Date
  updatedAt?: Date
}

export interface Step1 {
  enrichedPrompt: string // Contexte enrichi du projet

}
export interface Step2 {
  features: Feature[] // Liste validée par l’humain après découpage
}
export interface Step3 {
  specs: Spec[] // Les spécifications à valider et enrichir
}
export interface IaCheckInput {
  features: string[] // ex : ["Créer tâche", "Supprimer tâche"]
  specs: any[] // ex : tableau d’objets de specs (mock ou réel)
}

export interface IaCheckResult {
  promptUsed: string // Le texte exact envoyé à l’IA
  response: string // La réponse brute de l’IA
}

export interface Feature {
  title: string
  description: string
}

export interface Spec {
  titre: string
  description: string
  [key: string]: any // pour permettre des champs enrichis (matched_features, etc.)
}

export interface EnrichedSpec extends any {
  matched_features: string[]
}

export interface CheckPrompt {
  label: string
  type: 'text' | 'json'
  template: (features: any, specs: any, enrichedPrompt?: string) => string
}

export interface enrichedContext {
  title: string
  text: string
}
