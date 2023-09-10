
export const rolePermissionToTree = (permissions: Array<API.Permission> = []) => {
    const tree: Array<API.RolePermiss> = []
    const mapPermission = (permiss: API.RolePermiss) => {
        const children = permissions.filter(item => item.pid === permiss.id)
        if (children.length) {
            permiss.children = children
        }
        if (!permiss.pid) {
            tree.push({ ...permiss })
        }
    }
    permissions.forEach(mapPermission)
    return tree
}

export const getMenus = (rolePermiss: Array<API.RolePermiss> = []) => {
    const mapPermissions = (item: API.RolePermiss) => {
        const {
            id,
            pid,
            path,
            name,
            title,
            redirect,
            icon,
            cache,
            sort,
            hidden,
            component,
            children,
            type
        } = item
        const route: API.Menu = {
            id,
            pid,
            path,
            name,
            redirect,
            type,
            title,
            icon,
            cache,
            sort,
            hidden,
            component: component ? component : '',
        }
        if (children && children.length) {
            route.children = children.filter(i => i.type !== 3).map(mapPermissions)
        }
        return route
    }
    return rolePermiss.filter(i => i.type !== 3).map(mapPermissions)
}

export const isPermission = (code = '', permissions: Array<string> = []): boolean => permissions.includes(code)