export interface IProject {
  _id?: string
  title: string
  description: string
  step5?: IFeature[]
  createdAt?: Date
  updatedAt?: Date
}

export interface IStage {
  Name: string
  Description: string
  'Expected Result': string[]
}

export interface IFeature {
  Name: string
  Description: string
  Objective: string
  'Success Conditions': string
  Actors: string[]
  Preconditions: string[]
  'Flow Steps': string[]
  Postconditions: string[]
  'Alternative Scenario': IStage[]
}
