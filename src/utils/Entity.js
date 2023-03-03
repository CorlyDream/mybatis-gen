import {toCamel,toJavaType} from "@/utils/StringUtil";


export default {
  parse: function (table, entityPkg, isTableFiled, autoScf, lombok) {
    var name = toCamel(table.name, true) + table.nameSuffix;
    var str = '';
    if(isTableFiled){
      str += 'import com.baomidou.mybatisplus.annotation.TableField;\n' +
            'import com.baomidou.mybatisplus.annotation.TableName;\n';
    }
    if (lombok) {
      str += 'import lombok.Data;\n\n@Data\n';
    }
    if (isTableFiled) {
      str += `@TableName("${table.name}")\n`
    }
    if (autoScf) {
      str += `@SCFSerializable\n`;
    }
    str += 'public class ' + name + ' {\n\n';
    var properties = table.properties;
    var hasDateType = false;
    var hasBigDecimal = false;
    for (var i=0; i<properties.length; i++) {
      var item = properties[i];
      if (item.comment){
        str += '    /**\n' +
               '     * ' + item.comment + '\n' +
               '     */\n'
      }
      if (isTableFiled) {
        str += `    @TableField("${item.name}")\n`;
      }
      if (autoScf) {
        str += `    @SCFMember(orderId = ${i + 1})\n`;
      }
      var type = toJavaType(item.type);
      if (type == 'Date'){
        hasDateType = true;
      }
      if (type == 'BigDecimal') {
        hasBigDecimal = true;
      }
      str += `    private ${type} ${toCamel(item.name)};\n\n`
    }
    if (hasDateType){
      str = 'import java.util.Date;\n' + str;
    }
    if (hasBigDecimal) {
      str = 'import java.math.BigDecimal;\n' + str;
    }
    str = `package ${entityPkg};\n\n${str}`;
    if(!lombok) {
      for(var i=0; i<properties.length; i++) {
        var item = properties[i]
        var type = toJavaType(item.type)
        str += `    public void set${toCamel(item.name, true)}(${type} ${toCamel(item.name)}){\n`
        str += `        this.${toCamel(item.name)} = ${toCamel(item.name)};\n`;
        str += '    }\n\n'
  
        str += `    public ${type} get${toCamel(item.name, true)}(){\n`
        str += `        return this.${toCamel(item.name)};\n`
        str += '    }\n\n'
      }
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
