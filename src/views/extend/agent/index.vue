<template>
  <div class="app-container calendar-list-container">
    <el-table :data="list" v-loading="listLoading" element-loading-text="loadding" border fit highlight-current-row
              style="width: 100%">

      <el-table-column align="center" label="Id">
        <template scope="scope">
          <span>{{scope.row.Guid}}</span>
        </template>
      </el-table-column>


      <el-table-column label="Account">
        <template scope="scope">
          <span>{{scope.row.Account}}</span>
        </template>
      </el-table-column>

      <el-table-column label="Nickname">
        <template scope="scope">
          <span>{{scope.row.Nick}}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="Balance">
        <template scope="scope">
          <span>{{scope.row.Money}}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="RegisterTime">
        <template scope="scope">
          <span>{{scope.row.CreateTime}}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="set">
        <template scope="scope">
          <span>
            <router-link :to="{name:'Member Setup',params:{guid:scope.row.Guid}}">
             <el-button  size="small" type="success">detail</el-button>
            </router-link>
          </span>
        </template>
      </el-table-column>

    </el-table>


  </div>
</template>

<script>
  import waves from '@/directive/waves/index.js' // 水波纹指令
  import { queryAgentData } from '@/api/agent'

  export default {
    name: 'agentList',
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
          page: 1,
          limit: 10
        }
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
        queryAgentData(this.listQuery).then(resp => {
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
      }
    }
  }
</script>
