
import { Ifeature } from '@/types/interfaces'
import { unparse } from 'papaparse'
import * as XLSX from 'xlsx'
// import sendEmail from '../resend'

export const ProjectCSV = async (projects: Ifeature[]): Promise<void> => {
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
  const blob = new Blob(['\uFEFF', csv], { type: 'text/csv;charset=utf-8;' })
  const url = URL.createObjectURL(blob)

  const date = new Date().toISOString().split('T')[0]
  const filename = `projects-[${date}].csv`

  // Création et téléchargement CSV
  const link = document.createElement('a')
  link.href = url
  link.setAttribute('download', filename)
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  URL.revokeObjectURL(url)

  // Création fichier XLSX (écriture locale uniquement ici)
  const worker = XLSX.utils.json_to_sheet(rows)
  const workbook = XLSX.utils.book_new()
  XLSX.utils.book_append_sheet(workbook, worker, 'Projects')
  XLSX.writeFile(workbook, `projects-[${date}].xlsx`)

  // Appel email (pas de pièce jointe encore ici)
  // await sendEmail()
}
