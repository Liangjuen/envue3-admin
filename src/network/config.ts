export const baseURL = {
    dev: 'http://127.0.0.1:8080',
    pro: 'http://127.0.0.1:8080'
}

export default {
    baseURL: process.env.NODE_ENV === 'development' ? baseURL.dev : baseURL.pro
} 