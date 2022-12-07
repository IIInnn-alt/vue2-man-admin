<!--
 * @Author: mn
 * @Date: 2022-11-23 13:15:33
 * @LastEditors: mn
 * @LastEditTime: 2022-11-30 10:04:07
 * @Description: 
-->
<template>
  <div>
    <el-form ref="addForm" :rules="rules" :model="form" :label-width="autoPx(90)">
      <el-row type="flex" justify="center">
        <el-col :span="22">
          <el-form-item prop="name" label="用户">
            <el-input v-model="form.name" placeholder="请输入用户"></el-input>
          </el-form-item>
          <el-form-item prop="status" label="使用状态">
            <el-radio-group v-model="form.status">
              <el-radio :label="true">使用中</el-radio>
              <el-radio :label="false">停止使用</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item prop="role" label="角色">
            <m-select :data="roleList" labelCode="name" v-model="form.role" placeholder="请选择角色"></m-select>
          </el-form-item>
          <el-form-item prop="phone" label="手机号">
            <el-input v-model="form.phone" placeholder="请输入手机号"></el-input>
          </el-form-item>
          <el-form-item prop="email" label="邮箱">
            <el-input v-model="form.email" placeholder="请输入邮箱"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        name: '',
        status: true,
        role: '',
        phone: '',
        email: ''
      },
      rules: {
        name: this.validRules({ name: '用户', max: 20 }),
        role: this.validRules({ name: '角色', nameType: 'select' }),
        phone: this.validRules({ name: '手机号', validFun: 'validPhone', validFunTip: '请输入正确的手机号' }),
        email: this.validRules({ name: '邮箱', validFun: 'validEmail', validFunTip: '请输入正确的邮箱' })
      },
      roleList: []
    }
  },
  async created() {
    this.roleList = await this.getApiData({ apiName: 'getRoleData' })
  },
  methods: {}
}
</script>

<style lang="scss" scoped></style>
