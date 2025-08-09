import React from 'react'
import styles from './index.module.scss'
import { classNameStyled } from '@/utils'

const Ingredient = (props) => {

  const {
    ingredients,
    className,
    ...rest
  } = props

  return (
    <div className={styles['ingredient']}>
      <span className={styles['ingredient_title']}>Ingredients: </span>
      <div className={styles['ingredient_grid_item']}>
        {
          Array.isArray(ingredients) && ingredients.map((info, index) => {

            return (
              <React.Fragment key={index}>
                <span className={styles['ingredient_name']}>{info.name}</span>
                <span className={styles['ingredient_amount']}>{info.amount}</span>
              </React.Fragment>
            )
          })
        }
      </div>
    </div>
  )
}

export default Ingredient