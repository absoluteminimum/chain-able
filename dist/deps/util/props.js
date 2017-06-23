var ObjectKeys = require('./keys')

var ObjectProperties = Object.getOwnPropertyNames
var ObjectPropertySymbols = Object.getOwnPropertySymbols
var ObjectPrototypeOf = Object.getPrototypeOf

function allProperties(obj, useProto) {
  if ( useProto === void 0 ) useProto = true;

  var proto = ObjectPrototypeOf(obj)
  return ObjectProperties(obj)
    .concat(ObjectPropertySymbols(obj))
    .concat(ObjectKeys(obj))
    .concat(proto ? allProperties(proto) : [])
}

module.exports = allProperties

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvcHMuanMiLCJzb3VyY2VzIjpbInByb3BzLmpzIl0sInNvdXJjZXNDb250ZW50IjpbImNvbnN0IE9iamVjdEtleXMgPSByZXF1aXJlKCcuL2tleXMnKVxuXG5jb25zdCBPYmplY3RQcm9wZXJ0aWVzID0gT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXNcbmNvbnN0IE9iamVjdFByb3BlcnR5U3ltYm9scyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHNcbmNvbnN0IE9iamVjdFByb3RvdHlwZU9mID0gT2JqZWN0LmdldFByb3RvdHlwZU9mXG5cbmZ1bmN0aW9uIGFsbFByb3BlcnRpZXMob2JqLCB1c2VQcm90byA9IHRydWUpIHtcbiAgY29uc3QgcHJvdG8gPSBPYmplY3RQcm90b3R5cGVPZihvYmopXG4gIHJldHVybiBPYmplY3RQcm9wZXJ0aWVzKG9iailcbiAgICAuY29uY2F0KE9iamVjdFByb3BlcnR5U3ltYm9scyhvYmopKVxuICAgIC5jb25jYXQoT2JqZWN0S2V5cyhvYmopKVxuICAgIC5jb25jYXQocHJvdG8gPyBhbGxQcm9wZXJ0aWVzKHByb3RvKSA6IFtdKVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGFsbFByb3BlcnRpZXNcbiJdLCJuYW1lcyI6WyJjb25zdCJdLCJtYXBwaW5ncyI6IkFBQUFBLEdBQUssQ0FBQyxVQUFVLEdBQUcsT0FBTyxDQUFDLFFBQVEsQ0FBQzs7QUFFcENBLEdBQUssQ0FBQyxnQkFBZ0IsR0FBRyxNQUFNLENBQUMsbUJBQW1CO0FBQ25EQSxHQUFLLENBQUMscUJBQXFCLEdBQUcsTUFBTSxDQUFDLHFCQUFxQjtBQUMxREEsR0FBSyxDQUFDLGlCQUFpQixHQUFHLE1BQU0sQ0FBQyxjQUFjOztBQUUvQyxTQUFTLGFBQWEsQ0FBQyxHQUFHLEVBQUUsUUFBZSxFQUFFLENBQVQ7cUNBQUEsR0FBRyxJQUFJO0FBQUc7RUFDNUNBLEdBQUssQ0FBQyxLQUFLLEdBQUcsaUJBQWlCLENBQUMsR0FBRyxDQUFDO0VBQ3BDLE9BQU8sZ0JBQWdCLENBQUMsR0FBRyxDQUFDO0tBQ3pCLE1BQU0sQ0FBQyxxQkFBcUIsQ0FBQyxHQUFHLENBQUMsQ0FBQztLQUNsQyxNQUFNLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0tBQ3ZCLE1BQU0sQ0FBQyxLQUFLLEdBQUcsYUFBYSxDQUFDLEtBQUssQ0FBQyxHQUFHLEVBQUUsQ0FBQztDQUM3Qzs7QUFFRCxNQUFNLENBQUMsT0FBTyxHQUFHLGFBQWE7In0=