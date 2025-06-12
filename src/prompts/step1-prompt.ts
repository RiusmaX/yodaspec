// Fonction de modèle pour générer le prompt des spécifications du projet
// Prend les données du formulaire et retourne un prompt structuré pour la génération par l'IA
export const step1Prompt = (
  formData: {
    current_situation: string
    problematic: string
    goal: string
    actors: string
    target_users: string
    scope_included: string
    scope_excluded: string
  }
): string => `
Tu es un assistant spécialisé dans la rédaction de cahiers des charges.
Voici les informations structurées du projet :
Contexte :
- Situation actuelle : ${formData.current_situation}
- Problématique : ${formData.problematic}
- Objectif : ${formData.goal}
Acteurs du projet : ${formData.actors}
Utilisateurs cibles : ${formData.target_users}
Portée du projet :
- Inclus : ${formData.scope_included}
- Exclus : ${formData.scope_excluded}
À partir de ces informations :
1. Rédige l'introduction complète et professionnelle du cahier des charges comme si tu étais l'utilisateur qui présentait son projet (donc en utilisant "nous", "notre", etc.).
2. Structure l'introduction avec des titres de différents niveaux représentant les différents éléments pour une meilleure lisibilité.
3. Organise le contenu selon les sections suivantes :
   - Introduction générale (présentation brève du projet)
   - Contexte et enjeux
     * Situation actuelle
     * Problématique
     * Objectifs
   - Présentation des acteurs (sous forme de liste structurée)
   - Public cible (sous forme de liste structurée)
   - Périmètre du projet
     * Fonctionnalités incluses
     * Éléments hors périmètre
4. Reformate les acteurs et utilisateurs sous forme de liste propre pour qu'elle soit claire et structurée.
5. Utilise un ton professionnel mais personnel, comme si tu rédigeais ton propre projet.
6. Limite l'utilisation des listes à puces pour que le texte reste fluide et agréable à lire, mais utilise-les pour les sections où c'est pertinent.
7. Le tout doit être cohérent, bien structurée, inclure tous les éléments fournis et ne surtout pas être bateau (vocabulaire, syntaxe, etc.).
Format de réponse attendu en JSON :
{
  "final_introduction": "# Introduction\n\n[Ton texte avec formatage Markdown pour les titres et listes...]"
}
`
