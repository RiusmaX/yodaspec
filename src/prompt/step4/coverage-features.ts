export const coverageFeaturesPrompt = (
  features: { title: string; description: string }[],
  specs: any[]
): string => `
Tu es un assistant intelligent en vérification de couverture fonctionnelle.

Voici la liste des fonctionnalités du projet :
\`\`\`json
${JSON.stringify(features, null, 2)}
\`\`\`

Voici les spécifications existantes, incluant les correspondances précédemment identifiées (\`matched_features\`) :
\`\`\`json
${JSON.stringify(specs, null, 2)}
\`\`\`

Pour chaque fonctionnalité :

- Vérifie si elle est bien couverte par au moins une spécification via la clé \`matched_features\`.
- Si elle est couverte, ajoute une nouvelle clé \`covers_feature\` dans chaque spec concernée, contenant un tableau avec les titres des fonctionnalités qu'elle couvre.
- Si une spécification ne couvre aucune fonctionnalité, \`covers_feature\` doit être un tableau vide \`[]\`.
- Si la fonctionnalité n'est pas couverte par les spécifications, créer une spécification qui suit exactement le même format que les autres et l'ajouter au tableau.

⚠️ La clé \`covers_feature\` est **obligatoire** dans **chaque** spécification, même si elle est vide.
⚠️ Ne modifie ni ne supprime aucune autre donnée. Retourne uniquement le tableau mis à jour.
`;
