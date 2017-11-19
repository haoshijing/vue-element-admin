<template>
  <div style="width: 300px">
  <el-form :model="form" :rules="rules" ref="form" label-width="80px">
    <el-form-item label="旧密码">
      <el-input v-model="form.oldPwd" type="password" size="small"></el-input>
    </el-form-item>
    <el-form-item label="新密码">
      <el-input v-model="form.newPwd" type="password" size="small"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="onSubmit">立即修改</el-button>
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
              { required: true, message: '旧密码不能为空', trigger: 'blur' }
            ],
            newPwd: [
              { required: true, message: '新密码不能为空', trigger: 'blur' }
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
