import React from "react";
import "./App.css";

function App() {
  const handleGetStarted = () => {
    window.scrollTo({ top: window.innerHeight, behavior: "smooth" });
  };

  return (
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
  );
}

export default App;
