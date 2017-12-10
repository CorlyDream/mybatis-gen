<template>
  <div>
    <textarea id="sql-code" name="sql-code">-- SQL Mode for CodeMirror
    SELECT SQL_NO_CACHE DISTINCT

      -- space needed after '--'
      # 1 line comment
      /* multiline
      comment! */
      LIMIT 1 OFFSET 0;
    </textarea>
  </div>
</template>
<script>
  import '@/components/sql-editor/lib/codemirror.css'
  import '@/components/sql-editor/lib/show-hint.css'
  import CodeMirror from '@/components/sql-editor/lib/codemirror.js'
  import '@/components/sql-editor/lib/sql.js'
  import '@/components/sql-editor/lib/show-hint.js'
  import '@/components/sql-editor/lib/sql-hint.js'

  export default {
    name: "sql-editor",
    data() {
      return {

      }
    },
    mounted(){
      this.init();
    },
    methods: {
      init(){
        var mime = 'text/x-mariadb';
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
