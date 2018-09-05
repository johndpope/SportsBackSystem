<template>
  <div class="nav-item">
    <a href="#" class="nav-link" @click="showAccount">
      <img src="/static/img/avatars/6.jpg" class="img-avatar" :alt="this.user">
    </a>
    <div  id="account" ref="account" class="dropdown-menu dropdown-menu-right">
      <div class="dropdown-header text-center"><strong>{{this.user}}({{this.roles}})</strong></div>
      <a href="/other/modify" target="_self" class="dropdown-item"><i class="fa fa-edit"></i> Modify Password</a>
      <button type="button" class="dropdown-item" @click="Logout"><i class="fa fa-sign-out"></i> Logout</button>
    </div>
  </div>
</template>

<script>
import {mapActions, mapState} from 'vuex'

export default {
  name: 'header-Account',
  components: {},
  props: {},
  data () {
    return {}
  },
  created () {
  },
  mounted () {
    this.$nextTick(() => {

    })
  },
  computed: {
    ...mapState({
      user: state => state.user,
      roles: state => state.roles
    })
  },
  methods: {
    ...mapActions(['LogOut', 'FedLogOut']),
    showAccount (e) {
      e.preventDefault()
      let el = this.$refs.account
      this.$emit('showContent', el)
    },
    Logout () {
      this.LogOut().then(() => {
        window.location.reload()
        this.$router.push({ path: '/login' })
      }).catch(err => {
        this.$notify({
          content: err,
          btn: 'close'
        })
      })
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
