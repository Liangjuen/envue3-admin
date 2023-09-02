export const phoneReg = /^1[3456789]\d{9}$/
export const emailReg = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

export const isPhone = (value: string): boolean => phoneReg.test(value)
export const isEmail = (value: string): boolean => emailReg.test(value)
