import React, { useState } from "react";
import ProductList from "./ProductList"; // ya jo bhi aapka Product Component hai
import "./App.css";

function App() {
  const [showProductList, setShowProductList] = useState(false);

  const handleGetStarted = () => {
    setShowProductList(true);
  };

  return (
    <div className="app-container">
      {!showProductList ? (
        <main className="landing-page">
          <section className="hero" aria-label="Paradise Nursery landing page">
            <div className="hero-content">
              <p className="company-label">Welcome to</p>
              <h1>Paradise Nursery</h1>
              <p>
                Discover beautiful indoor, outdoor, medicinal, and herb plants to
                bring the beauty of nature into your home and garden.
              </p>
              <button
                type="button"
                className="get-started"
                onClick={handleGetStarted}
              >
                Get Started
              </button>
            </div>
          </section>
        </main>
      ) : (
        <div className={`product-list-container ${showProductList ? "visible" : ""}`}>
          <ProductList />
        </div>
      )}
    </div>
  );
}

export default App;
