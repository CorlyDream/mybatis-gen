<template>
  <div id="app" class="box box-column">
    <el-form :inline="true" :model="info" class="form-inline">
      <el-form-item>
        <el-button @click="showTable=true">表格</el-button>
      </el-form-item>
      <el-form-item label="实体类包名">
        <el-input v-model="info.entityPkg" placeholder="实体类包名" @blur="reparse"></el-input>
      </el-form-item>
      <el-form-item label="mapper包名">
        <el-input v-model="info.mapperPkg" placeholder="mapper包名" @blur="reparse"></el-input>
      </el-form-item>
      <el-form-item>
        <el-switch
          v-model="info.isTableFiled"
          active-color="#13ce66"
          inactive-color="#ff4949"
          @change="reparse"
          active-text="是否生成tableFiled注解">
        </el-switch>
      </el-form-item>
      <el-form-item>
        <el-switch
          v-model="info.autoScf"
          active-color="#13ce66"
          inactive-color="#ff4949"
          @change="reparse"
          active-text="autoScf">
        </el-switch>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="downloadZip">下载</el-button>
      </el-form-item>
    </el-form>

    <div class="box">
      <sql-editor class="left-panel" @blur="textAreaBlur" :table-str="tableStr"></sql-editor>
      <div class="right-panel">
        <el-collapse accordion>
          <el-collapse-item  v-for="(item,index) in parseObj" :key="index" :title="item.name + '.' + item.type">
            <pre v-highlightjs="item.str"><code :class="item.type"></code></pre>
          </el-collapse-item>
        </el-collapse>

      </div>
    </div>

    <el-dialog title="表格" :visible.sync="showTable" center>
      <el-tabs>
        <el-tab-pane label="Table">
          <div v-for="item in list">
            <h3>{{item.name}}</h3>
            <el-table :data="item.properties">
              <el-table-column property="name" label="名称"></el-table-column>
              <el-table-column property="typeDesc" label="类型"></el-table-column>
              <el-table-column property="defaultValue" label="默认值"></el-table-column>
              <el-table-column label="是否允许空">
                <template slot-scope="scope">
                  <span v-if="scope.row.isNull">是</span>
                  <span v-else>否</span>
                </template>
              </el-table-column>
              <el-table-column property="comment" label="备注"></el-table-column>
            </el-table>
          </div>
        </el-tab-pane>
        <el-tab-pane label="MarkDown">
          <pre id="markdown">{{markdown}}</pre>
        </el-tab-pane>
      </el-tabs>
    </el-dialog>
  </div>
</template>

<script>
  import SqlEditor from '@/components/sql-editor'
  import SqlParse from '@/utils/SqlParse'
  import Entity from '@/utils/Entity'
  import Mapper from '@/utils/Mapper'
  import JSZip from 'jszip'
  import {saveAs} from 'file-saver'

  export default {
    name: 'app',
    components: {
      SqlEditor
    },

    data() {
      var tableStr = 'CREATE TABLE `typecho_users` (\n' +
        '  `uid` int(10) unsigned NOT NULL AUTO_INCREMENT,\n' +
        '  `name` varchar(32) DEFAULT NULL COMMENT \'名称\',\n' +
        '  `password` varchar(64) DEFAULT NULL COMMENT \'密码\',\n' +
        '  `mail` varchar(200) DEFAULT NULL COMMENT \'邮箱\',\n' +
        '  `url` varchar(200) DEFAULT NULL COMMENT \'url地址\',\n' +
        '  `screen_name` varchar(32) DEFAULT NULL,\n' +
        '  `created` int(10) unsigned DEFAULT \'0\',\n' +
        '  `activated` int(10) unsigned DEFAULT \'0\',\n' +
        '  `logged` int(10) unsigned DEFAULT \'0\',\n' +
        '  `group` varchar(16) DEFAULT \'visitor\',\n' +
        '  `auth_code` varchar(64) DEFAULT NULL,\n' +
        '  PRIMARY KEY (`uid`),\n' +
        '  UNIQUE KEY `name` (`name`),\n' +
        '  UNIQUE KEY `mail` (`mail`)\n' +
        ') ENGINE=MyISAM AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;\n' +
        '// 建表语句末尾必须有分号'
      return {
        list: [],
        showTable: false,
        tableStr:tableStr,
        info: {
          entityPkg: "test",
          mapperPkg: "test",
          isToString: true,
          isTableFiled: true,
          autoScf: false
        },
        parseObj: []
      }
    },
    created(){
      var info = JSON.parse(localStorage.getItem("info"))
      if (info){
        this.info = info;
      }
      var tableStr = localStorage.getItem("tableStr");
      if (tableStr){
        this.tableStr = tableStr;
      }
    },
    computed: {
      markdown: function() {
        var str = ''
        for(var i=0; i<this.list.length; i++) {
          var table = this.list[i]
          str += (i+1)+'. '+table.name +'\n\n'
          str += '| 名称 | 类型 | 默认值| 是否允许空| 备注 |\n' +
                '| ---- | ---- | ---- | ----- | ---- |\n'
          for (var j=0; j<table.properties.length; j++) {
            var row = table.properties[j]
            var isNull = '否'
            if (row.isNull){
              isNull = '是'
            }
            var defaultValue = '   '
            if (row.defaultValue) {
              defaultValue = row.defaultValue
            }
            var comment = '   '
            if (row.comment){
              comment = row.comment
            }
            str += '|'+row.name + '|' + row.typeDesc + '|' + defaultValue +'|' + isNull +'|'+comment+'| \n'
          }
          str += '\n\n'
        }
        return str
      }
    },
    methods: {
      textAreaBlur(newValue, changeObj) {
        this.list = SqlParse.parse(newValue);
        this.reparse();
        // 缓存包配置和sql
        localStorage.setItem("tableStr", newValue);
      },
      reparse(){
        localStorage.setItem("info", JSON.stringify(this.info));
        this.parseObj = []
        this.list.forEach((item) => {
          this.parseObj.push(Entity.parse(item, this.info.entityPkg, this.info.isTableFiled, this.info.autoScf));
          this.parseObj.push(Mapper.parseJava(item, this.info.entityPkg, this.info.mapperPkg));
          this.parseObj.push(Mapper.parseXML(item, this.info.entityPkg, this.info.mapperPkg));
        })
      },
      downloadZip(){
        var zip = new JSZip();
        this.parseObj.forEach((item)=>{
          var path = item.pkg.split(".").join("/");
          var folder = zip.folder(path);
          folder.file(item.name+'.'+item.type, item.str)
        })
        zip.generateAsync({type:"blob"}).then(function(content) {
          // `
          saveAs(content, "mybatis-gen.zip");
        });

      }
    }
  }
</script>

<style lang="scss">
  .form-inline {
    margin: 15px;
  }

  .box {
    display: -webkit-flex; /* Safari */
    display: flex;
  }

  .box-column {
    flex-direction: column;
  }


  .left-panel, .right-panel {
    flex-grow: 1;
  }

  .left-panel{
    max-width: 40%;
  }
  .right-panel{
    max-width: 60%;
    overflow-x: hidden;
  }

  .right-panel {
    background-color: #77ee77;
  }
  pre code{
    font-size: 12px;
    line-height: 12px;
    overflow-x: scroll;
  }
</style>
