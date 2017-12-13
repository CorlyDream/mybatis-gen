<template>
  <div id="app" class="box box-column">
    <el-form :inline="true" :model="info" class="form-inline">
      <el-form-item>
        <el-button @click="showTable=true">表格</el-button>
      </el-form-item>
      <el-form-item label="实体类包名">
        <el-input v-model="info.entityPackage" placeholder="实体类包名"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary">查询</el-button>
      </el-form-item>
    </el-form>

    <div class="box">
      <sql-editor class="left-panel" @blur="textAreaBlur"></sql-editor>
      <div class="right-panel"></div>
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
          <pre>{{markdown}}</pre>
        </el-tab-pane>
      </el-tabs>
    </el-dialog>
  </div>
</template>

<script>
  import SqlEditor from '@/components/sql-editor'
  import SqlParse from '@/utils/SqlParse'

  export default {
    name: 'app',
    components: {
      SqlEditor
    },
    data() {
      return {
        list: [],
        showTable: false,
        info: {
          entityPackage: "",
          interfacePackage: "",
          xmlPackage: "",
          isToString: true
        }
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
        this.list = SqlParse.parse(newValue)
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

  .left-panel {
    max-width: 50%;
  }

  .right-panel {
    background-color: #77ee77;
  }
</style>
