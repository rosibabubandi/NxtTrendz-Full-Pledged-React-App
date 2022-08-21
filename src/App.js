import {Component} from 'react'
import {Route, Switch, Redirect} from 'react-router-dom'

import LoginForm from './components/LoginForm'
import Home from './components/Home'
import Products from './components/Products'
import ProductItemDetails from './components/ProductItemDetails'
import Cart from './components/Cart'
import NotFound from './components/NotFound'
import ProtectedRoute from './components/ProtectedRoute'
import CartContext from './context/CartContext'

import './App.css'

class App extends Component {
  state = {
    cartList: [],
  }

  //   TODO: Add your code for remove all cart items, increment cart item quantity, decrement cart item quantity, remove cart item

  addCartItem = product => {
    //   TODO: Update the code here to implement addCartItem
    const {id} = product
    const {cartList} = this.state

    const checkingCartItemExist = cartList.find(cartItem => {
      if (cartItem.id === id) {
        return true
      }
      return false
    })
    if (checkingCartItemExist === undefined) {
      this.setState(prevState => ({cartList: [...prevState.cartList, product]}))
    } else {
      const additionalQuantity = product.quantity

      const addedOnlyQuantity = cartList.map(cartItem => {
        if (cartItem.id === id) {
          return {...cartItem, quantity: cartItem.quantity + additionalQuantity}
        }
        return cartItem
      })
      this.setState({cartList: addedOnlyQuantity})
    }
  }

  removeAllCartItems = () => {
    this.setState({cartList: []})
  }

  removeCartItem = id => {
    const {cartList} = this.state
    const removedCartList = cartList.filter(cartItem => cartItem.id !== id)

    this.setState({cartList: removedCartList})
  }

  incrementCartItemQuantity = id => {
    const {cartList} = this.state
    const quantityIncrementedList = cartList.map(cartItem => {
      if (cartItem.id === id) {
        return {...cartItem, quantity: cartItem.quantity + 1}
      }
      return cartItem
    })

    this.setState({cartList: quantityIncrementedList})
  }

  decrementCartItemQuantity = (id, quantity) => {
    const {cartList} = this.state

    if (quantity <= 1) {
      const removedCartList = cartList.filter(cartItem => cartItem.id !== id)

      this.setState({cartList: removedCartList})
    } else {
      const quantityDeletedList = cartList.map(cartItem => {
        if (cartItem.id === id && cartItem.quantity === quantity) {
          return {...cartItem, quantity: cartItem.quantity - 1}
        }
        return cartItem
      })

      this.setState({cartList: quantityDeletedList})
    }
  }

  render() {
    const {cartList} = this.state

    return (
      <CartContext.Provider
        value={{
          cartList,
          addCartItem: this.addCartItem,
          removeCartItem: this.removeCartItem,
          removeAllCartItems: this.removeAllCartItems,
          incrementCartItemQuantity: this.incrementCartItemQuantity,
          decrementCartItemQuantity: this.decrementCartItemQuantity,
        }}
      >
        <Switch>
          <Route exact path="/login" component={LoginForm} />
          <ProtectedRoute exact path="/" component={Home} />
          <ProtectedRoute exact path="/products" component={Products} />
          <ProtectedRoute
            exact
            path="/products/:id"
            component={ProductItemDetails}
          />
          <ProtectedRoute exact path="/cart" component={Cart} />
          <Route path="/not-found" component={NotFound} />
          <Redirect to="not-found" />
        </Switch>
      </CartContext.Provider>
    )
  }
}

export default App
