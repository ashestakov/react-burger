import {Ingredient} from "./ingredient";

export type OrderIngredient = Ingredient & {
  readonly quantity: number,
}

export type OrderStatus = 'created' | 'pending' | 'done';

export type HistoryOrder = {
  readonly number: string;
  readonly name: string,
  readonly status: OrderStatus,
  readonly ingredients: Array<string>,
  readonly createdAt: string
}

export type Order = {
  bun: Ingredient,
  mainsAndSauces: Ingredient[],
}

export type PlacedOrder = {
  number: string
}