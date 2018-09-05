import Cookies from 'js-cookie'

export default {
  firstName: 'Will',
  lastName: 'Yang',
  count: 0,
  messages: [],
  waiting: false,
  // personnel: Cookies.get('Anbo-User'),
  // token: Cookies.get('Anbo-Token'),
  // roles: Cookies.get('Anbo-Role'),
  user: sessionStorage.getItem('Anbo-User'),
  token: sessionStorage.getItem('Anbo-Token'),
  roles: sessionStorage.getItem('Anbo-Role'),
  addRouters: [],
  siderbarArr: [],
  pwd: sessionStorage.getItem('Anbo-Pwd'),
  matchId: ''
}
