const permission: Array<API.Permission> = [
    {
        id: 'aaaaa',
        pid: '',
        title: '首页',
        path: '/home',
        name: '',
        cache: 0,
        sort: 0,
        icon: 'home',
        type: 2,
        hidden: 0,
        permission: 'sys:home',
        component: '/home'
    },
    {
        id: 'abcde',
        pid: '',
        title: '系统管理',
        path: '/sysManage',
        name: '',
        cache: 0,
        sort: 0,
        icon: 'settings',
        type: 1,
        hidden: 0,
        permission: 'sys:sysMenage',
        component: ''
    },
    {
        id: 'bcde1',
        pid: 'abcde',
        title: '菜单管理',
        path: '/sysManage/menuMenage',
        name: 'menuMenage',
        cache: 1,
        sort: 1,
        icon: 'menu',
        type: 2,
        hidden: 0,
        permission: 'sys:sysMenage:menu',
        component: '/sysmanage/menuMenage'
    },
    {
        id: 'bcde2',
        pid: 'abcde',
        title: '角色管理',
        path: '/sysManage/roleMenage',
        name: 'roleMenage',
        cache: 1,
        sort: 1,
        icon: 'user-check',
        type: 2,
        hidden: 0,
        permission: 'sys:sysMenage:role',
        component: '/sysmanage/roleMenage'
    },
    {
        id: 'bcde3',
        pid: 'abcde',
        title: '员工管理',
        path: '/sysManage/staffMenage',
        name: 'staffMenage',
        cache: 1,
        sort: 1,
        icon: 'users',
        type: 2,
        hidden: 0,
        permission: 'sys:sysMenage:staff',
        component: '/sysmanage/staffMenage'
    },
    {
        id: 'cdef1',
        pid: 'bcde1',
        title: '查看',
        path: '',
        name: '',
        cache: 0,
        sort: null,
        icon: '',
        type: 3,
        hidden: 0,
        permission: 'sys:sysMenage:menu:view',
        component: ''
    },
    {
        id: 'cdef2',
        pid: 'bcde1',
        title: '添加',
        path: '',
        name: '',
        cache: 0,
        sort: null,
        icon: '',
        type: 3,
        hidden: 0,
        permission: 'sys:sysMenage:menu:add',
        component: ''
    },
    {
        id: 'cdef3',
        pid: 'bcde1',
        title: '删除',
        path: '',
        name: '',
        cache: 0,
        sort: null,
        icon: '',
        type: 3,
        hidden: 0,
        permission: 'sys:sysMenage:menu:delete',
        component: ''
    },
    {
        id: 'cdef4',
        pid: 'bcde1',
        title: '编辑',
        path: '',
        name: '',
        cache: 0,
        sort: null,
        icon: '',
        type: 3,
        hidden: 0,
        permission: 'sys:sysMenage:menu:edit',
        component: ''
    }
]
export const getRolePermission = () => permission

