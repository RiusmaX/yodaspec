// types/interfaces.ts
import { Types } from 'mongoose'

export interface IStep3 {
  _id?: Types.ObjectId
  id: string
  titreSpec: string
  contexte: string
  objectifs: string
  acteurs: string
  description: string
  conditionsSucces: string
  preConditions: string[]
  etapesFlux: string[]
  scenariosErreurs: string[]
  scenariosAlternatifs: string
  reglesGestion: string[]
  interfaceUxUi: string
  casTests: string[]
  postCondition: string[]
  status: string
}

export interface IProject {
  _id?: Types.ObjectId
  title: string
  description?: string
  step2?: {
    features: Array<{
      relatedTo: Types.ObjectId | string
    }>
  }
  step3?: IStep3[]
}
