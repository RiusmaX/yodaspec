export const data = [
  {
    Name: 'Account Creation',
    Description: 'Ability to create an account upon arriving on the site',
    Goal: 'Allow users to create an account upon arriving on the site',
    Success_Condition: 'The user accesses their personal space',
    Actors: ['Customer', 'Administrator'],
    Preconditions: [
      'The user must not have an account linked to their email address'
    ],
    Main_Flow_Steps: [
      "The user clicks on the 'Create an account' button",
      'The user is redirected to the account creation page',
      'The user fills in their information in the corresponding fields',
      'The user submits the form'
    ],
    Postconditions: [
      'The user is redirected to their account',
      'The user receives an email to confirm their email address'
    ],
    Alternative_Scenarios: [
      {
        Name: 'The email address is already in use',
        Description: 'The user entered an email address that already exists in the system',
        Expected_Result: [
          'An error message is displayed',
          'The email field is highlighted with a red border'
        ]
      }
    ]
  },
  {
    Name: 'Login',
    Description: 'Ability for users who already have an account to log in',
    Goal: 'Allow the user to log in to their account',
    Success_Condition: 'The user is logged into their account',
    Actors: ['Customer'],
    Preconditions: [],
    Main_Flow_Steps: [
      "The user clicks on the 'Log in' button",
      'The user is redirected to the login page',
      'The user enters their credentials',
      "The user clicks the 'Log in' button"
    ],
    Postconditions: [
      'The user is redirected to their user area'
    ],
    Alternative_Scenarios: []
  }
]
