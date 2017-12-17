<template>
  <div>
    <textarea id="sql-code" name="sql-code" >
CREATE TABLE `typecho_users` (
  `uid` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(32) DEFAULT NULL COMMENT '名称',
  `password` varchar(64) DEFAULT NULL COMMENT '密码',
  `mail` varchar(200) DEFAULT NULL COMMENT '邮箱',
  `url` varchar(200) DEFAULT NULL COMMENT 'url地址',
  `screen_name` varchar(32) DEFAULT NULL,
  `created` int(10) unsigned DEFAULT '0',
  `activated` int(10) unsigned DEFAULT '0',
  `logged` int(10) unsigned DEFAULT '0',
  `group` varchar(16) DEFAULT 'visitor',
  `auth_code` varchar(64) DEFAULT NULL,
  PRIMARY KEY (`uid`),
  UNIQUE KEY `name` (`name`),
  UNIQUE KEY `mail` (`mail`)
) ENGINE=MyISAM AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;
// 建表语句末尾必须有分号
    </textarea>
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
        const _this = this
        _this.$emit("blur", window.editor.getValue())
        window.editor.on("blur", function (codeMirror, changeObj) {
          _this.$emit("blur", codeMirror.getValue(), changeObj)
        })

      }
    }

  }
</script>
