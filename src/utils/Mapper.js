import {toCamel} from "@/utils/StringUtil";

export default {
  parseJava(table, entityPkg, mapperPkg, isTableFiled){
    var name = toCamel(table.name, true);
    var mapperName = name +'Mapper';
    var str = `package ${mapperPkg};\n\n`;
    str += `import ${entityPkg}.${name+table.nameSuffix};\n`;
    if(isTableFiled){
      str += 'import com.baomidou.mybatisplus.core.mapper.BaseMapper;\n';
    }else{
      str += 'import java.util.List;\n';
    }
    str += '\n';

    str += `public interface ${mapperName} `
    if(isTableFiled){
      str += 'extends BaseMapper<'+name+'Entity>';
    }
    str += ' {\n\n';
    if(!isTableFiled){
      str += `    int insertSelective(${name+ table.nameSuffix} ${toCamel(table.name)});\n\n`;
      str += `    int updateByIdSelective(${name+ table.nameSuffix} ${toCamel(table.name)});\n\n`;
    }

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
    var name = toCamel(table.name, true);
    var mapperName = name + "Mapper";
    var str = '<?xml version="1.0" encoding="UTF-8"?>\n' +
      '<!DOCTYPE mapper PUBLIC "-//mybatis.org//DTD Mapper 3.0//EN" "http://mybatis.org/dtd/mybatis-3-mapper.dtd">\n'
    str += `<mapper namespace="${mapperPkg}.${mapperName}">\n`;
    str += `  <resultMap id="BaseResultMap" type="${entityPkg}.${name + table.nameSuffix}">\n`;
    table.properties.forEach((item) => {
      str += `    <result column="${item.name}" property="${toCamel(item.name)}" />\n`
    });
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

    str += `  <insert id="insertSelective" parameterType="${entityPkg}.${name+ table.nameSuffix}">\n`;
    str += `    INSERT INTO ${table.name}\n`;
    str += '    <trim prefix="(" suffix=")" suffixOverrides=",">\n';
    table.properties.forEach((item) => {
      str += `      <if test="${toCamel(item.name)} != null"> ${item.name},</if>\n`;
    });
    str += '    </trim>\n'
    str += '    <trim prefix="values (" suffix=")" suffixOverrides=",">\n';
    table.properties.forEach((item) => {
      str += `      <if test="${toCamel(item.name)} != null"> #{${toCamel(item.name)}},</if>\n`;
    });
    str += '    </trim>\n';
    str += '  </insert>\n';

    str += '\n\n';

    str += `  <update id="updateByIdSelective" parameterType="${entityPkg}.${name + table.nameSuffix}">\n`;
    str += `    update ${table.name}\n`;
    str += `    <set>\n`;

    table.properties.forEach((item) => {
      if (item != "id") {
        str += `        <if test="${toCamel(item.name)} != null"> ${item.name} = #{${toCamel(item.name)}},</if>\n`;
      }
    });

    str += `    </set>\n`;
    str += `    WHERE id=#{id}\n`;
    str += `  </update>\n`;
    str += '</mapper>';

    return {
      type: "xml",
      name: mapperName,
      str: str,
      pkg: mapperPkg
    }


  }
}
