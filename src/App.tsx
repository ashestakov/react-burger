import React from 'react';
import './App.css';
import AppHeader from "./components/app-header/app-header";
import BurgerIngredients from './components/burger-ingredients/burger-ingredients';
import BurgerConstructor from "./components/burger-constructor/burger-constructor";

const DOMAIN = 'https://norma.nomoreparties.space';

function App() {
    const [ingredients, setIngredients] = React.useState();

    React.useEffect(() => {
        fetch(`${DOMAIN}/api/ingredients`)
            .then(response => response.json())
            .then(data => {
                setIngredients(data.data);
            })
            .catch(error => console.error(error));
    }, []);

    return (
        <div id="page-constructor">
            <header>
                <AppHeader/>
            </header>
            <main>
                {
                    ingredients && (
                        <>
                            <BurgerIngredients ingredients={ingredients}/>
                            <BurgerConstructor ingredients={ingredients} order={[]}/>
                        </>
                    )
                }
            </main>
        </div>
    );
}

export default App;
