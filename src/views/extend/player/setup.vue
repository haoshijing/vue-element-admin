<template>
  <div class="app-container calendar-list-container">
    <div class="filter-container">
      <el-input @keyup.enter.native="handleFilter" style="width: 200px;" class="filter-item" placeholder="Guid"
                v-model="listQuery.guid">
      </el-input>
      <el-input @keyup.enter.native="handleFilter" style="width: 200px;" class="filter-item" placeholder="Account"
                v-model="listQuery.account">
      </el-input>
      <el-button class="filter-item" type="primary" v-waves icon="search" @click="handleFilter">Search</el-button>
    </div>

    <el-table :data="list" v-loading="listLoading" element-loading-text="loadding" border fit highlight-current-row
              style="width: 100%">

      <el-table-column align="center" label="Guid">
        <template scope="scope">
          <span>{{scope.row.Guid}}</span>
        </template>
      </el-table-column>

      <el-table-column label="Account">
        <template scope="scope">
          <span>{{scope.row.Account}}</span>
        </template>
      </el-table-column>

      <el-table-column label="IsAgent">
        <template scope="scope">
          <span>{{scope.row.showIsAgent}}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="BindAgentId">
        <template scope="scope">
          <span>{{scope.row.BindGuid}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="TotalPay">
        <template scope="scope">
          <span>{{scope.row.TotalPay}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="TotalGain">
        <template scope="scope">
          <span>{{scope.row.TotalGain}}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="RegisterTime">
        <template scope="scope">
          <span>{{scope.row.CreateTime}}</span>
        </template>
      </el-table-column>

      <el-table-column  label="operatr">
        <template scope="scope">
          <el-button  size="small" type="success" @click="handleUpdate(scope.row)">edit
          </el-button>
        </template>
      </el-table-column>

    </el-table>

    <el-dialog  :visible.sync="dialogFormVisible">
      <el-form class="small-space" :model="temp" label-position="left" label-width="70px" style='width: 400px; margin-left:50px;'>
        <el-form-item label="Guid">
          <span>{{temp.Guid}}</span>
        </el-form-item>

        <el-form-item label="Password">
          <el-input v-model="temp.Password"></el-input>
        </el-form-item>

        <el-form-item label="Money">
          <el-input v-model="temp.Money" ></el-input>
        </el-form-item>

        <el-form-item label="IsAgent">
          <el-radio v-model="temp.showIsAgent" label="Yes">Yes</el-radio>
          <el-radio v-model="temp.showIsAgent" label="No">No</el-radio>
        </el-form-item>

        <el-form-item label="BindGuid">
          <el-input v-model="temp.BindGuid" ></el-input>
        </el-form-item>


      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">Cancel</el-button>
        <el-button type="primary" @click="updatePlayer">Ok</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
  import waves from '@/directive/waves/index.js' // 水波纹指令
  import { queryMemberSetUp, updatePlayer } from '@/api/playerapi'

  export default {
    name: 'memberSetUp',
    directives: {
      waves
    },
    data() {
      return {
        list: [],
        total: 0,
        listLoading: false,
        dialogFormVisible: false,
        listQuery: {
          account: '',
          guid: ''
        },
        temp: {
          Guid: '',
          Password: '',
          BindGuid: 0,
          Money: '',
          showIsAgent: ''
        }
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
        queryMemberSetUp(this.listQuery).then(resp => {
          this.list = resp.data.data
        })
      },
      handleUpdate(row) {
        this.dialogFormVisible = true
        this.temp = row
        this.temp.password = ''
      },
      handleSizeChange(val) {
        this.listQuery.limit = val
        this.getList()
      },
      handleCurrentChange(val) {
        this.listQuery.page = val
        this.getList()
      },
      updatePlayer() {
        const data = {
          guid: this.temp.Guid,
          password: this.temp.Password,
          money: this.temp.Money,
          showIsAgent: this.temp.showIsAgent,
          bindGuid: this.temp.BindGuid
        }
        updatePlayer(data).then(resp => {
          const updateRet = resp.data.data
          if (updateRet) {
            this.dialogFormVisible = true
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
