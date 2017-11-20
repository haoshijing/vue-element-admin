<template>
  <div class="app-container calendar-list-container">
    <div class="filter-container">
      <el-input @keyup.enter.native="handleFilter" style="width: 200px;" class="filter-item" placeholder="guid" v-model="listQuery.guid">
      </el-input>

      <el-input @keyup.enter.native="handleFilter" style="width: 200px;" class="filter-item" placeholder="周数" v-model="listQuery.week">
      </el-input>

      <el-button class="filter-item" type="primary" v-waves icon="search" @click="handleFilter">搜索</el-button>
    </div>
     <div style="margin: 3px"><span style="font-size: 20px">下属总充值:{{totalMoney}}</span> 元</div>
    <el-table :key='tableKey' :data="list" v-loading="listLoading" element-loading-text="正在加载" border fit highlight-current-row style="width: 100%">

      <el-table-column align="center" label="Guid">
        <template scope="scope">
          <span @click='handleClipboard(scope.row.guid,$event)'>{{scope.row.guid}}</span>
        </template>
      </el-table-column>

      <el-table-column  align="center" label="用户名">
        <template scope="scope">
          <span>{{scope.row.otherName}}</span>
        </template>
      </el-table-column>

      <el-table-column  label="总充值数">
        <template scope="scope">
          <span class="link-type" @click='handlerPickList(scope.row.guid,scope.row.week)'>{{scope.row.pickTotal}}</span>
        </template>
      </el-table-column>
      <el-table-column  label="周数">
        <template scope="scope">
          <span>第{{scope.row.week}}周</span>
        </template>
      </el-table-column>

      <el-table-column  label="剩余金豆">
        <template scope="scope">
          <span>{{scope.row.goldCount}}</span>
        </template>
      </el-table-column>

      <el-table-column  label="剩余银豆">
        <template scope="scope">
          <span>{{scope.row.sliverCount }}</span>
        </template>
      </el-table-column>

      <el-table-column  align="center" label="直属id">
        <template scope="scope">
          <span>{{scope.row.agentGuidId}}</span>
        </template>
      </el-table-column>
      <el-table-column  align="center" label="创建时间">
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
    <el-dialog title="充值列表" :visible.sync="dialogPickVisible" size="small">
      <el-table :data="pickList" border fit highlight-current-row style="width: 100%">
        <el-table-column prop="guid" label="玩家guid"> </el-table-column>
        <el-table-column prop="money" label="充值金额"> </el-table-column>
        <el-table-column prop="orderTime" label="下单时间"> </el-table-column>
        <el-table-column prop="orderStatusStr" label="支付状态"> </el-table-column>
      </el-table>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogPickVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  import { queryAgentPlayerList } from '@/api/player/playerapi'
  import { queryAgentPlayerCount } from '@/api/player/playerapi'
  import { queryPickList } from '@/api/player/playerapi'
  import waves from '@/directive/waves/index.js' // 水波纹指令
  import { parseTime } from '@/utils'
  import clipboard from '@/utils/clipboard' // use clipboard directly

  export default {
    name: 'playerList',
    directives: {
      waves
    },
    data() {
      return {
        list: [],
        total: 0,
        totalMoney: '',
        dialogPickVisible: false,
        listLoading: true,
        listQuery: {
          page: 1,
          limit: 20,
          guid: '',
          week: ''
        },
        pickList: [],
        showAuditor: false,
        tableKey: 0
      }
    },
    filters: {
      insertTimeFilter(insertTime) {
        return parseTime(insertTime)
      }
    },
    created() {
      this.getList()
    },
    methods: {
      getList() {
        this.listLoading = true
        queryAgentPlayerList(this.listQuery).then(response => {
          const data = response.data.data
          this.list = data.playerResponseVoList
          this.totalMoney = data.underMoney
          this.listLoading = false
        })
        queryAgentPlayerCount(this.listQuery).then(response => {
          this.total = response.data.data
          this.listLoading = false
        })
      },
      handlerPickList(guid, week) {
        this.dialogPickVisible = true
        const data = {
          guid: guid,
          week: week
        }
        queryPickList(data).then(response => {
          this.pickList = response.data.data
        })
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
