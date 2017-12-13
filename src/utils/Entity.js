import {toCamel} from "@/utils/StringUtil";

var entity = {
  name:'',
  parse: function (table) {
    this.name = toCamel(table.name);
    var str = 'public class '+this.name + ' {\n';
    var properties = table.properties;

    for (var i=0; i<properties.length; i++) {
      var item = properties[i]
      if (item.comment){
        str += '    /**\n' +
               '     * ' + item.comment + '\n'
               '     */\n'
      }

    }

  }
}
