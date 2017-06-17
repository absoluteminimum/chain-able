const {Chain, Chainable, ChainedMap} = require('../../dist')

function argumentor() {
  const len = arguments.length, args = new Array(len)
  for (let i = 0; i < len; ++i)
    args[i] = arguments[i]
  return args
}

class Decorator extends Chain {
  constructor(parent) {
    super(parent)

    // name == key == prop == method
    this.extend(['options', 'target', 'name', 'descriptor'])

    // config
    this.extendGetSet(['method', 'obj', 'compose']).extend(['autobind'])

    const compose = SuperClass =>
      class extends SuperClass {
        booya() {
          console.log('kasha')
        }
      }

    this.setCompose(compose)

    this.abstractBuilder = this.abstractBuilder.bind(this)
    this.abstractFactory = this.abstractFactory.bind(this)
    this.methodFactory = this.methodFactory.bind(this)
    this.methodFactory = this.methodFactory.bind(this)
    this.fn = () => this.abstractBuilder
  }

  // builds the factory
  abstractBuilder() {
    const args = argumentor.apply(null, arguments)

    // could be:
    // 1. class...
    // 2. the options
    if (args.length === 1) {
      const arg = args[0]
      // for simplicity, for now we say no function arguments
      if (typeof arg === 'function') {
        return this.abstractFactory(arg)
      }
      else {
        return this.options(arg).abstractFactory
      }
    }

    // only 1 option:
    // 1. not a class (1 arg)
    // 2. not options (1 arg)
    // ... is methodFactory
    return this.methodFactory.apply(this, args)
  }

  // ------

  // target* [name, descriptor]
  abstractFactory(target, name = null, descriptor = null) {
    if (name === null && descriptor === null) return this.classFactory(target)
    return this.methodFactory(target, name, descriptor)
  }
  classFactory(target) {
    const storedComposer = this.getCompose()

    // @TODO: extend obj
    if (typeof storedComposer === 'object') {
      Object.assign(target, storedComposer)
      return target
    }

    const composed = storedComposer(target)

    // so we can do anon callback decorators
    if (typeof composed !== 'function' && typeof compose !== 'object') {
      return target
    }

    return composed
  }
  methodFactory(target, name, descriptor) {
    const autobind = this.get('autobind') || true
    const method = this.getMethod()

    // reference
    const fn = descriptor.value

    // @TODO would need something like `preMethod`, `postMethod`, `onMethod` ?
    if (autobind) {
      const newDescriptor = {
        value() {
          const self = this || target
          return method.apply(self, arguments)
        },
        configurable: true,
        writable: true,
      }
      // const boundFn = function factoryMethod
      Object.defineProperty(
        target,
        name,
        Object.assign(descriptor, newDescriptor)
      )
      return descriptor
    }
    else {
      descriptor.value = method
    }

    return descriptor
  }
}

/**
 * can also use
 *
 * - `.replaceMethod`
 *   > replaces method it decorates
 *
 * - `.callBeforeMethod`
 *   > calls this method before
 *
 * - `.callAfterMethod`
 *   > calls this method after
 *
 * - `.consumeMethod`
 *   > takes method in as first arg
 *   > @example `method => args => console.log(method, args)`
 *
 * - `.autobind`
 *   > default true
 */
const annotation = new Decorator()
  .method((...args) => console.log('yay', args))
  .compose(target => (target.prototype.annotated = true))
  .fn()

@annotation class ClassWithNoOpts {}

@annotation({opts: true})
class ClassWithOpts {}

class ClassWithMethod {
  @annotation({opts: true})
  withOpts() {}

  @annotation withNoOpts() {}
}

const withNoOpts = new ClassWithNoOpts()
const withOpts = new ClassWithOpts()
const withMethods = new ClassWithMethod()
withMethods.withOpts()
withMethods.withNoOpts()

function composer(target) {
  // return class extends target {}
  const ComposedChainable = Chainable.compose(target)
  const ComposedMap = ChainedMap.compose(ComposedChainable)
  return Chain.compose(ComposedMap)
}

const chainit = new Decorator().compose(composer).fn()

@chainit class Woot {
  constructor() {
    console.log('yup')
  }
  eh() {}
  get oogalie() {
    return true
  }
}

var woo = new Woot()
console.log(woo.oogalie)
console.log(woo instanceof Chainable)
