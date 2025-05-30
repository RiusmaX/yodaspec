export interface IProject {
  _id?: string
  title: string
  description: string
  createAt?: Date
  updateAt?: Date
}

export interface IAlternativeScenario {
  Name: string
  Description: string
  Expected_Result: string[]
}

export interface Ifeature {
  _id?: string
  Name: string
  Description: string
  Goal: string
  Success_Condition: string
  Actors: string[]
  Preconditions: string[]
  Main_Flow_Steps: string[]
  Postconditions: string[]
  Alternative_Scenarios: IAlternativeScenario[]
  // Update to match your database - can be string or ObjectId
  idProject: string | import('mongoose').Types.ObjectId
}
