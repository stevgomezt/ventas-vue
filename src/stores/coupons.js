import { ref, watch, computed } from 'vue'
import { defineStore } from 'pinia'
import { useCartStore } from "../stores/cart.js";

export const useCouponStore = defineStore('coupon', () => {

  const cart = useCartStore()
  const couponInput = ref('')
  const couponValidationMessage = ref('')
  const discountPercentage = ref(0)
  const discount = ref(0)

  const validCoupons = [
    { name: '10DESC', discount: .10 },
    { name: '20DESC', discount: .20 },
    { name: '30DESC', discount: .30 }
  ]

  watch(discountPercentage, () => {
    discount.value = (cart.total * discountPercentage.value).toFixed(2)
  })

  function applyCoupon() {
    // console.log('aplicando...')
    if (validCoupons.some(coupon => coupon.name === couponInput.value)) {
      couponValidationMessage.value = 'Aplicando...'

      setTimeout(() => {
        discountPercentage.value = validCoupons.find(coupon => coupon.name === couponInput.value).discount
        couponValidationMessage.value = 'Descuento aplicado!'
      }, 3000);

      // console.log(percentage)
    } else {
      couponValidationMessage.value = 'El cupon no existe'
    }

    setTimeout(() => {
      couponValidationMessage.value = ''
    }, 6000);
  }

  function $reset() {
    couponInput.value = ''
    couponValidationMessage.value = ''
    discountPercentage.value = 0
    discount.value = 0
  }

  const isValidCoupon = computed(() => discountPercentage.value > 0)

  return {
    couponInput,
    discount,
    applyCoupon,
    $reset,
    couponValidationMessage,
    isValidCoupon
  }
})