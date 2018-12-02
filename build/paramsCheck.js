/**
 * Check params isUndefined and isAcceptType
 */
const paramsCheck = (target, alise, acceptType = []) => {
  const type = typeof target;

  if (target === undefined) {
    throw new TypeError(`ReactPropsGenerator Error: ${alise} must be provide.`);
  } else if (acceptType.indexOf(type) === -1) {
    throw new TypeError(`ReactPropsGenerator Error: Invalid type ${type} of ${alise}, expected type ${acceptType.toString()}.`);
  }
};

export default paramsCheck;