const ChainedMap = require('./ChainedMap')
const isUndefined = require('./deps/is/undefined')
const isTrue = require('./deps/is/true')

/**
 * @inheritdoc
 * @prop {Object} data
 * @prop {Set} _calls
 * @type {Map}
 */
class FactoryChain extends ChainedMap {
  constructor(parent) {
    super(parent)

    this.data = {}
    this._calls = new Set()

    this.factory()
      .extend(['optional', 'required', 'chainUpDown', 'onDone'])
      .set('len', 0)
  }

  /**
   * @TODO should have a debug log for this
   * @desc chain back up to parent for any of these
   * @param  {Array<string>} methods
   * @return {FactoryChain} @chainable
   */
  chainUpDowns(methods) {
    methods.forEach(m => {
      this[m] = () => {
        this.end()
        return this.parent[m].apply(this.parent, arguments)
      }
    })
    return this
  }

  /**
   * @since 2.0.0
   * @param  {Array<string>} names
   * @return {FactoryChain} @chainable
   */
  props(names) {
    names.forEach(name => this.prop(name))
    return this
  }

  /* istanbul ignore next: sourcemaps trigger istanbul here incorrectly */
  /**
   * @param  {Primitive} name
   * @param  {Function | null | undefined} [cb=undefined]
   * @return {FactoryChain} @chainable
   */
  prop(name, cb) {
    this.tap('len', len => len + 1)

    // so if we call a property twice,
    // chain back up to parent,
    // add a new chain
    if (!isUndefined(this[name]) && isTrue(this.has('chainUpDown'))) {
      this.end()
      return this.get('chainUpDown')()[name](cb)
    }

    // @TODO need to spread as needed
    this[name] = args => {
      if (isUndefined(cb)) this.data[name] = args
      else cb(args)

      this._calls.add(name)

      // aka magicReturn
      return this._calls.length === this.get('len') ? this.end() : this
    }
    return this
  }

  /**
   * @since 2.0.0
   * @param  {any} [prop=undefined] key of the data, or returns all data
   * @return {any}
   */
  getData(prop) {
    /* istanbul ignore next: sourcemaps trigger istanbul here incorrectly */
    return isUndefined(prop) ? this.data : this.data[prop]
  }

  /* istanbul ignore next: sourcemaps trigger istanbul here incorrectly */
  /**
   * @since 2.0.0
   * @desc adds `.end` which checks how many methods have been called
   * @param  {Object} [obj={}]
   * @return {FactoryChain} @chainable
   */
  factory(obj) {
    this.end = arg => {
      if (obj && !isUndefined(obj.end)) {
        const ended = obj.end(this.data, this.parent, this, arg)
        if (ended && ended !== this) return ended
      }
      else if (this.has('onDone')) {
        const ended = this.get('onDone')(this.data, this.parent, this, arg)
        if (ended && ended !== this) return ended
      }

      return this.parent
    }

    return this
  }
}

module.exports = FactoryChain
