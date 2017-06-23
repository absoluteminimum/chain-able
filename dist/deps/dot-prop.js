// https://github.com/mariocasciaro/object-path/blob/master/index.js
// https://github.com/sindresorhus/dot-prop/blob/master/index.js
// https://github.com/sindresorhus/is-obj/blob/master/index.js
var isObj = require('./is/obj')
var isArray = require('./is/array')
var isEnumerable = require('./is/enumerable')
var getPathSegments = require('./dot-segments')

// const isDot = require('./is/dot')
// const isDottable = (obj, path) => isObj(obj) && isDot(path)
var isDottable = function (obj, path) { return (isObj(obj) && typeof path === 'string') || isArray(path); }

module.exports = {
  get: function get(obj, path, value) {
    if (!isDottable(obj, path)) {
      return value === undefined ? obj : value
    }

    var pathArr = getPathSegments(path)

    for (var i = 0; i < pathArr.length; i++) {
      if (!isEnumerable(obj, pathArr[i])) {
        return value
      }

      obj = obj[pathArr[i]]

      if (obj === undefined || obj === null) {
        // `obj` is either `undefined` or `null` so we want to stop the loop, and
        // if this is not the last bit of the path, and
        // if it did't return `undefined`
        // it would return `null` if `obj` is `null`
        // but we want `get({foo: null}, 'foo.bar')` to equal `undefined`, or the supplied value, not `null`
        if (i !== pathArr.length - 1) {
          return value
        }

        break
      }
    }

    return obj
  },

  set: function set(obj, path, value) {
    if (!isDottable(obj, path)) {
      return
    }

    var pathArr = getPathSegments(path)

    for (var i = 0; i < pathArr.length; i++) {
      var p = pathArr[i]

      if (!isObj(obj[p])) {
        obj[p] = {}
      }

      if (i === pathArr.length - 1) {
        obj[p] = value
      }

      obj = obj[p]
    }
  },

  delete: function delete$1(obj, path) {
    if (!isDottable(obj, path)) {
      return
    }

    var pathArr = getPathSegments(path)

    for (var i = 0; i < pathArr.length; i++) {
      var p = pathArr[i]

      if (i === pathArr.length - 1) {
        delete obj[p]
        return
      }

      obj = obj[p]

      if (!isObj(obj)) {
        return
      }
    }
  },

  has: function has(obj, path) {
    if (!isDottable(obj, path)) {
      return false
    }

    var pathArr = getPathSegments(path)

    for (var i = 0; i < pathArr.length; i++) {
      if (isObj(obj)) {
        if (!(pathArr[i] in obj)) {
          return false
        }

        obj = obj[pathArr[i]]
      }
      else {
        return false
      }
    }

    return true
  },
}

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZG90LXByb3AuanMiLCJzb3VyY2VzIjpbImRvdC1wcm9wLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIi8vIGh0dHBzOi8vZ2l0aHViLmNvbS9tYXJpb2Nhc2NpYXJvL29iamVjdC1wYXRoL2Jsb2IvbWFzdGVyL2luZGV4LmpzXG4vLyBodHRwczovL2dpdGh1Yi5jb20vc2luZHJlc29yaHVzL2RvdC1wcm9wL2Jsb2IvbWFzdGVyL2luZGV4LmpzXG4vLyBodHRwczovL2dpdGh1Yi5jb20vc2luZHJlc29yaHVzL2lzLW9iai9ibG9iL21hc3Rlci9pbmRleC5qc1xuY29uc3QgaXNPYmogPSByZXF1aXJlKCcuL2lzL29iaicpXG5jb25zdCBpc0FycmF5ID0gcmVxdWlyZSgnLi9pcy9hcnJheScpXG5jb25zdCBpc0VudW1lcmFibGUgPSByZXF1aXJlKCcuL2lzL2VudW1lcmFibGUnKVxuY29uc3QgZ2V0UGF0aFNlZ21lbnRzID0gcmVxdWlyZSgnLi9kb3Qtc2VnbWVudHMnKVxuXG4vLyBjb25zdCBpc0RvdCA9IHJlcXVpcmUoJy4vaXMvZG90Jylcbi8vIGNvbnN0IGlzRG90dGFibGUgPSAob2JqLCBwYXRoKSA9PiBpc09iaihvYmopICYmIGlzRG90KHBhdGgpXG5jb25zdCBpc0RvdHRhYmxlID0gKG9iaiwgcGF0aCkgPT5cbiAgKGlzT2JqKG9iaikgJiYgdHlwZW9mIHBhdGggPT09ICdzdHJpbmcnKSB8fCBpc0FycmF5KHBhdGgpXG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICBnZXQob2JqLCBwYXRoLCB2YWx1ZSkge1xuICAgIGlmICghaXNEb3R0YWJsZShvYmosIHBhdGgpKSB7XG4gICAgICByZXR1cm4gdmFsdWUgPT09IHVuZGVmaW5lZCA/IG9iaiA6IHZhbHVlXG4gICAgfVxuXG4gICAgY29uc3QgcGF0aEFyciA9IGdldFBhdGhTZWdtZW50cyhwYXRoKVxuXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBwYXRoQXJyLmxlbmd0aDsgaSsrKSB7XG4gICAgICBpZiAoIWlzRW51bWVyYWJsZShvYmosIHBhdGhBcnJbaV0pKSB7XG4gICAgICAgIHJldHVybiB2YWx1ZVxuICAgICAgfVxuXG4gICAgICBvYmogPSBvYmpbcGF0aEFycltpXV1cblxuICAgICAgaWYgKG9iaiA9PT0gdW5kZWZpbmVkIHx8IG9iaiA9PT0gbnVsbCkge1xuICAgICAgICAvLyBgb2JqYCBpcyBlaXRoZXIgYHVuZGVmaW5lZGAgb3IgYG51bGxgIHNvIHdlIHdhbnQgdG8gc3RvcCB0aGUgbG9vcCwgYW5kXG4gICAgICAgIC8vIGlmIHRoaXMgaXMgbm90IHRoZSBsYXN0IGJpdCBvZiB0aGUgcGF0aCwgYW5kXG4gICAgICAgIC8vIGlmIGl0IGRpZCd0IHJldHVybiBgdW5kZWZpbmVkYFxuICAgICAgICAvLyBpdCB3b3VsZCByZXR1cm4gYG51bGxgIGlmIGBvYmpgIGlzIGBudWxsYFxuICAgICAgICAvLyBidXQgd2Ugd2FudCBgZ2V0KHtmb286IG51bGx9LCAnZm9vLmJhcicpYCB0byBlcXVhbCBgdW5kZWZpbmVkYCwgb3IgdGhlIHN1cHBsaWVkIHZhbHVlLCBub3QgYG51bGxgXG4gICAgICAgIGlmIChpICE9PSBwYXRoQXJyLmxlbmd0aCAtIDEpIHtcbiAgICAgICAgICByZXR1cm4gdmFsdWVcbiAgICAgICAgfVxuXG4gICAgICAgIGJyZWFrXG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIG9ialxuICB9LFxuXG4gIHNldChvYmosIHBhdGgsIHZhbHVlKSB7XG4gICAgaWYgKCFpc0RvdHRhYmxlKG9iaiwgcGF0aCkpIHtcbiAgICAgIHJldHVyblxuICAgIH1cblxuICAgIGNvbnN0IHBhdGhBcnIgPSBnZXRQYXRoU2VnbWVudHMocGF0aClcblxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcGF0aEFyci5sZW5ndGg7IGkrKykge1xuICAgICAgY29uc3QgcCA9IHBhdGhBcnJbaV1cblxuICAgICAgaWYgKCFpc09iaihvYmpbcF0pKSB7XG4gICAgICAgIG9ialtwXSA9IHt9XG4gICAgICB9XG5cbiAgICAgIGlmIChpID09PSBwYXRoQXJyLmxlbmd0aCAtIDEpIHtcbiAgICAgICAgb2JqW3BdID0gdmFsdWVcbiAgICAgIH1cblxuICAgICAgb2JqID0gb2JqW3BdXG4gICAgfVxuICB9LFxuXG4gIGRlbGV0ZShvYmosIHBhdGgpIHtcbiAgICBpZiAoIWlzRG90dGFibGUob2JqLCBwYXRoKSkge1xuICAgICAgcmV0dXJuXG4gICAgfVxuXG4gICAgY29uc3QgcGF0aEFyciA9IGdldFBhdGhTZWdtZW50cyhwYXRoKVxuXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBwYXRoQXJyLmxlbmd0aDsgaSsrKSB7XG4gICAgICBjb25zdCBwID0gcGF0aEFycltpXVxuXG4gICAgICBpZiAoaSA9PT0gcGF0aEFyci5sZW5ndGggLSAxKSB7XG4gICAgICAgIGRlbGV0ZSBvYmpbcF1cbiAgICAgICAgcmV0dXJuXG4gICAgICB9XG5cbiAgICAgIG9iaiA9IG9ialtwXVxuXG4gICAgICBpZiAoIWlzT2JqKG9iaikpIHtcbiAgICAgICAgcmV0dXJuXG4gICAgICB9XG4gICAgfVxuICB9LFxuXG4gIGhhcyhvYmosIHBhdGgpIHtcbiAgICBpZiAoIWlzRG90dGFibGUob2JqLCBwYXRoKSkge1xuICAgICAgcmV0dXJuIGZhbHNlXG4gICAgfVxuXG4gICAgY29uc3QgcGF0aEFyciA9IGdldFBhdGhTZWdtZW50cyhwYXRoKVxuXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBwYXRoQXJyLmxlbmd0aDsgaSsrKSB7XG4gICAgICBpZiAoaXNPYmoob2JqKSkge1xuICAgICAgICBpZiAoIShwYXRoQXJyW2ldIGluIG9iaikpIHtcbiAgICAgICAgICByZXR1cm4gZmFsc2VcbiAgICAgICAgfVxuXG4gICAgICAgIG9iaiA9IG9ialtwYXRoQXJyW2ldXVxuICAgICAgfVxuICAgICAgZWxzZSB7XG4gICAgICAgIHJldHVybiBmYWxzZVxuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiB0cnVlXG4gIH0sXG59XG4iXSwibmFtZXMiOlsiY29uc3Qi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