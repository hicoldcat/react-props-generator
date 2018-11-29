import DefaultPropsValue from './defaultPropsValue'

const ACCETPTYPES = [
  'any', 'array', 'bool', 'func',
  'number', 'object', 'string', 'node',
  'element', 'symbol', 'instanceOf', 'oneOf',
  'oneOfType', 'arrayOf', 'objectOf', 'shape',
  'exact'
]

// Use default props unless customer has defined generate props function
const CustomPropsValue = arg => {
  const propsValue = {}
  
  for (let index = 0; index < ACCETPTYPES.length; index++) {
    if (arg.hasOwnProperty(ACCETPTYPES[index])) {
      propsValue[ACCETPTYPES[index]] = arg[ACCETPTYPES[index]]
    } else if (DefaultPropsValue.hasOwnProperty(ACCETPTYPES[index])) {
      propsValue[ACCETPTYPES[index]] = DefaultPropsValue[ACCETPTYPES[index]]
    }
  }

  return propsValue
}

export default (arg) => CustomPropsValue(arg)