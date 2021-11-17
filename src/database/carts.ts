interface Cart {
  userLogin: string
  items: CartItem[]
}

interface CartItem {
  productId: string // id för den produkt som refereras till
  amount: number // antal produkter av den sorten
}

export const cartsDb: Cart[] = [
  { userLogin: 'bananpaj', items: [{ productId: '1', amount: 1 }] },
  { userLogin: 'grillkorv', items: [{ productId: '3', amount: 2 }] },
  {
    userLogin: 'paco',
    items: [
      { productId: '2', amount: 1 },
      { productId: '1', amount: 3 },
    ],
  },
]
