import React from 'react'
import styles from './index.module.scss'
import { classNameStyled } from '@/utils'

import Button from '@/components/Button'
import Header from '@/components/Header'
import Panel from '@/components/Panel'

const RecipeList = (props) => {

  const {
    recipes,
    selectedRecipeId,
    lastSelectedRecipeId,
    handleRecipeSelect,
    handleRecipeDelete,
    handleRecipeAdd,
    recipeListClassNames,
    ...rest
  } = props;

  const [newAddRecipe, setNewAddRecipe] = React.useState(false)

  const ref = React.useRef()

  const addRecipe = () => {
    handleRecipeAdd()
    setNewAddRecipe(true)
  }

  React.useEffect(() => {
    if (newAddRecipe) {
      // 由于ref.current拿到的是上一个的快照, 可以用setTimeout拿到当前值
      setTimeout(() => {
        ref.current.scrollIntoView({ behavior: 'smooth', block: 'end', inline: 'nearest' })
      })
      setNewAddRecipe(false)
    }
  }, [newAddRecipe])

  const classNames = classNameStyled(recipeListClassNames, styles, 'container')

  return (
    <div className={classNames}>
      <div className={styles['title']}>Recipes Book</div>

      <div className={styles['add']}>
        <Button className='btn-big' onClick={addRecipe} children='Add Recipe' />
      </div>
      
      <div>
        {
          recipes.map(recipe => {
            return (
              <Recipe
                key={recipe.id}
                {...recipe}
                selectedRecipeId={selectedRecipeId}
                lastSelectedRecipeId={lastSelectedRecipeId}
                handleRecipeSelect={handleRecipeSelect}
                handleRecipeDelete={handleRecipeDelete}
              />
            )
          })
        }
      </div>

      <div className={styles['add']}>
        <Button className='btn-big' onClick={addRecipe} children='Add Recipe' />
      </div>

      <div className={styles['the-end']} ref={ref}></div>
    </div>
  )
}

const Recipe = (props) => {
  const {
    id,
    name,
    servings,
    cookTime,
    instructions,
    ingredients,
    className,
    selectedRecipeId,
    lastSelectedRecipeId,
    handleRecipeSelect,
    handleRecipeDelete,
    ...rest } = props

  // 是否被选中
  const [chosen, setChosen] = React.useState(false)
  const [lastChosen, setLastChosen] = React.useState(false)

  const [recipeClassNameList, setRecipeClassNameList] = React.useState(['recipe'])

  const [recipeClassName, setRecipeClassName] = React.useState()

  function addClassName(className) {
    removeClassName(className)
    // 用函数更新
    setRecipeClassNameList(list => [...list, className])
  }

  function removeClassName(className) {
    setRecipeClassNameList(list => list.filter(name => name !== className))
  }

  // 因为 chosen 发生变化, 调用addClassName或者removeClassName 判断对classnName的操作, 因为类名称的改变影响样式(CSS)
  React.useEffect(() => {
    chosen ? addClassName('chosen') : removeClassName('chosen')
  }, [chosen])

  React.useEffect(() => {
    lastChosen ? addClassName('last-chosen') : removeClassName('last-chosen')
  }, [lastChosen])

  // 当 id,selectedRecipeId 发生变化时, 设置是否被选中(choseb)为true/false
  React.useEffect(() => {
    id === selectedRecipeId ? setChosen(true) : setChosen(false)
  }, [id, selectedRecipeId])

  React.useEffect(() => {
    id === lastSelectedRecipeId ? setLastChosen(true) : setLastChosen(false)
  }, [id, lastSelectedRecipeId])

  React.useEffect(() => {
    setRecipeClassName(classNameStyled(className, styles, recipeClassNameList.join(' ')))
  }, [recipeClassNameList])

  return (
    <div className={styles['recipe_container']}>
      <div
        className={recipeClassName}
        // 点击后调用 App中的 handleRecipeSelect方法, 添加当前实例中的id到selectedRecipeId中
        onClick={() => { handleRecipeSelect(id) }}>
        <Header
          header_info={name}
          id={id}
          deleteHandler={handleRecipeDelete} />
        <Panel
          cookTime={cookTime}
          servings={servings}
          instructions={instructions}
          ingredients={ingredients} />
      </div>
    </div>
  )
}

export default RecipeList