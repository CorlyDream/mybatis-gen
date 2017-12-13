<template>
  <div id="app" class="box">
    <sql-editor class="left-panel" v-model="value"></sql-editor>
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
        value: "",
        list:[]
      }
    },
    created(){
      this.setDefaultValue()
    },
    methods:{
      setDefaultValue(){
        this.value = 'CREATE TABLE `typecho_users` (\n' +
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
