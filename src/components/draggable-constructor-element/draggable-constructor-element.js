import {ConstructorElement, DragIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import {useDrag, useDrop} from "react-dnd";
import {useCallback} from "react";
import {useDispatch} from "react-redux";
import {ORDER_MOVE_INGREDIENT} from "../../services/actions/order";
import styles from "./draggable-constructor-element.module.css";

export default function DraggableConstructorElement({id, index, name, price, thumbnail, handleClose}) {
  const [{opacity}, dragRef] = useDrag(() => ({
    type: "constructor-element",
    item: {id, index},
    collect: (monitor) => ({
      opacity: monitor.isDragging() ? 0.5 : 1,
    }),
  }));

  const dispatch = useDispatch();

  const onDropHandler = useCallback((ingredient) => {
    dispatch({type: ORDER_MOVE_INGREDIENT, oldIndex: ingredient.index, newIndex: index + 1});
  }, [index]);

  const [{isHover}, dropTargetRef] = useDrop({
    accept: "constructor-element",
    collect: monitor => ({
      isHover: monitor.isOver()
    }),
    drop(id) {
      onDropHandler(id);
    },
  });

  return (
    <div ref={dropTargetRef} className={styles.container}>
      <hr className={styles.insert + ' ' + (isHover ? styles.insertVisible : '')}/>
      <li className={"pl-8"} ref={dragRef} style={{opacity: opacity}}>
        <DragIcon type={"primary"}/>
        <ConstructorElement text={name} price={price} thumbnail={thumbnail} isLocked={false}
                            handleClose={handleClose}
        />
      </li>
    </div>
  )
}