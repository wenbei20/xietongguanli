import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/* Router Modules */
// import componentsRouter from './modules/components'
// import chartsRouter from './modules/charts'
// import tableRouter from './modules/table'
// import nestedRouter from './modules/nested'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    noCache: true                if set true, the page will no be cached(default is false)
    affix: true                  if set true, the tag will affix in the tags-view
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path(.*)',
        component: () => import('@/views/redirect/index')
      }
    ]
  },
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/auth-redirect',
    component: () => import('@/views/login/auth-redirect'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/error-page/404'),
    hidden: true
  },
  {
    path: '/401',
    component: () => import('@/views/error-page/401'),
    hidden: true
  },
  {
    path: '/entry',
    component: () => import('@/views/entry'),
    hidden: true
  },
  {
    path: '/',
    component: Layout,
    redirect: '/entry'

  }
  // {
  //   path: '/documentation',
  //   component: Layout,
  //   children: [
  //     {
  //       path: 'index',
  //       component: () => import('@/views/documentation/index'),
  //       name: 'Documentation',
  //       meta: { title: 'Documentation', icon: 'documentation', affix: true }
  //     }
  //   ]
  // },

  // {
  //   path: '/guide',
  //   component: Layout,
  //   redirect: '/guide/index',
  //   children: [
  //     {
  //       path: 'index',
  //       component: () => import('@/views/guide/index'),
  //       name: 'Guide',
  //       meta: { title: 'Guide', icon: 'guide', noCache: true }
  //     }
  //   ]
  // },
  // {
  //   path: '/profile',
  //   component: Layout,
  //   redirect: '/profile/index',
  //   hidden: true,
  //   children: [
  //     {
  //       path: 'index',
  //       component: () => import('@/views/profile/index'),
  //       name: 'Profile',
  //       meta: { title: 'Profile', icon: 'user', noCache: true }
  //     }
  //   ]
  // }
]

/**
 * asyncRoutes
 * the routes that need to be dynamically loaded based on user roles
 */
export const asyncRoutes = [
  {
    path: '/adminSystem',
    component: Layout,
    redirect: '/adminSystem/home',
    meta: { roles: ['admin'] },
    alwaysShow: false,
    always: false,
    children: [
      {
        path: 'home',
        component: () => import('@/views/adminSystem/home'),
        name: 'AdminSystemHome',
        meta: { title: '????????????', roles: ['admin'], icon: 'component', affix: true }
      },
      {
        path: 'center',
        component: () => import('@/views/adminSystem/center'),
        name: 'AdminSystemCenter',
        meta: { title: '????????????', roles: ['admin'], icon: 'user', affix: true }
      },
      {
        path: 'batchManage',
        component: () => import('@/adminViews/index'),
        meta: { title: '????????????',roles: ['admin'], icon:'tree-table',affix: true },
        children: [
          {
            path: 'index',
            component: () => import('@/adminViews/batchManage/index'),
            name: 'batchManage',
            meta: { title: '????????????',roles: ['admin'] }
          },
          {
            path: 'project',
            component: () => import('@/adminViews/batchManage/project'),
            name: 'batchProject',
            meta: { title: '????????????',roles: ['admin'] }
          },
          {
            path: 'mission',
            component: () => import('@/adminViews/batchManage/mission'),
            name: 'batchMission',
            meta: { title: '????????????',roles: ['admin'] }
          },
          {
            path: 'mission/setting',
            component: () => import('@/adminViews/settings/index'),
            name: 'batchMissionSettting',
            meta: { title: '????????????',roles: ['admin'] },
            hidden:true
          },
          {
            path: 'product',
            component: () => import('@/adminViews/batchManage/product'),
            name: 'batchProduct',
            meta: { title: '????????????' ,roles: ['admin']}
          },
          {
            path: 'product/setting',
            component: () => import('@/adminViews/settings/index'),
            name: 'batchProductSettting',
            meta: { title: '????????????',roles: ['admin'] },
            hidden:true
          },
          {
            path: 'project/add',
            component: () => import('@/adminViews/batchManage/addnew'),
            name: 'batchProjectAdd',
            meta: { title: '????????????',roles: ['admin'] },
            hidden:true
          },
          {
            path: 'project/edit',
            component: () => import('@/adminViews/batchManage/edit'),
            name: 'batchProjectEdit',
            meta: { title: '????????????',roles: ['admin'] },
            hidden:true
          },
          {
            path: 'project/setting',
            component: () => import('@/adminViews/settings/index'),
            name: 'batchProjectSettting',
            meta: { title: '????????????',roles: ['admin'] },
            hidden:true
          }
        ]
      },
      
      {
        path: 'project',
        component:() => import('@/adminViews/index'),
        meta: { title: '????????????', roles: ['admin'], icon: 'user', affix: true },
        children: [
          {
            path: 'index',
            component: () => import('@/adminViews/project/index'),
            // redirect: '/project/needs',
            name: 'AdminProject',
            meta: { title: '????????????', roles: ['admin'], icon: 'xiangmu2', affix: true, activeMenu: '/project/index' },
            hidden:true
          },
          {
            path: 'needs',
            // component: () => import('@/views/project/needs'),
            component: () => import('@/adminViews/xuqiu/index'),
            name: 'AdminNeeds',
            meta: { title: '??????', roles: ['admin']},
    
          },
          {
            path: 'needs/add',
            component: () => import('@/adminViews/xuqiu/addnew'),
            name: 'AdminXuqiuAdd',
            meta: { title: '????????????', roles: ['admin'], hide: true },
            hidden: true
    
          },
          {
            path: 'needs/edit',
            component: () => import('@/adminViews/xuqiu/edit'),
            name: 'AdminXuqiuEdit',
            meta: { title: '????????????', roles: ['admin'], hide: true },
            hidden: true
    
          },
    
          // {
          //   path: 'approval',
          //   component: () => import('@/views/project/approval/index'),
          //   name: 'approval',
          //   meta: { title: '????????????', roles: ['admin'] },
          //   hidden:true
    
          // },
          // {
          //   path: 'approval/add',
          //   component: () => import('@/views/project/approval/addnew'),
          //   name: 'createApproval',
          //   meta: { title: '????????????', roles: ['admin'], hide: true },
          //   hidden: true
    
          // },
          // {
          //   path: 'approval/edit',
          //   component: () => import('@/views/project/approval/edit'),
          //   name: 'editApproval',
          //   meta: { title: '????????????', roles: ['admin'], hide: true },
          //   hidden: true
    
          // },
    
          // {
          //   path: 'reportform',
          //   component: () => import('@/views/project/reportForms/index'),
          //   name: 'reportform',
          //   meta: { title: '??????', roles: ['admin'] },
          //   hidden:true
    
          // },
    
          // {
          //   path: 'reportform/detail',
          //   component: () => import('@/views/project/reportForms/detailForms'),
          //   name: 'reportformDetail',
          //   meta: { title: '????????????', roles: ['admin'], hide: true },
          //   hidden: true
    
          // },
    
          {
            path: 'mission',
            component: () => import('@/adminViews/project/mission'),
            name: 'AdminMission',
            meta: { title: '??????', roles: ['admin'] }
          },
          {
            path: 'mission/create',
            component: () => import('@/adminViews/project/mission/createmission'),
            name: 'AdminCreatemission',
            hidden: true,
            meta: { title: '????????????', roles: ['admin'], hide: true }
          },
          {
            path: 'mission/edit',
            component: () => import('@/adminViews/project/mission/editmission'),
            name: 'AdminEditmission',
            hidden: true,
            meta: { title: '??????????????????', roles: ['admin'], hide: true }
          },
          {
            path: 'defect',
            component: () => import('@/adminViews/project/defect'),
            name: 'AdminDefect',
            meta: { title: '??????', roles: ['admin'],  }
          },
          {
            path: 'defect/edit',
            component: () => import('@/adminViews/project/defect/edit'),
            name: 'AdminQuexianEdit',
            hidden: true,
            meta: { title: '????????????', roles: ['admin'], hide: true }
          },
          // {
          //   path: 'iteration',
          //   component: () => import('@/views/project/iteration'),
          //   name: 'Iteration',
          //   meta: { title: '??????', roles: ['admin'], activeMenu: '/project/index' },
          //   hidden:true
          // },
          // {
          //   path: 'iteration/details/:id',
          //   component: () => import('@/views/project/iteration/iterationDetails'),
          //   name: 'IterationDetails',
          //   hidden: true,
          //   meta: { title: '????????????', roles: ['admin'], hide: true, activeMenu: '/project/index' }
          // },
          // {
          //   path: 'iteration/planIteration',
          //   component: () => import('@/views/project/iteration/planIteration'),
          //   name: 'PlanIteration',
          //   hidden: true,
          //   meta: { title: '????????????', roles: ['admin'], hide: true, activeMenu: '/project/index' }
          // },
          // {
          //   path: 'storywall',
          //   component: () => import('@/views/project/storywall'),
          //   name: 'Storywall',
          //   meta: { title: '?????????', roles: ['admin'], activeMenu: '/project/index' },
          //   hidden:true
          // },
          // {
          //   path: 'board',
          //   component: () => import('@/views/board/index'),
          //   name: 'Board',
          //   meta: { title: '??????', roles: ['admin'], activeMenu: '/project/index' },
          //   hidden:true
          // },
          {
            path: 'document',
            component: () => import('@/adminViews/project/document/index'),
            name: 'AdminDocument',
            meta: { title: '??????', roles: ['admin'] }
          },
          {
            path: 'testcase',
            component: () => import('@/adminViews/project/test/case'),
            name: 'AdminTestcase',
            meta: { title: '??????', roles: ['admin'] }
          },
          {
            path: 'testcase/create',
            component: () => import('@/adminViews/project/test/createcase'),
            name: 'AdminCreateCase',
            hidden: true,
            meta: { title: '??????????????????', roles: ['admin'], hide: true }
          },
          {
            path: 'testcase/edit',
            component: () => import('@/adminViews/project/test/editcase'),
            name: 'AdminEditcase',
            hidden: true,
            meta: { title: '??????????????????', roles: ['admin'], hide: true }
          },
    
          {
            path: 'testplan',
            component: () => import('@/adminViews/project/test/plan'),
            name: 'AdminTestplan',
            meta: { title: '??????', roles: ['admin'] }
          },
          {
            path: 'testplan/create',
            component: () => import('@/adminViews/project/test/createplan'),
            name: 'AdminCreateplan',
            hidden: true,
            meta: { title: '??????????????????', roles: ['admin'], hide: true }
          },
          {
            path: 'testplan/edit',
            component: () => import('@/adminViews/project/test/editplan'),
            name: 'AdminEditplan',
            hidden: true,
            meta: { title: '??????????????????', roles: ['admin'], hide: true }
          },
        ]
      },

      {
        path: 'system',
        component: () => import('@/adminViews/index'),
        // redirect: '/system/manage',
        meta: { title: '????????????', roles: ['admin'], icon: 'clipboard', affix: true  },
        children: [
          {
            path: 'template',
            component: () => import('@/adminViews/companyManage/index'),
            meta: { title: '????????????',roles: ['admin'],   },
            
          },
          {
            path: 'template/setting',
            name:'templateSetting',
            component: () => import('@/adminViews/settings/index'),
            meta: { title: '????????????',roles: ['admin'],   },
            hidden:true
          },
          {
            path: 'template/create',
            component: () => import('@/adminViews/companyManage/CreatePerson'),
            name: 'AdminManageCreate',
            meta: { title: '????????????',roles: ['admin'], },
            hidden: true
          },
          {
            path: 'person',
            component: () => import('@/adminViews/companyManage/personManage'),
            meta: { title: '????????????',roles: ['admin'],   },
          },
          
          {
            path: 'power',
            component: () => import('@/adminViews/settings/index'),
            name:'powerSetting',
            meta: { title: '????????????' ,roles: ['admin'],  },
            query:{from:'power'}
          }
        ]
      },
      
      
   





    ]
  },
























  {
    path: '/notice',
    component: Layout,
    redirect: '/notice/index',
    meta: { roles: ['user'] },
    children: [
      {
        path: 'index',
        component: () => import('@/views/notice/index'),
        name: 'Notice',
        meta: { title: '???????????????', roles: ['user'], icon: 'component', affix: true }
      }
    ]
  },
  {
    path: '/project',
    component: Layout,
    meta: { roles: ['user'] },
    children: [
      {
        path: 'index',
        component: () => import('@/views/project/index'),
        // redirect: '/project/needs',
        name: 'Project',
        meta: { title: '????????????', roles: ['user'], icon: 'xiangmu2', affix: true, activeMenu: '/project/index' }
      },
      {
        path: 'baseinfo',
        component: () => import('@/views/project/baseinfo/index'),
        // redirect: '/project/needs',
        name: 'Baseinfo',
        meta: { title: '????????????', roles: ['user'] },
        hidden: true
      },
      {
        path: 'needs',
        // component: () => import('@/views/project/needs'),
        component: () => import('@/views/xuqiu/index'),
        name: 'Needs',
        meta: { title: '??????', roles: ['user'], activeMenu: '/project/index' },
        hidden: true

      },
      {
        path: 'needs/add',
        component: () => import('@/views/xuqiu/addnew'),
        name: 'xuqiuAdd',
        meta: { title: '????????????', roles: ['user'], hide: true },
        hidden: true

      },
      {
        path: 'needs/edit',
        component: () => import('@/views/xuqiu/edit'),
        name: 'xuqiuEdit',
        meta: { title: '????????????', roles: ['user'], hide: true },
        hidden: true

      },

      {
        path: 'approval',
        component: () => import('@/views/project/approval/index'),
        name: 'approval',
        meta: { title: '????????????', roles: ['user'] },
        hidden: true

      },
      {
        path: 'approval/add',
        component: () => import('@/views/project/approval/addnew'),
        name: 'createApproval',
        meta: { title: '????????????', roles: ['user'], hide: true },
        hidden: true

      },
      {
        path: 'approval/edit',
        component: () => import('@/views/project/approval/edit'),
        name: 'editApproval',
        meta: { title: '????????????', roles: ['user'], hide: true },
        hidden: true

      },

      {
        path: 'reportform',
        component: () => import('@/views/project/reportForms/index'),
        name: 'reportform',
        meta: { title: '??????', roles: ['user'] },
        hidden: true

      },
      {
        path: 'reportform/detail',
        component: () => import('@/views/project/reportForms/detailForms'),
        name: 'reportformDetail',
        meta: { title: '????????????', roles: ['user'], hide: true },
        hidden: true

      },

      {
        path: 'mission',
        component: () => import('@/views/project/mission'),
        name: 'mission',
        hidden: true,
        meta: { title: '??????', roles: ['user'] }
      },
      {
        path: 'mission/create',
        component: () => import('@/views/project/mission/createmission'),
        name: 'createmission',
        hidden: true,
        meta: { title: '????????????', roles: ['user'], hide: true }
      },
      {
        path: 'mission/edit',
        component: () => import('@/views/project/mission/editmission'),
        name: 'editmission',
        hidden: true,
        meta: { title: '??????????????????', roles: ['user'], hide: true }
      },
      {
        path: 'defect',
        component: () => import('@/views/project/defect'),
        name: 'Defect',
        hidden: true,
        meta: { title: '??????', roles: ['user'], activeMenu: '/project/index' }
      },
      {
        path: 'defect/edit',
        component: () => import('@/views/project/defect/edit'),
        name: 'quexianEdit',
        hidden: true,
        meta: { title: '????????????', roles: ['user'], hide: true, activeMenu: '/project/index' }
      },
      {
        path: 'iteration',
        component: () => import('@/views/project/iteration'),
        name: 'Iteration',
        hidden: true,
        meta: { title: '??????', roles: ['user'], activeMenu: '/project/index' }
      },
      {
        path: 'iteration/details/:id',
        component: () => import('@/views/project/iteration/iterationDetails'),
        name: 'IterationDetails',
        hidden: true,
        meta: { title: '????????????', roles: ['user'], hide: true, activeMenu: '/project/index' }
      },
      {
        path: 'iteration/planIteration',
        component: () => import('@/views/project/iteration/planIteration'),
        name: 'PlanIteration',
        hidden: true,
        meta: { title: '????????????', roles: ['user'], hide: true, activeMenu: '/project/index' }
      },
      {
        path: 'storywall',
        component: () => import('@/views/project/storywall'),
        name: 'Storywall',
        hidden: true,
        meta: { title: '?????????', roles: ['user'], activeMenu: '/project/index' }
      },
      {
        path: 'board',
        component: () => import('@/views/board/index'),
        name: 'Board',
        hidden: true,
        meta: { title: '??????', roles: ['user'], activeMenu: '/project/index' }
      },
      {
        path: 'testcase',
        component: () => import('@/views/project/test/case'),
        name: 'testcase',
        hidden: true,
        meta: { title: '????????????', roles: ['user'] }
      },
      {
        path: 'testcase/create',
        component: () => import('@/views/project/test/createcase'),
        name: 'createCase',
        hidden: true,
        meta: { title: '??????????????????', roles: ['user'], hide: true }
      },
      {
        path: 'testcase/edit',
        component: () => import('@/views/project/test/editcase'),
        name: 'editcase',
        hidden: true,
        meta: { title: '??????????????????', roles: ['user'], hide: true }
      },

      {
        path: 'testplan',
        component: () => import('@/views/project/test/plan'),
        name: 'testplan',
        hidden: true,
        meta: { title: '????????????', roles: ['user'] }
      },
      {
        path: 'testplan/create',
        component: () => import('@/views/project/test/createplan'),
        name: 'createplan',
        hidden: true,
        meta: { title: '??????????????????', roles: ['user'], hide: true }
      },
      {
        path: 'testplan/edit',
        component: () => import('@/views/project/test/editplan'),
        name: 'editplan',
        hidden: true,
        meta: { title: '??????????????????', roles: ['user'], hide: true }
      },
      // {
      //   path: 'setting',
      //   component: () => import('@/views/settings/index'),
      //   name: 'setting',
      //   hidden: true,
      //   meta: { title: '', roles: ['user'] }
      // }
    ]
  },

  {
    path: '/dataPlatform',
    component: Layout,
    redirect: '/dataPlatform/index',
    meta: { roles: ['user'] },
    children: [
      {
        path: 'index',
        component: () => import('@/views/DataPlatform/index'),
        name: 'productAtlas',
        meta: { title: '????????????', roles: ['user'], icon: 'chart', submenu: '??????????????????' }
      },
      {
        path: 'analyse',
        component: () => import('@/views/DataPlatform/analyse'),
        name: 'programAnalyse',
        meta: { title: '??????????????????', roles: ['user'], icon: '', submenu: '??????????????????' },
        hidden: true
      },
      {
        path: 'portrayal',
        component: () => import('@/views/DataPlatform/portrayal'),
        name: 'personPortrayal',
        meta: { title: '??????????????????', roles: ['user'], icon: '', submenu: '??????????????????' },
        hidden: true
      }
    ]
  },

  {
    path: '/document',
    component: Layout,
    redirect: '/document/index',
    meta: { roles: ['user'] },
    children: [
      {
        path: 'index',
        component: () => import('@/views/project/document/index'),
        name: 'Document',
        meta: { title: '??????', roles: ['user'], icon: 'clipboard', affix: true }
      }
    ]
  },
  {
    path: '/communicate',
    component: Layout,
    redirect: '/communicate/index',
    meta: { roles: ['user'] },
    children: [
      {
        path: 'index',
        component: () => import('@/views/communicate/index'),
        name: 'Communicate',
        meta: { title: '??????', roles: ['user'], icon: 'wechat', affix: true }
      }
    ]
  },

  // {
  //   path: '/companyManage',
  //   component: Layout,
  //   meta: { roles: ['user'] },
  //   children: [
  //     {
  //       path: 'index',
  //       component: () => import('@/views/companyManage/index'),
  //       name: 'companyManageIndex',
  //       meta: { title: '????????????', roles: ['user'], icon: 'gongsi', submenu: '????????????' },
  //       hidden: true
  //     },
  //     {
  //       path: 'person',
  //       component: () => import('@/views/companyManage/personManage'),
  //       name: 'companyManagePerson',
  //       meta: { title: '????????????', roles: ['user'], icon: 'gongsi', submenu: '????????????' },
  //       hidden: true
  //     },
  //     {
  //       path: 'create',
  //       component: () => import('@/views/companyManage/CreatePerson'),
  //       name: 'companyManageCreate',
  //       meta: { title: '????????????', roles: ['user'], icon: 'gongsi', hide: true },
  //       hidden: true
  //     }
  //   ]
  // },
  
  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
