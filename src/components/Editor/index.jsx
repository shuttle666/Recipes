import React from 'react'
import styles from "./index.module.scss"

import { classNameStyled } from '@/utils'
import Button from '@/components/Button'
import { v4 as uuidV4 } from 'uuid';

const Editor = (props) => {

  const {
    handleRecipeSelect,
    handleSelectRecipe,
    handleRecipeChange,
  } = props

  const recipe = handleSelectRecipe()

  const { id, name, cookTime, servings, instructions, ingredients } = recipe

  function handleChange(changes) {
    handleRecipeChange(id, { ...recipe, ...changes })
  }

  function handleInstructionAdd() {
    handleChange({ instructions: [...instructions, ''] })
  }

  function handleInstructionDelete(index) {
    handleChange({ instructions: instructions.filter((_, i) => i !== index) })
  }

  function handleIngredientAdd() {
    const newIngredient = {
      id: uuidV4(),
      name: '',
      amount: ''
    }
    handleChange({ ingredients: [...ingredients, newIngredient] })
  }

  function handleIngredientDelete(index) {
    handleChange({ ingredients: ingredients.filter((_, i) => i !== index) })
  }

  return (
    <div className={styles['container']}>

      <div className={styles['container_header']}>
        <span className={styles['container_title']}>Edit Recipe</span>
        <Button className='btn-danger' onClick={() => handleRecipeSelect(null)}>X</Button>
      </div>

      <div className={styles['sample_panel']}>
        <div className={styles['panel_item']}>
          <label htmlFor="editor_name">Name</label>
          <input type="text" id='editor_name' value={name}
            onChange={e => handleChange({ name: e.target.value })} />
        </div>

        <div className={styles['panel_item']}>
          <label htmlFor="cook_time">Cook Time</label>
          <input type="text" id='cook_time' value={cookTime}
            onChange={e => handleChange({ cookTime: e.target.value })} />
        </div>

        <div className={styles['panel_item']}>
          <label htmlFor="servings">Servings</label>
          <input type="text" id='servings' value={servings}
            onChange={e => handleChange({ servings: e.target.value })} />
        </div>
      </div>

      <div className={styles['instructions_panel']}>
        <span className={styles['title']}>Instructions</span>
        {
          instructions && instructions.map((instruction, index) => {
            const instructionId = `instruction-${index}`
            return <div key={index} className={styles["panel_item"]}>
              <label htmlFor={instructionId}>{index}:</label>
              <input
                id={instructionId}
                type="text"
                value={instruction}
                onChange={e => handleChange({ instructions: [...instructions.slice(0, index), e.target.value, ...instructions.slice(index + 1)] })}
              />
              <Button className='btn-danger' onClick={() => handleInstructionDelete(index)}>X</Button>
            </div>
          })
        }
        <div className={styles['add']}>
          <Button className='btn-primary' onClick={() => handleInstructionAdd()}>Add Instruction</Button>
        </div>
      </div>

      <div className={styles['ingredients_panel']}>
        <span className={styles['title']}>Ingredients</span>
        <div className={styles['title_item']}>
          <label>Name</label>
          <label>Amount</label>
          <span className={styles['hidden']}>
            <Button className='btn-danger'>X</Button>
          </span>
        </div>
        {
          ingredients && ingredients.map((ingredient, index) => {
            const ingredientId = `ingredient-${index}`
            return <div key={index} className={styles['panel_item']}>
              <input
                id={ingredientId}
                type="text"
                value={ingredient.name}
                onChange={e => handleChange({ ingredients: [...ingredients.slice(0, index), { ...ingredient, name: e.target.value }, ...ingredients.slice(index + 1)] })}
              />
              <input
                type="text"
                value={ingredient.amount}
                onChange={e => handleChange({ ingredients: [...ingredients.slice(0, index), { ...ingredient, amount: e.target.value }, ...ingredients.slice(index + 1)] })}
              />
              <Button className='btn-danger' onClick={() => handleIngredientDelete(index)}>X</Button>
            </div>
          })
        }
        <div className={styles['add']}>
          <Button className='btn-primary' onClick={() => handleIngredientAdd()}>Add Ingredient</Button>
        </div>
      </div>

    </div>
  )
}

export default Editor