<template>
  <div>
    <textarea id="sql-code" name="sql-code" :value="value"></textarea>
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
      value:{
        type:String,
        default: 'CREATE TABLE `typecho_users` (\n' +
        '  `uid` int(10) unsigned NOT NULL AUTO_INCREMENT,\n' +
        '  `name` varchar(32) DEFAULT NULL,\n' +
        '  `password` varchar(64) DEFAULT NULL,\n' +
        '  `mail` varchar(200) DEFAULT NULL,\n' +
        '  `url` varchar(200) DEFAULT NULL,\n' +
        '  `screenName` varchar(32) DEFAULT NULL,\n' +
        '  `created` int(10) unsigned DEFAULT \'0\',\n' +
        '  `activated` int(10) unsigned DEFAULT \'0\',\n' +
        '  `logged` int(10) unsigned DEFAULT \'0\',\n' +
        '  `group` varchar(16) DEFAULT \'visitor\',\n' +
        '  `authCode` varchar(64) DEFAULT NULL,\n' +
        '  PRIMARY KEY (`uid`),\n' +
        '  UNIQUE KEY `name` (`name`),\n' +
        '  UNIQUE KEY `mail` (`mail`)\n' +
        ') ENGINE=MyISAM AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;\n' +
        '// 建表语句末尾必须有分号'
      }
    },
    data() {
      return {

      }
    },
    mounted(){
      this.init();
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
        window.editor.on("change", function () {
          console.log(arguments)
        })

      }
    }

  }
</script>
