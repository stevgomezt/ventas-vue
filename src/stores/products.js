import { computed } from "vue";
import { defineStore } from "pinia";
import { useFirestore, useCollection } from "vuefire";
import { collection, addDoc, where, query, limit, orderBy } from "firebase/firestore";

export const useProductsStore = defineStore('products', () => {

  const db = useFirestore()

  const categories = [
    { id: 1, name: 'sudaderas' },
    { id: 2, name: 'tenis' },
    { id: 3, name: 'lentes' },
  ]

  const q = query(
    collection(db, 'products'),
    where('price', '>', 0),
    limit(2),
    orderBy('price', 'desc')

  )

  const productsCollection = useCollection(q)

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

  const noResults = computed(() => productsCollection.value.length === 0)

  async function createProduct(product) {
    // console.log(product)
    await addDoc(collection(db, 'products'), product)
  }

  return {
    createProduct,
    productsCollection,
    categoryOptions,
    noResults
  }
})