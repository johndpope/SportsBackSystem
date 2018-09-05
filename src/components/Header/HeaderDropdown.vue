<template>
      <b-nav-item-dropdown right no-caret>
        <template slot="button-content">
          <img src="static/img/avatars/6.jpg" class="img-avatar" alt="Account">
        </template>
        <b-dropdown-header tag="div" class="text-center"><strong>Account</strong></b-dropdown-header>
        <b-dropdown-item href="\login"><i class="fa fa-edit"></i> Modify Password</b-dropdown-item>
        <b-dropdown-item-button><i class="fa fa-sign-out"></i> Logout</b-dropdown-item-button>
      </b-nav-item-dropdown>
</template>

<script>
import cSwitch from '../Switch'
export default {
  name: 'header-dropdown',
  components: {
    cSwitch
  },
  data: () => {
    return {}
  },
  mounted () {
    this.$nextTick(() => {

    })
  },
  mothods: {
    Logout (e) {
      e.preventDefault()
      alert('aaa')
      this.$emit('LogoutFn')
    }
  }
}
</script>
