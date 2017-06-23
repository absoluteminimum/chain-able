var reduce = require('./reduce')
var isMap = require('./is/map')
var dopemerge = require('./dopemerge')

// const keys = Object.keys(validators)
// keys.forEach(key => {
//   let validator = validators[key]
//   if (scoped.has(key))
//     validator = dopemerge(map.get(key), validators[key])
//   scoped.set(key)
// })

function dopemergeMap(obj1, obj2) {
  var maps = [isMap(obj1), isMap(obj2)]
  var eq = function (one, two) { return maps[0] == one && maps[1] == two; }
  var dest = obj1
  var src = obj2
  switch (true) {
    // both maps
    case eq(true, true): {
      src = reduce(obj2)
      break
    }
    // obj1 is map
    // case maps.includes(true)
    case eq(true, false): {
      src = obj2
      break
    }
    // obj2 is map
    case eq(false, true): {
      src = reduce(obj2)
      break
    }
    // false, false
    default: {
      return dopemerge(obj1, obj2)
    }
  }
  var keys = Object.keys(src)
  keys.forEach(function (key) {
    if (dest.has(key) === false) {
      dest.set(key, src[key])
    }
    else {
      dest.set(key, dopemerge(dest.get(key), src[key]))
    }
  })

  return dest
}

var targetMap = new Map()
targetMap.set('true', false)
targetMap.set('obj', {obj: []})
targetMap.set('arr', [1])
var srcMap = new Map()
srcMap.set('true', true)
srcMap.set('obj', {obj: [Symbol]})
srcMap.set('arr', [2])
srcMap.set('emptyArr', [])
var mergedMap = dopemergeMap(targetMap, srcMap, {clone: true})

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZG9wZW1lcmdlLW1hcC5qcyIsInNvdXJjZXMiOlsiZG9wZW1lcmdlLW1hcC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCByZWR1Y2UgPSByZXF1aXJlKCcuL3JlZHVjZScpXG5jb25zdCBpc01hcCA9IHJlcXVpcmUoJy4vaXMvbWFwJylcbmNvbnN0IGRvcGVtZXJnZSA9IHJlcXVpcmUoJy4vZG9wZW1lcmdlJylcblxuLy8gY29uc3Qga2V5cyA9IE9iamVjdC5rZXlzKHZhbGlkYXRvcnMpXG4vLyBrZXlzLmZvckVhY2goa2V5ID0+IHtcbi8vICAgbGV0IHZhbGlkYXRvciA9IHZhbGlkYXRvcnNba2V5XVxuLy8gICBpZiAoc2NvcGVkLmhhcyhrZXkpKVxuLy8gICAgIHZhbGlkYXRvciA9IGRvcGVtZXJnZShtYXAuZ2V0KGtleSksIHZhbGlkYXRvcnNba2V5XSlcbi8vICAgc2NvcGVkLnNldChrZXkpXG4vLyB9KVxuXG5mdW5jdGlvbiBkb3BlbWVyZ2VNYXAob2JqMSwgb2JqMikge1xuICBjb25zdCBtYXBzID0gW2lzTWFwKG9iajEpLCBpc01hcChvYmoyKV1cbiAgY29uc3QgZXEgPSAob25lLCB0d28pID0+IG1hcHNbMF0gPT0gb25lICYmIG1hcHNbMV0gPT0gdHdvXG4gIGxldCBkZXN0ID0gb2JqMVxuICBsZXQgc3JjID0gb2JqMlxuICBzd2l0Y2ggKHRydWUpIHtcbiAgICAvLyBib3RoIG1hcHNcbiAgICBjYXNlIGVxKHRydWUsIHRydWUpOiB7XG4gICAgICBzcmMgPSByZWR1Y2Uob2JqMilcbiAgICAgIGJyZWFrXG4gICAgfVxuICAgIC8vIG9iajEgaXMgbWFwXG4gICAgLy8gY2FzZSBtYXBzLmluY2x1ZGVzKHRydWUpXG4gICAgY2FzZSBlcSh0cnVlLCBmYWxzZSk6IHtcbiAgICAgIHNyYyA9IG9iajJcbiAgICAgIGJyZWFrXG4gICAgfVxuICAgIC8vIG9iajIgaXMgbWFwXG4gICAgY2FzZSBlcShmYWxzZSwgdHJ1ZSk6IHtcbiAgICAgIHNyYyA9IHJlZHVjZShvYmoyKVxuICAgICAgYnJlYWtcbiAgICB9XG4gICAgLy8gZmFsc2UsIGZhbHNlXG4gICAgZGVmYXVsdDoge1xuICAgICAgcmV0dXJuIGRvcGVtZXJnZShvYmoxLCBvYmoyKVxuICAgIH1cbiAgfVxuICBjb25zdCBrZXlzID0gT2JqZWN0LmtleXMoc3JjKVxuICBrZXlzLmZvckVhY2goa2V5ID0+IHtcbiAgICBpZiAoZGVzdC5oYXMoa2V5KSA9PT0gZmFsc2UpIHtcbiAgICAgIGRlc3Quc2V0KGtleSwgc3JjW2tleV0pXG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgZGVzdC5zZXQoa2V5LCBkb3BlbWVyZ2UoZGVzdC5nZXQoa2V5KSwgc3JjW2tleV0pKVxuICAgIH1cbiAgfSlcblxuICByZXR1cm4gZGVzdFxufVxuXG52YXIgdGFyZ2V0TWFwID0gbmV3IE1hcCgpXG50YXJnZXRNYXAuc2V0KCd0cnVlJywgZmFsc2UpXG50YXJnZXRNYXAuc2V0KCdvYmonLCB7b2JqOiBbXX0pXG50YXJnZXRNYXAuc2V0KCdhcnInLCBbMV0pXG52YXIgc3JjTWFwID0gbmV3IE1hcCgpXG5zcmNNYXAuc2V0KCd0cnVlJywgdHJ1ZSlcbnNyY01hcC5zZXQoJ29iaicsIHtvYmo6IFtTeW1ib2xdfSlcbnNyY01hcC5zZXQoJ2FycicsIFsyXSlcbnNyY01hcC5zZXQoJ2VtcHR5QXJyJywgW10pXG52YXIgbWVyZ2VkTWFwID0gZG9wZW1lcmdlTWFwKHRhcmdldE1hcCwgc3JjTWFwLCB7Y2xvbmU6IHRydWV9KVxuIl0sIm5hbWVzIjpbImNvbnN0IiwibGV0Il0sIm1hcHBpbmdzIjoiQUFBQUEsR0FBSyxDQUFDLE1BQU0sR0FBRyxPQUFPLENBQUMsVUFBVSxDQUFDO0FBQ2xDQSxHQUFLLENBQUMsS0FBSyxHQUFHLE9BQU8sQ0FBQyxVQUFVLENBQUM7QUFDakNBLEdBQUssQ0FBQyxTQUFTLEdBQUcsT0FBTyxDQUFDLGFBQWEsQ0FBQzs7Ozs7Ozs7OztBQVV4QyxTQUFTLFlBQVksQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFO0VBQ2hDQSxHQUFLLENBQUMsSUFBSSxHQUFHLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxFQUFFLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQztFQUN2Q0EsR0FBSyxDQUFDLEVBQUUsR0FBRyxTQUFBLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSxBQUFHLFNBQUEsSUFBSSxDQUFDLENBQUMsQ0FBQyxJQUFJLEdBQUcsSUFBSSxJQUFJLENBQUMsQ0FBQyxDQUFDLElBQUksR0FBRyxHQUFBO0VBQ3pEQyxHQUFHLENBQUMsSUFBSSxHQUFHLElBQUk7RUFDZkEsR0FBRyxDQUFDLEdBQUcsR0FBRyxJQUFJO0VBQ2QsUUFBUSxJQUFJOztJQUVWLEtBQUssRUFBRSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsRUFBRTtNQUNuQixHQUFHLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQztNQUNsQixLQUFLO0tBQ047OztJQUdELEtBQUssRUFBRSxDQUFDLElBQUksRUFBRSxLQUFLLENBQUMsRUFBRTtNQUNwQixHQUFHLEdBQUcsSUFBSTtNQUNWLEtBQUs7S0FDTjs7SUFFRCxLQUFLLEVBQUUsQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLEVBQUU7TUFDcEIsR0FBRyxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUM7TUFDbEIsS0FBSztLQUNOOztJQUVELFNBQVM7TUFDUCxPQUFPLFNBQVMsQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDO0tBQzdCO0dBQ0Y7RUFDREQsR0FBSyxDQUFDLElBQUksR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQztFQUM3QixJQUFJLENBQUMsT0FBTyxDQUFDLFVBQUEsR0FBRyxDQUFBLENBQUMsQUFBRztJQUNsQixJQUFJLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEtBQUssS0FBSyxFQUFFO01BQzNCLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxFQUFFLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQztLQUN4QjtTQUNJO01BQ0gsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLEVBQUUsU0FBUyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEVBQUUsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7S0FDbEQ7R0FDRixDQUFDOztFQUVGLE9BQU8sSUFBSTtDQUNaOztBQUVELElBQUksU0FBUyxHQUFHLElBQUksR0FBRyxFQUFFO0FBQ3pCLFNBQVMsQ0FBQyxHQUFHLENBQUMsTUFBTSxFQUFFLEtBQUssQ0FBQztBQUM1QixTQUFTLENBQUMsR0FBRyxDQUFDLEtBQUssRUFBRSxDQUFDLEdBQUcsRUFBRSxFQUFFLENBQUMsQ0FBQztBQUMvQixTQUFTLENBQUMsR0FBRyxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQ3pCLElBQUksTUFBTSxHQUFHLElBQUksR0FBRyxFQUFFO0FBQ3RCLE1BQU0sQ0FBQyxHQUFHLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQztBQUN4QixNQUFNLENBQUMsR0FBRyxDQUFDLEtBQUssRUFBRSxDQUFDLEdBQUcsRUFBRSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7QUFDbEMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUN0QixNQUFNLENBQUMsR0FBRyxDQUFDLFVBQVUsRUFBRSxFQUFFLENBQUM7QUFDMUIsSUFBSSxTQUFTLEdBQUcsWUFBWSxDQUFDLFNBQVMsRUFBRSxNQUFNLEVBQUUsQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLENBQUM7In0=