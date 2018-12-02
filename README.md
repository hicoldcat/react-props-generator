# react-props-generator
> Generate default props and fake props data base on React components's PropTypes

## Installation

```bash
  $ npm install react-props-generator --save-dev
```

## Usage

> **Notice: Importing this library 'prop-types' before 'react-props-generator'** 

- Import dependence from the library.

```js
  import PropTypes from 'prop-types'
  import initPropTypes, { defaultProps } from 'react-props-generator'
```

- Add decorators with your component

```js
  @initPropTypes(false)
  class TestWithDefaultProps extends Component {
    render () {
      console.log(this.props)
      return <div>
        <h3>TestWithDefaultProps Component</h3>
        {
          Object.keys(defaultProps).map(key => {
            return (
              <div key={key}>
                <span>{key}:   </span>
                <span>{typeof this.props[key] === 'object' ? this.props[key] : this.props[key].toString()}</span>
              </div>
            )
          })
        }
      </div>
    }
  }
```

- Use the defaultProps in your component.

## Example

```bash
  git clone https://github.com/hicoldcat/react-props-generator.git

  cd react-props-generator

  npm install

  npm run start
```

And you with see your Component and defaultProps in console.

## API

### initPropTypes
Only one arguments is needed if you **Use Decorators** 

```js
  initPropTypes(congfig)
```

If can't support Decorators, Two arguments are needed.

```js
  initPropTypes(YourComponent, congfig)
```

#### **congfig**: An Boolean or Object type of config the generator.

- false: Default value. Use default value to gennerate props.

```js 
  initPropTypes(false)
```

```js
  DefaultPropsValue['array'] = function (propName, propType, arg) {
    return [];
  };

  DefaultPropsValue['bool'] = function (propName, propType, arg) {
    return true;
  };

  DefaultPropsValue['func'] = function (propName, propType, arg) {
    return function () {};
  };

  DefaultPropsValue['number'] = function (propName, propType, arg) {
    return 1;
  };

  DefaultPropsValue['object'] = function (propName, propType, arg) {
    return {};
  };

  DefaultPropsValue['string'] = function (propName, propType, arg) {
    return '';
  };

  DefaultPropsValue['symbol'] = function (propName, propType, arg) {
    return Symbol('');
  };

  DefaultPropsValue['element'] = function (propName, propType, arg) {
    return React.createElement('div');
  }; 


  DefaultPropsValue['node'] = function (propName, propType, arg) {
    return DefaultPropsValue['element'](propName, propType, arg);
  }; 


  DefaultPropsValue['any'] = function (propName, propType, arg) {
    return DefaultPropsValue['string'](propName, propType, arg);
  };

  DefaultPropsValue['oneOf'] = function (propName, propType, arg) {
    return arg[0] ? arg[0] : null;
  };

  DefaultPropsValue['arrayOf'] = function (propName, propType, arg) {
    return arg.proptype ? [DefaultPropsValue[arg.proptype](propName, propType, arg)] : [];
  };

  DefaultPropsValue['objectOf'] = function (propName, propType, arg) {
    return arg.proptype ? {
      key: DefaultPropsValue[arg.proptype](propName, propType, arg)
    } : {};
  };

  DefaultPropsValue['oneOfType'] = function (propName, propType, arg) {
    return arg[0] && arg[0].proptype ? DefaultPropsValue[arg[0].proptype](propName, propType, arg) : DefaultPropsValue['any'](propName, propType, arg);
  };

  DefaultPropsValue['instanceOf'] = function (propName, propType, Arg) {
    return Arg ? new Arg() : null;
  };

  DefaultPropsValue['shape'] = function (propName, propType, arg, {
    configOptions
  }) {
    return arg ? propsGenerator(undefined, arg, configOptions) : {};
  }; 


  DefaultPropsValue['exact'] = function (propName, propType, arg, source) {
    return DefaultPropsValue['shape'](propName, propType, arg, source);
  };
```

- true: Fake data.

```js 
  initPropTypes(true)
```

```js
  FakePropsValue['array'] = function (propName, propType, arg) {
    return Mock.mock({
      'array|1-10': ['Mock.js']
    })['array'];
  };

  FakePropsValue['bool'] = function (propName, propType, arg) {
    return Mock.mock({
      'boolean|1': true
    })['boolean'];
  };

  FakePropsValue['func'] = function (propName, propType, arg) {
    return function () {};
  };

  FakePropsValue['number'] = function (propName, propType, arg) {
    return Mock.mock({
      'number|+1': 202
    })['number'];
  };

  FakePropsValue['object'] = function (propName, propType, arg) {
    return {};
  };

  FakePropsValue['string'] = function (propName, propType, arg) {
    return Mock.mock({
      'string|1-10': '★'
    })['string'];
  };

  FakePropsValue['symbol'] = function (propName, propType, arg) {
    return Symbol('');
  };

  FakePropsValue['element'] = function (propName, propType, arg) {
    return React.createElement('div');
  }; // 默认使用element来作为node默认值


  FakePropsValue['node'] = function (propName, propType, arg) {
    return FakePropsValue['element'](propName, propType, arg);
  }; // 默认使用string来作为any默认值


  FakePropsValue['any'] = function (propName, propType, arg) {
    return FakePropsValue['string'](propName, propType, arg);
  };

  FakePropsValue['oneOf'] = function (propName, propType, arg) {
    return arg[0] ? arg[0] : null;
  };

  FakePropsValue['arrayOf'] = function (propName, propType, arg) {
    return arg.proptype ? [FakePropsValue[arg.proptype](propName, propType, arg)] : [];
  };

  FakePropsValue['objectOf'] = function (propName, propType, arg) {
    return arg.proptype ? {
      key: FakePropsValue[arg.proptype](propName, propType, arg)
    } : {};
  };

  FakePropsValue['oneOfType'] = function (propName, propType, arg) {
    return arg[0] && arg[0].proptype ? FakePropsValue[arg[0].proptype](propName, propType, arg) : FakePropsValue['any'](propName, propType, arg);
  };

  FakePropsValue['instanceOf'] = function (propName, propType, Arg) {
    return Arg ? new Arg() : null;
  };

  FakePropsValue['shape'] = function (propName, propType, arg, {
    configOptions
  }) {
    return arg ? propsGenerator(undefined, arg, configOptions) : {};
  }; // 默认使用shape来生成exact


  FakePropsValue['exact'] = function (propName, propType, arg, source) {
    return FakePropsValue['shape'](propName, propType, arg, source);
  };

```

- {}: Custom config. Depend on you config

```js 
  initPropTypes({
    array: function (propName, propType, arg) {
      return [12,34,56]
    },
    number: function (propName, propType, arg) {
      return 999
    },
    element: function (propName, propType, arg) {
      return <span>hello element</span>
    },
  })
```
If you not defined, Use default props to instead.

### defaultProps

Return the default props values of generate.