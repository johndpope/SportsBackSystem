// Containers
import Full from '@/containers/Full'

export const addRouter = []

export const routes = [
  {
    path: '/',
    redirect: '/index',
    name: 'Home',
    component: Full,
    children: [
      {
        path: 'index',
        name: 'Index',
        meta: {
          title: 'index',
          requireAuth: true
        },
        component: () => import('@/views/index.vue')
      }
      // {
      //   path: 'other',
      //   redirect: '/other/modify',
      //   name: 'Other',
      //   component: {
      //     render (c) { return c('router-view') }
      //   },
      //   children: [
      //     {
      //       path: 'modify',
      //       name: 'Modify',
      //       component: () => import('@/views/index.vue')
      //     },
      //     {
      //       path: 'register',
      //       name: 'Register',
      //       component: () => import('@/views/pages/Register.vue')
      //     },
      //     {
      //       path: '404',
      //       name: 'Page404',
      //       component: () => import('@/views/pages/Page404.vue')
      //     },
      //     {
      //       path: '500',
      //       name: 'Page500',
      //       component: () => import('@/views/pages/Page500.vue')
      //     }
      //   ]
      // }
    ]
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/pages/Login.vue')
  }
]

export const routerOther = [{
  path: '/other',
  redirect: '/other/modify',
  name: 'Other',
  component: Full,
  children: [
    {
      path: 'modify',
      name: 'Modify',
      component: () => import('@/views/pages/ModifyPwd.vue')
    },
    {
      path: 'register',
      name: 'Register',
      component: () => import('@/views/pages/Register.vue')
    },
    {
      path: '404',
      name: 'Page404',
      component: () => import('@/views/pages/Page404.vue')
    },
    {
      path: '500',
      name: 'Page500',
      component: () => import('@/views/pages/Page500.vue')
    },
    {
      path: 'jigsaw',
      name: 'Jigsaw',
      component: () => import('@/views/pages/jigsaw.vue')
    }
  ]
},
{
  path: '*',
  redirect: '/'
}
]

export const routerMap = new Map()

// 系统管理
routerMap.set(2, {
  path: '/system',
  redirect: '/system/',
  name: 'System Management',
  component: Full,
  children: []
})

routerMap.set(21, {
  path: 'role',
  name: 'Role',
  component: () => import('@/views/system/role.vue')
})

routerMap.set(22, {
  path: 'permissions',
  name: 'Permissions',
  component: () => import('@/views/system/permissions.vue')
})

// routerMap.set(23, {
//   path: 'operator',
//   name: 'Operator',
//   component: () => import('@/views/system/operator.vue')
// })

// 用户管理
routerMap.set(3, {
  path: '/personnel',
  name: 'Personnel Management',
  redirect: '/personnel/',
  component: Full,
  children: []
})

routerMap.set(31, {
  path: 'employee',
  name: 'Employee',
  component: () => import('@/views/personnel/employee.vue')
})

routerMap.set(32, {
  path: 'member',
  name: 'Member',
  component: () => import('@/views/personnel/member.vue')
})

routerMap.set(33, {
  path: 'agent',
  name: 'Agent',
  component: () => import('@/views/personnel/Agent.vue')
})

// 操盘管理
routerMap.set(4, {
  path: '/operate',
  redirect: '/operate/',
  name: 'Operate Management',
  component: Full,
  children: []
})

routerMap.set(41, {
  path: 'league',
  name: 'League',
  component: () => import('@/views/operate/league.vue')
})

routerMap.set(42, {
  path: 'competition',
  name: 'Competition',
  component: () => import('@/views/operate/competition.vue')
})

routerMap.set(43, {
  path: 'operate',
  name: 'Operate',
  component: () => import('@/views/operate/operate.vue')
})

routerMap.set(44, {
  path: 'gameSetting',
  name: 'GameSettings',
  component: () => import('@/views/operate/gameSetting.vue')
})

routerMap.set(45, {
  path: 'entry',
  name: 'Entry',
  component: () => import('@/views/operate/result.vue')
})

routerMap.set(46, {
  path: 'announcement',
  name: 'Announcement',
  component: () => import('@/views/operate/announcement.vue')
})

routerMap.set(47, {
  path: 'result',
  name: 'Result',
  component: () => import('@/views/operate/result2.vue')
})

// 记录管理
routerMap.set(5, {
  path: '/records',
  redirect: '/records/',
  name: 'Records Management',
  component: Full,
  children: []
})

routerMap.set(51, {
  path: 'guessing',
  name: 'Guessing',
  component: () => import('@/views/records/guessing.vue')
})

routerMap.set(52, {
  path: 'transfer',
  name: 'Transfer',
  component: () => import('@/views/records/transfer.vue')
})

routerMap.set(53, {
  path: 'operation',
  name: 'Operation',
  component: () => import('@/views/records/operation.vue')
})

routerMap.set(54, {
  path: 'flow',
  name: 'Flow',
  component: () => import('@/views/records/flow.vue')
})

routerMap.set(55, {
  path: 'focs',
  name: 'Focs',
  component: () => import('@/views/records/focs.vue')
})

routerMap.set(56, {
  path: 'rollingBall',
  name: 'RollingBall',
  component: () => import('@/views/records/rollingBall.vue')
})
