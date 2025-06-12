export const dataExemple = [{
  Name: "Création d'un compte",
  Description: "Pouvoir se créer un compte a l'arrivée sur le site",
  Objective: "Pouvoir se créer un compte a l'arrivée sur le site",
  'Success Conditions': "L'utilisateur arrive sur son espace personnel",
  Actors: [
    'Client',
    'Administrateur'
  ],
  Preconditions: [
    'L\'utilisateur ne doit pas avoir de compte lié avec son adresse email'
  ],
  'Flow Steps': [
    'L\'utilisateur clique sur le bouton créer un compte',
    'L\'utilisateur est redirigé vers la page de création de compte',
    'L\'utilisateur remplis ses informations dans les champs correspondants',
    'L\'utilisateur soumet le formulaire'
  ],
  Postconditions: [
    'L\'utilisateur est redirigé vers son compte',
    'L\'utilisateur reçoit un mail pour confirmer son adresse email.'
  ],
  'Alternative Scenario': [{
    Name: 'L\'adresse email est déjà utilisée',
    Description: 'L\'utilisateur a rentré un adresse email qui existe déjà dans le système',
    'Expected Result': [
      'Une message d\'erreur s\'affiche',
      'le champs email a une bordure rouge'
    ]
  }]
}, {
  Name: 'Connexion',
  Description: 'Possibilité pour les utilisateurs qui ont déjà un compte de se connecter',
  Objective: 'Permettre à l\'utilisateur de se connecter à son compte',
  'Success Conditions': 'L\'utilisateur est connecté à son compte',
  Actors: [
    'Client'
  ],
  Preconditions: [
  ],
  'Flow Steps': [
    'L\'utilisateur clique sur le bouton se connecter',
    'L\'utilisateur est redirigé vers la page de connexion',
    'L\'utilisateur rentre ses identifiants',
    'L\'utilisateur clique sur le bouton se connecter'
  ],
  Postconditions: [
    'L\'utilisateur est redirigé vers son espace utilisateur'
  ],
  'Alternative Scenario': []
}]
