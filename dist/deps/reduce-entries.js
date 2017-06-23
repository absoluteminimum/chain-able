var isFunction = require('./is/function')
var ignored = require('./ignored')
var ObjectKeys = require('./util/keys')
var ObjectAssign = require('./util/assign')

/**
 * @since 4.0.0
 * @see ChainedMap
 * @param {Object | any} reduced
 * @return {Function} Function(values: Object)
 */
module.exports = function (reduced) { return function (self) {
  var keys = ObjectKeys(self)

  for (var k = 0; k < keys.length; k++) {
    var key = keys[k]

    if (ignored(key)) {
      continue
    }

    var val = self[key]
    if (val && isFunction(val.entries)) {
      ObjectAssign(reduced, {[key]: val.entries(true) || {}})
    }
  }

  return reduced
}; }

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVkdWNlLWVudHJpZXMuanMiLCJzb3VyY2VzIjpbInJlZHVjZS1lbnRyaWVzLmpzIl0sInNvdXJjZXNDb250ZW50IjpbImNvbnN0IGlzRnVuY3Rpb24gPSByZXF1aXJlKCcuL2lzL2Z1bmN0aW9uJylcbmNvbnN0IGlnbm9yZWQgPSByZXF1aXJlKCcuL2lnbm9yZWQnKVxuY29uc3QgT2JqZWN0S2V5cyA9IHJlcXVpcmUoJy4vdXRpbC9rZXlzJylcbmNvbnN0IE9iamVjdEFzc2lnbiA9IHJlcXVpcmUoJy4vdXRpbC9hc3NpZ24nKVxuXG4vKipcbiAqIEBzaW5jZSA0LjAuMFxuICogQHNlZSBDaGFpbmVkTWFwXG4gKiBAcGFyYW0ge09iamVjdCB8IGFueX0gcmVkdWNlZFxuICogQHJldHVybiB7RnVuY3Rpb259IEZ1bmN0aW9uKHZhbHVlczogT2JqZWN0KVxuICovXG5tb2R1bGUuZXhwb3J0cyA9IHJlZHVjZWQgPT4gc2VsZiA9PiB7XG4gIGNvbnN0IGtleXMgPSBPYmplY3RLZXlzKHNlbGYpXG5cbiAgZm9yIChsZXQgayA9IDA7IGsgPCBrZXlzLmxlbmd0aDsgaysrKSB7XG4gICAgY29uc3Qga2V5ID0ga2V5c1trXVxuXG4gICAgaWYgKGlnbm9yZWQoa2V5KSkge1xuICAgICAgY29udGludWVcbiAgICB9XG5cbiAgICBjb25zdCB2YWwgPSBzZWxmW2tleV1cbiAgICBpZiAodmFsICYmIGlzRnVuY3Rpb24odmFsLmVudHJpZXMpKSB7XG4gICAgICBPYmplY3RBc3NpZ24ocmVkdWNlZCwge1trZXldOiB2YWwuZW50cmllcyh0cnVlKSB8fCB7fX0pXG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHJlZHVjZWRcbn1cbiJdLCJuYW1lcyI6WyJjb25zdCIsImxldCJdLCJtYXBwaW5ncyI6IkFBQUFBLEdBQUssQ0FBQyxVQUFVLEdBQUcsT0FBTyxDQUFDLGVBQWUsQ0FBQztBQUMzQ0EsR0FBSyxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUMsV0FBVyxDQUFDO0FBQ3BDQSxHQUFLLENBQUMsVUFBVSxHQUFHLE9BQU8sQ0FBQyxhQUFhLENBQUM7QUFDekNBLEdBQUssQ0FBQyxZQUFZLEdBQUcsT0FBTyxDQUFDLGVBQWUsQ0FBQzs7Ozs7Ozs7QUFRN0MsTUFBTSxDQUFDLE9BQU8sR0FBRyxVQUFBLE9BQU8sQ0FBQSxDQUFDLEFBQUcsU0FBQSxVQUFBLElBQUksQ0FBQSxDQUFDLEFBQUc7RUFDbENBLEdBQUssQ0FBQyxJQUFJLEdBQUcsVUFBVSxDQUFDLElBQUksQ0FBQzs7RUFFN0IsS0FBS0MsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7SUFDcENELEdBQUssQ0FBQyxHQUFHLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQzs7SUFFbkIsSUFBSSxPQUFPLENBQUMsR0FBRyxDQUFDLEVBQUU7TUFDaEIsUUFBUTtLQUNUOztJQUVEQSxHQUFLLENBQUMsR0FBRyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUM7SUFDckIsSUFBSSxHQUFHLElBQUksVUFBVSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsRUFBRTtNQUNsQyxZQUFZLENBQUMsT0FBTyxFQUFFLENBQUMsQ0FBQyxHQUFHLEdBQUcsR0FBRyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQztLQUN4RDtHQUNGOztFQUVELE9BQU8sT0FBTztDQUNmLEdBQUE7In0=