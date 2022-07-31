import styles from './order-ingredient.module.css';

export function OrderIngredient({imageUrl, plusQuantity}: { imageUrl: string, plusQuantity?: number }) {
  return (
    <div className={styles.feedOrderIngredient}>
      {plusQuantity && (<div className={styles.plusQuantityBackground}>
        <div  className={"text_type_digits-default"}>
          +{plusQuantity}
        </div>
      </div>)}
      <img src={imageUrl}/>
    </div>
  );
}