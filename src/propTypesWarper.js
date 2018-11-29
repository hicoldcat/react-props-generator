import PropTypes from 'prop-types'
import getGenerators from './generators'
import propsGenerator from './propsGenerator'
import paramsCheck from './paramsCheck'

let defaultProps = {}

const cloneDeep = require('lodash.clonedeep');

/**
 * Define Properties
*/
export const defineProperties = (object, prop, value) => {
  defineProperty(object, prop, value)
  defineProperty(object.isRequired, prop, value)
  return object
}

/**
 * Define Property
*/
export const defineProperty = (object, prop, value) => {
  Object.defineProperty(object, prop, {
    value: value,
    enumerable: true,
  })
}


/**
 * Warper propTypes object with 'proptype' key
*/
const propTypesWraper = function (configOptions) {

  // configOptions check
  let options = null
  if (configOptions === undefined) {
    options = false
  } else {
    paramsCheck(configOptions, 'React props generator config options', ['boolean', 'object'])
    options = configOptions
  }

  // Set configOptions to sessionStorage
  if (!window.sessionStorage) {
    throw Error(`ReactPropsGenerator Error: window.sessionStorage is undefined.`)
  }
  window.sessionStorage.setItem('ReactPropsGeneratorConfig', JSON.stringify(options))


  const Generator = getGenerators(options)

  if (typeof Generator !== 'object') {
    throw new TypeError('ReactPropsGenerator Error: Generator must be object.')
  }

  let array = Object.keys(Generator)
  const original = cloneDeep(PropTypes)

  for (let index = 0; index < array.length; index++) {
    const key = array[index]

    if (!PropTypes[key]) return

    // Add field 'proptype' to PropTypes[key]
    if (PropTypes[key].isRequired !== undefined) {
      PropTypes[key] = defineProperties(PropTypes[key], 'proptype', key)
    } else {
      PropTypes[key] = function (arg) {
        let res = original[key](arg)
        res = defineProperties(res, 'proptype', key)
        res = defineProperties(res, 'arg', arg)
        return res
      }
    }
  }

  // Add setter methods to component propTypes and defaultProps
  return (target) => {
    // React Component Type Check
    paramsCheck(target, 'React Component', ['function'])

    // Define Setter of Target Component propTypes 
    Object.defineProperty(target, 'propTypes', {
      set: function (newValue) {
        if (!window.sessionStorage) {
          throw new Error(`ReactPropsGenerator Error: window.sessionStorage is undefined.`)
        }

        const ReactPropsGeneratorConfig = window.sessionStorage.getItem('ReactPropsGeneratorConfig')
        if (!ReactPropsGeneratorConfig) {
          throw new Error(`ReactPropsGenerator Error: initPropTypes must be called before define propTypes.`)
        }

        let config = {}
        try {
          config = JSON.parse(ReactPropsGeneratorConfig)
        } catch (error) {
          throw new Error(`ReactPropsGenerator Error: GeneratorConfig can't be parse.`)
        }

        defaultProps = propsGenerator(target, newValue, config)
      },
    })
    return target
  }
}

export default propTypesWraper
export {
  defaultProps
}
