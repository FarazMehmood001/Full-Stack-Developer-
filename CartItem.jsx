import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { addItem, removeItem, updateQuantity } from "./CartSlice";

const CartItem = () => {
  const dispatch = useDispatch();
  const items = useSelector((state) => state.cart?.items || []);

  const increaseQuantity = (item) => {
    dispatch(addItem(item));
  };

  const decreaseQuantity = (item) => {
    if (item.quantity > 1) {
      dispatch(
        updateQuantity({
          id: item.id,
          quantity: item.quantity - 1,
        })
      );
    } else {
      dispatch(removeItem(item.id));
    }
  };

  const changeQuantity = (item, value) => {
    const quantity = Math.max(1, Number(value) || 1);
    dispatch(updateQuantity({ id: item.id, quantity }));
  };

  const cartTotal = items.reduce(
    (total, item) => total + Number(item.price) * item.quantity,
    0
  );

  return (
    <main className="shopping-cart-page">
      <div className="cart-header">
        <h1>Shopping Cart</h1>
        <p>Review your plants before checkout.</p>
      </div>

      {items.length === 0 ? (
        <section className="empty-cart">
          <h2>Your cart is empty</h2>
          <p>Add some beautiful plants from Paradise Nursery.</p>
          <button onClick={() => (window.location.href = "#products")}>
            Continue Shopping
          </button>
        </section>
      ) : (
        <section className="cart-content">
          <div className="cart-items">
            {items.map((item) => (
              <article className="cart-item" key={item.id}>
                <img src={item.image} alt={item.name} className="cart-item-image" />

                <div className="cart-item-details">
                  <h2>{item.name}</h2>
                  <p>{item.category}</p>
                  <strong>${Number(item.price).toFixed(2)}</strong>
                </div>

                <div className="quantity-controls">
                  <button
                    aria-label={`Decrease ${item.name} quantity`}
                    onClick={() => decreaseQuantity(item)}
                  >
                    −
                  </button>

                  <input
                    type="number"
                    min="1"
                    value={item.quantity}
                    onChange={(event) =>
                      changeQuantity(item, event.target.value)
                    }
                    aria-label={`${item.name} quantity`}
                  />

                  <button
                    aria-label={`Increase ${item.name} quantity`}
                    onClick={() => increaseQuantity(item)}
                  >
                    +
                  </button>
                </div>

                <div className="item-total">
                  ${(Number(item.price) * item.quantity).toFixed(2)}
                </div>

                <button
                  className="remove-item"
                  onClick={() => dispatch(removeItem(item.id))}
                >
                  Remove
                </button>
              </article>
            ))}
          </div>

          <aside className="cart-summary">
            <h2>Cart Summary</h2>
            <div className="summary-row">
              <span>Total Items</span>
              <span>{items.reduce((sum, item) => sum + item.quantity, 0)}</span>
            </div>
            <div className="summary-row total-row">
              <span>Total</span>
              <strong>${cartTotal.toFixed(2)}</strong>
            </div>

            <button
              className="continue-shopping"
              onClick={() => (window.location.href = "#products")}
            >
              Continue Shopping
            </button>

            <button
              className="checkout-button"
              onClick={() => alert("Proceeding to checkout...")}
            >
              Checkout
            </button>
          </aside>
        </section>
      )}
    </main>
  );
};

export default CartItem;
