<template>
  <div class="app-container calendar-list-container">
    <div class="filter-container">
      <el-input @keyup.enter.native="handleFilter" style="width: 200px;" class="filter-item" placeholder="Id"
                v-model="listQuery.id">
      </el-input>
      <el-input @keyup.enter.native="handleFilter" style="width: 200px;" class="filter-item" placeholder="Account"
                v-model="listQuery.account">
      </el-input>
      <el-input @keyup.enter.native="handleFilter" style="width: 200px;" class="filter-item" placeholder="Nickname"
                v-model="listQuery.nickName">
      </el-input>
      <el-button class="filter-item" type="primary" v-waves icon="search" @click="handleFilter">Search</el-button>
    </div>

    <el-table :data="list" v-loading="listLoading" element-loading-text="loadding" border fit highlight-current-row
              style="width: 100%">

      <el-table-column align="center" label="Id">
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
          <span>{{scope.row.nickName}}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="Balance">
        <template scope="scope">
          <span>{{scope.row.balance}}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="RegisterTime">
        <template scope="scope">
          <span>{{scope.row.registerTime}}</span>
        </template>
      </el-table-column>


    </el-table>

  </div>
</template>

<script>
  import waves from '@/directive/waves/index.js' // 水波纹指令
  import { queryAgentList } from '@/api/agent'

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
          account: '',
          nickName: '',
          id: '',
          page: 1,
          limit: 10
        }
      }
    },
    filters: {},
    created() {
    },
    methods: {
      handleFilter() {

      },
      getList() {
        queryAgentList().then(resp => {
          this.list = resp.data.list
          this.total = resp.data.total
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
