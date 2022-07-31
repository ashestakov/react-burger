import {ConstructorElement, DragIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import {useDrag, useDrop} from "react-dnd";
import {useCallback} from "react";
import {useDispatch} from "react-redux";
import {ORDER_MOVE_INGREDIENT} from "../../services/actions/order";
import {Ingredient} from "../../services/reducers/ingredients";

function DraggableConstructorElement(
  {id, index, name, price, thumbnail, handleClose}:
    { id: string, index: number, name: string, price: number, thumbnail: string, handleClose: () => void }
) {
  const [{opacity}, dragRef] = useDrag(() => ({
    type: "constructor-element",
    item: {id, index},
    collect: (monitor) => ({
      opacity: monitor.isDragging() ? 0.5 : 1,
    }),
  }));

  const dispatch = useDispatch();

  const onDropHandler = useCallback((ingredient: { index: number }) => {
    dispatch({type: ORDER_MOVE_INGREDIENT, oldIndex: ingredient.index, newIndex: index});
  }, [index]);

  const [, dropTargetRef] = useDrop({
    accept: "constructor-element",
    drop(dragObject) {
      onDropHandler(dragObject as {index: number});
    },
  });

  return (
    <div ref={dropTargetRef}>
      <li className={"pl-8"} ref={dragRef} style={{opacity: opacity}}>
        <DragIcon type={"primary"}/>
        <ConstructorElement text={name} price={price} thumbnail={thumbnail} isLocked={false}
                            handleClose={handleClose}
        />
      </li>
    </div>
  )
}

export default DraggableConstructorElement;