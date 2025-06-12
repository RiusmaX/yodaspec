
import { IFeature, IStage } from '@/types/interfaces'

const adaptData = (rawData: any[]): IFeature[] => {
  return rawData.map(d => ({
    Name: d.Name,
    Description: d.Description,
    Objective: d.Goal, // Changé de Goal à Objective
    'Success Conditions': d.Success_Condition, // Changé de Success_Condition à 'Success Conditions'
    Actors: d.Actors,
    Preconditions: d.Preconditions,
    'Flow Steps': d.Main_Flow_Steps, // Changé de Main_Flow_Steps à 'Flow Steps'
    Postconditions: d.Postconditions,
    'Alternative Scenario': (d.Alternative_Scenarios ?? []).map((s: any): IStage => ({
      Name: s.Name,
      Description: s.Description,
      'Expected Result': s.Expected_Result // Changé de Expected_Result à 'Expected Result'
    }))
    // Suppression de idProject car il n'existe pas dans l'interface IFeature
  }))
}
export { adaptData }
