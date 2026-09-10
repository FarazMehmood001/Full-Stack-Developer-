import React, { useState } from "react";
import "./ProductList.css";

function ProductList() {
  const [cart, setCart] = useState({});
  const [addedToCart, setAddedToCart] = useState({});

  // Product categories array with requirements
  const plantsArray = [
    {
      category: "Air Purifying Plants",
      plants: [
        {
          name: "Snake Plant",
          image: "https://cdn.pixabay.com/photo/2021/01/22/06/04/snake-plant-5939187_1280.jpg",
          description: "Produces oxygen at night, improving air quality.",
          cost: "$15"
        },
        {
          name: "Spider Plant",
          image: "https://cdn.pixabay.com/photo/2018/07/11/06/47/chlorophytum-3530413_1280.jpg",
          description: "Filters formaldehyde and xylene from the air.",
          cost: "$12"
        }
      ]
    },
    {
      category: "Aromatic & Medicinal Plants",
      plants: [
        {
          name: "Lavender",
          image: "https://cdn.pixabay.com/photo/2017/07/14/20/05/lavender-2504870_1280.jpg",
          description: "Calming scent, used in aromatherapy and soaps.",
          cost: "$18"
        },
        {
          name: "Aloe Vera",
          image: "https://cdn.pixabay.com/photo/2018/04/02/18/10/aloe-vera-3284713_1280.jpg",
          description: "Soothes burns and skin irritations naturally.",
          cost: "$10"
        }
      ]
    }
  ];

  // Calculate total items in cart for the badge counter
  const calculateTotalQuantity = () => {
    return Object.values(cart).reduce((total, qty) => total + qty, 0);
  };

  const handleAddToCart = (plant) => {
    setCart((prevCart) => ({
      ...prevCart,
      [plant.name]: (prevCart[plant.name] || 0) + 1
    }));

    setAddedToCart((prev) => ({
      ...prev,
      [plant.name]: true
    }));
  };

  return (
    <div className="product-grid-container">
      {/* Navbar Section with Logo, Title, and Cart Badge */}
      <nav className="navbar">
        <div className="nav-brand">
          <h2>Paradise Nursery</h2>
        </div>
        <div className="cart-icon-container">
          <span className="cart-symbol">🛒</span>
          <span className="cart-count">{calculateTotalQuantity()}</span>
        </div>
      </nav>

      {/* Main Product Catalog */}
      <div className="product-list">
        {plantsArray.map((categoryObj, index) => (
          <div key={index} className="category-section">
            <h2 className="category-title">{categoryObj.category}</h2>
            <div className="plants-grid">
              {categoryObj.plants.map((plant, pIndex) => (
                <div key={pIndex} className="product-card">
                  <img src={plant.image} alt={plant.name} className="product-image" />
                  <h3 className="product-title">{plant.name}</h3>
                  <p className="product-description">{plant.description}</p>
                  <p className="product-cost">{plant.cost}</p>
                  <button
                    className={`add-to-cart-btn ${addedToCart[plant.name] ? "disabled" : ""}`}
                    onClick={() => handleAddToCart(plant)}
                    disabled={addedToCart[plant.name]}
                  >
                    {addedToCart[plant.name] ? "Added to Cart" : "Add to Cart"}
                  </button>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProductList;
