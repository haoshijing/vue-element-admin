<template>
  <div class="app-container calendar-list-container">
    <div class="filter-container">
      <el-input @keyup.enter.native="handleFilter" style="width: 200px;" class="filter-item" placeholder="订单号" v-model="listQuery.orderId">
      </el-input>
      <el-select clearable class="filter-item" style="width: 130px" v-model="listQuery.orderStatus" placeholder="支付状态">
        <el-option v-for="item in statusList" :key="item.key" :label="item.label" :value="item.key">
        </el-option>
      </el-select>
      <el-date-picker
        v-model="orderTime"
        type="daterange"
        align="right"
        placeholder="下单时间"
        class = "filter-item"
        unlink-panels
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期">
      </el-date-picker>

      <el-button class="filter-item" type="primary" v-waves icon="search" @click="handleFilter">搜索</el-button>
    </div>

    <el-table :key='tableKey' :data="list" v-loading="listLoading" element-loading-text="正在加载" border fit highlight-current-row style="width: 100%">

      <el-table-column align="center" label="订单编号">
        <template scope="scope">
          <span @click='handleClipboard(scope.row.id,$event)'>{{scope.row.id}}</span>
        </template>
      </el-table-column>

      <el-table-column  align="center" label="订单号">
        <template scope="scope">
          <span  @click='handleClipboard(scope.row.selfOrderNo,$event)'>{{scope.row.selfOrderNo}}</span>
        </template>
      </el-table-column>

      <el-table-column  label="充值状态">
        <template scope="scope">
          <span>{{scope.row.orderStatus | statusFilter}}</span>
        </template>
      </el-table-column>

      <el-table-column  label="充值金额">
        <template scope="scope">
          <span>{{scope.row.price /100}}</span>
        </template>
      </el-table-column>

      <el-table-column  label="商品名称">
        <template scope="scope">
          <span>{{scope.row.title }}</span>
        </template>
      </el-table-column>

      <el-table-column  align="center" label="客户guid">
        <template scope="scope">
          <span @click='handleClipboard(scope.row.clientGuid,$event)'>{{scope.row.clientGuid}}</span>
        </template>
      </el-table-column>

      <el-table-column  align="center" label="支付成功时间">
        <template scope="scope">
          <span>{{scope.row| timeFilter }}</span>
        </template>
      </el-table-column>
      <el-table-column  align="center" label="下单时间">
        <template scope="scope">
          <span>{{scope.row.insertTime | insertTimeFilter}}</span>
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
  import { queryOrderList } from '@/api/agentbiz/orderapi'
  import { queryOrderCount } from '@/api/agentbiz/orderapi'
  import waves from '@/directive/waves/index.js' // 水波纹指令
  import { parseTime } from '@/utils'
  import clipboard from '@/utils/clipboard' // use clipboard directly

  const statusList = [
    { key: 1, label: '未支付' },
    { key: 2, label: '已支付' },
    { key: 3, label: '服务处理异常' }
  ]

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
          limit: 20,
          orderId: '',
          startTimestamp: '',
          endTimestamp: '',
          orderStatus: ''
        },
        statusList: statusList,
        orderTime: ['', ''],
        showAuditor: false,
        tableKey: 0
      }
    },
    filters: {
      statusFilter(status) {
        const statusMap = {
          1: '未支付',
          2: '已支付',
          3: '服务处理异常'
        }
        return statusMap[status]
      },
      insertTimeFilter(insertTime) {
        return parseTime(insertTime)
      },
      timeFilter(row) {
        if (row.orderStatus === 2) {
          return parseTime(row.lastUpdateTime)
        }
        return ''
      }
    },
    created() {
      this.getList()
    },
    methods: {
      getList() {
        this.listLoading = true
        const startTime = this.orderTime[0]
        const endTime = this.orderTime[1]
        if (startTime) {
          this.listQuery.startTimestamp = startTime.getTime()
        }
        if (endTime) {
          this.listQuery.endTimestamp = endTime.getTime() + 24 * 3600 * 1000
        }
        queryOrderList(this.listQuery).then(response => {
          this.list = response.data.data
          this.listLoading = false
        })
        queryOrderCount(this.listQuery).then(response => {
          this.total = response.data.data
          this.listLoading = false
        })
      },
      handlerQueryPlayer() {

      },
      handleClipboard(text, event) {
        clipboard(text, event)
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
