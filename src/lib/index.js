import initPropTypes, { defaultProps } from './propTypesWarper'

/**
 * API:
 *
 * initPropTypes: Init PropTypes with 'proptype' key .
 * @param configOptions: React props generator config options
 *   false: Default value. Use default value to init props.
 *   true: Fake Data. Default use mockjs to init props.
 *   object: Custome config.  eg { any: function () {} ... }
 *
 *
 * defaultProps: Value of defaultProps.
 *
 */
export default initPropTypes
export { defaultProps }
