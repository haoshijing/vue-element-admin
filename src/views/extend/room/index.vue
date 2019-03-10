<template>
  <div class="app-container calendar-list-container">
    <el-table :data="list" v-loading="listLoading" element-loading-text="loadding" border fit highlight-current-row
              style="width: 100%">

      <el-table-column align="center" label="RoomCode">
        <template scope="scope">
          <span>{{scope.row.RoomCode}}</span>
        </template>
      </el-table-column>


      <el-table-column label="RoomType">
        <template scope="scope">
          <span>{{scope.row.RoomType}}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="OnSeatCount">
        <template scope="scope">
          <span>{{scope.row.OnSeatCount}}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="BaseChips">
        <template scope="scope">
          <span>{{scope.row.BaseChips}}</span>
        </template>
      </el-table-column>


      <el-table-column align="center" label="CreateTime">
        <template scope="scope">
          <span>{{scope.row.CreateTime}}</span>
        </template>
      </el-table-column>

    </el-table>


  </div>
</template>

<script>
  import waves from '@/directive/waves/index.js' // 水波纹指令
  import { queryRoomData } from '@/api/room'

  export default {
    name: 'robotList',
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
        queryRoomData(this.listQuery).then(resp => {
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
