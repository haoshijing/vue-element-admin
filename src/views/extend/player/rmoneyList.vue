<template>
    <div class="app-container calendar-list-container">
        <el-table :data="list" v-loading="listLoading" element-loading-text="loadding" border fit highlight-current-row
                  style="width: 100%">

            <el-table-column align="center" label="Guid">
                <template scope="scope">
                    <span>{{scope.row.guid}}</span>
                </template>
            </el-table-column>

            <el-table-column label="nick">
                <template scope="scope">
                    <span>{{scope.row.nick}}</span>
                </template>
            </el-table-column>


            <el-table-column label="reason">
                <template scope="scope">
                    <span>{{scope.row.reason}}</span>
                </template>
            </el-table-column>

            <el-table-column align="center" label="remains">
                <template scope="scope">
                    <span>{{scope.row.remains}}</span>
                </template>
            </el-table-column>

            <el-table-column align="center" label="changes">
                <template scope="scope">
                    <span>{{scope.row.changes}}</span>
                </template>
            </el-table-column>

            <el-table-column align="center" label="dateTime">
                <template scope="scope">
                    <span>{{scope.row.dateTime}}</span>
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
    import { queryRmoneyChangeData } from '@/api/records.js'
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
          queryRmoneyChangeData(this.listQuery).then(resp => {
            console.log(resp.data.data.datas)
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
