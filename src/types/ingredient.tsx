export type IngredientType = "bun" | "main" | "sauce";

export type IngredientStatKey = "calories" | "proteins" | "fat" | "carbohydrates";

export type Ingredient = {
  readonly _id: string,
  readonly type: IngredientType,
  readonly image: string,
  readonly image_large: string,
  readonly image_mobile: string,
  readonly name: string,
  readonly price: number,
} & {
  [statKeyName in IngredientStatKey]: number
}