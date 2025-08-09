import React, { useState, useEffect } from 'react'
import { v4 as uuidV4 } from 'uuid'

import RecipeList from './components/Recipe'
import EditorPanel from './components/Editor'

const sampleRecipes = [
  {
    id: uuidV4(),
    name: "Plain Chicken",
    servings: 3,
    cookTime: "2:45",
    instructions: [
      "Put salt on Chicken",
      "Put chicken in oven",
      "Eat chicken"
    ],
    ingredients: [
      {
        id: uuidV4(),
        name: "Chicken",
        amount: "2 Pounds"
      },
      {
        id: uuidV4(),
        name: "Salt",
        amount: "1 Tbs"
      }
    ]
  },
  {
    id: uuidV4(),
    name: "Plain Pork",
    servings: 5,
    cookTime: "0:45",
    instructions: [
      "Put paprika on Pork",
      "Put pork in oven",
      "Eat pork"
    ],
    ingredients: [
      {
        id: uuidV4(),
        name: "Pork",
        amount: "2 Pounds"
      },
      {
        id: uuidV4(),
        name: "Paprika",
        amount: "2 Tbs"
      }
    ]
  },
  {
    id: uuidV4(),
    name: "Plain Apple Pai",
    servings: 10,
    cookTime: "3:45",
    instructions: [
      "Put apples in pie",
      "Put pie in oven",
      "Eat pie"
    ],
    ingredients: [
      {
        id: uuidV4(),
        name: "Pork",
        amount: "2 Pounds"
      },
      {
        id: uuidV4(),
        name: "Paprika",
        amount: "2 Tbs"
      }
    ]
  }
]

const App = () => {

  const [recipes, setRecipes] = useState(sampleRecipes)

  const [selectedRecipeId, setSelectedRecipeID] = useState()

  const [lastSelectedRecipeId, setLastSelectedRecipeId] = useState()

  // 为了选择内容
  function handleSelectRecipe() {
    return recipes.find(recipe => recipe.id === selectedRecipeId)
  }

  // 设置已选择的id
  function handleRecipeSelect(id) {
    if (!selectedRecipeId && id == lastSelectedRecipeId) {
      setLastSelectedRecipeId(null)
    }
    // 判断选择的id是否和selectedRecipeId(已选择的id)相同, 如果不相同则设置之前的id为上次选择的id,
    else if (selectedRecipeId && id !== selectedRecipeId) {
      setLastSelectedRecipeId(selectedRecipeId)
    }

    // 并更新目前已选择的id
    setSelectedRecipeID(id)
  }

  function handleRecipeDelete(id) {
    if (selectedRecipeId !== null && selectedRecipeId === id) {
      setSelectedRecipeId(null)
    }
    setRecipes(recipes.filter(recipe => recipe.id !== id))
  }

  function handleRecipeAdd() {
    const newRecipe = {
      id: uuidV4(),
      name: 'New',
      servings: 1,
      cookTime: '1:00',
      instructions: ["New Instruction 1", "New Instruction 2"],
      ingredients: [
        {
          id: uuidV4(),
          name: 'demo',
          amount: '1 Tbs'
        }
      ]
    }
    handleRecipeSelect(newRecipe.id)
    setRecipes([...recipes, newRecipe])
  }

  function handleRecipeChange(id, recipe) {
    // 做一份新的
    const newRecipes = [...recipes]

    // 通过id找到要改变部分的index
    const index = recipes.findIndex(r => r.id === id)

    // 替换芯内容
    newRecipes[index] = recipe

    // 把新的整体丢进去
    setRecipes(newRecipes)
  }

  return (
    <>
      <RecipeList recipes={recipes}
        selectedRecipeId={selectedRecipeId}
        lastSelectedRecipeId={lastSelectedRecipeId}
        handleRecipeSelect={handleRecipeSelect}
        handleRecipeDelete={handleRecipeDelete}
        handleRecipeAdd={handleRecipeAdd}
      />
      {
        selectedRecipeId &&
        <EditorPanel
          handleSelectRecipe={handleSelectRecipe}
          handleRecipeSelect={handleRecipeSelect}
          handleRecipeChange={handleRecipeChange}
        />
      }
    </>
  )
}

export default App