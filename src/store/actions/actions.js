import ajaxModel from '../../model/ajaxModel'
import bus from '../../model/bus'
import notify from '../../components/notification/function'
import Cookies from 'js-cookie'

// 请求拦截
const handleError = (err, {commit}) => {
  if (err.code === 401) {
    notify({
      // content: err.msg,
      content: '登录失效，请重新登录！',
      btn: 'close'
    })
    commit('endWaiting')
    commit('SET_TOKEN', '')
    commit('SET_ROLES', '')
    commit('SET_USER', '')
    commit('SET_PWD', '')
    sessionStorage.removeItem('Anbo-User')
    sessionStorage.removeItem('Anbo-Pwd')
    sessionStorage.removeItem('Anbo-Role')
    sessionStorage.removeItem('Anbo-Token')
    setTimeout(() => {
      bus.$emit('auth')
    }, 1000)
  } else if (err.code === 404) {
    notify({
      content: '正在努力寻找API...',
      btn: 'close'
    })
  } else if (err.code === 405) {
    notify({
      content: err.msg,
      btn: 'close'
    })
  } else if (err.code === 504) {
    notify({
      content: '后台系统没有启动...',
      btn: 'close'
    })
  } else {
    let info
    if (err.msg) {
      info = err.msg
    } else {
      info = '返回数据结构有误！'
    }
    notify({
      content: info,
      btn: 'close'
    })
  }
}

export default {
  updataCountAsync (state, data) {
    let size = data.num
    setInterval(() => {
      state.commit('updataCount', {
        num: size++
      })
    }, data.time)
  },
  getMessage ({commit}) {
    commit('startWaiting')
    ajaxModel.getInfo().then(data => {
      commit('endWaiting')
      commit('dealMessage', data)
      notify({
        content: '获取信息成功！'
      })
    }).catch(err => {
      commit('endWaiting')
      handleError(err)
    })
  },
  setTime ({commit}, data) {
    let timer = new Date(data)
    let y, m, d, h, M
    y = timer.getFullYear() + '-'
    m = (timer.getMonth() + 1) > 10 ? (timer.getMonth() + 1) + '-' : '0' + (timer.getMonth() + 1) + '-'
    d = timer.getDate() + ' '
    h = timer.getHours()
    M = timer.getMinutes() > 10 ? timer.getMinutes() : '0' + timer.getMinutes()
    if (h - 12 >= 0) {
      h = '0' + (h - 12) + ':'
      timer = y + m + d + h + M + ' PM'
    } else {
      h = '0' + h + ':'
      timer = y + m + d + h + M + ' AM'
    }
    return timer
  },
  // 用户名登录
  LoginByUser ({ commit }, userInfo) {
    commit('startWaiting')
    return new Promise((resolve, reject) => {
      ajaxModel.logIn(userInfo).then(response => {
        commit('endWaiting')
        // Cookies.set('Anbo-User', response.username)
        // Cookies.set('Anbo-Role', response.role.name)
        // Cookies.set('Anbo-Token', response.authorityList)
        sessionStorage.setItem('Anbo-User', response.username)
        sessionStorage.setItem('Anbo-Pwd', response.password)
        sessionStorage.setItem('Anbo-Role', response.role.name)
        sessionStorage.setItem('Anbo-Token', JSON.stringify(response.authorityList))
        commit('SET_TOKEN', response.authorityList)
        commit('SET_USER', response.username)
        commit('SET_PWD', response.password)
        commit('SET_ROLES', response.role.name)
        resolve()
      }).catch(error => {
        commit('endWaiting')
        // reject(error)
        handleError(error, { commit })
      })
    })
  },

  // 登出
  LogOut ({ commit, state }) {
    commit('startWaiting')
    return new Promise((resolve, reject) => {
      ajaxModel.logOut().then(() => {
        commit('endWaiting')
        commit('SET_TOKEN', '')
        commit('SET_ROLES', '')
        commit('SET_USER', '')
        commit('SET_PWD', '')
        state.siderbarArr = []
        // Cookies.remove('Anbo-Token')
        // Cookies.remove('Anbo-User')
        // Cookies.remove('Anbo-Role')
        sessionStorage.removeItem('Anbo-User')
        sessionStorage.removeItem('Anbo-Pwd')
        sessionStorage.removeItem('Anbo-Role')
        sessionStorage.removeItem('Anbo-Token')
        resolve()
      }).catch(error => {
        commit('endWaiting')
        // reject(error)
        handleError(error, { commit })
      })
    })
  },

  // 前端 登出
  FedLogOut ({ commit }) {
    return new Promise(resolve => {
      commit('SET_TOKEN', '')
      commit('SET_ROLES', [])
      commit('SET_addRouters', [])
      commit('SET_USER', '')
      // Cookies.remove('Anbo-Token')
      sessionStorage.removeItem('Anbo-Token')
      resolve()
    })
  },

  // 修改密码
  ModifyPwd ({ commit }, pwdInfo) {
    commit('startWaiting')
    const pwd = pwdInfo.new_password
    return new Promise((resolve, reject) => {
      ajaxModel.setPassword(pwdInfo).then(response => {
        commit('endWaiting')
        sessionStorage.setItem('Anbo-Pwd', pwd)
        commit('SET_PWD', pwd)
        resolve()
      }).catch(error => {
        commit('endWaiting')
        // reject(error)
        handleError(error, { commit })
      })
    })
  },

  // 竞猜记录--联动获取选择赛事
  GiessingMatch ({ commit }, MatchInfo) {
    commit('startWaiting')
    return new Promise((resolve, reject) => {
      ajaxModel.setGiessingMatch(MatchInfo).then(response => {
        commit('endWaiting')
        resolve(response)
      }).catch(error => {
        commit('endWaiting')
        // reject(error)
        handleError(error, { commit })
      })
    })
  },

  // 竞猜记录
  GiessingRecords ({ commit }, GiessingInfo) {
    commit('startWaiting')
    return new Promise((resolve, reject) => {
      ajaxModel.setGiessing(GiessingInfo).then(response => {
        commit('endWaiting')
        resolve(response)
      }).catch(error => {
        commit('endWaiting')
        handleError(error, { commit })
        // reject(error)
      })
    })
  },

  // 转账记录
  TransferRecords ({ commit }, transferInfo) {
    commit('startWaiting')
    return new Promise((resolve, reject) => {
      ajaxModel.setTransfer(transferInfo).then(response => {
        commit('endWaiting')
        resolve(response)
      }).catch(error => {
        commit('endWaiting')
        // reject(error)
        handleError(error, { commit })
      })
    })
  },

  // 操盘记录
  operationRecords ({ commit }, operationInfo) {
    commit('startWaiting')
    return new Promise((resolve, reject) => {
      ajaxModel.setOperation(operationInfo).then(response => {
        commit('endWaiting')
        resolve(response)
      }).catch(error => {
        commit('endWaiting')
        // reject(error)
        handleError(error, { commit })
      })
    })
  },

  // 流水记录
  flowRecords ({ commit }, flowInfo) {
    commit('startWaiting')
    return new Promise((resolve, reject) => {
      ajaxModel.setFlow(flowInfo).then(response => {
        commit('endWaiting')
        resolve(response)
      }).catch(error => {
        commit('endWaiting')
        // reject(error)
        handleError(error, { commit })
      })
    })
  },

  // 员工管理列表
  getEmployeeList ({ commit }, employeeListInfo) {
    commit('startWaiting')
    return new Promise((resolve, reject) => {
      ajaxModel.setEmployeeList(employeeListInfo).then(response => {
        commit('endWaiting')
        resolve(response)
      }).catch(error => {
        commit('endWaiting')
        // reject(error)
        handleError(error, { commit })
      })
    })
  },

  // 员工管理新增
  getEmployeeAdd ({ commit }, employeeAddInfo) {
    commit('startWaiting')
    return new Promise((resolve, reject) => {
      ajaxModel.setEmployeeAdd(employeeAddInfo).then(response => {
        commit('endWaiting')
        resolve(response)
      }).catch(error => {
        commit('endWaiting')
        // reject(error)
        handleError(error, { commit })
      })
    })
  },

  // 员工管理编辑
  getEmployeeEdit ({ commit }, employeeEditInfo) {
    commit('startWaiting')
    return new Promise((resolve, reject) => {
      ajaxModel.setEmployeeEdit(employeeEditInfo).then(response => {
        commit('endWaiting')
        resolve(response)
      }).catch(error => {
        commit('endWaiting')
        handleError(error, { commit })
        // reject(error)
      })
    })
  },

  // 会员管理列表
  getMemberList ({ commit }, memberListInfo) {
    commit('startWaiting')
    return new Promise((resolve, reject) => {
      ajaxModel.setMemberList(memberListInfo).then(response => {
        commit('endWaiting')
        resolve(response)
      }).catch(error => {
        commit('endWaiting')
        // reject(error)
        handleError(error, { commit })
      })
    })
  },

  // 会员管理编辑
  getMemberEdit ({ commit }, memberEditInfo) {
    commit('startWaiting')
    return new Promise((resolve, reject) => {
      ajaxModel.setMemberEdit(memberEditInfo).then(response => {
        commit('endWaiting')
        resolve(response)
      }).catch(error => {
        commit('endWaiting')
        handleError(error, { commit })
        // reject(error)
      })
    })
  },

  // 联赛管理
  getLeagueList ({ commit }, leagueListInfo) {
    commit('startWaiting')
    return new Promise((resolve, reject) => {
      ajaxModel.setLeagueList(leagueListInfo).then(response => {
        commit('endWaiting')
        resolve(response)
      }).catch(error => {
        commit('endWaiting')
        handleError(error, { commit })
        // reject(error)
      })
    })
  },

  // 联赛管理编辑
  getLeagueEdit ({ commit }, leagueEditInfo) {
    commit('startWaiting')
    return new Promise((resolve, reject) => {
      ajaxModel.setLeagueEdit(leagueEditInfo).then(response => {
        commit('endWaiting')
        resolve(response)
      }).catch(error => {
        commit('endWaiting')
        handleError(error, { commit })
        // reject(error)
      })
    })
  },

  // 联赛管理添加
  getLeagueAdd ({ commit }, leagueAddInfo) {
    commit('startWaiting')
    return new Promise((resolve, reject) => {
      ajaxModel.setLeagueAdd(leagueAddInfo).then(response => {
        commit('endWaiting')
        resolve(response)
      }).catch(error => {
        commit('endWaiting')
        handleError(error, { commit })
        // reject(error)
      })
    })
  },

  // 联赛管理SelectId 与 游戏设置列表
  getLeagueAddSelectId ({ commit }, leagueSelectIdInfo) {
    commit('startWaiting')
    return new Promise((resolve, reject) => {
      ajaxModel.setLeagueSelectId(leagueSelectIdInfo).then(response => {
        commit('endWaiting')
        resolve(response)
      }).catch(error => {
        commit('endWaiting')
        handleError(error, { commit })
        // reject(error)
      })
    })
  },

  // 游戏设置增添
  addGameSettingAjax ({ commit }, data) {
    commit('startWaiting')
    return new Promise((resolve, reject) => {
      ajaxModel.addGameSetting(data).then(response => {
        commit('endWaiting')
        resolve(response)
      }).catch(error => {
        commit('endWaiting')
        handleError(error, { commit })
        // reject(error)
      })
    })
  },

  // 游戏设置修改
  updateGameSettingAjax ({ commit }, data) {
    commit('startWaiting')
    return new Promise((resolve, reject) => {
      ajaxModel.updateGameSetting(data).then(response => {
        commit('endWaiting')
        resolve(response)
      }).catch(error => {
        commit('endWaiting')
        handleError(error, { commit })
        // reject(error)
      })
    })
  },

  // 游戏设置查询
  findGameSettingAjax ({ commit }, data) {
    commit('startWaiting')
    return new Promise((resolve, reject) => {
      ajaxModel.findGameSetting(data).then(response => {
        commit('endWaiting')
        resolve(response)
      }).catch(error => {
        commit('endWaiting')
        handleError(error, { commit })
        // reject(error)
      })
    })
  },

  // 赛事列表查询
  getMatchesListAjax ({ commit }, data) {
    commit('startWaiting')
    return new Promise((resolve, reject) => {
      ajaxModel.getMatchesList(data).then(response => {
        commit('endWaiting')
        resolve(response)
      }).catch(error => {
        commit('endWaiting')
        handleError(error, { commit })
        // reject(error)
      })
    })
  },

  // 获取赛事LeagueIds
  getLeagueIdsAjax ({ commit }) {
    commit('startWaiting')
    return new Promise((resolve, reject) => {
      ajaxModel.getLeagueIds().then(response => {
        commit('endWaiting')
        resolve(response)
      }).catch(error => {
        commit('endWaiting')
        handleError(error, { commit })
        // reject(error)
      })
    })
  },

  // 获取赛事修改详情
  getModifyMatchesAjax ({ commit }, data) {
    commit('startWaiting')
    return new Promise((resolve, reject) => {
      ajaxModel.getModifyMatches(data).then(response => {
        commit('endWaiting')
        resolve(response)
      }).catch(error => {
        commit('endWaiting')
        handleError(error, { commit })
        // reject(error)
      })
    })
  },

  // 赛事修改
  setModifyMatchesAjax ({ commit }, data) {
    commit('startWaiting')
    return new Promise((resolve, reject) => {
      ajaxModel.setModifyMatches(data).then(response => {
        commit('endWaiting')
        resolve(response)
      }).catch(error => {
        commit('endWaiting')
        handleError(error, { commit })
        // reject(error)
      })
    })
  },

  // 打开赛事
  openMatchAjax ({ commit }, data) {
    commit('startWaiting')
    return new Promise((resolve, reject) => {
      ajaxModel.openMatch(data).then(response => {
        commit('endWaiting')
        resolve(response)
      }).catch(error => {
        commit('endWaiting')
        handleError(error, { commit })
        // reject(error)
      })
    })
  },

  // 新增赛事
  addMatchAjax ({ commit }, data) {
    commit('startWaiting')
    return new Promise((resolve, reject) => {
      ajaxModel.AddMatch(data).then(response => {
        commit('endWaiting')
        resolve(response)
      }).catch(error => {
        commit('endWaiting')
        handleError(error, { commit })
        // reject(error)
      })
    })
  },

  // 赛事信息sort
  getMatchSortAjax ({ commit }, data) {
    commit('startWaiting')
    return new Promise((resolve, reject) => {
      ajaxModel.getMatchSortOut(data).then(response => {
        commit('endWaiting')
        resolve(response)
      }).catch(error => {
        commit('endWaiting')
        handleError(error, { commit })
        // reject(error)
      })
    })
  },

  //  赛事规整
  setMatchSortAjax ({ commit }, data) {
    commit('startWaiting')
    return new Promise((resolve, reject) => {
      ajaxModel.setMatchSortOut(data).then(response => {
        commit('endWaiting')
        resolve(response)
      }).catch(error => {
        commit('endWaiting')
        handleError(error, { commit })
        // reject(error)
      })
    })
  },

  // 获取操盘赛事列表
  getEventHandicapListAjax ({ commit }, data) {
    commit('startWaiting')
    return new Promise((resolve, reject) => {
      ajaxModel.getEventHandicapList(data).then(response => {
        commit('endWaiting')
        resolve(response)
      }).catch(error => {
        commit('endWaiting')
        handleError(error, { commit })
        // reject(error)
      })
    })
  },

  // 增添操盘赛事盘口
  addEventHandicapAjax ({ commit }, data) {
    commit('startWaiting')
    return new Promise((resolve, reject) => {
      ajaxModel.addEventHandicap(data).then(response => {
        commit('endWaiting')
        resolve(response)
      }).catch(error => {
        commit('endWaiting')
        // handleError(error, { commit })
        reject(error)
      })
    })
  },

  // 编辑操盘赛事盘口
  editEventHandicapAjax ({ commit }, data) {
    commit('startWaiting')
    return new Promise((resolve, reject) => {
      ajaxModel.editEventHandicap(data).then(response => {
        commit('endWaiting')
        resolve(response)
      }).catch(error => {
        commit('endWaiting')
        handleError(error, { commit })
        // reject(error)
      })
    })
  },

  // 操作操盘赛事盘口
  operatingEventHandicapAjax ({ commit }, data) {
    commit('startWaiting')
    return new Promise((resolve, reject) => {
      ajaxModel.operatingEventHandicap(data).then(response => {
        commit('endWaiting')
        resolve(response)
      }).catch(error => {
        commit('endWaiting')
        handleError(error, { commit })
        // reject(error)
      })
    })
  },

  // 操作操盘赛事
  operatingEventAjax ({ commit }, data) {
    commit('startWaiting')
    return new Promise((resolve, reject) => {
      ajaxModel.operatingEvent(data).then(response => {
        commit('endWaiting')
        resolve(response)
      }).catch(error => {
        commit('endWaiting')
        handleError(error, { commit })
        // reject(error)
      })
    })
  },

  // 录入操盘赛事赛果
  entryEventHandicapAjax ({ commit }, data) {
    commit('startWaiting')
    return new Promise((resolve, reject) => {
      ajaxModel.entryEventHandicap(data).then(response => {
        commit('endWaiting')
        resolve(response)
      }).catch(error => {
        commit('endWaiting')
        handleError(error, { commit })
      })
    })
  },
  // 通过联赛ID获取游戏联赛
  async getFindGameLeagueID ({ commit }, data) {
    commit('startWaiting')
    let re = ''
    await ajaxModel.getFindGameLeagueByID(data).then(res => {
      commit('endWaiting')
      re = res
    }).catch(err => {
      commit('endWaiting')
      handleError(err, {commit})
    })
    return re
  },
  // 增加盘口
  async postAddOdd ({ commit }, data) {
    commit('startWaiting')
    let re = ''
    await ajaxModel.postAddOdds(data).then(res => {
      commit('endWaiting')
      re = res
    }).catch(err => {
      commit('endWaiting')
      handleError(err, {commit})
    })
    return re
  },
  // 批量编辑盘口
  async postUpdateOdds ({ commit }, data) {
    commit('startWaiting')
    let re = ''
    await ajaxModel.postUpdateOdd(data).then(res => {
      commit('endWaiting')
      re = res
    }).catch(err => {
      commit('endWaiting')
      handleError(err, {commit})
    })
    return re
  },
  // 权限列表
  async getListAut ({ commit }, data) {
    commit('startWaiting')
    let re = ''
    await ajaxModel.getListAuthority(data).then(res => {
      commit('endWaiting')
      re = res
    }).catch(err => {
      commit('endWaiting')
      handleError(err, {commit})
    })
    return re
  },
  // 角色删除
  async postDeleteRoles ({ commit }, data) {
    commit('startWaiting')
    let re = ''
    await ajaxModel.postDeleteRole(data).then(res => {
      commit('endWaiting')
      re = res
    }).catch(err => {
      commit('endWaiting')
      handleError(err, {commit})
    })
    return re
  },
  // 列出所有角色
  async postListAllRoles ({ commit }, data) {
    commit('startWaiting')
    let re = ''
    await ajaxModel.postListAllRole(data).then(res => {
      commit('endWaiting')
      re = res
    }).catch(err => {
      commit('endWaiting')
      handleError(err, {commit})
    })
    return re
  },
  // 根据角色,列出相应权限
  async postListAuthorityByRoles ({ commit }, data) {
    commit('startWaiting')
    let re = ''
    await ajaxModel.postListAuthorityByRole(data).then(res => {
      commit('endWaiting')
      re = res
    }).catch(err => {
      commit('endWaiting')
      handleError(err, {commit})
    })
    return re
  },

  // 赛果管理列表
  getMameResultListAjax ({ commit }, data) {
    commit('startWaiting')
    return new Promise((resolve, reject) => {
      ajaxModel.getMameResultList(data).then(response => {
        commit('endWaiting')
        resolve(response)
      }).catch(error => {
        commit('endWaiting')
        handleError(error, { commit })
        // reject(error)
      })
    })
  },

  // 录入赛果比分
  setMatchResultScoreAjax ({ commit }, data) {
    commit('startWaiting')
    return new Promise((resolve, reject) => {
      ajaxModel.setMatchResultScore(data).then(response => {
        commit('endWaiting')
        resolve(response)
      }).catch(error => {
        commit('endWaiting')
        handleError(error, { commit })
        // reject(error)
      })
    })
  },

  // 赛果结算
  setMatchResultSettledAjax ({ commit }, data) {
    commit('startWaiting')
    return new Promise((resolve, reject) => {
      ajaxModel.setMatchResultSettled(data).then(response => {
        commit('endWaiting')
        resolve(response)
      }).catch(error => {
        commit('endWaiting')
        handleError(error, { commit })
        // reject(error)
      })
    })
  },
  // 角色修改
  async EditRole ({ commit }, data) {
    commit('startWaiting')
    let re = ''
    await ajaxModel.postEditRole(data).then(res => {
      commit('endWaiting')
      re = res
    }).catch(err => {
      commit('endWaiting')
      handleError(err, {commit})
    })
    return re
  },
  // 角色新增
  async postAddRole ({ commit }, data) {
    commit('startWaiting')
    let re = ''
    await ajaxModel.postAddRoleS(data).then(res => {
      commit('endWaiting')
      re = res
    }).catch(err => {
      commit('endWaiting')
      handleError(err, {commit})
    })
    return re
  },
  // 根据角色,列出不存在的权限
  async absentAuthority ({ commit }, data) {
    commit('startWaiting')
    let re = ''
    await ajaxModel.postAbsentAuthority(data).then(res => {
      commit('endWaiting')
      re = res
    }).catch(err => {
      commit('endWaiting')
      handleError(err, {commit})
    })
    return re
  },
  // 角色权限新增
  async addRoleAuthority ({ commit }, data) {
    commit('startWaiting')
    let re = ''
    await ajaxModel.postAddRoleAuthority(data).then(res => {
      commit('endWaiting')
      re = res
    }).catch(err => {
      commit('endWaiting')
      handleError(err, {commit})
    })
    return re
  },
  // 角色权限删除
  async deleteRoleAuthority ({ commit }, data) {
    commit('startWaiting')
    let re = ''
    await ajaxModel.postDeleteRoleAuthority(data).then(res => {
      commit('endWaiting')
      re = res
    }).catch(err => {
      commit('endWaiting')
      handleError(err, {commit})
    })
    return re
  },
  // 获取赛事的批量处理开关
  async getMatchValveInfoAjax ({ commit }, data) {
    commit('startWaiting')
    let re = ''
    await ajaxModel.getMatchValveInfoAjaxS(data).then(res => {
      commit('endWaiting')
      re = res
    }).catch(err => {
      commit('endWaiting')
      handleError(err, {commit})
    })
    return re
  },
  // 加载电竞公告
  async getInitESportBulletinS ({ commit }, data) {
    commit('startWaiting')
    let re = ''
    await ajaxModel.getInitESportBulletin(data).then(res => {
      commit('endWaiting')
      re = res
    }).catch(err => {
      commit('endWaiting')
      handleError(err, {commit})
    })
    return re
  },
  // 修改电竞公告
  async postEditESportBulletinS ({ commit }, data) {
    commit('startWaiting')
    let re = ''
    await ajaxModel.postEditESportBulletin(data).then(res => {
      commit('endWaiting')
      re = res
    }).catch(err => {
      commit('endWaiting')
      handleError(err, {commit})
    })
    return re
  },
  // 新增电竞公告
  async postAddESportBulletinS ({ commit }, data) {
    commit('startWaiting')
    let re = ''
    await ajaxModel.postAddESportBulletin(data).then(res => {
      commit('endWaiting')
      re = res
    }).catch(err => {
      commit('endWaiting')
      handleError(err, {commit})
    })
    return re
  },
  // 删除电竞公告
  async postDeleteSportBulletinS ({ commit }, data) {
    commit('startWaiting')
    let re = ''
    await ajaxModel.postDeleteSportBulletin(data).then(res => {
      commit('endWaiting')
      re = res
    }).catch(err => {
      commit('endWaiting')
      handleError(err, {commit})
    })
    return re
  },

  // 行情记录---比赛战队列表
  setGetTeamList ({ commit }) {
    commit('startWaiting')
    return new Promise((resolve, reject) => {
      ajaxModel.getTeamList().then(response => {
        commit('endWaiting')
        resolve(response)
      }).catch(error => {
        commit('endWaiting')
        handleError(error, { commit })
        // reject(error)
      })
    })
  },

  // 行情记录---实时比分输赢列表
  setPostScoreReport ({ commit }, data) {
    commit('startWaiting')
    return new Promise((resolve, reject) => {
      ajaxModel.postScoreReport(data).then(response => {
        commit('endWaiting')
        resolve(response)
      }).catch(error => {
        commit('endWaiting')
        handleError(error, { commit })
        // reject(error)
      })
    })
  },
  // 国际版切换
  async postChangeLanguageS ({ commit }, data) {
    commit('startWaiting')
    let re = ''
    await ajaxModel.postChangeLanguage(data).then(res => {
      commit('endWaiting')
      re = res
    }).catch(err => {
      commit('endWaiting')
      handleError(err, {commit})
    })
    return re
  },
  // 批量修改赛事
  async setMatchValveInfoAjax ({ commit }, data) {
    commit('startWaiting')
    let re = ''
    await ajaxModel.postBatchModify(data).then(res => {
      commit('endWaiting')
      re = res
    }).catch(err => {
      commit('endWaiting')
      handleError(err, {commit})
    })
    return re
  },
  // 设置赛事滚球
  async postSetLiveTypeS ({ commit }, data) {
    commit('startWaiting')
    let re = ''
    await ajaxModel.postSetLiveType(data).then(res => {
      commit('endWaiting')
      re = res
    }).catch(err => {
      commit('endWaiting')
      handleError(err, {commit})
    })
    return re
  },
  // 获取货量
  async postGameWagerByMatchIDS ({ commit }, data) {
    commit('startWaiting')
    let re = ''
    await ajaxModel.postGameWagerByMatchID(data).then(res => {
      commit('endWaiting')
      re = res
    }).catch(err => {
      commit('endWaiting')
      handleError(err, {commit})
    })
    return re
  },
  // 获取货量
  async postUpdateOddsByIdS ({ commit }, data) {
    commit('startWaiting')
    let re = ''
    await ajaxModel.postUpdateOddsById(data).then(res => {
      commit('endWaiting')
      re = res
    }).catch(err => {
      commit('endWaiting')
      handleError(err, {commit})
    })
    return re
  },
  // 获取代理
  async postSelectGameAgentS ({ commit }, data) {
    commit('startWaiting')
    let re = ''
    await ajaxModel.postSelectGameAgent(data).then(res => {
      commit('endWaiting')
      re = res
    }).catch(err => {
      commit('endWaiting')
      handleError(err, {commit})
    })
    return re
  },
  // 编辑代理
  async postEditGameAgentS ({ commit }, data) {
    commit('startWaiting')
    let re = ''
    await ajaxModel.postEditGameAgent(data).then(res => {
      commit('endWaiting')
      re = res
    }).catch(err => {
      commit('endWaiting')
      handleError(err, {commit})
    })
    return re
  },
  // 添加代理
  async postAddGameAgentS ({ commit }, data) {
    commit('startWaiting')
    let re = ''
    await ajaxModel.postAddGameAgent(data).then(res => {
      commit('endWaiting')
      re = res
    }).catch(err => {
      commit('endWaiting')
      handleError(err, {commit})
    })
    return re
  }
}
