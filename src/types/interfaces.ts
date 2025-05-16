export interface ISpecification {
  id: string
  titreSpec: string
  contexte: string
  objectifs: string
  acteurs: string
  description: string
  conditionsSucces: string
  preConditions: string
  etapesFlux: string
  scenariosErreurs: string
  scenariosAlternatifs: string
  reglesGestion: string
  interfaceUxUi: string
  casTests: string
  postCondition: string
  status: string
}

export interface IProject {
  title: string
  description?: string
  step2: {
    features: Array<{
      relatedTo: string
    }>
  }
  step3: ISpecification[]
}
