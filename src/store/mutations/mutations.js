export default {
  updateLoadingStatus (state, payload) {
    state.isLoading = payload.isLoading
  },
  updataCount (state, {num, time}) {
    state.count = num
    // console.log(time)
  },
  dealMessage (state, data) {
    // console.log(data)
    state.messages = data
    // console.log(state.messages)
  },
  startWaiting (state) {
    state.waiting = true
  },
  endWaiting (state) {
    setInterval(() => {
      state.waiting = false
    }, 2000)
  },
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_USER: (state, user) => {
    state.user = user
  },
  SET_PWD: (state, pwd) => {
    state.pwd = pwd
  },
  SET_ROLES: (state, roles) => {
    state.roles = roles
  },
  LOGIN_SUCCESS: () => {
    console.log('login success')
  },
  LOGOUT_USER: state => {
    state.user = ''
  },
  SET_addRouters: (state, addRouter) => {
    state.addRouters = addRouter
  },
  SET_siderbarArr: (state, nav) => {
    state.siderbarArr.push(nav)
  },
  setMatchId: (state, data) => {
    state.matchId = data
  }
}
