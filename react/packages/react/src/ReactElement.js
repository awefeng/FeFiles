/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import getComponentName from 'shared/getComponentName';
import invariant from 'shared/invariant';
import {REACT_ELEMENT_TYPE} from 'shared/ReactSymbols';

import ReactCurrentOwner from './ReactCurrentOwner';

const hasOwnProperty = Object.prototype.hasOwnProperty;

// 保留属性
const RESERVED_PROPS = {
  key: true,
  ref: true,
  __self: true,
  __source: true,
};

let specialPropKeyWarningShown,
  specialPropRefWarningShown,
  didWarnAboutStringRefs;

if (__DEV__) {
  didWarnAboutStringRefs = {};
}
// 实例上是否有有效的ref
function hasValidRef(config) {
  // dev环境 不用管
  if (__DEV__) {
    if (hasOwnProperty.call(config, 'ref')) {
      // 获取dev环境下ref属性的getter
      const getter = Object.getOwnPropertyDescriptor(config, 'ref').get;
      if (getter && getter.isReactWarning) {
        return false;
      }
    }
  }
  // 所以验证ref是否有效就是 实例里面传了ref属性没有
  return config.ref !== undefined;
}
// 实例上是否有有效的key 同ref
function hasValidKey(config) {
  if (__DEV__) {
    if (hasOwnProperty.call(config, 'key')) {
      const getter = Object.getOwnPropertyDescriptor(config, 'key').get;
      if (getter && getter.isReactWarning) {
        return false;
      }
    }
  }
  return config.key !== undefined;
}

function defineKeyPropWarningGetter(props, displayName) {
  const warnAboutAccessingKey = function() {
    if (__DEV__) {
      if (!specialPropKeyWarningShown) {
        specialPropKeyWarningShown = true;
        console.error(
          '%s: `key` is not a prop. Trying to access it will result ' +
            'in `undefined` being returned. If you need to access the same ' +
            'value within the child component, you should pass it as a different ' +
            'prop. (https://reactjs.org/link/special-props)',
          displayName,
        );
      }
    }
  };
  warnAboutAccessingKey.isReactWarning = true;
  Object.defineProperty(props, 'key', {
    get: warnAboutAccessingKey,
    configurable: true,
  });
}

function defineRefPropWarningGetter(props, displayName) {
  const warnAboutAccessingRef = function() {
    if (__DEV__) {
      if (!specialPropRefWarningShown) {
        specialPropRefWarningShown = true;
        console.error(
          '%s: `ref` is not a prop. Trying to access it will result ' +
            'in `undefined` being returned. If you need to access the same ' +
            'value within the child component, you should pass it as a different ' +
            'prop. (https://reactjs.org/link/special-props)',
          displayName,
        );
      }
    }
  };
  warnAboutAccessingRef.isReactWarning = true;
  Object.defineProperty(props, 'ref', {
    get: warnAboutAccessingRef,
    configurable: true,
  });
}

function warnIfStringRefCannotBeAutoConverted(config) {
  if (__DEV__) {
    if (
      typeof config.ref === 'string' &&
      ReactCurrentOwner.current &&
      config.__self &&
      ReactCurrentOwner.current.stateNode !== config.__self
    ) {
      const componentName = getComponentName(ReactCurrentOwner.current.type);

      if (!didWarnAboutStringRefs[componentName]) {
        console.error(
          'Component "%s" contains the string ref "%s". ' +
            'Support for string refs will be removed in a future major release. ' +
            'This case cannot be automatically converted to an arrow function. ' +
            'We ask you to manually fix this case by using useRef() or createRef() instead. ' +
            'Learn more about using refs safely here: ' +
            'https://reactjs.org/link/strict-mode-string-ref',
          componentName,
          config.ref,
        );
        didWarnAboutStringRefs[componentName] = true;
      }
    }
  }
}

/**
 * 深入理解JSX step2
 *
 * Factory method to create a new React element. This no longer adheres to
 * the class pattern, so do not use new to call it. Also, instanceof check
 * will not work. Instead test $$typeof field against Symbol.for('react.element') to check
 * if something is a React Element.
 * 创建React element的工厂函数. 这个函数不是类，所以不要用new关键字来调用它，同样instanceof也不会生效。
 * 取而代之的是检查$$typeof属性来确定是否是React element
 *
 * ReactElement的工作：
 *   创建一个element对象，填入type, key, ref, 其他props；
 *   创建一个$$typeof内置属性来表示这是一个react element。
 * @param {*} type  // classComponent, functionComponent, hostComponent代表class组件本身（不是实例）
 * @param {*} props  // 组件实例属性
 * @param {*} key // key属性
 * @param {string|object} ref // ref属性
 * @param {*} owner // 记录是哪个component创建了这个element
 * @param {*} self A *temporary* helper to detect places where `this` is
 * different from the `owner` when React.createElement is called, so that we
 * can warn. We want to get rid of owner and replace string `ref`s with arrow
 * functions, and as long as `this` and owner are the same, there will be no
 * change in behavior.
 * @param {*} source An annotation object (added by a transpiler or otherwise)
 * indicating filename, line number, and/or other information.
 * @internal
 */
const ReactElement = function(type, key, ref, self, source, owner, props) {
  const element = {
    // This tag allows us to uniquely identify this as a React Element
    // $$typeof 属性让我们能够确定这是一个React element
    $$typeof: REACT_ELEMENT_TYPE,

    // Built-in properties that belong on the element
    // element的内置元素
    type: type,
    key: key,
    ref: ref,
    props: props, //这里面包含children

    // Record the component responsible for creating this element.
    // 记录是哪个component创建了这个element
    _owner: owner,
  };
  // 开发环境 不用管
  if (__DEV__) {
    // The validation flag is currently mutative. We put it on
    // an external backing store so that we can freeze the whole object.
    // This can be replaced with a WeakMap once they are implemented in
    // commonly used development environments.
    element._store = {};

    // To make comparing ReactElements easier for testing purposes, we make
    // the validation flag non-enumerable (where possible, which should
    // include every environment we run tests in), so the test framework
    // ignores it.
    Object.defineProperty(element._store, 'validated', {
      configurable: false,
      enumerable: false,
      writable: true,
      value: false,
    });
    // self and source are DEV only properties.
    Object.defineProperty(element, '_self', {
      configurable: false,
      enumerable: false,
      writable: false,
      value: self,
    });
    // Two elements created in two different places should be considered
    // equal for testing purposes and therefore we hide it from enumeration.
    Object.defineProperty(element, '_source', {
      configurable: false,
      enumerable: false,
      writable: false,
      value: source,
    });
    if (Object.freeze) {
      Object.freeze(element.props);
      Object.freeze(element);
    }
  }
  // 返回 element
  return element;
};

/**
 * https://github.com/reactjs/rfcs/pull/107
 * @param {*} type
 * @param {object} props
 * @param {string} key
 */
export function jsx(type, config, maybeKey) {
  let propName;

  // Reserved names are extracted
  const props = {};

  let key = null;
  let ref = null;

  // Currently, key can be spread in as a prop. This causes a potential
  // issue if key is also explicitly declared (ie. <div {...props} key="Hi" />
  // or <div key="Hi" {...props} /> ). We want to deprecate key spread,
  // but as an intermediary step, we will use jsxDEV for everything except
  // <div {...props} key="Hi" />, because we aren't currently able to tell if
  // key is explicitly declared to be undefined or not.
  if (maybeKey !== undefined) {
    key = '' + maybeKey;
  }

  if (hasValidKey(config)) {
    key = '' + config.key;
  }

  if (hasValidRef(config)) {
    ref = config.ref;
  }

  // Remaining properties are added to a new props object
  for (propName in config) {
    if (
      hasOwnProperty.call(config, propName) &&
      !RESERVED_PROPS.hasOwnProperty(propName)
    ) {
      props[propName] = config[propName];
    }
  }

  // Resolve default props
  if (type && type.defaultProps) {
    const defaultProps = type.defaultProps;
    for (propName in defaultProps) {
      if (props[propName] === undefined) {
        props[propName] = defaultProps[propName];
      }
    }
  }

  return ReactElement(
    type,
    key,
    ref,
    undefined,
    undefined,
    ReactCurrentOwner.current,
    props,
  );
}

/**
 * https://github.com/reactjs/rfcs/pull/107
 * @param {*} type
 * @param {object} props
 * @param {string} key
 */
export function jsxDEV(type, config, maybeKey, source, self) {
  let propName;

  // Reserved names are extracted
  const props = {};

  let key = null;
  let ref = null;

  // Currently, key can be spread in as a prop. This causes a potential
  // issue if key is also explicitly declared (ie. <div {...props} key="Hi" />
  // or <div key="Hi" {...props} /> ). We want to deprecate key spread,
  // but as an intermediary step, we will use jsxDEV for everything except
  // <div {...props} key="Hi" />, because we aren't currently able to tell if
  // key is explicitly declared to be undefined or not.
  if (maybeKey !== undefined) {
    key = '' + maybeKey;
  }

  if (hasValidKey(config)) {
    key = '' + config.key;
  }

  if (hasValidRef(config)) {
    ref = config.ref;
    warnIfStringRefCannotBeAutoConverted(config);
  }

  // Remaining properties are added to a new props object
  for (propName in config) {
    if (
      hasOwnProperty.call(config, propName) &&
      !RESERVED_PROPS.hasOwnProperty(propName)
    ) {
      props[propName] = config[propName];
    }
  }

  // Resolve default props
  if (type && type.defaultProps) {
    const defaultProps = type.defaultProps;
    for (propName in defaultProps) {
      if (props[propName] === undefined) {
        props[propName] = defaultProps[propName];
      }
    }
  }

  if (key || ref) {
    const displayName =
      typeof type === 'function'
        ? type.displayName || type.name || 'Unknown'
        : type;
    if (key) {
      defineKeyPropWarningGetter(props, displayName);
    }
    if (ref) {
      defineRefPropWarningGetter(props, displayName);
    }
  }

  return ReactElement(
    type,
    key,
    ref,
    self,
    source,
    ReactCurrentOwner.current,
    props,
  );
}

/**
 * 深入理解JSX step1
 *
 * 以给定的type创建一个React element
 * Create and return a new ReactElement of the given type.
 * See https://reactjs.org/docs/react-api.html#createelement
 */
export function createElement(type, config, children) {
  let propName;
  // 先将保留字段提取出来
  // Reserved names are extracted
  const props = {};

  // 四个保留字段
  let key = null;
  let ref = null;
  let self = null;
  let source = null;

  // 如果属性不为空
  if (config != null) {
    // 如果有ref就赋值ref
    if (hasValidRef(config)) {
      ref = config.ref;

      if (__DEV__) {
        warnIfStringRefCannotBeAutoConverted(config);
      }
    }
    // 如果有key 就将key转换为string进行赋值
    if (hasValidKey(config)) {
      key = '' + config.key;
    }

    self = config.__self === undefined ? null : config.__self;
    source = config.__source === undefined ? null : config.__source;
    // Remaining properties are added to a new props object
    // https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/hasOwnProperty
    // 遍历config里的可枚举属性
    for (propName in config) {
      if (
        // 如果config的某个属性是自身属性 并且 不在保留属性里面 则 将属性填入props
        hasOwnProperty.call(config, propName) &&
        !RESERVED_PROPS.hasOwnProperty(propName)
      ) {
        props[propName] = config[propName];
      }
    }
  }

  // Children can be more than one argument, and those are transferred onto
  // the newly allocated props object.
  // 子参数可以是多个参数，这些参数将被转移到新分配的props对象上
  const childrenLength = arguments.length - 2;
  // 计算children个数
  if (childrenLength === 1) {
    props.children = children;
  } else if (childrenLength > 1) {
    const childArray = Array(childrenLength);
    for (let i = 0; i < childrenLength; i++) {
      childArray[i] = arguments[i + 2];
    }
    if (__DEV__) {
      if (Object.freeze) {
        Object.freeze(childArray);
      }
    }
    props.children = childArray;
  }
  // 计算Component的默认属性，再次强调一遍 type 指的FC CC HC 本身，
  // 所以有些人喜欢在写的HOC或者组件的最后，写一个static属性 defaultProps
  // Resolve default props
  if (type && type.defaultProps) {
    const defaultProps = type.defaultProps;
    for (propName in defaultProps) {
      if (props[propName] === undefined) {
        props[propName] = defaultProps[propName];
      }
    }
  }
  if (__DEV__) {
    if (key || ref) {
      const displayName =
        typeof type === 'function'
          ? type.displayName || type.name || 'Unknown'
          : type;
      if (key) {
        defineKeyPropWarningGetter(props, displayName);
      }
      if (ref) {
        defineRefPropWarningGetter(props, displayName);
      }
    }
  }
  // 返回一个React element函数
  return ReactElement(
    type,
    key,
    ref,
    self,
    source,
    ReactCurrentOwner.current,
    props,
  );
}

/**
 * Return a function that produces ReactElements of a given type.
 * See https://reactjs.org/docs/react-api.html#createfactory
 */
export function createFactory(type) {
  const factory = createElement.bind(null, type);
  // Expose the type on the factory and the prototype so that it can be
  // easily accessed on elements. E.g. `<Foo />.type === Foo`.
  // This should not be named `constructor` since this may not be the function
  // that created the element, and it may not even be a constructor.
  // Legacy hook: remove it
  factory.type = type;
  return factory;
}

export function cloneAndReplaceKey(oldElement, newKey) {
  const newElement = ReactElement(
    oldElement.type,
    newKey,
    oldElement.ref,
    oldElement._self,
    oldElement._source,
    oldElement._owner,
    oldElement.props,
  );

  return newElement;
}

/**
 * Clone and return a new ReactElement using element as the starting point.
 * See https://reactjs.org/docs/react-api.html#cloneelement
 */
export function cloneElement(element, config, children) {
  invariant(
    !(element === null || element === undefined),
    'React.cloneElement(...): The argument must be a React element, but you passed %s.',
    element,
  );

  let propName;

  // Original props are copied
  const props = Object.assign({}, element.props);

  // Reserved names are extracted
  let key = element.key;
  let ref = element.ref;
  // Self is preserved since the owner is preserved.
  const self = element._self;
  // Source is preserved since cloneElement is unlikely to be targeted by a
  // transpiler, and the original source is probably a better indicator of the
  // true owner.
  const source = element._source;

  // Owner will be preserved, unless ref is overridden
  let owner = element._owner;

  if (config != null) {
    if (hasValidRef(config)) {
      // Silently steal the ref from the parent.
      ref = config.ref;
      owner = ReactCurrentOwner.current;
    }
    if (hasValidKey(config)) {
      key = '' + config.key;
    }

    // Remaining properties override existing props
    let defaultProps;
    if (element.type && element.type.defaultProps) {
      defaultProps = element.type.defaultProps;
    }
    for (propName in config) {
      if (
        hasOwnProperty.call(config, propName) &&
        !RESERVED_PROPS.hasOwnProperty(propName)
      ) {
        if (config[propName] === undefined && defaultProps !== undefined) {
          // Resolve default props
          props[propName] = defaultProps[propName];
        } else {
          props[propName] = config[propName];
        }
      }
    }
  }

  // Children can be more than one argument, and those are transferred onto
  // the newly allocated props object.
  const childrenLength = arguments.length - 2;
  if (childrenLength === 1) {
    props.children = children;
  } else if (childrenLength > 1) {
    const childArray = Array(childrenLength);
    for (let i = 0; i < childrenLength; i++) {
      childArray[i] = arguments[i + 2];
    }
    props.children = childArray;
  }

  return ReactElement(element.type, key, ref, self, source, owner, props);
}

/**
 * 深入理解JSX step3
 *
 * 验证一个对象是不是 react element: 对象 + 不是null + $$tyoeof === REACT_ELEMENT_TYPE
 *
 * 关于Symbol.for() https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Symbol/for
 * Verifies the object is a ReactElement.
 * See https://reactjs.org/docs/react-api.html#isvalidelement
 * @param {?object} object
 * @return {boolean} True if `object` is a ReactElement.
 * @final
 */
export function isValidElement(object) {
  return (
    typeof object === 'object' &&
    object !== null &&
    object.$$typeof === REACT_ELEMENT_TYPE
  );
}
