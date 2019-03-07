<template>
  <div class="app-container calendar-list-container">
    <el-table :data="list" v-loading="listLoading" element-loading-text="loadding" border fit highlight-current-row
              style="width: 100%">

      <el-table-column align="center" label="Account">
        <template scope="scope">
          <span>{{scope.row.guid}}</span>
        </template>
      </el-table-column>

      <el-table-column label="Account">
        <template scope="scope">
          <span>{{scope.row.account}}</span>
        </template>
      </el-table-column>


      <el-table-column label="Nickname">
        <template scope="scope">
          <span>{{scope.row.nick}}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="Balance">
        <template scope="scope">
          <span>{{scope.row.money}}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="RegisterTime">
        <template scope="scope">
          <span>{{scope.row.createTime}}</span>
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
          this.list = resp.data.datas
          this.total = resp.data.totalCount
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
