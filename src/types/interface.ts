export interface IProject {
  _id?: string
  title: string
  description: string
  step1?: object
  step2?: object
  step3?: object
  step4?: object
  step5?: object
  step6?: object
  createdAt?: Date
  updatedAt?: Date

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
