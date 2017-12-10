<template>
  <div>
    <textarea id="sql-code" name="sql-code" v-model="textValue"></textarea>
  </div>
</template>
<script>
  import '@/components/sql-editor/lib/codemirror.css'
  import '@/components/sql-editor/lib/show-hint.css'
  import CodeMirror from '@/components/sql-editor/lib/codemirror.js'
  import '@/components/sql-editor/lib/sql.js'
  import SqlHint from '@/components/sql-editor/lib/show-hint.js'
  import '@/components/sql-editor/lib/sql-hint.js'

  export default {
    name: "sql-editor",
    props: {
      textValue:{
        type:String,
        default: 'CREATE TABLE `company_store_mapping_queue` (\n' +
        '  `id` bigint(20) NOT NULL AUTO_INCREMENT COMMENT \'自增ID\',\n' +
        '  `company_id` bigint(20) NOT NULL DEFAULT \'0\' COMMENT \'集客家门店id\',\n' +
        '  `crm_company_id` bigint(20) NOT NULL DEFAULT \'0\' COMMENT \'CRM公司id\',\n' +
        '  `status` tinyint(2) NOT NULL DEFAULT \'0\' COMMENT \'状态，0-待处理，1-处理中，2-已处理，3-处理失败\',\n' +
        '  `type` tinyint(2) NOT NULL DEFAULT \'0\' COMMENT \'类型,1-关联公司，2-解除关联\',\n' +
        '  `city_id` int(10) NOT NULL DEFAULT \'0\' COMMENT \'城市ID\',\n' +
        '  `store_map_sum` bigint(20) NOT NULL DEFAULT \'0\' COMMENT \'实际处理的门店数量\',\n' +
        '  `create_time` int(10) NOT NULL DEFAULT \'0\' COMMENT \'创建时间戳\',\n' +
        '  `update_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT \'最后更新时间，无需插入，系统自动更新\',\n' +
        '  `resource` tinyint(1) NOT NULL DEFAULT \'0\' COMMENT \'来源（枚举值详见字典表type=company_store_mapping_resource）\',\n' +
        '  `origin_crm_com_id` bigint(20) NOT NULL DEFAULT \'0\' COMMENT \'原CRM公司ID\',\n' +
        '  PRIMARY KEY (`id`),\n' +
        '  KEY `idx_s_c` (`status`,`company_id`)\n' +
        ') ENGINE=MyISAM AUTO_INCREMENT=111 DEFAULT CHARSET=utf8 COMMENT=\'CRM同步集客家公司门店处理队列表\';'
      }
    },
    data() {
      return {

      }
    },
    mounted(){
      this.init();
      console.log(CodeMirror.tables)
    },
    methods: {
      init(){
        var mime = 'text/x-mysql';
        window.editor = CodeMirror.fromTextArea(document.getElementById('sql-code'), {
          mode: mime,
          indentWithTabs: true,
          smartIndent: true,
          lineNumbers: true,
          matchBrackets : true,
          autofocus: true,
          extraKeys: {"Ctrl-Space": "autocomplete"},
          hintOptions: {tables: {
              users: ["name", "score", "birthDate"],
              countries: ["name", "population", "size"]
            }}
        });
      }
    }

  }
</script>
