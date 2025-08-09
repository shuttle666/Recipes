import React from 'react'
import styles from './index.module.scss'
import { classNameStyled } from '@/utils'

const Button = (props) => {

  const { className, ...rest } = props

  const btnClassNames = classNameStyled(className, styles, 'btn btn-primary')

  return (
    <span className={btnClassNames} {...rest}/>
  )
}

export default Button