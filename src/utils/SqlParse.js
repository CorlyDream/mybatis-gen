function TableObject(name) {
  this.name = name;
  this.properties = [];
  this.addProperty = function(source, name, type, typeDesc, isNull, defaultValue, comment, isUnsigned = false)
  {
    this.properties.push({
      source: source,
      name: name,
      type: type,
      typeDesc: type+typeDesc,
      isNull: isNull,
      defaultValue: defaultValue,
      comment: comment,
      isUnsigned: isUnsigned
    })
  }
}

var parse = {
  regexCreate: new RegExp('create\\s+table\\s+`?(\\w+)`?\\s*(\\([^;]+)', 'gi'),
  regexLine: new RegExp('`?(\\w+)`?\\s+(TINYINT|BIT|BOOL|SMALLINT|INT|INTEGER|BIGINT|FLOAT|FLOAT|DOUBLE|DOUBLE|REAL|DECIMAL|DEC|NUMERIC|CHAR|VARCHAR|TINYBLOB|TINYTEXT|BLOB|TEXT|MEDIUMBLOB|MEDIUMTEXT|LONGBLOB|LONGTEXT|ENUM|SET|DATETIME|DATE|TIMESTAMP|TIME|YEAR)(\\(\\d*\\))?\\s+(unsigned)?\\s*(not\\s+null)?\\s*(?:default\\s*[\'"]?([\\d-\\s:]+|\\w*)[\'"]?)?\\s*(?:auto_increment|\\s*primary\\s+key)*\\s*(?:on\\s+update\\s+current_timestamp\\s+)?(?:comment\\s+[\'"](.*)[\'"])?', 'i'),
  list: [],
  parse(str) {
    this.list = []

    var table;
    while (table = this.regexCreate.exec(str)) {
      if (table.length < 3) {
        console.log("regex not match create sql:" + table)
        continue
      }
      var obj = this._table2Obj(table[1], table[2])

      this.list.push(obj)
    }
    console.log(this.list)
    return this.list
  },
  _table2Obj(name, body) {
    /**
     * @return 返回一个属性数组
     */
      // 替换换行符
    var obj = new TableObject(name)
    var lines = body.split('\n')
    // 第0个是(
    for(var i=0; i<lines.length; i++) {
      var line = lines[i]
      var group = line.match(this.regexLine)
      if (group) {
        var isUnsigned = false;
        if (group[4]){
          isUnsigned = true
        }
        var isNull = true
        if (group[5])
          isNull = false

        obj.addProperty(group[0], group[1], group[2], group[3], isNull, group[6], group[7], isUnsigned)
      }
    }
    return obj
  }

};

// parse.parse(sql)

export default parse
