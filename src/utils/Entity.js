import {toCamel,toJavaType} from "@/utils/StringUtil";


export default {
  parse: function (table, entityPkg) {
    var name = toCamel(table.name, true);
    var str = `package ${entityPkg};\n\n` +
      'import java.io.Serializable;\n\n' +
      'public class '+name + ' implements Serializable {\n\n' +
      '    private static final long serialVersionUID = 1L;\n';
    var properties = table.properties;
    var hasDateType = false;
    for (var i=0; i<properties.length; i++) {
      var item = properties[i];
      if (item.comment){
        str += '    /**\n' +
               '     * ' + item.comment + '\n' +
               '     */\n'
      }
      var type = toJavaType(item.type)
      if (type == 'Date'){
        hasDateType = true;
      }
      str += `    private ${type} ${toCamel(item.name)};\n\n`
    }
    if (hasDateType){
      str = 'import java.util.Date;\n' + str;
    }

    for(var i=0; i<properties.length; i++) {
      var item = properties[i]
      var type = toJavaType(item.type)
      str += `    public void set${toCamel(item.name, true)}(${type} ${toCamel(item.name)}){\n`
      str += `        this.${toCamel(item.name)} = ${toCamel(item.name)}\n`;
      str += '    }\n\n'

      str += `    public ${type} get${toCamel(item.name, true)}(){\n`
      str += `        return this.${toCamel(item.name)}\n`
      str += '    }\n\n'
    }

    str += '}'
    return {
      type: "java",
      name:name,
      str: str,
      pkg: entityPkg
    }
  }
}
