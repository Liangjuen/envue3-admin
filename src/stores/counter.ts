import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { Names } from './store-name'

export const useCounterStore = defineStore(Names.COUNTER, () => {
  const count = ref(0)
  const doubleCount = computed(() => count.value * 2)
  function increment() {
    count.value++
  }

  return { count, doubleCount, increment }
})
