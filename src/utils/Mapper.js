import {toCamel,toJavaType} from "@/utils/StringUtil";

export default {
  parseJava(table, entityPkg, mapperPkg){
    var name = toCamel(table.name, true);
    var mapperName = name +'Mapper';
    var str = `package ${mapperPkg};\n\n`;
    str += 'import java.util.List;\n';
    str += `import ${entityPkg}.${name};\n\n`;

    str += `public interface ${mapperName}{\n\n`;
    str += `    int insertSelective(${name} ${toCamel(table.name)});\n\n`;
    // str += `    List<${name}> selectByExample(${name} ${toCamel(table.name)});\n\n`
    str += '}'
    return {
      type: 'java',
      name: mapperName,
      str: str,
      pkg: mapperPkg
    }
  },
  parseXML(table, entityPkg, mapperPkg){
    var name = toCamel(table.name, true)
    var mapperName = name + "Mapper";
    var str = '<?xml version="1.0" encoding="UTF-8"?>\n' +
      '<!DOCTYPE mapper PUBLIC "-//mybatis.org//DTD Mapper 3.0//EN" "http://mybatis.org/dtd/mybatis-3-mapper.dtd">\n'
    str += `<mapper namespace="${mapperPkg}.${mapperName}">\n`
    str += `  <resultMap id="BaseResultMap" type="${entityPkg}.${name}">\n`
    table.properties.forEach((item) => {
      str += `    <result column="${item.name}" jdbcType="${item.type}" property="${toCamel(item.name)}" />\n`
    })
    str += '  </resultMap>\n';

    str += '  <sql id="Base_Column_List">\n    ';
    table.properties.forEach((item)=>{
      if (item.name.match('_')) {
        str += `${item.name} AS ${toCamel(item.name)},`
      }else {
        str += `${item.name},`
      }
    });
    str = str.slice(0, -1);
    str += '\n  </sql>\n'

    str += `  <insert id="insertSelective">\n`;
    str += `    insert into ${table.name}\n`;
    str += '    <trim prefix="(" suffix=")" suffixOverrides=",">\n';
    table.properties.forEach((item) => {
      str += `      <if test="${toCamel(item.name)} != null"> ${item.name},</if>\n`;
    })
    str += '    </trim>\n'
    str += '    <trim prefix="values (" suffix=")" suffixOverrides=",">\n';
    table.properties.forEach((item) => {
      str += `      <if test="${toCamel(item.name)} != null"> #{${toCamel(table.name)}},</if>\n`;
    })
    str += '    </trim>\n';
    str += '  </insert>\n';


    str += '</mapper>';

    return {
      type: "xml",
      name: mapperName,
      str: str,
      pkg: mapperPkg
    }


  }
}
