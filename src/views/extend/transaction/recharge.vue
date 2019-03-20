<template>
  <div class="app-container calendar-list-container">
    <div class="filter-container">
      <el-input @keyup.enter.native="handleFilter" style="width: 200px;" class="filter-item" placeholder="PlayerID"
                v-model="listQuery.playerId">
      </el-input>

        <el-date-picker
          v-model="listQuery.time"
          type="daterange"
          start-placeholder="start"
          end-placeholder="end"
          :default-time="['12:00:00']">
        </el-date-picker>

      <el-button class="filter-item" type="primary" v-waves icon="search" @click="handleFilter">Search</el-button>

      <div>
        <span> totalRechargeMoney: {{totalRechargeMoney}}</span>
        <span> totalRechargeGold: {{totalRechargeGold}}</span>
      </div>
    </div>
    <el-table :data="list" v-loading="listLoading" element-loading-text="loadding" border fit highlight-current-row
              style="width: 100%" >

      <el-table-column align="center" label="OrderId">
        <template scope="scope">
          <span>{{scope.row.orderId}}</span>
        </template>
      </el-table-column>

      <el-table-column label="Guid">
        <template scope="scope">
          <span>{{scope.row.guid}}</span>
        </template>
      </el-table-column>


      <el-table-column label="PhoneNumber">
        <template scope="scope">
          <span>{{scope.row.phoneNumber}}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="RechargeMoney">
        <template scope="scope">
          <span>{{scope.row.rechargeMoney}}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="RechargeGold">
        <template scope="scope">
          <span>{{scope.row.rechargeGold}}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="RechargeMoney">
        <template scope="scope">
          <span>{{scope.row.rechargeMoney}}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="CreateTime">
        <template scope="scope">
          <span>{{scope.row.createTime}}</span>
        </template>
      </el-table-column>

    </el-table>
    <div v-show="!listLoading" class="pagination-container">
      <el-pagination @size-change="handleSizeChange"
                     @current-change="handleCurrentChange"
                     :current-page.sync="listQuery.page"
                     :page-sizes="[10,20,30, 50]" :page-size="listQuery.limit" layout="total, sizes, prev, pager, next, jumper" :total="total">
      </el-pagination>
    </div>
  </div>
</template>

<script>
  import waves from '@/directive/waves/index.js' // 水波纹指令
  import { queryRechargeData, queryRechargeSum } from '@/api/records.js'
  export default {
    name: 'RechargeRecords',
    directives: {
      waves
    },
    data() {
      return {
        list: [],
        total: 0,
        totalRechargeMoney: '',
        totalRechargeGold: '',
        listLoading: false,
        listQuery: {
          page: 1,
          playerId: '',
          limit: 10,
          time: []
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
        if (this.listQuery.time[0]) {
          this.listQuery.start = this.listQuery.time[0].getTime()
        } else {
          this.listQuery.start = 0
        }
        if (this.listQuery.time[1]) {
          this.listQuery.end = this.listQuery.time[1].getTime()
        } else {
          this.listQuery.end = 0
        }
        queryRechargeData(this.listQuery).then(resp => {
          this.list = resp.data.data.datas
          this.total = resp.data.data.totalCount
        })
        queryRechargeSum(this.listQuery).then(resp => {
          this.totalRechargeMoney = resp.data.data.totalRechargeMoney
          this.totalRechargeGold = resp.data.data.totalRechargeGold
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
    },
    watch: {
      'guid': function() {
        this.getList()
      }
    }
  }
</script>
