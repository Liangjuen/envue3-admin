export const toBoolean = (arg: any) => {
    const type = typeof arg
    if (type == 'string') {
        return !!Number(arg)
    } else if (type == 'number') {
        return !!arg
    } else {
        return false
    }
}