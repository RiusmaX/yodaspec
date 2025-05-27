// Import de l'interface décrivant la structure des données à exporter
import { ISpecificationExport } from '@/types/interfaces'

// Import de la fonction `unparse` de la librairie papaparse pour convertir des objets JS en CSV
import { unparse } from 'papaparse'
// Fonction d'export CSV prenant un tableau d'objets au format ISpecificationExport
export const ProjectCSV = (projects: ISpecificationExport[]): void => {
  // Affichage en console des données reçues (utile pour débogage)
  console.log('Projects reçus pour export CSV :', projects)
  // Transformation des données en lignes de CSV
  const rows = projects.flatMap(project => {
    // Récupération des scénarios alternatifs du projet
    const scenarios = project['Scénario alternatif']
    // Si le projet a des scénarios, on crée une ligne par scénario
    // Sinon, on crée une seule ligne avec les données du projet et des champs vides pour le scénario
    return (scenarios.length > 0 ? scenarios : [null]).map((scenario) => ({
      Nom: project.Nom, // Nom du projet
      Description: project.Description, // Description du projet
      Objectifs: project.Objectifs, // Objectif(s) du projet
      'Conditione succès': project['Conditione succès'], // Condition de succès du projet
      Acteurs: (project.Acteurs ?? []).join(', '), // Liste des acteurs séparés par des virgules
      Preconditions: (project.Preconditions ?? []).join(', '), // Liste des préconditions séparées par des virgules
      'Etapes de flux': (project['Etapes de flux'] ?? []).join(', '), // Étapes de flux séparées par des virgules
      Postconditions: (project.Postconditions ?? []).join(', '), // Postconditions séparées par des virgules
      // Données du scénario alternatif (ou vides si aucun scénario)
      'Scénario alternatif - Nom': scenario?.Nom ?? '',
      'Scénario alternatif - Description': scenario?.Description ?? '',
      'Scénario alternatif - Résultat attendu': scenario?.['Résultat attendu']?.join(', ') ?? ''
    }))
  })
  // Conversion des objets JavaScript en chaîne CSV
  const csv = unparse(rows)

  // Création d’un blob contenant le CSV (type MIME texte/csv)
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })

  // Création d’une URL temporaire pour le blob
  const url = URL.createObjectURL(blob)

  // Création d’un lien <a> pour simuler le téléchargement
  const link = document.createElement('a')
  link.href = url
  link.setAttribute('download', 'projects.csv') // Nom du fichier téléchargé

  // Ajout du lien à la page et clic automatique
  document.body.appendChild(link)
  link.click()

  // Nettoyage : suppression du lien et libération de l'URL
  document.body.removeChild(link)
  URL.revokeObjectURL(url)
}
