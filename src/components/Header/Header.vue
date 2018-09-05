<template>
  <header class="app-header navbar">
    <button class="navbar-toggler mobile-sidebar-toggler d-lg-none" type="button" @click="mobileSidebarToggle">
      <span class="navbar-toggler-icon"></span>
    </button>
    <b-link class="navbar-brand" to="#"></b-link>
    <button class="navbar-toggler sidebar-toggler d-md-down-none" type="button" @click="sidebarToggle">
      <span class="navbar-toggler-icon"></span>
    </button>
    <!--<b-navbar-nav class="d-md-down-none">-->
      <!--<b-nav-item class="px-3">Dashboard</b-nav-item>-->
      <!--<b-nav-item class="px-3">Users</b-nav-item>-->
      <!--<b-nav-item class="px-3">Settings</b-nav-item>-->
    <!--</b-navbar-nav>-->
    <b-navbar-nav class="ml-auto">
      <b-nav-item class="d-md-down-none" style="margin-top: 5px !important;">
        <i class="icon-bell"></i>
        <b-badge pill variant="danger">5</b-badge>
      </b-nav-item>
      <!--<b-nav-item class="d-md-down-none">-->
        <!--<i class="icon-location-pin"></i>-->
      <!--</b-nav-item>-->
      <!--<HeaderDropdown />-->
      <HeaderAccount  @showContent="openAccount"/>
    </b-navbar-nav>
    <button class="navbar-toggler aside-menu-toggler d-md-down-none" type="button" @click="asideToggle">
      <span class="navbar-toggler-icon"></span>
    </button>
  </header>
</template>
<script>
import cSwitch from '../Switch'
import HeaderDropdown from './HeaderDropdown.vue'
import HeaderAccount from './HeaderAccount.vue'
import {mapActions} from 'vuex'
export default {
  name: 'c-header',
  components: {
    HeaderDropdown,
    cSwitch,
    HeaderAccount
  },
  data: () => {
    return {
      isCheck: false
    }
  },
  mounted () {

  },
  methods: {
    ...mapActions(['LogOut']),
    sidebarToggle (e) {
      e.preventDefault()
      document.body.classList.toggle('sidebar-hidden')
    },
    sidebarMinimize (e) {
      e.preventDefault()
      document.body.classList.toggle('sidebar-minimized')
    },
    mobileSidebarToggle (e) {
      e.preventDefault()
      document.body.classList.toggle('sidebar-mobile-show')
    },
    asideToggle (e) {
      e.preventDefault()
      document.body.classList.toggle('aside-menu-hidden')
    },
    openAccount (el) {
      if (el.className === 'dropdown-menu dropdown-menu-right') {
        el.className = 'dropdown-menu dropdown-menu-right show'
        this.isCheck = true
      } else {
        el.className = 'dropdown-menu dropdown-menu-right'
        this.isCheck = false
      }
      if (this.isCheck) {
        var times = setTimeout(() => {
          if (el.className === 'dropdown-menu dropdown-menu-right show') {
            el.className = 'dropdown-menu dropdown-menu-right'
          }
          clearTimeout(times)
          this.isCheck = false
        }, 3000)
      }
    }
  }
}
</script>
