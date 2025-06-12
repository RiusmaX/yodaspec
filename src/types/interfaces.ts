export interface ClientFeature {
  feature: string // Nom de la fonctionnalité
  description: string
  _id: string
}
export interface IFeature {
  feature: string // Nom de la fonctionnalité (correspond à Gemini)
  description: string // Description (correspond à Gemini)
  createdAt?: Date
  updatedAt?: Date
}

export interface IProject {
  _id?: string
  title: string
  description: string
  step1?: {
    current_situation?: string
    problematic?: string
    goal?: string
    actors?: string
    target_users?: string
    scope_included?: string
    scope_excluded?: string
    final_introduction?: string
  }
  features?: IFeature[]
  createdAt?: Date
  updatedAt?: Date
}
