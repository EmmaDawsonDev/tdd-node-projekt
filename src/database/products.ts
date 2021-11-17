interface Product {
  id: string // unikt värde för varje produkt
  name: string // produktens namn
  price: number // produktens pris i SEK
}

export const productsDb: Product[] = [
  { id: '1', name: 'A book', price: 120 },
  { id: '2', name: 'A table', price: 1400 },
  { id: '3', name: 'A car', price: 150000 },
]
