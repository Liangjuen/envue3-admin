import request from '../../request'
import type { Data } from '@/network/type'

const getCurrentUserData = () => request.get<Data<API.UserData>>('/user')

export default {
    getCurrentUserData
}