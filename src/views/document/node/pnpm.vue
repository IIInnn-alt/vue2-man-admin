<!--
 * @Author: mn
 * @Date: 2022-12-09 09:53:43
 * @LastEditors: mn
 * @LastEditTime: 2022-12-09 10:55:24
 * @Description: 
-->
<template>
  <div>
    <m-card>
      <div slot="header">
        pnpm
        <el-link type="success" href="https://pnpm.io/zh/cli/env" target="_blank">(链接)</el-link>
      </div>
      <div>
        <h3>安装</h3>
        <span>npm i -g pnpm</span>
        <hr />
        <p>pnpm本质上是一个包管理器和npm/yarn没有区别</p>
        <ul>
          <li>包安装速度极快</li>
          <li>磁盘空间利用非常高效</li>
        </ul>
        <el-image style="width: 100px; height: 100px" :src="img" :preview-src-list="srcList"></el-image>
      </div>
    </m-card>
  </div>
</template>

<script>
import img from './pnpm.png'
export default {
  data() {
    return {
      img: img,
      srcList: [img]
    }
  }
}
</script>

<style lang="scss" scoped></style>
