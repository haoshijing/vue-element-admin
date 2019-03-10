<template>
  <div class="app-container calendar-list-container">

    <el-table :data="list" v-loading="listLoading" element-loading-text="loadding" border fit highlight-current-row
              style="width: 100%">

      <el-table-column align="center" label="Address">
        <template scope="scope">
          <span>{{scope.row.Address}}</span>
        </template>
      </el-table-column>

      <el-table-column label="Version ">
        <template scope="scope">
          <span>{{scope.row.Version }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="ScrollMessage">
        <template scope="scope">
          <span>{{scope.row.ScrollMessage}}</span>
        </template>
      </el-table-column>

      <el-table-column label="OnlineCount">
        <template scope="scope">
          <span>{{scope.row.OnlineCount}}</span>
        </template>
      </el-table-column>


      <el-table-column label="RegisterCount">
        <template scope="scope">
          <span>{{scope.row.RegisterCount}}</span>
        </template>
      </el-table-column>

      <el-table-column label="operator">
        <template scope="scope">
          <el-button size="small" type="success" @click="handleUpdate(scope.row)">edit
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog :visible.sync="dialogFormVisible">
      <el-form class="small-space" :model="temp" label-position="left" label-width="140px"
               style='width: 400px; margin-left:50px;'>
        <el-form-item label="Version">
          <el-input v-model="temp.version" ></el-input>
        </el-form-item>
        <el-form-item label="Notice">
          <el-input v-model="temp.notice"></el-input>
        </el-form-item>

        <el-form-item label="ScrollMessage">
          <el-input v-model="temp.scrollMessage"></el-input>
        </el-form-item>

        <el-form-item label="AndroidUpdateUrl">
          <el-input v-model="temp.androidUpdateUrl"></el-input>
        </el-form-item>

        <el-form-item label="IOSUpdateUrl">
          <el-input v-model="temp.iOSUpdateUrl"></el-input>
        </el-form-item>

        <el-form-item label="SoundUpLoadUrl">
          <el-input v-model="temp.soundUpLoadUrl"></el-input>
        </el-form-item>


        <el-form-item label="SoundDownLoadUrl">
          <el-input v-model="temp.soundDownLoadUrl"></el-input>
        </el-form-item>

        <el-form-item label="WXShareUrl">
          <el-input v-model="temp.wXShareUrl"></el-input>
        </el-form-item>

        <el-form-item label="ResourceDownLoadUrl">
          <el-input v-model="temp.resourceDownLoadUrl"></el-input>
        </el-form-item>

        <el-form-item label="CreateDefaultMoney">
          <el-input v-model="temp.createDefaultMoney"></el-input>
        </el-form-item>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">Cancel</el-button>
        <el-button type="primary" @click="updateConfig">Ok</el-button>
      </div>

    </el-dialog>

  </div>
</template>

<script>
  import waves from '@/directive/waves/index.js' // 水波纹指令
  import { queryConfigData, updateConfigData } from '@/api/config'

  export default {
    name: 'gameConfig',
    directives: {
      waves
    },
    data() {
      return {
        list: [],
        total: 0,
        listLoading: false,
        dialogFormVisible: false,
        listQuery: {},
        temp: {}
      }
    },
    filters: {},
    created() {
      this.getList()
    },
    methods: {
      handleFilter() {
        this.getList()
      },
      getList() {
        queryConfigData().then(resp => {
          this.list = resp.data.data
        })
      },
      handleUpdate(row) {
        this.dialogFormVisible = true
        this.temp = {
          'address': row.Address,
          'version': row.Version,
          'updateMessage': row.UpdateMessage,
          'scrollMessage': row.ScrollMessage,
          'androidUpdateUrl': row.AndroidUpdateUrl,
          'iOSUpdateUrl': row.OSUpdateUrl,
          'soundUpLoadUrl': row.SoundUpLoadUrl,
          'soundDownLoadUrl': row.SoundDownLoadUrl,
          'wXShareUrl': row.WXShareUrl,
          'resourceDownLoadUrl': row.ResourceDownLoadUrl,
          'createDefaultMoney': row.CreateDefaultMoney
        }
      },
      handleSizeChange(val) {
        this.listQuery.limit = val
        this.getList()
      },
      handleCurrentChange(val) {
        this.listQuery.page = val
        this.getList()
      },
      updateConfig() {
        updateConfigData(this.temp).then(resp => {
          const updateRet = resp.data.data
          if (updateRet) {
            this.dialogFormVisible = false
            this.getList()
            this.$message({
              message: 'success',
              type: 'success'
            })
          } else {
            this.$message({
              message: 'fail',
              type: 'error'
            })
          }
        })
      }
    }
  }
</script>
