import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addItem } from './CartSlice';
import CartItem from './CartItem';
import './ProductList.css';

function ProductList({ onHomeClick }) {
  const [showCart, setShowCart] = useState(false);
  const [addedToCart, setAddedToCart] = useState({});
  const dispatch = useDispatch();

  // Fetch items from Redux Store
  const cartItems = useSelector((state) => state.cart.items);

  // Calculate total quantity for Cart Badge
  const calculateTotalQuantity = () => {
    return cartItems ? cartItems.reduce((total, item) => total + item.quantity, 0) : 0;
  };

  // Product categories array with minimum 3 plants each
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
        },
        {
          name: "Peace Lily",
          image: "https://cdn.pixabay.com/photo/2019/06/12/14/14/peace-lily-4269365_1280.jpg",
          description: "Removes mold spores and purifies air indoors.",
          cost: "$18"
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
          cost: "$20"
        },
        {
          name: "Aloe Vera",
          image: "https://cdn.pixabay.com/photo/2018/04/02/18/10/aloe-vera-3284713_1280.jpg",
          description: "Soothes skin irritations and burns naturally.",
          cost: "$10"
        },
        {
          name: "Rosemary",
          image: "https://cdn.pixabay.com/photo/2019/10/11/07/12/rosemary-4541241_1280.jpg",
          description: "Fragrant herb used frequently in cooking and teas.",
          cost: "$14"
        }
      ]
    }
  ];

  // Dispatch item to Redux Cart
  const handleAddToCart = (plant) => {
    dispatch(addItem(plant));
    setAddedToCart((prevState) => ({
      ...prevState,
      [plant.name]: true
    }));
  };

  const handleHomeClick = (e) => {
    e.preventDefault();
    if (onHomeClick) {
      onHomeClick();
    }
  };

  const handlePlantsClick = (e) => {
    e.preventDefault();
    setShowCart(false);
  };

  const handleCartClick = (e) => {
    e.preventDefault();
    setShowCart(true);
  };

  const handleContinueShopping = (e) => {
    e.preventDefault();
    setShowCart(false);
  };

  return (
    <div>
      {/* Navbar containing Home, Plants, and Cart navigation */}
      <nav className="navbar">
        <div className="tag">
          <div className="luxury">
            <a href="#" onClick={handleHomeClick} style={{ textDecoration: 'none', color: 'white' }}>
              <div>
                <h3 style={{ color: 'white', margin: 0 }}>Paradise Nursery</h3>
                <i style={{ color: 'white', fontSize: '12px' }}>Where Green Meets Serenity</i>
              </div>
            </a>
          </div>
        </div>

        <div className="nav-links">
          {/* Link 1: Home */}
          <a href="#" onClick={handleHomeClick} style={{ color: 'white', fontSize: '18px', textDecoration: 'none', marginRight: '20px' }}>
            Home
          </a>
          {/* Link 2: Plants */}
          <a href="#" onClick={handlePlantsClick} style={{ color: 'white', fontSize: '18px', textDecoration: 'none', marginRight: '20px' }}>
            Plants
          </a>
          {/* Link 3: Cart */}
          <a href="#" onClick={handleCartClick} className="cart-link" style={{ color: 'white', textDecoration: 'none' }}>
            <span className="cart-icon" style={{ fontSize: '24px' }}>🛒</span>
            <span className="cart_quantity_count" style={{ marginLeft: '5px', backgroundColor: 'green', padding: '2px 8px', borderRadius: '50%' }}>
              {calculateTotalQuantity()}
            </span>
          </a>
        </div>
      </nav>

      {/* Main Content Render */}
      {!showCart ? (
        <div className="product-grid">
          {plantsArray.map((categoryObj, index) => (
            <div key={index} className="category-container">
              <h1 className="category-title">{categoryObj.category}</h1>
              <div className="product-list">
                {categoryObj.plants.map((plant, plantIndex) => (
                  <div className="product-card" key={plantIndex}>
                    <img className="product-image" src={plant.image} alt={plant.name} />
                    <div className="product-title">{plant.name}</div>
                    <div className="product-description">{plant.description}</div>
                    <div className="product-cost">{plant.cost}</div>
                    <button
                      className={`product-button ${addedToCart[plant.name] ? 'disabled' : ''}`}
                      onClick={() => handleAddToCart(plant)}
                      disabled={addedToCart[plant.name]}
                    >
                      {addedToCart[plant.name] ? 'Added to Cart' : 'Add to Cart'}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <CartItem onContinueShopping={handleContinueShopping} />
      )}
    </div>
  );
}

export default ProductList;
