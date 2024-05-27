import { computed } from "vue";
import { defineStore } from "pinia";

export const useProductsStore = defineStore('products', () => {

  const categories = [
    { id: 1, name: 'sudaderas' },
    { id: 2, name: 'tenis' },
    { id: 3, name: 'lentes' },
  ]

  const categoryOptions = computed(() => {
    const options = [
      { label: 'Seleccione una categoria', value: '', attrs: { disabled: true } },
      ...categories.map(category => (
        {
          label: category.name, value: category.id
        }
      ))
    ]

    return options
  })

  async function createProduct(product) {
    console.log(product)
  }

  return {
    createProduct,
    categoryOptions
  }
})