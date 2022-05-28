import React from 'react';
import './App.css';
import AppHeader from "./components/app-header/app-header";
import BurgerIngredients from './components/burger-ingredients/burger-ingredients';
import BurgerConstructor from "./components/burger-constructor/burger-constructor";

function App() {
    return (
        <div id="page-constructor">
            <header>
                <AppHeader/>
            </header>
            <main>
                <BurgerIngredients />
                <BurgerConstructor />
            </main>
        </div>
    );
}

export default App;
