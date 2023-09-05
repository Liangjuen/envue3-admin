import type { Directive, DirectiveBinding } from 'vue'

export type LazyDirBindingValue = string

let lazy: Directive<HTMLImageElement, LazyDirBindingValue> = async (el: HTMLImageElement, binding: DirectiveBinding<LazyDirBindingValue>) => {
    const observer = new IntersectionObserver((entry) => {
        if (entry[0].intersectionRatio > 0) {
            el.src = binding.value
            observer.unobserve(el)
        } else {
            el.src = 'https://fakeimg.pl/500x200/?text=. . .'
        }
    })
    observer.observe(el)
}

export default lazy