export const similarSpecsPrompt = (specs: any[]): string => `
Tu es un assistant spécialisé dans l’analyse des spécifications fonctionnelles.

Voici la liste des spécifications à analyser :
\`\`\`json
${JSON.stringify(specs, null, 2)}
\`\`\`

Pour chaque spécification :

- Compare son contenu (notamment les champs \`titreSpec\`, \`objectifs\` et \`description\`) avec les autres spécifications.
- Si certaines spécifications sont très similaires, ajoute une clé \`similar_to\` contenant un tableau des \`titreSpec\` des autres spécifications jugées similaires.
- Si aucune similarité n’est détectée, la clé \`similar_to\` doit être un tableau vide \`[]\`.

⚠️ Ne modifie aucune autre donnée.
Retourne uniquement le tableau mis à jour avec la clé \`similar_to\` présente dans chaque spécification.
`;
