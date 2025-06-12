import { IFeature } from '@/types/interfaces'
import { unparse } from 'papaparse'
import * as XLSX from 'xlsx'
// import sendEmail from '../resend'

export const ProjectCSV = async (features: IFeature[]): Promise<void> => {
  const rows = features.flatMap(feature => {
    const scenarios = feature['Alternative Scenario']
    return (scenarios.length > 0 ? scenarios : [null]).map((scenario) => ({
      Nom: feature.Name,
      Description: feature.Description,
      Objectifs: feature.Objective,
      'Conditione succès': feature['Success Conditions'],
      Acteurs: (feature.Actors ?? []).join(', '),
      Preconditions: (feature.Preconditions ?? []).join(', '),
      'Etapes de flux': (feature['Flow Steps'] ?? []).join(', '),
      Postconditions: (feature.Postconditions ?? []).join(', '),
      'Scénario alternatif - Nom': scenario?.Name ?? '',
      'Scénario alternatif - Description': scenario?.Description ?? '',
      'Scénario alternatif - Résultat attendu': scenario?.['Expected Result']?.join(', ') ?? ''
    }))
  })

  const csv = unparse(rows)
  const blob = new Blob(['\uFEFF', csv], { type: 'text/csv;charset=utf-8;' })
  const url = URL.createObjectURL(blob)

  const date = new Date().toISOString().split('T')[0]
  const filename = `features-[${date}].csv`

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
  XLSX.utils.book_append_sheet(workbook, worker, 'Features')
  XLSX.writeFile(workbook, `features-[${date}].xlsx`)

  // Appel email (pas de pièce jointe encore ici)
  // await sendEmail()
}