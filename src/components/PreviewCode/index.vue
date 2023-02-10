<template>
  <pre :class="'hx-scroll ' + lineNumbers">
     <code :class="'language-'+ type" v-html="showCode"></code>
 </pre>
</template>

<script>
import Prism from 'prismjs'
export default {
  name: 'prism',
  components: {},
  props: {
    code: {
      type: String,
      default: ''
    },
    type: {
      type: String,
      default: 'js'
    },
    isShowlineNumbers: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {}
  },
  computed: {
    lineNumbers() {
      return this.isShowlineNumbers ? 'line-numbers' : ''
    },
    showCode() {
      return Prism.highlight(this.code, Prism.languages[this.type], this.type)
    }
  },
  mounted() {
    Prism.highlightAll()
  }
}
</script>

<style lang="scss" scoped></style>
