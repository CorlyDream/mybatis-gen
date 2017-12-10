<template>
  <div id="app" class="box">
    <sql-editor class="left-panel"></sql-editor>
    <div class="right-panel"></div>
  </div>
</template>

<script>
  import SqlEditor from '@/components/sql-editor'

  export default {
    name: 'app',
    components: {
      SqlEditor
    },
    data() {
      return {
        msg: 'Welcome to Your Vue.js App'
      }
    }
  }
</script>

<style lang="scss">
  .box {
    display: -webkit-flex; /* Safari */
    display: flex;
  }

  .left-panel, .right-panel {
    flex-grow: 1;
  }
  .left-panel{
    max-width: 50%;
  }

  .right-panel {
    background-color: #77ee77;
  }
</style>
