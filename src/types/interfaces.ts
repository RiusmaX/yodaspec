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
  features?: IFeature[]
  createdAt?: Date
  updatedAt?: Date
}
