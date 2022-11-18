<!--
 * @Author: mn
 * @Date: 2022-11-07 17:03:41
 * @LastEditors: mn
 * @LastEditTime: 2022-11-07 17:04:46
 * @Description: 
-->
<template>
  <m-card>
    <div slot="header">我的 Project</div>
    <div class="my">
      <div class="user">
        <img :src="userInfo.imgHead" />
        <div class="useIntro">
          <p>Hello, {{ userInfo.realname }}({{ userInfo.username }})</p>
          <p>
            <el-link href="https://github.com/IIInnn-alt" target="_blank" type="success">Github</el-link>
            <el-link href="https://gitee.com/iiinnn" target="_blank" type="warning">Gitee</el-link>
          </p>
        </div>
      </div>
      <div class="static">
        <div>
          <p>待办</p>
          <p>1/10</p>
        </div>
        <div>
          <p>star</p>
          <p><img src="https://badgen.net/github/stars/IIInnn-alt/vue2-man-admin" /></p>
        </div>
        <div>
          <p>forks</p>
          <p><img src="https://badgen.net/github/forks/IIInnn-alt/vue2-man-admin" /></p>
        </div>
      </div>
    </div>
  </m-card>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'my',
  data() {
    return {}
  },
  computed: {
    ...mapGetters(['userInfo'])
  },
  created() {}
}
</script>

<style lang="scss" scoped>
.my {
  width: 100%;
  height: 65px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .user {
    display: flex;
    align-items: center;
    justify-content: space-between;
    img {
      width: 65px;
      height: 100%;
      border-radius: 50%;
      margin-right: 16px;
    }
    .useIntro {
      p {
        margin: 10px 0;
        .el-link {
          margin-right: 10px;
        }
      }
    }
  }
  .static {
    width: 400px;
    height: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    div {
      flex: 1;
      p {
        margin: 10px 0;
      }
    }
  }
}
</style>
