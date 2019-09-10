import React from "react";
import { Link } from "react-router-dom";

const Landing = () => {
  return (
    <section class="text-center">
      <div class="cover-container d-flex w-100 h-100 p-3 mx-auto flex-column">
        <div class="cover-container d-flex w-100 h-100 p-3 mx-auto flex-column">
          <main role="main" class="inner cover">
            <h1 class="cover-heading">Serwis komputerowy</h1>
            <p class="lead">Zaloguj się na swoje konto</p>
            <p class="lead">
              <Link to="/login" class="btn btn-lg btn-secondary">
                Login
              </Link>
            </p>
          </main>
        </div>
      </div>
    </section>
  );
};

export default Landing;
