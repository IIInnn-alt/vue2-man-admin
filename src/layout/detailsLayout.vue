<template>
  <div style="height: 100%">
    <el-container class="containerBox">
      <!-- <el-scrollbar wrap-class="scrollbar-wrapper"> -->
      <el-aside>
        <el-menu :default-active="activePath" @select="select">
          <template v-for="item in layoutPath">
            <el-menu-item :index="item.path" :key="item.path">
              <span>{{ item.meta && item.meta.title }}</span>
            </el-menu-item>
          </template>
        </el-menu>
      </el-aside>
      <!-- </el-scrollbar> -->
      <el-container>
        <el-main>
          <template v-for="item in layoutPath">
            <A v-bind:comChilds="item.path" v-if="item.path == path" :key="item.path"></A>
          </template>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import A from '@/components/A'
import { detailRouter } from '@/router'
export default {
  components: { A },
  data() {
    return {
      layoutPath: [],
      path: '',
      activePath: ''
    }
  },
  created() {
    this.layoutPath = detailRouter.patientRouter
    this.activePath = this.layoutPath[0].path
    this.select(this.activePath)
  },
  methods: {
    select(index, path) {
      this.path = index
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/styles/variables.scss';
// ::v-deep .scrollbar-wrapper {
//   overflow-x: hidden !important;
// }

// .el-scrollbar__bar.is-vertical {
//   right: 0px;
// }

// .el-scrollbar {
//   height: 100%;
//   overflow-x: hidden !important;
// }
::v-deep .containerBox {
  height: 100%;
  padding: 0;
  .el-aside {
    width: 180px !important;
    background: $menuBg !important;
    margin-bottom: 0;
    padding: 0;
    .el-menu {
      border-right: none;
      background: $menuBg !important;
      .el-menu-item.is-active {
        background-color: rgba(0, 0, 0, 0.06) !important;
        span {
          color: $subMenuHover;
        }
      }
      .el-menu-item:hover,
      .el-menu-item:focus {
        background-color: rgba(0, 0, 0, 0.06) !important;
        i,
        span {
          color: $subMenuHover;
        }
      }
      span {
        color: $menuActiveText;
        user-select: none;
        margin-left: 10px;
      }
    }
  }
  .el-container {
    .el-main {
      height: 100%;
      padding: 7px !important;
      background: #ebecf0;
    }
  }
}
</style>
