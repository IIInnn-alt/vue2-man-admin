<template>
  <div id="tags-view-container" class="tags-view-container">
    <el-tabs v-model="activeKey" type="card" @tab-click="handleTabClick" @tab-remove="handleTabRemove">
      <el-tab-pane :key="tag.path" v-for="tag in visitedViews" :name="tag.path" :closable="!isAffix(tag)">
        <span slot="label" style="display: inline-block" @contextmenu.prevent="openMenu(tag, $event)">
          <template>
            <svg-icon
              v-if="isAffix(tag) && tag.meta && tag.meta.icon"
              :icon-class="tag.meta.icon"
              class-name="custom_icon"
            ></svg-icon>
          </template>
          <span>{{ tag.meta.title }}</span>
        </span>
      </el-tab-pane>
    </el-tabs>
    <el-dropdown @command="handleCommand" @visible-change="handleVisibleChange">
      <span :class="{ 'tabs-more-active': active }" class="tabs-more">
        <span class="tabs-more-icon">
          <i class="box box-t"></i>
          <i class="box box-b"></i>
        </span>
      </span>
      <template #dropdown>
        <el-dropdown-menu class="custom_dropdown">
          <el-dropdown-item command="refreshSelectedTag">
            <i class="el-icon-refresh-right"></i>
            刷新页面
          </el-dropdown-item>
          <el-dropdown-item v-if="!isAffix(selectedTag)" command="closeSelectedTag">
            <i class="el-icon-close"></i>
            关闭当前
          </el-dropdown-item>
          <el-dropdown-item command="closeOthersTags">
            <i class="el-icon-circle-close"></i>
            关闭其他
          </el-dropdown-item>
          <el-dropdown-item v-if="!isFirstView()" command="closeLeftTags">
            <i class="el-icon-back"></i>
            关闭左侧
          </el-dropdown-item>
          <el-dropdown-item v-if="!isLastView()" command="closeRightTags">
            <i class="el-icon-right"></i>
            关闭右侧
          </el-dropdown-item>
          <el-dropdown-item command="closeAllTags">
            <i class="el-icon-circle-close"></i>
            全部关闭
          </el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
    <ul v-show="visible" :style="{ left: left + 'px', top: top + 'px' }" class="contextmenu">
      <li @click="refreshSelectedTag(selectedTag)">
        <i class="el-icon-refresh-right"></i>
        刷新页面
      </li>
      <li v-if="!isAffix(selectedTag)" @click="closeSelectedTag(selectedTag)">
        <i class="el-icon-close"></i>
        关闭当前
      </li>
      <li @click="closeOthersTags">
        <i class="el-icon-circle-close"></i>
        关闭其他
      </li>
      <li v-if="!isFirstView()" @click="closeLeftTags">
        <i class="el-icon-back"></i>
        关闭左侧
      </li>
      <li v-if="!isLastView()" @click="closeRightTags">
        <i class="el-icon-right"></i>
        关闭右侧
      </li>
      <li @click="closeAllTags(selectedTag)">
        <i class="el-icon-circle-close"></i>
        全部关闭
      </li>
    </ul>
  </div>
</template>

<script>
import path from 'path'
export default {
  data() {
    return {
      visible: false,
      top: 0,
      left: 0,
      selectedTag: {},
      affixTags: [],
      activeKey: null,
      active: false
    }
  },
  computed: {
    visitedViews() {
      return this.$store.state.tagsView.visitedViews
    },
    routes() {
      return this.$store.getters.permission_routes
    }
  },
  watch: {
    $route() {
      this.addTags()
    },
    visible(value) {
      if (value) {
        document.body.addEventListener('click', this.closeMenu)
      } else {
        document.body.removeEventListener('click', this.closeMenu)
      }
    }
  },
  mounted() {
    this.initTags()
    this.addTags()
  },
  methods: {
    isActive(route) {
      return route.path === this.$route.path
    },
    isAffix(tag) {
      return tag.meta && tag.meta.affix
    },
    isFirstView() {
      try {
        return this.selectedTag.fullPath === this.visitedViews[0].fullPath
      } catch (err) {
        return false
      }
    },
    isLastView() {
      try {
        return this.selectedTag.fullPath === this.visitedViews[this.visitedViews.length - 1].fullPath
      } catch (err) {
        return false
      }
    },
    filterAffixTags(routes, basePath = '/') {
      let tags = []
      routes.forEach(route => {
        if (route.meta && route.meta.affix) {
          const tagPath = path.resolve(basePath, route.path)
          tags.push({
            fullPath: tagPath,
            path: tagPath,
            name: route.name,
            meta: { ...route.meta }
          })
        }
        if (route.children) {
          const tempTags = this.filterAffixTags(route.children, route.path)
          if (tempTags.length >= 1) {
            tags = [...tags, ...tempTags]
          }
        }
      })
      return tags
    },
    initTags() {
      const affixTags = (this.affixTags = this.filterAffixTags(this.routes))
      for (const tag of affixTags) {
        // Must have tag name
        if (tag.name) {
          this.$store.dispatch('tagsView/addVisitedView', tag)
        }
      }
    },
    addTags() {
      const { name, path } = this.$route
      if (name) {
        this.$store.dispatch('tagsView/addView', this.$route)
        this.activeKey = path
        this.selectedTag = this.$route
      }
      return false
    },
    moveToCurrentTag() {
      const tags = this.$refs.tag
      this.$nextTick(() => {
        for (const tag of tags) {
          if (tag.to.path === this.$route.path) {
            this.$refs.scrollPane.moveToTarget(tag)
            // when query is different then update
            if (tag.to.fullPath !== this.$route.fullPath) {
              this.$store.dispatch('tagsView/updateVisitedView', this.$route)
            }
            break
          }
        }
      })
    },
    refreshSelectedTag(view) {
      this.$tab.refreshPage(view)
    },
    closeSelectedTag(view) {
      this.$tab.closePage(view).then(({ visitedViews }) => {
        if (this.isActive(view)) {
          this.toLastView(visitedViews, view)
        }
      })
    },
    closeRightTags() {
      this.$tab.closeRightPage(this.selectedTag).then(visitedViews => {
        if (!visitedViews.find(i => i.fullPath === this.$route.fullPath)) {
          this.toLastView(visitedViews)
        }
      })
    },
    closeLeftTags() {
      this.$tab.closeLeftPage(this.selectedTag).then(visitedViews => {
        if (!visitedViews.find(i => i.fullPath === this.$route.fullPath)) {
          this.toLastView(visitedViews)
        }
      })
    },
    closeOthersTags() {
      this.$router.push(this.selectedTag).catch(() => {})
      this.$tab.closeOtherPage(this.selectedTag).then(() => {})
    },
    closeAllTags(view) {
      this.$tab.closeAllPage().then(({ visitedViews }) => {
        if (this.affixTags.some(tag => tag.path === this.$route.path)) {
          return
        }
        this.toLastView(visitedViews, view)
      })
    },
    toLastView(visitedViews, view) {
      const latestView = visitedViews.slice(-1)[0]
      if (latestView) {
        this.$router.push(latestView.fullPath)
      } else {
        this.$router.push('/')
      }
    },
    openMenu(tag, e) {
      const menuMinWidth = 105
      const offsetLeft = this.$el.getBoundingClientRect().left // container margin left
      const offsetWidth = this.$el.offsetWidth // container width
      const maxLeft = offsetWidth - menuMinWidth // left boundary
      const left = e.clientX - offsetLeft - 15 // 15: margin right
      if (left > maxLeft) {
        this.left = maxLeft
      } else {
        this.left = left
      }

      this.top = e.clientY - 54 // 64 navbar height + 30
      this.visible = true
      this.selectedTag = tag
    },
    closeMenu() {
      this.visible = false
    },
    handleScroll() {
      this.closeMenu()
    },
    handleTabClick(tab) {
      if (!this.isActive({ path: tab.name })) {
        this.$router.push(this.visitedViews[tab.index])
      }
    },
    handleTabRemove(tab) {
      let obj = this.visitedViews.find(item => {
        return item.path == tab
      })
      this.closeSelectedTag(obj)
    },
    // more
    handleCommand(command) {
      switch (command) {
        case 'refreshSelectedTag':
          this.refreshSelectedTag(this.selectedTag)
          break
        case 'closeSelectedTag':
          this.closeSelectedTag(this.selectedTag)
          break
        case 'closeOthersTags':
          this.closeOthersTags()
          break
        case 'closeLeftTags':
          this.closeLeftTags()
          break
        case 'closeAllTags':
          this.closeAllTags(this.selectedTag)
          break
      }
    },
    handleVisibleChange(val) {
      this.active = val
    }
  }
}
</script>

<style lang="scss" scoped>
.tags-view-container {
  height: 48px;
  // transition: margin-left 0.28s;
  // margin-left: $sideBarWidth;
  background: #fff;
  border-bottom: 1px solid #ebedf0;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.12), 0 0 3px 0 rgba(0, 0, 0, 0.04);
  padding: 8px 10px;
  color: #6e7780;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  .custom_icon {
    width: 18px;
    height: 18px;
    vertical-align: sub;
    margin-right: 5px;
  }
  ::v-deep {
    .el-tabs {
      width: calc(100% - 40px);
      height: 32px;
      .el-tabs__header {
        border-bottom: none;
        .el-tabs__nav {
          border: 0;
        }
        .el-tabs__item {
          box-sizing: border-box;
          height: 32px;
          margin-right: 10px;
          line-height: 32px;
          color: #6e7780;
          border: 1px solid #c0c4cc;
          border-radius: 4px;
          transition: padding 0.3s cubic-bezier(0.645, 0.045, 0.355, 1) !important;
          // 没有关闭按钮的
          &:not(.is-closable) {
            background: #e6edf5;
            color: $theme;
          }
          &.is-active {
            color: #fff;
            border: 1px solid #c0c4cc;
            outline: none;
            background: $theme;
            &.is-closable .el-icon-close {
              // width: 16px !important;
              // height: 16px !important;
              font-size: 15px;
              &:hover {
                background: none;
              }
            }
          }

          // &:hover {
          //   border: 1px solid $theme-color;
          // }
        }
      }
    }
  }

  .tabs-more {
    position: relative;
    display: inline-block;
    height: 32px;
    line-height: 38px;
    width: 25px;
    .tabs-more-icon {
      display: inline-block;
      color: #9a9a9a;
      cursor: pointer;
      transition: transform 0.3s ease-out;
      .box {
        position: relative;
        display: block;
        width: 14px;
        height: 8px;
        &:before {
          position: absolute;
          top: 0;
          left: 0px;
          width: 6px;
          height: 6px;
          content: '';
          background: #9a9a9a;
        }

        &:after {
          position: absolute;
          top: 0;
          left: 8px;
          width: 6px;
          height: 6px;
          content: '';
          background: #9a9a9a;
        }
      }
      .box-t {
        &:before {
          transition: transform 0.3s ease-out 0.3s;
        }
      }
    }
    &.tabs-more-active,
    &:hover {
      &:after {
        position: absolute;
        bottom: -1px;
        left: 0;
        height: 0;
        content: '';
      }

      .tabs-more-icon {
        transform: rotate(90deg);

        .box-t {
          &:before {
            transform: rotate(45deg);
          }
        }

        .box:before,
        .box:after {
          background: $theme;
        }
      }
    }
  }

  .contextmenu {
    margin: 0;
    background: #fff;
    z-index: 3000;
    position: absolute;
    list-style-type: none;
    padding: 5px;
    border-radius: 4px;
    font-size: 12px;
    font-weight: 400;
    color: #78848c;
    box-shadow: 2px 2px 3px 0 rgba(0, 0, 0, 0.3);
    li {
      margin: 0;
      padding: 8px 15px;
      font-size: 13px;
      cursor: pointer;
      &:hover {
        background: #e6edf5;
      }
    }
  }
}
.aa {
  border: 1px solid red;
}
</style>
