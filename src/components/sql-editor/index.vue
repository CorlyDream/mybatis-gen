<template>
  <div>
    <textarea id="sql-code" name="sql-code" v-model="tableStr"></textarea>
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
    props: {
      tableStr :{
        type: String,
        required: true
      }
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
