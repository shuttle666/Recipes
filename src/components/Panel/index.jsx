import React from 'react'
import styles from './index.module.scss'
import { classNameStyled } from '@/utils'
import Instruction from '@/components/Instruction'
import Ingredient from '@/components/Ingredient'

const Panel = (props) => {
  const {
    cookTime,
    servings,
    instructions,
    ingredients,
    className,
    ...rest
  } = props

  return (
    <div className={styles['panel']}>

      <div>
        <span className={styles['title']}>Cook Time: </span>
        <span className={styles['info']}>{cookTime}</span>
      </div>

      <div>
        <span className={styles['title']}>Servings: </span>
        <span className={styles['info']}>{servings}</span>
      </div>

      <Instruction instructions={instructions} />
      <Ingredient ingredients={ingredients} />

    </div>
  )
}

export default Panel