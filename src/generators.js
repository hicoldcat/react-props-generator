import DefaultPropsValue from './defaultPropsValue'
import FakePropsValue from './fakePropsValue'
import CustomPropsValue from './customPropsValue'

/**
 * Get Generators By Config
*/
const getGenerators = (arg) => {
  const type = typeof arg
  if (type === 'boolean') {
    if (arg) {
      return FakePropsValue
    } else {
      return DefaultPropsValue
    }
  } else if (type === 'object') {
    return CustomPropsValue(arg)
  } else {
    return DefaultPropsValue
  }
}

export default getGenerators

