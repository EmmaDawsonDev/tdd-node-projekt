import { usersDb, IUser } from './users'
import { productsDb, IProduct } from './products'
import { cartsDb, ICart } from './carts'

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

export const updateCart = (userCart: ICart | undefined, updatedAmount: number, itemId: string) => {
  if (userCart) {
    const itemToUpdate = userCart.items.find(item => item.productId === itemId)
    if (itemToUpdate) {
      itemToUpdate.amount += updatedAmount
      return true
    } else {
      const productToBeAdded = getProductById(itemId)
      if (!productToBeAdded) {
        return false
      } else {
        userCart.items.push({ productId: itemId, amount: updatedAmount })
        return true
      }
    }
  } else {
    return false
  }
}

export const deleteCartItem = (userCart: ICart | undefined, itemId: string) => {
  if (userCart) {
    const index = userCart.items.findIndex(item => item.productId === itemId)

    if (index >= 0) {
      userCart.items.splice(index, 1)
      return { status: 200, message: 'Item removed successfully' }
    } else {
      return { status: 400, message: `Item with productId ${itemId} not found` }
    }
  } else {
    return { status: 404, message: 'User cart not found' }
  }
}