<template>
  <div>
    <transition name="fade" mode="out-in">
       <router-view></router-view>
    </transition>
    <div id="waiting" v-show="waiting">
      <Wait></Wait>
    </div>
  </div>
</template>

<script>
import {mapState} from 'vuex'
import Wait from './components/wait/wait.vue' // 等待请求组件
export default {
  name: 'app',
  components: {
    Wait
  },
  computed: {
    ...mapState({
      waiting: state => state.waiting
    })
  }
}
</script>

<style lang="scss">
  /* Import Font Awesome Icons Set */
  $fa-font-path: '~font-awesome/fonts/';
  @import '~font-awesome/scss/font-awesome.scss';
  /* Import Simple Line Icons Set */
  $simple-line-font-path: '~simple-line-icons/fonts/';
  @import '~simple-line-icons/scss/simple-line-icons.scss';
  /* Import Bootstrap Vue Styles */
  @import 'bootstrap-vue/dist/bootstrap-vue.css';
  // Import Main styles for this application
  @import './assets/scss/style';
</style>
