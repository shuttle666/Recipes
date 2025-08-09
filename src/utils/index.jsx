export function classNameStyled(classNames, styles, preClassNames) {
  // "btn btn-primary" => ["btn", "btn-primary"]
  const classList = classNames ? classNames.split(' ') : []

  // "blue bold" => ["blue", "bold"]
  const preClassList = preClassNames ? preClassNames.split(' ') : []

  // ["btn", "btn-primary"] => ["btn", "btn-primary", "btn-primary-123"]
  const classListStyled = classList.map(className => styles[className] || className)

  // ["blue", "bold"] => ["blue", "bold-456"]
  const preClassListStyled = preClassList.map(className => styles[className] || className)

  // ["btn", "btn-primary", "btn-primary-123", "blue", "bold", "bold-456"] => "btn btn-primary btn-primary-123 blue bold bold-456"
  return [...preClassListStyled, ...classListStyled].join(' ')
}