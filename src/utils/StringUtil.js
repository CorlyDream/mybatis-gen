/**
 * 将name由下划线转成驼峰
 * @param name
 * @param startUp
 */
export function toCamel(name, startUp = false) {
  var arr = name.split('_')
  var str = arr[0]
  if (startUp) {
    str = arr[0].charAt(0).toUpperCase() + arr[0].slice(1)
  }
  for (var i = 1; i < arr.length; i++) {
    str += arr[i].charAt(0).toUpperCase() + arr[i].slice(1)
  }
  return str;
}

export function toJavaType(type) {
  switch (type.toUpperCase()) {
    case 'BIT':
    case 'BOOL':
      return 'Boolean'
    case 'TINYINT':
    case 'DATETIME':
    case 'DATE':
    case 'TIMESTAMP':
    case 'TIME':
    case 'YEAR':
      return 'Date'
    case 'DOUBLE':
    case 'DOUBLE':
    case 'REAL':
      return 'Double'
    case 'FLOAT':
    case 'FLOAT':
      return 'Float'
    case 'INT':
    case 'INTEGER':
      return 'Integer'
    case 'BIGINT':
    case 'DECIMAL':
    case 'DEC':
    case 'NUMERIC':
      return 'Long'
    case 'SMALLINT':
      return 'Short'
    case 'CHAR':
    case 'VARCHAR':
    case 'TINYTEXT':
      return 'String'
    default:
      return 'undefined'

  }


}
