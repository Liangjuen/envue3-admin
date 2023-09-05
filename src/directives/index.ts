import type { App } from 'vue'
const directives: any = import.meta.glob('./dirs/*.ts*', { eager: true })

export default {
    install(app: App) {
        Object.keys(directives).forEach((key) => {
            const directiveName = key.replace(/\.\/dirs\/(.*)\.ts/, '$1')
            app.directive(directiveName, directives[key].default)
        })
    }
}