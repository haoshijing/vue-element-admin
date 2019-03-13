<template>
  <div class="app-container calendar-list-container">
    <!--添加-->
    <el-button  size="medium" type="success" @click="show()">create
    </el-button><p></p>
    <el-button  size="medium" type="success" @click="handleUpdate()">SetRobitConfig
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


    </el-table>

    <el-dialog  :visible.sync="updateFormVisible">
      <el-form class="small-space" :model="temp" label-position="left" label-width="70px" style='width: 400px; margin-left:50px;'>
        <el-form-item label="Guid">
          <el-input v-model="temp.guid" ></el-input>
        </el-form-item>

        <el-form-item label="InitMoney">
          <el-input v-model="temp.initMoney"></el-input>
        </el-form-item>

        <el-form-item label="WinPercent">
          <el-input v-model="temp.winPercent" ></el-input>
        </el-form-item>


      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="updateFormVisible = false">Cancel</el-button>
        <el-button type="primary" @click="updateRobot">Ok</el-button>
      </div>
    </el-dialog>

    <!--模态框-->
    <el-dialog  :visible.sync="showView" width="100%">
      <!--表单  这里-->
      <div>
        <div class="head">
          <span v-for="(item, index) in Object.keys(tableData[0])" :key="index">{{item}}</span>
        </div>
        <div class="detail">
          <div class="row" v-for="(item, index) in tableData" :key="item.id">
            <template v-for="(value,key) of item" >
              <input v-if="index === changeRobotIndex[0] && key === changeRobotIndex[1]"
                     :key="value" type="text" v-bind:value="value"
                     @blur="handleSetRobot" @keyup.enter="handleSetRobot">
              <span v-else :key="value" @click="setValue(index, key)">{{value}}</span>
            </template>

          </div>
        </div>
      </div>
      <el-button @click="addRobot">Add</el-button>


      <!--表单结束-->
      <div slot="footer" class="dialog-footer">
        <el-button @click="showView = false">Cancel</el-button>
        <el-button type="primary" @click="createdRobot">Ok</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
  import waves from '@/directive/waves/index.js' // 水波纹指令
  import { queryRobotData, createRobotsToGroup, updateRobotConfig } from '@/api/robot'
  export default {
    name: 'robotList',
    directives: {
      waves
    },
    data() {
      return {
        changeRobotIndex: [-1, null],
        tableData: [{
          id: 1,
          nickname: 'nickname',
          avatar: 'avatar',
          money: 10,
          win: 10
        }, {
          id: 2,
          nickname: 'nickname',
          avatar: 'avatar',
          money: 10,
          win: 10
        }
        ],
        updateFormVisible: false,
        list: [],
        total: 0,
        listLoading: false,
        dialogFormVisible: false,
        listQuery: {
          page: 1,
          limit: 10
        },
        showView: false,
        temp: {},
        created: {}
      }
    },
    filters: {},
    created() {
      this.getList()
    },
    methods: {
      addRobot() {
        const id = this.tableData.length
        const newRobot = {
          id,
          nickname: 'nickname',
          avatar: 'avatar',
          money: 10,
          win: 10
        }
        this.tableData.push(newRobot)
      },
      setValue(index, key) {
        this.changeRobotIndex = [index, key]
      },
      handleSetRobot(e) {
        if (this.changeRobotIndex[0] === -1 || !this.changeRobotIndex[1]) return
        const oldData = this.tableData[this.changeRobotIndex[0]]
        // console.log(this.changeRobotIndex[1], 'key')
        Object.assign(oldData, {
          [this.changeRobotIndex[1]]: e.target.value
        })
        this.changeRobotIndex = [-1, null]
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
      handleUpdate() {
        this.updateFormVisible = true
      },
      updateRobot() {
        updateRobotConfig(this.temp).then(resp => {
          this.$message({
            type: 'info',
            message: `setOk`
          })
        })
        this.updateFormVisible = false
      },
      show() {
        this.showView = true
      },
      createdRobot() {
        var data = {
          'data': this.tableData
        }
        createRobotsToGroup(data).then(resp => {
          console.log(resp.data)
        })
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
