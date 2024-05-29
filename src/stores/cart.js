import { ref, computed, watch, watchEffect } from 'vue'
import { defineStore } from 'pinia'
import { useCouponStore } from '../stores/coupons.js'

export const useCartStore = defineStore('cart', () => {

  const coupon = useCouponStore()
  const items = ref([])
  const subtotal = ref(0)
  const taxes = ref(0)
  const total = ref(0)

  const maxProducts = 5

  const taxtRate = .10

  // watch(items, () => {
  //   subtotal.value = items.value.reduce((total, item) => total + (item.quantity * item.price), 0)
  //   taxes.value = subtotal.value * taxtRate
  //   total.value = subtotal.value + taxes.value
  // }, {
  //   deep: true
  // })

  watchEffect(() => {
    subtotal.value = items.value.reduce((total, item) => total + (item.quantity * item.price), 0)
    taxes.value = subtotal.value * taxtRate
    total.value = (subtotal.value + taxes.value) - coupon.discount
  })

  function addItem(item) {
    // console.log((item))
    const index = isItemInCart(item.id)
    // console.log(index)
    if (index >= 0) {
      if (isProductAvailable(item, index)) {
        alert("Has alcanzado el limite")
        return
      }
      // Actualizar cantidad
      items.value[index].quantity++
    } else {
      items.value.push({ ...item, quantity: 1, id: item.id })
    }

  }

  function updateQuantity(id, quantity) {
    // console.log(id)
    // console.log(quantity)
    items.value = items.value.map(item => item.id === id ? { ...item, quantity } : item)
  }

  function removeItem(id) {
    // console.log(id)
    items.value = items.value.filter(item => item.id != id)
  }

  const isItemInCart = id => items.value.findIndex(item => item.id === id)

  const isProductAvailable = (item, index) => {
    return items.value[index].quantity >= item.availability || items.value[index].quantity >= maxProducts
  }

  const isEmpty = computed(() => items.value.length === 0)

  const checkProductAvailability = computed(() => {
    return (product) => product.availability < maxProducts ? product.availability : maxProducts
  })

  return {
    items,
    subtotal,
    taxes,
    total,
    addItem,
    removeItem,
    updateQuantity,
    isEmpty,
    checkProductAvailability
  }
})