export const verifySpecStructurePrompt = (
  specs: any[]
): string => `
Tu es un assistant spécialisé dans la validation de la structure des spécifications fonctionnelles.

Voici la liste des spécifications à analyser :
\`\`\`json
${JSON.stringify(specs, null, 2)}
\`\`\`

Pour chaque spécification :

- Vérifie que toutes les sections fonctionnelles attendues sont bien présentes, remplies et cohérentes : 
  \`titreSpec\`, \`contexte\`, \`objectifs\`, \`acteurs\`, \`description\`, \`conditionsSucces\`, \`preConditions\`, \`etapesFlux\`, \`scenariosErreurs\`, \`scenariosAlternatifs\`, \`reglesGestion\`, \`interfaceUxUi\`, \`casTests\`, \`postCondition\`, \`status\`.
- Ajoute une clé \`structure_valid\` avec la valeur \`true\` si la structure est complète et cohérente, sinon \`false\`.
- Ajoute une clé \`structure_errors\` qui contient un tableau des champs manquants, incohérents ou vides. Si tout est valide, le tableau sera vide \`[]\`.

⚠️ Ne modifie pas les autres champs existants.
Retourne uniquement le tableau mis à jour avec les nouvelles clés ajoutées à chaque spec.
`;
