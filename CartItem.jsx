import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { addItem, removeItem, updateQuantity } from "./CartSlice";

const products = [
  {
    id: 1,
    name: "Aloe Vera",
    category: "Medicinal",
    price: 15,
    image: "https://images.unsplash.com/photo-1509423350716-97f9360b4e09?auto=format&fit=crop&w=500&q=80",
  },
  {
    id: 2,
    name: "Snake Plant",
    category: "Indoor",
    price: 20,
    image: "https://images.unsplash.com/photo-1593482892290-f54927ae1bb7?auto=format&fit=crop&w=500&q=80",
  },
  {
    id: 3,
    name: "Peace Lily",
    category: "Indoor",
    price: 18,
    image: "https://images.unsplash.com/photo-1593691509543-c55fb32e5cee?auto=format&fit=crop&w=500&q=80",
  },
  {
    id: 4,
    name: "Rose Plant",
    category: "Outdoor",
    price: 22,
    image: "https://images.unsplash.com/photo-1496062031456-07b8f162a322?auto=format&fit=crop&w=500&q=80",
  },
];

const CartItem = () => {
  const dispatch = useDispatch();
  const items = useSelector((state) => state.cart?.items || []);

  const increaseQuantity = (item) => {
    dispatch(addItem(item));
  };

  const decreaseQuantity = (item) => {
    if (item.quantity > 1) {
      dispatch(updateQuantity({ id: item.id, quantity: item.quantity - 1 }));
    } else {
      dispatch(removeItem(item.id));
    }
  };

  const changeQuantity = (item, value) => {
    const quantity = Math.max(1, parseInt(value, 10) || 1);
    dispatch(updateQuantity({ id: item.id, quantity }));
  };

  const removeProduct = (id) => {
    dispatch(removeItem(id));
  };

  const cartTotal = items.reduce(
    (total, item) => total + Number(item.price) * Number(item.quantity),
    0
  );

  const totalItems = items.reduce(
    (total, item) => total + Number(item.quantity),
    0
  );

  const handleContinueShopping = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleCheckout = () => {
    alert("Proceeding to checkout...");
  };

  return (
    <main className="shopping-cart-page">
      <header className="cart-header">
        <h1>Shopping Cart</h1>
        <p>Review and manage your Paradise Nursery plants.</p>
      </header>

      <section className="cart-products" aria-label="Paradise Nursery products">
        <h2>Paradise Nursery Plants</h2>
        <div className="products-grid">
          {products.map((product) => (
            <article className="product-card" key={product.id}>
              <img src={product.image} alt={product.name} className="product-image" />
              <h3>{product.name}</h3>
              <p>{product.category}</p>
              <strong>${product.price.toFixed(2)}</strong>
              <button type="button" onClick={() => dispatch(addItem(product))}>
                Add to Cart
              </button>
            </article>
          ))}
        </div>
      </section>

      <section className="cart-content" aria-label="Shopping Cart">
        {items.length === 0 ? (
          <div className="empty-cart">
            <h2>Your cart is empty</h2>
            <p>Select a plant above to add it to your shopping cart.</p>
          </div>
        ) : (
          <>
            <div className="cart-items">
              {items.map((item) => (
                <article className="cart-item" key={item.id}>
                  <img src={item.image} alt={item.name} className="cart-item-image" />

                  <div className="cart-item-details">
                    <h2>{item.name}</h2>
                    <p>{item.category}</p>
                    <p>Unit Price: ${Number(item.price).toFixed(2)}</p>
                  </div>

                  <div className="quantity-controls" aria-label={`${item.name} quantity controls`}>
                    <button
                      type="button"
                      onClick={() => decreaseQuantity(item)}
                      aria-label={`Decrease ${item.name} quantity`}
                    >
                      −
                    </button>
                    <input
                      type="number"
                      min="1"
                      value={item.quantity}
                      onChange={(event) => changeQuantity(item, event.target.value)}
                      aria-label={`${item.name} quantity`}
                    />
                    <button
                      type="button"
                      onClick={() => increaseQuantity(item)}
                      aria-label={`Increase ${item.name} quantity`}
                    >
                      +
                    </button>
                  </div>

                  <div className="item-total">
                    <span>Item Total</span>
                    <strong>${(Number(item.price) * Number(item.quantity)).toFixed(2)}</strong>
                  </div>

                  <button
                    type="button"
                    className="remove-item"
                    onClick={() => removeProduct(item.id)}
                  >
                    Remove
                  </button>
                </article>
              ))}
            </div>

            <aside className="cart-summary" aria-label="Cart Summary">
              <h2>Cart Summary</h2>
              <div className="summary-row">
                <span>Total Items</span>
                <span>{totalItems}</span>
              </div>
              <div className="summary-row total-row">
                <span>Total Price</span>
                <strong>${cartTotal.toFixed(2)}</strong>
              </div>

              <button type="button" className="continue-shopping" onClick={handleContinueShopping}>
                Continue Shopping
              </button>
              <button type="button" className="checkout-button" onClick={handleCheckout}>
                Checkout
              </button>
            </aside>
          </>
        )}
      </section>
    </main>
  );
};

export default CartItem;
