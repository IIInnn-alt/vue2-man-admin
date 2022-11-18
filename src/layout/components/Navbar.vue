<template>
  <div class="navbar">
    <hamburger
      id="hamburger-container"
      :is-active="sidebar.opened"
      class="hamburger-container"
      @toggleClick="toggleSideBar"
    />
    <breadcrumb id="breadcrumb-container" class="breadcrumb-container" />
    <div class="right-menu">
      <div class="user-avatar">
        <!-- <svg-icon icon-class="avatar" class="avatar"></svg-icon> -->
        <img :src="userInfo.imgHead" />
        <span>{{ userName }}</span>
      </div>
      <div class="logout">
        <svg-icon icon-class="logout" class="logout-icon" @click="logout"></svg-icon>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Hamburger from '@/components/Hamburger'
import Breadcrumb from '@/components/Breadcrumb'

export default {
  components: {
    Hamburger,
    Breadcrumb
  },
  computed: {
    ...mapGetters(['sidebar', 'userName', 'userInfo'])
  },
  methods: {
    toggleSideBar() {
      this.$store.dispatch('app/toggleSideBar')
    },
    async logout() {
      this.$confirm('确定注销并退出系统吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.$store.dispatch('user/FedLogOut').then(() => {
            location.reload()
          })
        })
        .catch(() => {})
    }
  }
}
</script>

<style lang="scss" scoped>
.navbar {
  height: 64px;
  overflow: hidden;
  position: relative;
  background: #fff;
  border: 1px solid rgb(239, 239, 245);
  // box-shadow: 0 2px 4px rgba(0, 21, 41, 0.08);
  z-index: 99;

  .hamburger-container {
    line-height: 64px;
    height: 100%;
    float: left;
    cursor: pointer;
    transition: background 0.3s;
    -webkit-tap-highlight-color: transparent;

    &:hover {
      background: rgba(0, 0, 0, 0.025);
    }
  }
  .breadcrumb-container {
    float: left;
  }

  .right-menu {
    float: right;
    height: 64px;
    line-height: 64px;
    // border: 1px solid red;
    &:focus {
      outline: none;
    }
    .user-avatar {
      height: 100%;
      float: left;
      display: flex;
      align-items: center;
      &:hover {
        background-color: #f6f6f6;
      }
      .avatar {
        // border: 1px solid red;
        // height: inherit;
        // width: 40px;
        font-size: 2.1em;
        margin: 0 15px;
        vertical-align: middle;
      }
      img {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        overflow: hidden;
        margin: 0 5px 0 10px;
      }
      span {
        color: $theme;
        font-weight: 500;
        font-size: 17px;
        margin: 0 10px 0 5px;
      }
    }
    .logout {
      float: right;
      height: 100%;
      border-left: 1px solid #f6f6f6;
      &:hover {
        background-color: #f6f6f6;
      }
      .logout-icon {
        height: inherit;
        width: 63px;
        cursor: pointer;
      }
    }
  }
}
</style>
