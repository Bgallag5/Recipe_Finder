import React from 'react'

export default function NewIngredient() {
  return (
    <div className="new-ingredient">
    <label>Ingredient 1</label>
    <input placeholder="Ingredient" className='ingredient__data' />
    <input type="number" placeholder="Quantity" className="ingredient__data" step={.5}/>
    <select name="units" className="ingredient__data">
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
