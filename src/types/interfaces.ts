export interface IProject {
  _id?: string
  title: string
  description: string
  createdAt?: Date
  updatedAt?: Date
  step2: {
    features: IFeature[]
  }
}

export interface IFeature {
  _id?: string
  title: string
  description: string
  status: 'validate' | 'modified' | 'deleted'
  createdAt?: Date
  updatedAt?: Date
  step2: {
    features: IProject[]
  }
}
