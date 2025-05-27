
export const matchFeaturesPrompt = (
  features: Array<{ title: string, description: string }>,
  specs: any[]
): string => `
Tu es un assistant intelligent chargé de lier des spécifications à des fonctionnalités.

Voici la liste des fonctionnalités du projet :
\`\`\`json
${JSON.stringify(features, null, 2)}
\`\`\`

Voici les spécifications à analyser :
\`\`\`json
${JSON.stringify(specs, null, 2)}
\`\`\`

Pour chaque spécification :

- Compare son contenu (titre, description, objectifs, etc.) aux fonctionnalités listées ci-dessus.
- Ajoute une clé \`matched_features\`, un tableau contenant les titres des fonctionnalités que cette spécification couvre.
- Si aucune correspondance n’est trouvée, mets un tableau vide \`[]\`.

Ne supprime rien du contenu d'origine. Retourne le tableau mis à jour avec la clé \`matched_features\` ajoutée à chaque objet.
`
