<template>
	<div class="dashboard-editor-container">

		<el-row>
			<el-col :span="6">
				<el-card class="box-card">

					<span class="display_name">Welcome:{{name}}</span>

				</el-card>
			</el-col>
    <!--
			<el-col :span="8">
				<pie-chart></pie-chart>
			</el-col>

			<el-col :span="10">
				<bar-chart></bar-chart>
			</el-col>
		</el-row>


		<el-row :gutter="20">
			<el-col :span="15">
				<line-chart></line-chart>
			</el-col>
			<el-col :span="9">
				<todo-list></todo-list>
			</el-col>
			  -->
		</el-row>
	</div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'dashboard-admin',
  components: { },
  data() {
    return {
      statisticsData: {
        dayPickTotal: 0,
        daySuccessTotal: 0
      }
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {

    }
  },
  computed: {
    ...mapGetters([
      'name',
      'avatar',
      'roles'
    ])
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.dashboard-editor-container {
    margin: 30px;
    .btn-group {
        margin-bottom: 60px;
    }
    .box-card-header {
        position: relative;
        height: 160px;
    }
    .panThumb {
        z-index: 100;
        height: 150px;
        width: 150px;
        position: absolute;
        left: 0px;
        right: 0px;
        margin: auto;
    }
    .display_name{
        font-size: 30px;
        display: block;
    }
    .info-item{
        display: inline-block;
        margin-top: 10px;
        font-size: 14px;
        &:last-of-type{
            margin-left: 15px;
        }
    }
}
</style>
