<template>
  <div class="app-container calendar-list-container">
    <!--添加-->
    <el-button  size="medium" type="success" @click="addRobot()">create
    </el-button><p></p>
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


      <el-table-column align="center" label="WinPermillage">
        <template scope="scope">
          <span>{{scope.row.WinPercent}}</span>
        </template>
      </el-table-column>


      <el-table-column align="center" label="CreateTime">
        <template scope="scope">
          <span>{{scope.row.CreateTime}}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="CreateTime">
        <template scope="scope">
          <el-button  size="medium" type="success" @click="handleUpdate(scope.row)">edit
          </el-button>
        </template>
      </el-table-column>


    </el-table>
    <div v-show="!listLoading" class="pagination-container">
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="listQuery.page"
                     :page-sizes="[10,20,30, 50]" :page-size="listQuery.limit" layout="total, sizes, prev, pager, next, jumper" :total="total">
      </el-pagination>
    </div>

    <el-dialog  :visible.sync="updateFormVisible">
      <el-form class="small-space" :model="temp" label-position="left" label-width="70px" style='width: 400px; margin-left:50px;'>
        <el-form-item label="Guid">
          <span>{{temp.guid}}</span>
        </el-form-item>

        <el-form-item label="InitMoney">
          <el-input v-model="temp.initMoney"></el-input>
        </el-form-item>

        <el-form-item label="WinPermillage">
          <el-input v-model="temp.winPercent" ></el-input>
        </el-form-item>


      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="updateFormVisible = false">Cancel</el-button>
        <el-button type="primary" @click="updateRobot">Ok</el-button>
      </div>
    </el-dialog>

    <!--模态框-->
    <el-dialog  :visible.sync="createRobotFormVisible">
      <el-form class="small-space" :model="temp" label-position="left"
               label-width="120px" style='width: 400px; margin-left:60px;'>

        <el-form-item label="nick">
          <el-input v-model="temp.nick"></el-input>
        </el-form-item>

        <el-form-item label="avatar">
          <el-input v-model="temp.avatar"></el-input>
        </el-form-item>
        <el-form-item label="InitMoney">
          <el-input v-model="temp.money"></el-input>
        </el-form-item>

        <el-form-item label="WinPercent">
          <el-input v-model="temp.win" ></el-input>
        </el-form-item>


      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="createRobotFormVisible = false">Cancel</el-button>
        <el-button type="primary" @click="createRobot">Ok</el-button>
      </div>
    </el-dialog>


  </div>
</template>

<script>
  import waves from '@/directive/waves/index.js' // 水波纹指令
  import { queryRobotData, createRobotPlayer, updateRobotConfig } from '@/api/robot'
  export default {
    name: 'robotList',
    directives: {
      waves
    },
    data() {
      return {
        createRobotFormVisible: false,
        list: [],
        total: 0,
        listLoading: false,
        updateFormVisible: false,
        listQuery: {
          page: 1,
          limit: 10
        },
        temp: {},
        created: {}
      }
    },
    filters: {},
    created() {
      this.getList()
    },
    methods: {
      setValue(index, key) {
        this.changeRobotIndex = [index, key]
      },
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
      handleUpdate(data) {
        this.updateFormVisible = true
        this.temp.guid = data.Guid
        this.temp.initMoney = data.InitMoney
        this.temp.winPercent = data.WinPermillage
      },
      updateRobot() {
        updateRobotConfig(this.temp).then(resp => {
          this.$message({
            type: 'info',
            message: `setOk`
          })
        })
        this.getList()
        this.updateFormVisible = false
      },
      addRobot() {
        this.createRobotFormVisible = true
      },
      createRobot() {
        createRobotPlayer(this.temp).then(resp => {
          this.$message({
            type: 'info',
            message: `create succ`
          })
        })
        this.getList()
        this.updateFormVisible = false
      }
    }
  }
</script>
<style lang="scss" scoped>
  .head{
    width: 100%;
    height: auto;
    display: flex;
    justify-content: space-around;
    align-items: center;
    span{
      flex: 1;
      text-align: center;
    }
  }
  .head span{
    font-weight: bold;
    font-size: 16px;
  }
  .detail {
    width: 100%;
    height: auto;
    .row{
      width: 100%;
      display: flex;
      justify-content: space-around;
      align-items: center;
      span{
        flex: 1;
        text-align: center;
      }
    }
  }
</style>
