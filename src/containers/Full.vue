<template>
  <div class="app">
    <AppHeader/>
    <div class="app-body">
      <Sidebar :navItems="this.siderbarArr"/>
      <main class="main">
        <breadcrumb :list="list"/>
        <div class="container-fluid">
          <router-view></router-view>
        </div>
      </main>
      <AppAside/>
    </div>
    <AppFooter/>
  </div>
</template>

<script>
// import nav from '../_nav'
import { Header as AppHeader, Sidebar, Aside as AppAside, Footer as AppFooter, Breadcrumb } from '../components/'
import {mapState} from 'vuex'
export default {
  name: 'full',
  components: {
    AppHeader,
    Sidebar,
    AppAside,
    AppFooter,
    Breadcrumb
  },
  data () {
    return {
      //  nav: nav.items
    }
  },
  computed: {
    ...mapState({
      siderbarArr: state => state.siderbarArr
    }),
    name () {
      return this.$route.name
    },
    list () {
      return this.$route.matched
    }
  },
  created () {

  }
}
</script>
<style>
  .main{
    font-size: 12px;
  }
</style>
