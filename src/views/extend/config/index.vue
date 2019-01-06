<template>
  <div>
    <el-form label-width="180px" style="width: 400px; margin-left:50px;">
      <el-form-item label="Version:">
        <el-input  v-model="configVo.version" />
      </el-form-item>
      <el-form-item label="Address:">
        <el-input v-model="configVo.address"/>
      </el-form-item>

      <el-form-item label="UpdateMessage:">
        <el-input  v-model="configVo.updateMessage"/>
      </el-form-item>
      <el-form-item label="Notice:">
        <el-input  v-model="configVo.notice"/>
      </el-form-item>
      <el-form-item label="ScrollMessage:">
        <el-input  v-model="configVo.scrollMessage"/>
      </el-form-item>
      <el-form-item label="AndroidUpdateUrl:">
        <el-input  v-model="configVo.androidUpdateUrl" />
      </el-form-item>
      <el-form-item label="IOSUpdateUrl:">
        <el-input  v-model="configVo.iOSUpdateUrl"/>
      </el-form-item>
      <el-form-item label="SoundUpLoadUrl:">
        <el-input v-model="configVo.soundUpLoadUrl"/>
      </el-form-item>

      <el-form-item label="WXShareUrl:">
        <el-input v-model="configVo.wXShareUrl"/>
      </el-form-item>

      <el-form-item label="ResourceDownLoadUrl:">
        <el-input v-model="configVo.resourceDownLoadUrl"/>
      </el-form-item>

      <el-form-item label="CreateDefaultMoney:">
        <el-input v-model="configVo.createDefaultMoney"/>
      </el-form-item>

      <el-form-item label="OnlineCount:">
        <span>{{configVo.onlineCount}}</span>
      </el-form-item>

      <el-form-item label="RegisterCount:">
        <span>{{configVo.registerCount}}</span>
      </el-form-item>

    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button type="primary" @click="updateConfigData">save</el-button>
    </div>
  </div>
</template>
<script>
  import { queryConfigData, updateConfigData } from '@/api/config'
  export default {
    name: 'configForm',
    directives: {},
    data() {
      return {
        configVo: {}
      }
    },
    filters: {},
    created() {
      this.obtainData()
    },
    methods: {
      obtainData() {
        queryConfigData().then(resp => {
          const data = resp.data.data
          this.configVo = data
        })
      },

      updateConfigData() {
        updateConfigData(this.configVo).then(resp => {
          this.$notify({
            title: '成功',
            message: '编辑成功',
            type: 'success',
            duration: 2000
          })
        })
      }
    }
  }
</script>
