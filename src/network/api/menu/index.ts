import request from '../../request'
import type { Data } from '@/network/type'

const getMenus = () => request.get<Data<Array<API.Menu>>>('/menus')

export default {
    getMenus
}