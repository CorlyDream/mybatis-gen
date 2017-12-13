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

var sql = '   CREATE TABLE `company_store_mapping_queue` (\n' +
  '  `id` bigint(20) NOT NULL AUTO_INCREMENT COMMENT \'自增ID\',\n' +
  '  `company_id` bigint(20) NOT NULL DEFAULT \'0\' COMMENT \'集客家门店id\',\n' +
  '  `create_time` int(10) NOT NULL DEFAULT \'0\' COMMENT \'创建时间戳\',\n' +
  '  `update_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT \'最后更新时间，无需插入，系统自动更新\',\n' +
  '  `resource` tinyint(1) NOT NULL DEFAULT \'0\' COMMENT \'来源（枚举值详见字典表type=company_store_mapping_resource）\',\n' +
  '  `origin_crm_com_id` bigint(20) NOT NULL DEFAULT \'0\' COMMENT \'原CRM公司ID\',\n' +
  '  PRIMARY KEY (`id`),\n' +
  '  KEY `idx_s_c` (`status`,`company_id`)\n' +
  ') ENGINE=MyISAM AUTO_INCREMENT=111 DEFAULT CHARSET=utf8 COMMENT=\'CRM同步集客家公司门店处理队列表\';\n' +
  '\n' +
  '\n' +
  'CREATE TABLE `clue_origin_mapping_8` (\n' +
  '  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,\n' +
  '  `buss_type` varchar(200) NOT NULL DEFAULT \'\' COMMENT \'扩展信息\',\n' +
  '  `origin_id` varchar(60) NOT NULL DEFAULT \'\' COMMENT \'源ID\',\n' +
  '  `create_time` timestamp NOT NULL DEFAULT \'0000-00-00 00:00:00\',\n' +
  '  `upate_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,\n' +
  '  PRIMARY KEY (`id`),\n' +
  '  UNIQUE KEY `uniq_origin_id` (`origin_id`,`origin_source`,`buss_type`)\n' +
  ') ENGINE=MyISAM AUTO_INCREMENT=235 DEFAULT CHARSET=utf8 COMMENT=\'线索与线索源关系表(0-9 共10个分表)\';'

// parse.parse(sql)

export default parse
