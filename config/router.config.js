export default [
  // user
  {
    path: '/user',
    component: '../layouts/UserLayout',
    routes: [
      { path: '/user', redirect: '/user/login' },
      { path: '/user/login', name: 'login', component: './User/MyLogin' },
      { path: '/user/register', name: 'register', component: './User/Register' },
      {
        path: '/user/register-result',
        name: 'register.result',
        component: './User/RegisterResult',
      },
      {
        component: '404',
      },
    ],
  },
  // app
  {
    path: '/',
    component: '../layouts/BasicLayout',
    Routes: ['src/pages/Authorized'],
    authority: ['admin', 'user'],
    routes: [
      // dashboard
      { path: '/', redirect: '/home/index' },
      {
        path: '/home',
        name: 'home',
        icon: 'home',
        authority: ['admin', 'user'],
        // component: './Home/index',
        routes: [
          {
            path: '/home/index',
            name: 'index',
            authority: ['admin', 'user'],
            component: './Home/index',
          },
          {
            path: '/home/index2',
            name: 'index2',
            authority: ['admin', 'user'],
            component: './Home2/index',
          },
        ],
      },
      // 报表门户
      {
        path: '/reports',
        name: 'reports',
        icon: 'table',
        authority: ['admin', 'user'],
        routes: [
          {
            path: '/reports/maindata',
            name: 'maindata',
            authority: ['admin', 'user'],
            component: './Reports/maindata',
          },
          // {
          //   path: '/dcwj/send',
          //   name: 'send',
          //   authority: ['admin', 'user'],
          //   component: './Hwjpage/send',
          // },
          // {
          //   path: '/dcwj/answer',
          //   name: 'answer',
          //   authority: ['admin', 'user'],
          //   component: './Hwjpage/answer',
          // },
        ],
      },
      // 和问卷
      {
        path: '/dcwj',
        name: 'dcwj',
        icon: 'edit',
        authority: ['admin', 'user'],
        routes: [
          {
            path: '/dcwj/edit',
            name: 'edit',
            authority: ['admin', 'user'],
            component: './Hwjpage/index',
          },
          {
            path: '/dcwj/send',
            name: 'send',
            authority: ['admin', 'user'],
            component: './Hwjpage/send',
          },
          {
            path: '/dcwj/answer',
            name: 'answer',
            authority: ['admin', 'user'],
            component: './Hwjpage/answer',
          },
        ],
      },
      // 物料管理
      {
        path: '/material',
        name: 'material',
        icon: 'reconciliation',
        authority: ['admin', 'user'],
        routes: [
          // 物料信息维护
          {
            path: '/material/mtype',
            name: 'mtype',
            authority: ['admin', 'user'],
            component: './Material/Mtype/index',
          },
          {
            path: '/material/basicform',
            name: 'basicform',
            hideInMenu: true,
            component: './Material/Mtype/BasicForm',
          },

          {
            path: '/material/excelImport',
            name: 'excelImport',
            component: './Material/Warehouse/ExcelImport/',
            hideChildrenInMenu: true,
            routes: [
              {
                path: '/material/excelImport',
                redirect: '/material/excelImport/info',
              },
              {
                path: '/material/excelImport/info',
                name: 'info',
                component: './Material/Warehouse/ExcelImport/Step1',
              },
              {
                path: '/material/excelImport/confirm',
                name: 'confirm',
                component: './Material/Warehouse/ExcelImport/Step2',
              },
              {
                path: '/material/excelImport/result',
                name: 'result',
                component: './Material/Warehouse/ExcelImport/Step3',
              },
            ],
          },


        ],
      },
      // 权限管理
      {
        path: '/admin',
        name: 'admin',
        icon: 'solution',
        authority: ['admin'],
        routes: [
          {
            path: '/admin/group',
            name: 'group',
            authority: ['admin'],
            component: './Admin/group', 
          },
          {
            path: '/admin/rule',
            name: 'rule',
            authority: ['admin'],
            component: './Admin/rule',
          },
        ],
      },
      // // forms
      // {
      //   path: '/form',
      //   icon: 'form',
      //   name: 'form',
      //   routes: [
      //     {
      //       path: '/form/basic-form',
      //       name: 'basicform',
      //       component: './Forms/BasicForm',
      //     },
      //     {
      //       path: '/form/step-form',
      //       name: 'stepform',
      //       component: './Forms/StepForm',
      //       hideChildrenInMenu: true,
      //       routes: [
      //         {
      //           path: '/form/step-form',
      //           redirect: '/form/step-form/info',
      //         },
      //         {
      //           path: '/form/step-form/info',
      //           name: 'info',
      //           component: './Forms/StepForm/Step1',
      //         },
      //         {
      //           path: '/form/step-form/confirm',
      //           name: 'confirm',
      //           component: './Forms/StepForm/Step2',
      //         },
      //         {
      //           path: '/form/step-form/result',
      //           name: 'result',
      //           component: './Forms/StepForm/Step3',
      //         },
      //       ],
      //     },
      //     {
      //       path: '/form/advanced-form',
      //       name: 'advancedform',
      //       authority: ['admin'],
      //       component: './Forms/AdvancedForm',
      //     },
      //   ],
      // },
      {
        name: 'exception',
        icon: 'warning',
        path: '/exception',
        hideInMenu: true,
        routes: [
          // exception
          {
            path: '/exception/403',
            name: 'not-permission',
            component: './Exception/403',
          },
          {
            path: '/exception/404',
            name: 'not-find',
            component: './Exception/404',
          },
          {
            path: '/exception/500',
            name: 'server-error',
            component: './Exception/500',
          },
          {
            path: '/exception/trigger',
            name: 'trigger',
            hideInMenu: true,
            component: './Exception/TriggerException',
          },
        ],
      },
      // {
      //   name: 'account',
      //   icon: 'user',
      //   path: '/account',
      //   hideInMenu: true,
      //   routes: [
      //     {
      //       path: '/account/center',
      //       name: 'center',
      //       component: './Account/Center/Center',
      //       routes: [
      //         {
      //           path: '/account/center',
      //           redirect: '/account/center/articles',
      //         },
      //         {
      //           path: '/account/center/articles',
      //           component: './Account/Center/Articles',
      //         },
      //         {
      //           path: '/account/center/applications',
      //           component: './Account/Center/Applications',
      //         },
      //         {
      //           path: '/account/center/projects',
      //           component: './Account/Center/Projects',
      //         },
      //       ],
      //     },
      //     {
      //       path: '/account/settings',
      //       name: 'settings',
      //       component: './Account/Settings/Info',
      //       routes: [
      //         {
      //           path: '/account/settings',
      //           redirect: '/account/settings/base',
      //         },
      //         {
      //           path: '/account/settings/base',
      //           component: './Account/Settings/BaseView',
      //         },
      //         {
      //           path: '/account/settings/security',
      //           component: './Account/Settings/SecurityView',
      //         },
      //         {
      //           path: '/account/settings/binding',
      //           component: './Account/Settings/BindingView',
      //         },
      //         {
      //           path: '/account/settings/notification',
      //           component: './Account/Settings/NotificationView',
      //         },
      //       ],
      //     },
      //   ],
      // },
      {
        component: '404',
      },
    ],
  },
];
