<template>
  <div class="app flex-row align-items-center" style="min-height: 70vh !important;">
    <div class="container">
      <b-row class="justify-content-center">
        <b-col md="5">
          <b-card-group>
            <b-card no-body class="p-4">
              <b-card-body>
                <h1 class="text-center">Modify Password</h1>
                <p class="text-muted text-center">Modify your account password</p>
                <form ref="modifyForm" method="post" :model="modifyForm" autoComplete="on">
                  <b-input-group class="mb-4" title="6~15 number and alphabet combination">
                    <b-input-group-prepend>
                      <b-input-group-text><i class="icon-lock"></i></b-input-group-text>
                    </b-input-group-prepend>
                    <input type="password" class="form-control" v-model="modifyForm.password" placeholder="Old Password"
                           @blur="judge_oldPwd()" @keyup.enter="handleModifyPwd()">
                  </b-input-group>
                  <b-input-group class="mb-4" title="6~15 number and alphabet combination">
                    <b-input-group-prepend>
                      <b-input-group-text><i class="icon-lock"></i></b-input-group-text>
                    </b-input-group-prepend>
                    <input type="password" class="form-control" v-model="modifyForm.new_password" placeholder="New Password"
                           @blur="judge_newPwd()" @keyup.enter="handleModifyPwd()">
                  </b-input-group>
                  <b-input-group class="mb-4" title="6~15 number and alphabet combination">
                    <b-input-group-prepend>
                      <b-input-group-text><i class="icon-lock"></i></b-input-group-text>
                    </b-input-group-prepend>
                    <input type="password" class="form-control" v-model="modifyForm.sPass2" placeholder="Confirm Password"
                           @blur="judge_confirmPwd();judgePwd()" @keyup.enter="handleModifyPwd()">
                  </b-input-group>
                  <b-row>
                    <b-col cols="12" class="text-center">
                      <b-button variant="primary rounded" class="px-3" @click="handleModifyPwd()">Modify</b-button>
                    </b-col>
                  </b-row>
                </form>
              </b-card-body>
            </b-card>
          </b-card-group>
        </b-col>
      </b-row>
    </div>
  </div>
</template>

<script>
import {validatUser} from '../../model/validate'
import {mapState} from 'vuex'

export default {
  name: 'Login',
  components: {},
  props: {},
  data () {
    return {
      modifyForm: {
        password: '',
        new_password: '',
        sPass2: ''
      },
      isPwd: []
    }
  },
  created () {

  },
  mounted () {
    this.$nextTick(() => {
      this.modifyForm.password = this.pwd
    })
  },
  computed: {
    ...mapState({
      pwd: state => state.pwd
    })
  },
  methods: {
    validatPwd (el, txt) {
      if (el.length === 0) {
        this.isPwd.push(false)
        this.$notify({
          content: txt + '不能为空！',
          btn: 'close'
        })
      } else {
        if (el.length < 6 || el.length > 15) {
          this.isPwd.push(false)
          this.$notify({
            content: txt + '由6-15个字符组成！',
            btn: 'close'
          })
        } else {
          if (validatUser(el)) {
            this.isPwd.push(true)
          } else {
            this.isPwd.push(false)
            this.$notify({
              content: txt + '由数字与字母组成！',
              btn: 'close'
            })
          }
        }
      }
    },
    judge_oldPwd () {
      let oldPassWord = this.modifyForm.password.trim()
      this.validatPwd(oldPassWord, '旧密码')
    },
    judge_newPwd () {
      let newPassWord = this.modifyForm.new_password.trim()
      this.validatPwd(newPassWord, '新密码')
    },
    judge_confirmPwd () {
      let confirmPassWord = this.modifyForm.sPass2.trim()
      this.validatPwd(confirmPassWord, '确定密码')
    },
    judgePwd () {
      let newPassWord = this.modifyForm.new_password.trim()
      let confirmPassWord = this.modifyForm.sPass2.trim()
      if (newPassWord === confirmPassWord) {
        this.isPwd.push(true)
      } else {
        this.isPwd.push(false)
        this.$notify({
          content: '新密码与确定密码不一致！',
          btn: 'close'
        })
      }
    },
    handleModifyPwd () {
      this.judge_oldPwd()
      this.judge_newPwd()
      this.judge_confirmPwd()
      this.judgePwd()
      console.log(this.isPwd)
      if (this.isPwd.indexOf(false) === -1) {
        this.$store.dispatch('ModifyPwd', this.modifyForm).then(() => {
          this.$notify({
            content: '修改密码成功!',
            btn: 'close'
          })
          this.modifyForm = {
            password: '',
            new_password: '',
            sPass2: ''
          }
          this.isPwd = []
          this.$router.push({path: '/index'})
        }).catch(err => {
          this.$notify({
            content: err,
            btn: 'close'
          })
        })
      }
    }
  },
  watch: {}
}
</script>

<style lang="scss" scoped>
  .p-4 {
    border-radius: 10px;
  }
</style>
