import axios from 'axios'
import { createError } from './util'
import notify from '../components/notification/function'
import bus from '../model/bus'

// const request = axios.create({
//   baseURL: '/webApi',
//   timeout: 30000
// })

let util = {}
util.ajaxForm = axios.create({
  baseURL: '/webApi',
  timeout: 30000,
  transformRequest: [function transformRequest (data) {
    let ret = ''
    // for (let it in data) {
    //   ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
    // }
    for (let it in data) {
      let value = encodeURIComponent(data[it])
      if (value === 'null') {
        value = ''
      }
      ret += encodeURIComponent(it) + '=' + value + '&'
    }
    return ret
  }],
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded'
  }
})
util.ajaxJson = axios.create({
  baseURL: '/webApi',
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json;charset=UTF-8'
  }
})

// 拦截器
function interceptionFn (el) {
  // http请求拦截器
  el.interceptors.request.use(config => {
    return config
  }, error => {
    notify({
      content: '请求超时！',
      btn: 'close'
    })
    return Promise.reject(error.response)
  })

  // http响应拦截器
  el.interceptors.response.use(data => {
    return data
  }, error => {
    // console.log(error.response)
    // return Promise.reject(error.response.data.resultMsg)
    return Promise.reject(error.response)
  })
}

interceptionFn(util.ajaxForm)
interceptionFn(util.ajaxJson)

const handleRequest = (request) => {
  return new Promise((resolve, reject) => {
    request.then(resp => {
      // console.log(resp)
      const data = resp.data

      // if (data.resultCode) {
      //   resolve(data.resultMsg)
      // } else {
      //   return reject(createError(resp.status, data.resultMsg))
      // }

      if (resp.status === 200) {
        if (data.resultCode) {
          resolve(data.resultMsg)
        } else {
          reject(createError(resp.status, data.resultMsg))
        }
      } else if (resp.status === 401) {
        reject(createError(resp.status, data.resultMsg))
      } else if (resp.status === 404) {
        reject(createError(resp.status, data.resultMsg))
      } else if (resp.status === 405) {
        reject(createError(resp.status, data.resultMsg))
      }
    }).catch(res => {
      // reject(res)
      let errObj = createError(res.status, res.data.resultMsg)
      reject(errObj)
    })
  })
}

export default {
  logIn (data) {
    return handleRequest(util.ajaxForm.post('/user/login', data))
  },
  logOut () {
    return handleRequest(util.ajaxJson.post('/user/logout'))
  },
  getInfo () {
    return handleRequest(util.ajaxJson.get('/asp/initEsportBulletin.php'))
  },
  getAuthority () {
    return handleRequest(util.ajaxJson.post('/user/getAuthority'))
  },
  setAuthority () {
    return handleRequest(util.ajaxJson.post('/authority/listAuthority'))
  },
  setPassword (data) {
    return handleRequest(util.ajaxForm.post('/user/modifyOperatorPassword', data))
  },
  setGiessingMatch (data) {
    return handleRequest(util.ajaxForm.post('/report/listMatchOrOdd', data))
  },
  setGiessing (data) {
    return handleRequest(util.ajaxForm.post('/report/listGameWager', data))
  },
  setTransfer (data) {
    return handleRequest(util.ajaxForm.post('/report/transferRecords', data))
  },
  setOperation (data) {
    return handleRequest(util.ajaxForm.post('/report/runningTherecord', data))
  },
  setFlow (data) {
    return handleRequest(util.ajaxForm.post('/report/flowRecords', data))
  },
  setEmployeeList (data) {
    return handleRequest(util.ajaxForm.post('/user/listOperator', data))
  },
  setEmployeeAdd (data) {
    return handleRequest(util.ajaxForm.post('/user/addOperator', data))
  },
  setEmployeeEdit (data) {
    return handleRequest(util.ajaxJson.post('/user/editOperator', data))
  },
  setMemberList (data) {
    return handleRequest(util.ajaxForm.post('/user/listGameUser', data))
  },
  setMemberEdit (data) {
    return handleRequest(util.ajaxJson.post('/user/editGameUser', data))
  },
  setLeagueList (data) {
    return handleRequest(util.ajaxForm.post('/gameLeague/leagueList', data))
  },
  setLeagueAdd (data) {
    return handleRequest(util.ajaxForm.post('/gameLeague/addGameLeague', data))
  },
  setLeagueEdit (data) {
    return handleRequest(util.ajaxForm.post('/gameLeague/updateGameLeague', data))
  },
  setLeagueSelectId (data) {
    return handleRequest(util.ajaxForm.post('/setting/listSetting', data))
  },
  addGameSetting (data) {
    return handleRequest(util.ajaxForm.post('/setting/addSetting', data))
  },
  updateGameSetting (data) {
    return handleRequest(util.ajaxForm.post('/setting/updateSetting', data))
  },
  findGameSetting (data) {
    return handleRequest(util.ajaxForm.post('/setting/findGameSettingById', data))
  },
  getMatchesList (data) {
    return handleRequest(util.ajaxForm.post('/gameMatch/combingMatches', data))
  },
  getLeagueIds () {
    return handleRequest(util.ajaxForm.post('/gameMatch/listAllLeague'))
  },
  getModifyMatches (data) {
    return handleRequest(util.ajaxForm.post('/gameMatch/selectMatchDetail', data))
  },
  setModifyMatches (data) {
    return handleRequest(util.ajaxForm.post('/gameMatch/modify', data))
  },
  openMatch (data) {
    return handleRequest(util.ajaxForm.post('/gameMatch/openMatch', data))
  },
  AddMatch (data) {
    return handleRequest(util.ajaxForm.post('/gameLeague/addMatchAndOdds', data))
  },
  setMatchPattern (data) {
    return handleRequest(util.ajaxForm.post('/gameMatch/matchPattern', data))
  },
  getMatchSortOut (data) {
    return handleRequest(util.ajaxForm.post('/gameMatch/matchPatternList', data))
  },
  setMatchSortOut (data) {
    return handleRequest(util.ajaxJson.post('/gameMatch/matchPattern', data))
  },
  getEventHandicapList (data) {
    return handleRequest(util.ajaxForm.post('/gameOdds/openingMatches', data))
  },
  addEventHandicap (data) {
    return handleRequest(util.ajaxForm.post('/gameOdds/addOdds', data))
  },
  editEventHandicap (data) {
    return handleRequest(util.ajaxForm.post('/gameOdds/editOdd', data))
  },
  operatingEventHandicap (data) {
    return handleRequest(util.ajaxForm.post('/gameOdds/pauseOdd', data))
  },
  operatingEvent (data) {
    return handleRequest(util.ajaxForm.post('/gameMatch/editMatchSatus', data))
  },
  entryEventHandicap (data) {
    return handleRequest(util.ajaxForm.post('/gameOdds/setOddsResult', data))
  },
  getFindGameLeagueByID (data) {
    return handleRequest(util.ajaxForm.post('/gameLeague/findGameLeagueByID', data))
  },
  postAddOdds (data) {
    return handleRequest(util.ajaxForm.post('/gameOdds/addOdds', data))
  },
  postUpdateOdd (data) {
    return handleRequest(util.ajaxJson.post('/gameOdds/editOdds', data))
  },
  getListAuthority (data) {
    return handleRequest(util.ajaxForm.post('/authority/listRole', data))
  },
  postDeleteRole (data) {
    return handleRequest(util.ajaxForm.post('/authority/deleteRole', data))
  },
  postListAllRole (data) {
    return handleRequest(util.ajaxForm.post('/authority/listAllRole', data))
  },
  postListAuthorityByRole (data) {
    return handleRequest(util.ajaxForm.post('authority/listAuthorityByRole', data))
  },
  getMameResultList (data) {
    return handleRequest(util.ajaxForm.post('/gameResult/listGameResult', data))
  },
  setMatchResultScore (data) {
    return handleRequest(util.ajaxForm.post('/gameResult/setMatchScore', data))
  },
  setMatchResultSettled (data) {
    return handleRequest(util.ajaxForm.post('/gameMatch/matchSettled', data))
  },
  postEditRole (data) {
    return handleRequest(util.ajaxForm.post('/authority/editRole', data))
  },
  postAddRoleS (data) {
    return handleRequest(util.ajaxForm.post('/authority/addRole', data))
  },
  postAbsentAuthority (data) {
    return handleRequest(util.ajaxForm.post('/authority/listAbsentAuthorityByRole', data))
  },
  postAddRoleAuthority (data) {
    return handleRequest(util.ajaxForm.post('/authority/addRoleAuthority', data))
  },
  postDeleteRoleAuthority (data) {
    return handleRequest(util.ajaxForm.post('/authority/deleteRoleAuthority', data))
  },
  getMatchValveInfoAjaxS (data) {
    return handleRequest(util.ajaxForm.post('/gameMatch/batchValveInfo', data))
  },
  getInitESportBulletin (data) {
    return handleRequest(util.ajaxForm.post('/initEsportBulletin', data))
  },
  postEditESportBulletin (data) {
    return handleRequest(util.ajaxForm.post('/editEsportBulletin', data))
  },
  postAddESportBulletin (data) {
    return handleRequest(util.ajaxForm.post('/addEsportBulletin', data))
  },
  postDeleteSportBulletin (data) {
    return handleRequest(util.ajaxForm.post('/delectEsportBulletin', data))
  },
  getTeamList () {
    return handleRequest(util.ajaxForm.post('/report/teamList'))
  },
  postScoreReport (data) {
    return handleRequest(util.ajaxForm.post('/report/scoreReport', data))
  },
  postChangeLanguage (data) {
    return handleRequest(util.ajaxForm.post('/user/changeLanguage', data))
  },
  postBatchModify (data) {
    return handleRequest(util.ajaxForm.post('/gameMatch/batchModify', data))
  },
  postSetLiveType (data) {
    return handleRequest(util.ajaxForm.post('/gameMatch/setLiveType', data))
  },
  postGameWagerByMatchID (data) {
    return handleRequest(util.ajaxForm.post('/report/listGameWagerByMatchID', data))
  },
  postUpdateOddsById (data) {
    return handleRequest(util.ajaxForm.post('/gameOdds/updateOddsById', data))
  },
  postSelectGameAgent (data) {
    return handleRequest(util.ajaxForm.post('/selectGameAgent', data))
  },
  postEditGameAgent (data) {
    return handleRequest(util.ajaxForm.post('/editGameAgent', data))
  },
  postAddGameAgent (data) {
    return handleRequest(util.ajaxForm.post('/addGameAgent', data))
  }
}
