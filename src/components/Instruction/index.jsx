import React from 'react'
import styles from './index.module.scss'
import { classNameStyled } from '@/utils'

const Instruction = (props) => {

  const {
    instructions,
    className,
    ...rest
  } = props

  return (
    <div className={styles['instruction']}>
      <span className={styles['instruction_title']}>Instructions:</span>
      {
        Array.isArray(instructions) && instructions.map((info, index) => {
          return (
            <span key={index} className={styles['instruction_item']}>
              {info}
            </span>
          )
        })
      }
    </div>
  )
}

export default Instruction