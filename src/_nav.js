export const itemNav = [
  // {
  //   name: 'Other',
  //   url: '/other',
  //   icon: 'icon-paper-clip',
  //   children: [
  //     {
  //       name: 'Modify Password',
  //       url: '/other/modify',
  //       icon: 'icon-pencil'
  //     },
  //     {
  //       name: 'Sign Out',
  //       url: '/other/signout',
  //       icon: 'icon-logout'
  //     }
  //   ]
  // }
]

export const item = {
  name: 'Index',
  url: '/index',
  icon: 'icon-home'
  // badge: {
  //   variant: 'primary',
  //   text: 'NEW'
  // }
}

export const navMap = new Map()

// 系统管理
navMap.set(2, {
  name: 'System',
  url: '/system',
  icon: 'icon-globe',
  children: []
})

navMap.set(21, {
  name: 'Role',
  url: '/system/role',
  icon: 'icon-puzzle'
})

navMap.set(22, {
  name: 'Permissions',
  url: '/system/permissions',
  icon: 'icon-puzzle'
})

// navMap.set(23, {
//   name: 'Operator ',
//   url: '/system/operator',
//   icon: 'icon-puzzle'
// })

// 用户管理
navMap.set(3, {
  name: 'Personnel',
  url: '/personnel',
  icon: 'icon-user',
  children: []
})

navMap.set(31, {
  name: 'Employee',
  url: '/personnel/employee',
  icon: 'icon-puzzle'
})

navMap.set(32, {
  name: 'Member',
  url: '/personnel/member',
  icon: 'icon-puzzle'
})
navMap.set(33, {
  name: 'Agent',
  url: '/personnel/Agent',
  icon: 'icon-puzzle'
})

// 操盘管理
navMap.set(4, {
  name: 'Operate',
  url: '/operate',
  icon: 'icon-wrench',
  children: []
})

navMap.set(41, {
  name: 'League',
  url: '/operate/league',
  icon: 'icon-puzzle'
})

navMap.set(42, {
  name: 'Competition',
  url: '/operate/competition',
  icon: 'icon-puzzle'
})

navMap.set(43, {
  name: 'Operate',
  url: '/operate/operate',
  icon: 'icon-puzzle'
})

navMap.set(44, {
  name: 'GameSettings',
  url: '/operate/gameSetting',
  icon: 'icon-puzzle'
})

navMap.set(45, {
  name: 'Entry',
  url: '/operate/entry',
  icon: 'icon-puzzle'
})

navMap.set(46, {
  name: 'Announcement',
  url: '/operate/announcement',
  icon: 'icon-puzzle'
})

navMap.set(47, {
  name: 'Result',
  url: '/operate/result',
  icon: 'icon-puzzle'
})

// 记录管理
navMap.set(5, {
  name: 'Records',
  url: '/records',
  icon: 'icon-notebook',
  children: []
})

navMap.set(51, {
  name: 'Guessing',
  url: '/records/guessing',
  icon: 'icon-puzzle'
})

navMap.set(52, {
  name: 'Transfer',
  url: '/records/transfer',
  icon: 'icon-puzzle'
})

navMap.set(53, {
  name: 'Operation',
  url: '/records/operation',
  icon: 'icon-puzzle'
})

navMap.set(54, {
  name: 'Flow',
  url: '/records/flow',
  icon: 'icon-puzzle'
})

navMap.set(55, {
  name: 'Focs',
  url: '/records/focs',
  icon: 'icon-puzzle'
})

navMap.set(56, {
  name: 'RollingBall',
  url: '/records/rollingBall',
  icon: 'icon-puzzle'
})
