<template>
  <div class="app-container calendar-list-container">
    <el-table :data="list" v-loading="listLoading" element-loading-text="loadding" border fit highlight-current-row
              style="width: 100%">

      <el-table-column align="center" label="Guid">
        <template scope="scope">
          <span>{{scope.row.Guid}}</span>
        </template>
      </el-table-column>


      <el-table-column label="Nickname">
        <template scope="scope">
          <span>{{scope.row.Nick}}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="HeadId">
        <template scope="scope">
          <span>{{scope.row.HeadId}}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="InitMoney">
        <template scope="scope">
          <span>{{scope.row.InitMoney}}</span>
        </template>
      </el-table-column>


      <el-table-column align="center" label="WinPercent">
        <template scope="scope">
          <span>{{scope.row.WinPercent}}</span>
        </template>
      </el-table-column>


      <el-table-column align="center" label="CreateTime">
        <template scope="scope">
          <span>{{scope.row.CreateTime}}</span>
        </template>
      </el-table-column>


      <el-table-column  label="operator">
        <template scope="scope">
          <el-button  size="small" type="success" @click="handleUpdate(scope.row)">edit
          </el-button>
        </template>
      </el-table-column>

    </el-table>

    <el-dialog  :visible.sync="updateFormVisible">
      <el-form class="small-space" :model="temp" label-position="left" label-width="70px" style='width: 400px; margin-left:50px;'>
        <el-form-item label="Guid">
          <span>{{temp.Guid}}</span>
        </el-form-item>

        <el-form-item label="InitMoney">
          <el-input v-model="temp.InitMoney"></el-input>
        </el-form-item>

        <el-form-item label="WinPercent">
          <el-input v-model="temp.WinPercent" ></el-input>
        </el-form-item>


      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="updateFormVisible = false">Cancel</el-button>
        <el-button type="primary" @click="updateRobot">Ok</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import waves from '@/directive/waves/index.js' // 水波纹指令
  import { queryRobotData } from '@/api/robot'

  export default {
    name: 'robotList',
    directives: {
      waves
    },
    data() {
      return {
        updateFormVisible: false,
        list: [],
        total: 0,
        listLoading: false,
        dialogFormVisible: false,
        listQuery: {
          page: 1,
          limit: 10
        },
        temp: {}
      }
    },
    filters: {},
    created() {
      this.getList()
    },
    methods: {
      handleFilter() {

      },
      getList() {
        queryRobotData(this.listQuery).then(resp => {
          this.list = resp.data.data.datas
          this.total = resp.data.data.totalCount
        })
      },
      handleSizeChange(val) {
        this.listQuery.limit = val
        this.getList()
      },
      handleCurrentChange(val) {
        this.listQuery.page = val
        this.getList()
      },
      handleUpdate(row) {
        this.updateFormVisible = true
        this.temp = row
      },
      updateRobot() {
        this.updateFormVisible = false
      }
    }
  }
</script>
