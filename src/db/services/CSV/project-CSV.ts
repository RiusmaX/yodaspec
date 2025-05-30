
import { Ifeature } from '@/types/interfaces'
import { unparse } from 'papaparse'

export const ProjectCSV = (projects: Ifeature[]): void => {
  const rows = projects.flatMap(project => {
    const scenarios = project.Alternative_Scenarios
    return (scenarios.length > 0 ? scenarios : [null]).map((scenario) => ({
      Nom: project.Name,
      Description: project.Description,
      Objectifs: project.Goal,
      'Conditione succès': project.Success_Condition,
      Acteurs: (project.Actors ?? []).join(', '),
      Preconditions: (project.Preconditions ?? []).join(', '),
      'Etapes de flux': (project.Main_Flow_Steps ?? []).join(', '),
      Postconditions: (project.Postconditions ?? []).join(', '),
      'Scénario alternatif - Nom': scenario?.Name ?? '',
      'Scénario alternatif - Description': scenario?.Description ?? '',
      'Scénario alternatif - Résultat attendu': scenario?.Expected_Result?.join(', ') ?? ''
    }))
  })

  const csv = unparse(rows)
  // const BOM = '\uFEFF'
  // const blob = new Blob([BOM, csv], { type: 'text/csv;charset=utf-8;' })
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.setAttribute('download', 'projects.csv')
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  URL.revokeObjectURL(url)
}
