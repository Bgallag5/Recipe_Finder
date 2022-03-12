import React from 'react'

export default function NewIngredient({ingredient, i, handleIngredientsChange, deleteIngredient}) {
  return (
    <div className="new-ingredient" onChange={(e) => handleIngredientsChange(e, i)}>
      {/* <button onClick={(e) => deleteIngredient(e, ingredient)}>X </button> */}
    <label>Ingredient {i + 1} </label>
    <input value={ingredient.ingredientName} name='description' placeholder="Ingredient" className='ingredient__data' />
    <input name='quantity' value={ingredient.quantity} type="number" placeholder="Quantity" className="ingredient__data"/>
    <select onChange={function(){}}  name="unit" value={ingredient.units} className="ingredient__data">
        <option value="">Select measurment</option>
        <option value={'cups'}>cups</option>
        <option value={'pints'}>pints</option>
        <option value={'litres'}>litres</option>
        <option value={'fluid ounces'}>fluid ounces</option>
        <option value={'tablespoons'}>tablespoons</option>
        <option value={'teaspoons'}>teaspoons</option>
        <option value={'pounds'}>pounds</option>
        <option value={'ounces'}>ounces</option>
        <option value={'grams'}>grams</option>
        <option value={'kilograms'}>kilograms</option>
    </select>
    </div>
  )
}
