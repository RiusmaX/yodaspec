
import { ISpecificationExport, IScenarioAlternatifExport } from '@/types/interfaces'

// Fonction qui adapte les données brutes (rawData) au format conforme à l'interface ISpecificationExport
const adaptData = (rawData: any[]): ISpecificationExport[] => {
  return rawData.map(d => ({
    // Copie directe des propriétés simples
    Nom: d.Nom,
    Description: d.Description,
    // Renommage de la clé "Objectif" en "Objectifs" pour correspondre à l'interface cible
    Objectifs: d.Objectif,
    // Renommage de la clé "Condition_de_succes" en "Conditione succès"
    'Conditione succès': d.Condition_de_succes,
    // Copie directe des tableaux
    Acteurs: d.Acteurs,
    Preconditions: d.Preconditions,
    'Etapes de flux': d.Etapes_de_flux,
    Postconditions: d.Postconditions,

    // Transformation du tableau des scénarios alternatifs en respectant l'interface IScenarioAlternatifExport
    'Scénario alternatif': (d.Scenarios_alternatifs ?? []).map((s: any): IScenarioAlternatifExport => ({
      Nom: s.Nom,
      Description: s.Description,
      'Résultat attendu': s.Resultat_attendu
    }))
  }))
}

export { adaptData }
