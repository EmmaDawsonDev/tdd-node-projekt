import { usersDb, IUser } from './users'
import { productsDb, IProduct } from './products'
import { cartsDb, ICart, ICartItem } from './carts'

// USERS

export const getAllUsers = () => {
  return usersDb
}

export const getUserById = (id: string) => {
  const user = usersDb.find(user => user.login === id)

  return user
}

export const createUser = (user: IUser) => {
  usersDb.push(user)
}

export const deleteUser = (id: string) => {
  const index = usersDb.findIndex(user => user.login === id)

  if (index >= 0) {
    usersDb.splice(index, 1)
    
    return true
  } else {
    return false
  }
}

// PRODUCTS

export const getAllProducts = () => {
  return productsDb
}

export const getProductById = (id: string) => {
  const product = productsDb.find(product => product.id === id)

  return product
}

export const createProduct = (product: IProduct) => {
  productsDb.push(product)
}

export const updateProduct = (id: string, update: IProduct) => {
  const index = productsDb.findIndex(product => product.id === id)

  if (index >= 0) {
    productsDb.splice(index, 1, update)
    return true
  } else {
    return false
  }
}

export const deleteProduct = (id: string) => {
  const index = productsDb.findIndex(product => product.id === id)

  if (index >= 0) {
    productsDb.splice(index, 1)
   return true
  } else {
    return false
  }

}

// CARTS

export const getCartById = (id: string) => {
  const cart: ICart | undefined = cartsDb.find(cart => cart.userLogin === id)

  return cart
}

export const createCart = (cart: ICart) => {
  cartsDb.push(cart)
}

export const updateCart = (itemToUpdate: ICartItem, updatedAmount: number) => {
  itemToUpdate.amount += updatedAmount
}