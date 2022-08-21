import CartContext from '../../context/CartContext'
import './index.css'

const CartSummary = () => (
  <CartContext.Consumer>
    {value => {
      const {cartList} = value
      let totalOrderAmount = 0
      cartList.forEach(cartItem => {
        totalOrderAmount += cartItem.quantity * cartItem.price
      })

      const cartItemsQuantity = cartList.length

      return (
        <div className="cart-summary-main-container">
          <h1 className="order-total-tex">
            Order Total:
            <span className="amount-text">{` ${totalOrderAmount}/-`}</span>
          </h1>
          <p className="items-quantity-text">{`${cartItemsQuantity} Items in cart`}</p>
          <div className="check-out-button-container">
            <button type="button" className="check-out-button">
              Checkout
            </button>
          </div>
        </div>
      )
    }}
  </CartContext.Consumer>
)

export default CartSummary
