<template>
  <div style="width: 300px">
  <el-form :model="form" :rules="rules" ref="form" label-width="80px">
    <el-form-item label="Old Password">
      <el-input v-model="form.oldPwd" type="password" size="small"></el-input>
    </el-form-item>
    <el-form-item label="New Password">
      <el-input v-model="form.newPwd" type="password" size="small"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="onSubmit">OK</el-button>
    </el-form-item>
  </el-form>
  </div>
</template>
  <script>
    import http from '@/utils/fetch'
    export default {
      data() {
        return {
          form: {
            oldPwd: '',
            newPwd: ''
          },
          rules: {
            oldPwd: [
              { required: true, message: 'not null', trigger: 'blur' }
            ],
            newPwd: [
              { required: true, message: 'not null', trigger: 'blur' }
            ]
          }
        }
      },
      methods: {
        onSubmit() {
          http.post('/user/updatePwd', JSON.stringify(this.form))
            .then((response) => {
              const succ = response.data.data
              if (succ) {
                this.$message({
                  message: '重置成功,请退出后重新登录',
                  type: 'success'
                })
              } else {
                this.$message({
                  message: response.data.msg,
                  type: 'warning'
                })
              }
            })
        }
      }
    }
  </script>
