export const data = [
  {
    Nom: "Création d'un compte",
    Description: "Pouvoir se créer un compte à l'arrivée sur le site",
    Objectif: "Pouvoir se créer un compte à l'arrivée sur le site",
    Condition_de_succes: "L'utilisateur arrive sur son espace personnel",
    Acteurs: ['Client', 'Administrateur'],
    Preconditions: [
      "L'utilisateur ne doit pas avoir de compte lié avec son adresse email"
    ],
    Etapes_de_flux: [
      "L'utilisateur clique sur le bouton créer un compte",
      "L'utilisateur est redirigé vers la page de création de compte",
      "L'utilisateur remplit ses informations dans les champs correspondants",
      "L'utilisateur soumet le formulaire"
    ],
    Postconditions: [
      "L'utilisateur est redirigé vers son compte",
      "L'utilisateur reçoit un mail pour confirmer son adresse email."
    ],
    Scenarios_alternatifs: [
      {
        Nom: "L'adresse email est déjà utilisée",
        Description: "L'utilisateur a rentré une adresse email qui existe déjà dans le système",
        Resultat_attendu: [
          "Un message d'erreur s'affiche",
          'Le champ email a une bordure rouge'
        ]
      }
    ]
  },
  {
    Nom: 'Connexion',
    Description: 'Possibilité pour les utilisateurs qui ont déjà un compte de se connecter',
    Objectif: "Permettre à l'utilisateur de se connecter à son compte",
    Condition_de_succes: "L'utilisateur est connecté à son compte",
    Acteurs: ['Client'],
    Preconditions: [],
    Etapes_de_flux: [
      "L'utilisateur clique sur le bouton se connecter",
      "L'utilisateur est redirigé vers la page de connexion",
      "L'utilisateur rentre ses identifiants",
      "L'utilisateur clique sur le bouton se connecter"
    ],
    Postconditions: [
      "L'utilisateur est redirigé vers son espace utilisateur"
    ],
    Scenarios_alternatifs: []
  }
]
