import React, { useState } from 'react';
import ProductList from './ProductList';
import AboutUs from './AboutUs';
import './App.css';

function App() {
  const [showProductList, setShowProductList] = useState(false);

  const handleGetStarted = () => {
    setShowProductList(true);
  };

  return (
    <div className="app-container">
      {!showProductList ? (
        <div className="landing-page">
          <div className="background-image"></div>
          <div className="content">
            <div className="landing_content">
              <h1>Welcome To Paradise Nursery</h1>
              <div className="divider"></div>
              <p>Where Green Meets Serenity</p>
              <button 
                type="button" 
                className="get-started-btn" 
                onClick={handleGetStarted}
              >
                Get Started
              </button>
            </div>
            <div className="aboutus_container">
              <AboutUs />
            </div>
          </div>
        </div>
      ) : (
        <div className={`product-list-container ${showProductList ? 'visible' : ''}`}>
          <ProductList />
        </div>
      )}
    </div>
  );
}

export default App;
