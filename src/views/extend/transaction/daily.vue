<template>
  <div class="app-container calendar-list-container">
    <div class="filter-container">
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

      <el-table-column align="center" label="date">
        <template scope="scope">
          <span>{{scope.row.date}}</span>
        </template>
      </el-table-column>

      <el-table-column label="totalBetAmount">
        <template scope="scope">
          <span>{{scope.row.sumBetAmount}}</span>
        </template>
      </el-table-column>


      <el-table-column label="totalPlayerCount">
        <template scope="scope">
          <span>{{scope.row.sumPlayerCount}}</span>
        </template>
      </el-table-column>

      <el-table-column label="totalRoomCount">
        <template scope="scope">
          <span>{{scope.row.sumRoomCount}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="totalCommissionAmount">
        <template scope="scope">
          <span>{{scope.row.sumCommissionAmount}}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="totalSystemEatChips">
        <template scope="scope">
          <span>{{scope.row.sumSystemEatChips}}</span>
        </template>
      </el-table-column>

    </el-table>

  </div>
</template>

<script>
  import waves from '@/directive/waves/index.js' // 水波纹指令
  import { queryDailyList } from '@/api/records.js'
  export default {
    name: 'Account',
    directives: {
      waves
    },
    data() {
      const end = new Date()
      const start = new Date()
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
      return {
        list: [],
        total: 0,
        listLoading: false,
        listQuery: {
          time: [
            start,
            end
          ]
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
        queryDailyList(this.listQuery).then(resp => {
          this.list = resp.data.data
        })
      }
    }
  }
</script>
