import { ref, computed, reactive } from 'vue'
import { defineStore } from 'pinia'
import { Names } from './store-name'
import API from '@/network/api'

export const useUserStore = defineStore(Names.USER, () => {
    let data = reactive<API.UserData | {}>({})
    let token = ref<string>()
    const getcurrentUserData = () => API.user.getCurrentUserData()

    return {
        data,
        token,
        getcurrentUserData
    }
})