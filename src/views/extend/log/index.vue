<template>
  <div class="app-container calendar-list-container">
    <div class="filter-container">

    </div>
    <el-table :key='tableKey' :data="list" v-loading="listLoading" element-loading-text="正在加载" border fit highlight-current-row style="width: 100%">

      <el-table-column  align="center" label="日志说明">
        <template scope="scope">
          <span>{{scope.row.mark}}</span>
        </template>
      </el-table-column>

      <el-table-column  label="操作时间">
        <template scope="scope">
          <span>{{scope.row.lastUpdateTime | timeFilter}}</span>
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
  import { queryLogList } from '@/api/log/logapi'
  import { queryLogCount } from '@/api/log/logapi'
  import waves from '@/directive/waves/index.js' // 水波纹指令
  import { parseTime } from '@/utils'

  export default {
    name: 'proxylist',
    directives: {
      waves
    },
    data() {
      return {
        list: [],
        total: 0,
        listLoading: true,
        listQuery: {
          page: 1,
          limit: 20
        },
        tableKey: 0
      }
    },
    filters: {
      timeFilter(time) {
        return parseTime(time)
      }
    },
    created() {
      this.getList()
    },
    methods: {
      getList() {
        this.listLoading = true
        queryLogList(this.listQuery).then(response => {
          this.list = response.data.data
          this.listLoading = false
        })
        queryLogCount(this.listQuery).then(response => {
          this.total = response.data.data
          this.listLoading = false
        })
      },

      handleFilter() {
        this.listQuery.page = 1
        this.getList()
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
