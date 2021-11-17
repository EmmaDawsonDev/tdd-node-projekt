interface User {
  name: string // användarens namn
  login: string // unikt värde, används vid inloggning
}

export const userDb: User[] = [
  {
    name: 'Pelle',
    login: 'grillkorv',
  },
  {
    name: 'Emma',
    login: 'bananpaj',
  },
  {
    name: 'Renzo',
    login: 'paco',
  },
]
