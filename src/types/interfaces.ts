export interface IProject {
  _id?: string
  title: string
  description: string
  createAt?: Date
  updateAt?: Date
}

export interface IScenarioAlternatifExport {
  Nom: string
  Description: string
  'Résultat attendu': string[]
}
export interface ISpecificationExport {
  Nom: string
  Description: string
  Objectifs: string
  'Conditione succès': string
  Acteurs: string[]
  Preconditions: string[]
  'Etapes de flux': string[]
  Postconditions: string[]
  'Scénario alternatif': IScenarioAlternatifExport[]
}
