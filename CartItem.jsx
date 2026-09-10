import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { addItem, removeItem, updateQuantity } from "./CartSlice";

const CartItem = ({ onContinueShopping }) => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart?.items || []);

  const getPrice = (item) => {
    const value = item.price ?? item.cost ?? 0;
    return Number(String(value).replace(/[^0-9.]/g, "")) || 0;
  };

  const totalPlants = cart.reduce(
    (total, item) => total + Number(item.quantity || 0),
    0
  );

  const totalCost = cart.reduce(
    (total, item) => total + getPrice(item) * Number(item.quantity || 0),
    0
  );

  const handleIncrease = (item) => {
    dispatch(addItem(item));
  };

  const handleDecrease = (item) => {
    const quantity = Number(item.quantity || 0);

    if (quantity > 1) {
      dispatch(updateQuantity({ id: item.id, quantity: quantity - 1 }));
    } else {
      dispatch(removeItem(item.id));
    }
  };

  const handleDelete = (item) => {
    dispatch(removeItem(item.id));
  };

  const handleContinueShopping = () => {
    if (typeof onContinueShopping === "function") {
      onContinueShopping();
      return;
    }

    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleCheckout = () => {
    alert("Coming Soon");
  };

  return (
    <main className="cart-container" aria-label="Shopping Cart">
      <header className="cart-header">
        <h1>Shopping Cart</h1>
        <p>
          Total number of plants: <strong>{totalPlants}</strong>
        </p>
        <h2>Total Cart Amount: ${totalCost.toFixed(2)}</h2>
      </header>

      {cart.length === 0 ? (
        <section className="empty-cart">
          <h2>Your cart is empty</h2>
          <p>Add plants from the product listing to see them here.</p>
        </section>
      ) : (
        <section className="cart-items" aria-label="Cart items">
          {cart.map((item) => {
            const unitPrice = getPrice(item);
            const itemTotal = unitPrice * Number(item.quantity || 0);

            return (
              <article className="cart-item" key={item.id ?? item.name}>
                <img
                  className="cart-item-image"
                  src={item.image}
                  alt={item.name}
                />

                <div className="cart-item-details">
                  <h2>{item.name}</h2>
                  {item.category && <p>{item.category}</p>}
                  <p className="cart-item-cost">
                    Unit Price: ${unitPrice.toFixed(2)}
                  </p>

                  <div
                    className="cart-item-quantity"
                    aria-label={`${item.name} quantity controls`}
                  >
                    <button
                      type="button"
                      className="cart-item-button cart-item-button-dec"
                      onClick={() => handleDecrease(item)}
                      aria-label={`Decrease ${item.name} quantity`}
                    >
                      −
                    </button>

                    <span className="cart-item-quantity-value">
                      {item.quantity}
                    </span>

                    <button
                      type="button"
                      className="cart-item-button cart-item-button-inc"
                      onClick={() => handleIncrease(item)}
                      aria-label={`Increase ${item.name} quantity`}
                    >
                      +
                    </button>
                  </div>

                  <p className="cart-item-total">
                    Total: ${itemTotal.toFixed(2)}
                  </p>

                  <button
                    type="button"
                    className="cart-item-delete"
                    onClick={() => handleDelete(item)}
                  >
                    Delete
                  </button>
                </div>
              </article>
            );
          })}
        </section>
      )}

      <section className="cart-actions" aria-label="Cart actions">
        <button
          type="button"
          className="continue-shopping-button"
          onClick={handleContinueShopping}
        >
          Continue Shopping
        </button>

        <button
          type="button"
          className="checkout-button"
          onClick={handleCheckout}
        >
          Checkout
        </button>
      </section>
    </main>
  );
};

export default CartItem;
