<template>
  <div class="app-container calendar-list-container">
    <div class="filter-container">
      <el-input @keyup.enter.native="handleFilter" style="width: 200px;" class="filter-item" placeholder="guid" v-model="listQuery.guid">
      </el-input>
      <el-input @keyup.enter.native="handleFilter" style="width: 200px;" class="filter-item" placeholder="用户名" v-model="listQuery.userName">
      </el-input>
      <el-input @keyup.enter.native="handleFilter" style="width: 200px;" class="filter-item" placeholder="微信号" v-model="listQuery.weChartNo">
      </el-input>
      <el-select clearable class="filter-item" style="width: 130px" v-model="listQuery.level" placeholder="代理类别">
        <el-option v-for="item in proxyList" :key="item.key" :label="item.label" :value="item.key">
        </el-option>
      </el-select>

      <el-input @keyup.enter.native="handleFilter" style="width: 200px;" class="filter-item" placeholder="昵称" v-model="listQuery.nickName">
      </el-input>

      <el-input @keyup.enter.native="handleFilter" style="width: 200px;" class="filter-item" placeholder="周数" v-model="listQuery.week">
      </el-input>
      <el-button class="filter-item" type="primary" v-waves icon="search" @click="handleFilter">搜索</el-button>
      <el-button class="filter-item" style="margin-left: 10px;" @click="handleCreate" type="primary" icon="edit">添加</el-button>
    </div>

    <el-table :key='tableKey' :data="list" v-loading="listLoading" element-loading-text="正在加载" border fit highlight-current-row style="width: 100%">
      <!--
      <el-table-column align="center" label="代理编号">
        <template scope="scope">
          <span>{{scope.row.agentId}}</span>
        </template>
      </el-table-column>
      -->
      <el-table-column  align="center" label="guid">
        <template scope="scope">
          <span @click='handleClipboard(scope.row.gameId,$event)'>{{scope.row.gameId}}</span>
        </template>
      </el-table-column>

      <el-table-column  label="用户名">
        <template scope="scope">
          <span>{{scope.row.name}}</span>
        </template>
      </el-table-column>

      <el-table-column  label="代理类别">
        <template scope="scope">
          <span>{{scope.row.type | typeFilter }}</span>
        </template>
      </el-table-column>

      <el-table-column  align="center" label="备注名">
        <template scope="scope">
          <span>{{scope.row.weChartNo}}</span>
        </template>
      </el-table-column>

      <el-table-column  align="center" label="金豆">
        <template scope="scope">
          <span>{{scope.row.goldCount}}</span>
        </template>
      </el-table-column>

      <el-table-column  label="银豆">
        <template scope="scope">
          <span>{{scope.row.sliverCount}}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="下属代理" width="95">
        <template scope="scope">
          <span v-if="scope.row.type === 2 " class="link-type" @click='handlerUnderProxyList(scope.row.agentId)'>{{scope.row.underAgentCount}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="下属代理总额">
        <template scope="scope">
          <span>{{scope.row.areaAgentUnderTotalPickUp}}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="直属人数" width="95">
        <template scope="scope">
          <span class="link-type" @click='handlerMemberList(scope.row.gameId)'>{{scope.row.memberCount}}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="直属总额">
        <template scope="scope">
          <span>{{scope.row.agentUnderTotalPickUp}}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="个人充值">
        <template scope="scope">
          <span>{{scope.row.agentTotalPickUp}}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="周数">
        <template scope="scope">
          <span>第{{scope.row.week}}周</span>
        </template>
      </el-table-column>

      <el-table-column align="left" label="操作" width="250" >
        <template scope="scope">
          <el-button  size="small" type="success" @click="handleUpdate(scope.row)">编辑
          </el-button>
          <el-button  size="small" type="success" @click="handlerResetPwd(scope.row.agentId)">重置密码
          </el-button>
        </template>
      </el-table-column>

    </el-table>

    <div v-show="!listLoading" class="pagination-container">
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="listQuery.page"
                     :page-sizes="[10,20,30, 50]" :page-size="listQuery.limit" layout="total, sizes, prev, pager, next, jumper" :total="total">
      </el-pagination>
    </div>
    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
      <el-form class="small-space" :model="temp" label-position="left" label-width="70px" style='width: 400px; margin-left:50px;'>
        <el-form-item label="用户名">
          <el-input v-model="temp.userName" v-if = "!temp.id"></el-input>
          <span v-if = "temp.id">{{temp.userName}}</span>
        </el-form-item>

        <el-form-item label="昵称">
          <el-input v-model="temp.nickName"></el-input>
        </el-form-item>

        <el-form-item label="备注号">
          <el-input v-model="temp.wechartNo" ></el-input>
        </el-form-item>

        <el-form-item label="代理级别">
          <el-select  class="filter-item" v-model="temp.level" placeholder="请选择">
            <el-option v-for="item in  proxyList" :key="item.key" :label="item.label" :value="item.key">
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="guid">
          <el-select class="filter-item" filterable  v-if = "!temp.id" v-model="temp.guid" placeholder="请选择">
            <el-option v-for="item in  chooseAgentList" :key="item" :label="item" :value="item">
            </el-option>
          </el-select>
          <span v-if = "temp.id">{{temp.guid}}</span>
        </el-form-item>

        <el-form-item label="上级代理" v-if="temp.level == 3">
          <el-select   class="filter-item" filterable  v-model="temp.parentAgentId" placeholder="请选择">
            <el-option v-for="item in  chooseAreaAgentList" :key="item.agentId" :label="item.guid" :value="item.agentId">
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="备注">
          <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}" placeholder="请输入内容" v-model="temp.memo">
          </el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button v-if="dialogStatus=='create'" type="primary" @click="create">确 定</el-button>
        <el-button v-else type="primary" @click="update">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog title="下属会员" :visible.sync="dialogMemberVisible" size="small">
      <el-table :data="memberList" border fit highlight-current-row style="width: 100%">
        <el-table-column prop="playerGuid" label="Guid"> </el-table-column>
        <el-table-column prop="name" label="用户名"> </el-table-column>
        <el-table-column prop="playerPickUp" label="总充值"> </el-table-column>
        <el-table-column prop="createTime" label="创建时间"> </el-table-column>
      </el-table>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogMemberVisible = false">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog title="下属代理" :visible.sync="dialogPorxyVisible" size="small">
      <el-table :data="proxyAgentList" border fit highlight-current-row style="width: 100%">
        <el-table-column prop="agentId" label="代理id"> </el-table-column>
        <el-table-column prop="agentGuid" label="代理guid"> </el-table-column>
        <el-table-column prop="username" label="用户名"> </el-table-column>
        <el-table-column prop="wechartNo" label="微信号"> </el-table-column>
        <el-table-column prop="nickname" label="昵称"> </el-table-column>
        <el-table-column prop="proxyPickTotal" label="代理总充值"> </el-table-column>
        <el-table-column prop="proxyAgentTotal" label="下属总充值"> </el-table-column>

      </el-table>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogPorxyVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  import { fetchAgentList } from '@/api/agent'
  import { fetchAgentCount } from '@/api/agent'
  import { createUpdateAgent } from '@/api/agent'
  import { obtainChooseAreaAgentList } from '@/api/agent'
  import { obtainUnderPlayer } from '@/api/agent'
  import { obtainUnderAgent } from '@/api/agent'
  import { obtainChooseAgentList } from '@/api/agent'
  import { resetPwd } from '@/api/agent'

  import waves from '@/directive/waves/index.js' // 水波纹指令
  import clipboard from '@/utils/clipboard' // use clipboard directly
  import { parseTime } from '@/utils'
  import { getCurrentWeek } from '@/utils'
  const proxyList = [
    { key: 2, label: '地区代理' },
    { key: 3, label: '群主代理' }
  ]
  export function getAgentTypeName(type) {
    const types = {
      1: '总管理员',
      2: '区域代理',
      3: '群主代理'
    }
    return types[type]
  }
  export default {
    name: 'proxylist',
    directives: {
      waves
    },
    data() {
      return {
        dialogMemberVisible: false,
        dialogPorxyVisible: false,
        list: [],
        chooseAgentList: [],
        chooseAreaAgentList: [],
        currentWeek: '',
        total: 0,
        listLoading: true,
        listQuery: {
          page: 1,
          limit: 20,
          wechartNo: '',
          level: '',
          weel: '',
          nickName: '',
          userName: '',
          guid: ''
        },
        memberList: [],
        proxyAgentList: [],
        proxyList: proxyList,
        temp: {
          id: undefined,
          wechartNo: '',
          nickName: '',
          userName: '',
          guid: '',
          level: '',
          parentAgentId: '',
          memo: ''
        },
        dialogFormVisible: false,
        dialogStatus: '',
        textMap: {
          update: '编辑代理',
          create: '创建代理'
        },
        dialogPvVisible: false,
        showAuditor: false,
        tableKey: 0
      }
    },
    filters: {
      typeFilter(type) {
        return getAgentTypeName(type)
      }
    },
    created() {
      this.getList()
      this.currentWeek = getCurrentWeek()
    },
    methods: {
      getList() {
        this.listLoading = true
        fetchAgentList(this.listQuery).then(response => {
          this.list = response.data.data
          this.listLoading = false
        })
        fetchAgentCount(this.listQuery).then(response => {
          this.total = response.data.data
          this.listLoading = false
        })
      },
      handleClipboard(text, event) {
        clipboard(text, event)
      },
      handlerMemberList(currentAgentGuid) {
        this.dialogMemberVisible = true
        obtainUnderPlayer(currentAgentGuid).then(response => {
          this.memberList = response.data.data
        })
      },
      handlerUnderProxyList(currentAgentId) {
        this.dialogPorxyVisible = true
        obtainUnderAgent(currentAgentId).then(response => {
          this.proxyAgentList = response.data.data
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
      handlerResetPwd(agentId) {
        resetPwd(agentId).then((response) => {
          const succ = response.data.data
          if (succ) {
            this.$message({
              message: '重置成功',
              type: 'success'
            })
          } else {
            this.$message({
              message: '重置失败',
              type: 'error'
            })
          }
        })
      },
      handleCurrentChange(val) {
        this.listQuery.page = val
        this.getList()
      },
      timeFilter(time) {
        if (!time[0]) {
          this.listQuery.start = undefined
          this.listQuery.end = undefined
          return
        }
        this.listQuery.start = parseInt(+time[0] / 1000)
        this.listQuery.end = parseInt((+time[1] + 3600 * 1000 * 24) / 1000)
      },
      handleModifyStatus(row, status) {
        this.$message({
          message: '操作成功',
          type: 'success'
        })
        row.status = status
      },
      resetTemp() {
        this.temp = {
          id: undefined,
          wechartNo: '',
          nickName: '',
          userName: '',
          guid: '',
          level: '',
          parentAgentId: '',
          memo: ''
        }
      },
      handleCreate() {
        this.dialogStatus = 'create'
        this.dialogFormVisible = true
        this.resetTemp()
        obtainChooseAreaAgentList('').then((response) => {
          const responseList = response.data.data
          this.chooseAreaAgentList = responseList
        })
        obtainChooseAgentList().then((response) => {
          const responseList = response.data.data
          this.chooseAgentList = responseList
        })
      },
      handleUpdate(row) {
        this.temp = {
          id: row.agentId,
          wechartNo: row.weChartNo,
          nickName: row.nickName,
          userName: row.name,
          guid: row.gameId,
          level: row.type,
          parentAgentId: row.parentAgentId,
          memo: row.memo
        }
        const level = row.type
        let currentAgentId
        if (level === 2) {
          currentAgentId = row.agentId
          if (row.parentAgentId === 0) {
            this.temp.parentAgentId = ''
          }
        }
        obtainChooseAreaAgentList(currentAgentId).then((response) => {
          const responseList = response.data.data
          this.chooseAreaAgentList = responseList
        })
        this.dialogStatus = 'update'
        this.dialogFormVisible = true
      },
      create() {
        createUpdateAgent(this.temp).then((response) => {
          const responseData = response.data
          if (responseData.data) {
            this.$notify({
              title: '成功',
              message: '创建成功',
              type: 'success',
              duration: 2000
            })
            this.dialogFormVisible = false
            this.getList()
          } else {
            this.$notify({
              title: '创建失败',
              message: response.data.msg,
              type: 'error',
              duration: 2000
            })
          }
        }).catch(() => {
          this.$notify({
            title: '创建失败',
            message: '请求失败,请重试',
            type: 'error',
            duration: 2000
          })
        })
      },
      update() {
        createUpdateAgent(this.temp).then((response) => {
          const responseData = response.data
          if (responseData.data) {
            this.$notify({
              title: '成功',
              message: '更新成功',
              type: 'success',
              duration: 2000
            })
            this.dialogFormVisible = false
            this.getList()
          } else {
            this.$notify({
              title: '更新失败',
              message: response.data.msg,
              type: 'error',
              duration: 2000
            })
          }
        }).catch(() => {
          this.$notify({
            title: '更新失败',
            message: '请求失败,请重试',
            type: 'error',
            duration: 2000
          })
        })
      },
      formatJson(filterVal, jsonData) {
        return jsonData.map(v => filterVal.map(j => {
          if (j === 'timestamp') {
            return parseTime(v[j])
          } else {
            return v[j]
          }
        }))
      }
    }
  }
</script>
