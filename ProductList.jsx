import React from "react";
import { useDispatch } from "react-redux";
import { addItem } from "./CartSlice";

const plants = [
  {
    id: 1,
    name: "Aloe Vera",
    category: "Medicinal",
    price: 15,
    image:
      "https://images.unsplash.com/photo-1509423350716-97f9360b4e09?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: 2,
    name: "Snake Plant",
    category: "Indoor",
    price: 20,
    image:
      "https://images.unsplash.com/photo-1593482892290-f54927ae1bb7?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: 3,
    name: "Peace Lily",
    category: "Indoor",
    price: 18,
    image:
      "https://images.unsplash.com/photo-1593691509543-c55fb32e5cee?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: 4,
    name: "Money Plant",
    category: "Indoor",
    price: 12,
    image:
      "https://images.unsplash.com/photo-1614594575839-3b4f1d1a0a6d?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: 5,
    name: "Rose Plant",
    category: "Outdoor",
    price: 22,
    image:
      "https://images.unsplash.com/photo-1496062031456-07b8f162a322?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: 6,
    name: "Lavender",
    category: "Outdoor",
    price: 16,
    image:
      "https://images.unsplash.com/photo-1499002238440-d264edd596ec?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: 7,
    name: "Spider Plant",
    category: "Indoor",
    price: 14,
    image:
      "https://images.unsplash.com/photo-1572688484438-313a6e50c333?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: 8,
    name: "Basil Plant",
    category: "Herbs",
    price: 10,
    image:
      "https://images.unsplash.com/photo-1618375569909-3c8616cf7733?auto=format&fit=crop&w=600&q=80",
  },
];

const ProductList = () => {
  const dispatch = useDispatch();

  const categories = [...new Set(plants.map((plant) => plant.category))];

  const handleAddToCart = (plant) => {
    dispatch(addItem(plant));
  };

  return (
    <div className="product-list-page">
      <header className="product-header">
        <h1>Paradise Nursery</h1>
        <p>Beautiful plants for your home and garden</p>
      </header>

      {categories.map((category) => (
        <section className="product-category" key={category}>
          <h2>{category} Plants</h2>

          <div className="products-grid">
            {plants
              .filter((plant) => plant.category === category)
              .map((plant) => (
                <div className="product-card" key={plant.id}>
                  <img
                    src={plant.image}
                    alt={plant.name}
                    className="product-image"
                  />

                  <div className="product-info">
                    <h3>{plant.name}</h3>

                    <p className="product-category-name">
                      {plant.category}
                    </p>

                    <p className="product-price">${plant.price}</p>

                    <button
                      className="add-to-cart"
                      onClick={() => handleAddToCart(plant)}
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              ))}
          </div>
        </section>
      ))}
    </div>
  );
};

export default ProductList;
