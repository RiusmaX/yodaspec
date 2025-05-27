export const CheckContextPrompt = (enriched: string, specs: any[]): string => `
Tu es un expert en validation de spécifications fonctionnelles.

Voici le contexte global du projet :
\`\`\`
${enriched}
\`\`\`

Voici les spécifications à analyser :
\`\`\`json
${JSON.stringify(specs, null, 2)}
\`\`\`

Ta mission est d'analyser chaque spécification ci-dessus. Pour chaque objet :

- Vérifie si le contenu est cohérent avec le contexte global du projet.
- Ajoute une clé 'valid_context' avec la valeur 'true' ou 'false'.
- Ajoute une clé 'is_modified' :
  - 'true' si tu modifies du contenu pour le rendre cohérent avec le contexte global,
  - sinon 'false'.

Tu dois retourner le tableau mis à jour, avec le **même format de base**, incluant ces deux clés **obligatoires** dans chaque objet.
`
