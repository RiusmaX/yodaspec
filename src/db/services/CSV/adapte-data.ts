
import { Ifeature, IAlternativeScenario } from '@/types/interfaces'

const adaptData = (rawData: any[]): Ifeature[] => {
  return rawData.map(d => ({
    Name: d.Name,
    Description: d.Description,
    Goal: d.Goal,
    Success_Condition: d.Success_Condition,
    Actors: d.Actors,
    Preconditions: d.Preconditions,
    Main_Flow_Steps: d.Main_Flow_Steps,
    Postconditions: d.Postconditions,
    Alternative_Scenarios: (d.Alternative_Scenarios ?? []).map((s: any): IAlternativeScenario => ({
      Name: s.Name,
      Description: s.Description,
      Expected_Result: s.Expected_Result
    })),
    idProject: d.idProject
  }))
}

export { adaptData }
