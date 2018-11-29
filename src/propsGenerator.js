import paramsCheck from './paramsCheck'
import getGenerators from './generators'
import { defineProperty } from './propTypesWarper'

/**
 * 
 * Generate default props and fake props data 
 * base on React components's PropTypes
 * 
 * @param target: Target Component
 * 
 * @param propTypes: Target Component propTypes defined by PropTypes
 * 
 * @param configOptions: Generate configs
 */
const propsGenerator = function (target, propTypes, configOptions) {
  // propTypes check
  paramsCheck(propTypes, 'React Component propTypes', ['object'])

  // Get and wraper generators
  const GENERATORS = getGenerators(configOptions)

  let defaultProps = {}

  Object.keys(propTypes).map((propName) => {
    const proptype = propTypes[propName].proptype
    if (proptype && GENERATORS[proptype]) {
      const value = GENERATORS[proptype](
        propName, 
        proptype, 
        propTypes[propName].arg, 
        {
          target,
          propTypes,
          configOptions
        }
      )
      defineProperty(defaultProps, propName, value)
    }
  })

  // Add defaultProps to Component
  if (target) {
    if (!target.defaultProps) {
      defineProperty(target, 'defaultProps', defaultProps)
    } else {
      Object.assign(target.defaultProps, defaultProps)
    }
  }

  return defaultProps
}


export default propsGenerator