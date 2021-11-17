export interface IUser {
  name: string // användarens namn
  login: string // unikt värde, används vid inloggning
}

export const usersDb: IUser[] = [
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
