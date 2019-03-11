<template>
    <div class="app-container calendar-list-container">
        <el-table :data="list" v-loading="listLoading" element-loading-text="loadding" border fit highlight-current-row
                  style="width: 100%">

            <el-table-column align="center" label="id">
                <template scope="scope">
                    <span>{{scope.row.id}}</span>
                </template>
            </el-table-column>

            <el-table-column label="username">
                <template scope="scope">
                    <span>{{scope.row.username}}</span>
                </template>
            </el-table-column>


            <el-table-column label="createId">
                <template scope="scope">
                    <span>{{scope.row.createId}}</span>
                </template>
            </el-table-column>

            <el-table-column align="center" label="createTime">
                <template scope="scope">
                    <span>{{scope.row.createTime}}</span>
                </template>
            </el-table-column>

            <el-table-column align="center" label="lastLoginTime">
                <template scope="scope">
                    <span>{{scope.row.lastLoginTime}}</span>
                </template>
            </el-table-column>

            <el-table-column align="center" label="lastOperator">
                <template scope="scope">
                    <span>{{scope.row.lastOperator}}</span>
                </template>
            </el-table-column>

            <el-table-column align="center" label="lastUpdateTime">
                <template scope="scope">
                    <span>{{scope.row.lastUpdateTime}}</span>
                </template>
            </el-table-column>

            <el-table-column align="center" label="set">
                <template scope="scope">
                  <span>
                      <el-button type="text" @click="open(scope.row.id,scope.row.username)">del</el-button>
                  </span>
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
    import { queryAdminData, delAdminData } from '@/api/admin'

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
          queryAdminData(this.listQuery).then(resp => {
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
        },
        open(id, username) {
          this.$alert('你删除的用户id为' + id + '用户名为' + username, '确定要删除嘛', {
            confirmButtonText: '确定',
            callback: action => {
              const data = {
                id,
                username
              }
              delAdminData(data).then(resp => {
                this.$message({
                  type: 'info',
                  message: `action: ${resp.data.data}`
                })
              })
            }
          })
        }
      }
    }
</script>
