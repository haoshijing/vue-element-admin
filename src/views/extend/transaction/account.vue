<template>
  <div class="app-container calendar-list-container">
    <div class="filter-container">
      <el-input @keyup.enter.native="handleFilter" style="width: 200px;" class="filter-item" placeholder="PlayerId"
                v-model="listQuery.playerId">
      </el-input>
      <el-input @keyup.enter.native="handleFilter" style="width: 200px;" class="filter-item" placeholder="RoomID"
                v-model="listQuery.roomId">
      </el-input>
      <el-input @keyup.enter.native="handleFilter" style="width: 200px;" class="filter-item" placeholder="RoomGUID"
                v-model="listQuery.roomGuid">
      </el-input>
      <div class="block">
        <el-date-picker
          v-model="listQuery.time"
          type="daterange"
          start-placeholder="start"
          end-placeholder="end"
          :default-time="['12:00:00']">
        </el-date-picker>
      </div>

      <el-button class="filter-item" type="primary" v-waves icon="search" @click="handleFilter">Search</el-button>
    </div>
    <el-table :data="list" v-loading="listLoading" element-loading-text="loadding" border fit highlight-current-row
              style="width: 100%">

      <el-table-column align="center" label="Date">
        <template scope="scope">
          <span>{{scope.row.date}}</span>
        </template>
      </el-table-column>

      <el-table-column label="Time">
        <template scope="scope">
          <span>{{scope.row.time}}</span>
        </template>
      </el-table-column>


      <el-table-column label="RoomID">
        <template scope="scope">
          <span>{{scope.row.roomId}}</span>
        </template>
      </el-table-column>

      <el-table-column label="RoomGuid">
        <template scope="scope">
          <span>{{scope.row.roomGuid}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="Round">
        <template scope="scope">
          <span>{{scope.row.round}}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="PlayerID">
        <template scope="scope">
          <span>{{scope.row.guid}}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="GameRules">
        <template scope="scope">
          <span>{{scope.row.gameRules}}</span>
        </template>
      </el-table-column>


      <el-table-column align="center" label="Result">
        <template scope="scope">
          <span>{{scope.row.result}}</span>
        </template>
      </el-table-column>


      <el-table-column align="center" label="Amount">
        <template scope="scope">
          <span>{{scope.row.amount}}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="WinOrLose">
        <template scope="scope">
          <span>{{scope.row.winOrLose}}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="Commission">
        <template scope="scope">
          <span>{{scope.row.commission}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="CommissionAmout">
        <template scope="scope">
          <span>{{scope.row.commissionAmout}}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="PlayerGain">
        <template scope="scope">
          <span>{{scope.row.playerGain}}</span>
        </template>
      </el-table-column>


      <el-table-column align="center" label="SystemEatChips">
        <template scope="scope">
          <span>{{scope.row.systemEatChips}}</span>
        </template>
      </el-table-column>


    </el-table>
    <div v-show="!listLoading" class="pagination-container">
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="listQuery.page"
                     :page-sizes="[10,20,30, 50]" :page-size="listQuery.limit" layout="total, sizes, prev, pager, next, jumper" :total="total">
      </el-pagination>
    </div>
  </div>
</template>

<script>
  import waves from '@/directive/waves/index.js' // 水波纹指令
  import { queryRAccountRecords } from '@/api/records.js'
  export default {
    name: 'Account',
    directives: {
      waves
    },
    data() {
      return {
        list: [],
        total: 0,
        listLoading: false,
        listQuery: {
          time: [],
          page: 1,
          playerId: '',
          roomId: '',
          roomGuid: '',
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
        queryRAccountRecords(this.listQuery).then(resp => {
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
    },
    watch: {
      'guid': function() {
        this.getList()
      }
    }
  }
</script>
