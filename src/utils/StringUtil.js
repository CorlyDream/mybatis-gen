/**
 * 将name由下划线转成驼峰
 * @param name
 * @param startUp
 */
export function toCamel(name, startUp=false) {
  var arr = name.split('_')
  var str = arr[0]
  if (startUp){
    str = arr[0].charAt(0).toUpperCase()+arr[0].slice(1)
  }
  for(var i=1; i<arr.length; i++) {
    str += arr[i].charAt(0).toUpperCase()+arr[i].slice(1)
  }
  return str;
}

const typeMap = new Map()
typeMap.set()
