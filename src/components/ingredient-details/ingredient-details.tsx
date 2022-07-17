import styles from "./ingredient-details.module.css";
import {useRouteMatch} from "react-router-dom";
import {useAppSelector} from "../../hooks";
import {IngredientStatKey} from "../../services/reducers/ingredients";

const STATS: Array<{title: string, propertyName: IngredientStatKey}> = [
  {title: 'Калории,  ккал', propertyName: 'calories'},
  {title: 'Белки, г', propertyName: 'proteins'},
  {title: 'Жиры,  г', propertyName: 'fat'},
  {title: 'Углеводы,  г', propertyName: 'carbohydrates'},
]

type ParamsType = {
  id: string
}

function IngredientDetails() {
  const match = useRouteMatch<ParamsType>();
  const ingredients = useAppSelector(store => store.ingredients.ingredients);
  const id = match.params.id;
  const ingredient = ingredients.find(ingredient => ingredient._id === id);

  if (!ingredient) {
    return null;
  }

  return (
      <div className={styles.ingredientDetails + " pl-15 pr-15"}>
        <img src={ingredient.image_large} className={"mb-4"}/>
        <p className={"mb-8 text text_type_main-medium"}>{ingredient.name}</p>
        <ul className={styles.stats + " mb-5"}>
          {
            STATS.map(({title, propertyName}) => {
                return (<li key={propertyName} className={styles.stat}>
                  <p className={"text text_type_main-default"}>{title}</p>
                  <p className={"text text_type_digits-default"}>{ingredient[propertyName]}</p>
                </li>)
              }
            )
          }
        </ul>
    </div>
  )
}

export default IngredientDetails;