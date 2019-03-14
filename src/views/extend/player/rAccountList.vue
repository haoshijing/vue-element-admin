<template>
    <div class="app-container calendar-list-container">
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
    import { queryRAccountRecords } from '@/api/records.js'
    export default {
      props: ['guid'],
      name: 'agentList',
      directives: {
      },
      data() {
        return {
          list: [],
          total: 0,
          listLoading: false,
          listQuery: {
            page: 1,
            guid: 0,
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
          this.listQuery.guid = this.guid
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
