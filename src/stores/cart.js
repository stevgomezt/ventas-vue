import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useCartStore = defineStore('cart', () => {

  const items = ref([])

  const maxProducts = 5

  function addItem(item) {
    // console.log((item))
    items.value.push(item)
  }

  const isEmpty = computed(() => items.value.length === 0)

  const checkProductAvailability = computed(() => {
    return (product) => product.availability < maxProducts ? product.availability : maxProducts
  })

  return {
    items,
    addItem,
    isEmpty,
    checkProductAvailability
  }
})