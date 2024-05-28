import { computed, ref } from "vue";
import { defineStore } from "pinia";
import { useFirestore, useCollection, useFirebaseStorage } from "vuefire";
import { collection, addDoc, where, query, limit, orderBy, updateDoc, doc, getDoc, deleteDoc } from "firebase/firestore";
import { ref as storageRef, deleteObject } from "firebase/storage";

export const useProductsStore = defineStore('products', () => {

  const db = useFirestore()
  const storage = useFirebaseStorage()

  const selectedCategory = ref(1)

  const categories = [
    { id: 1, name: 'sudaderas' },
    { id: 2, name: 'tenis' },
    { id: 3, name: 'lentes' },
  ]

  const q = query(
    collection(db, 'products'),
    where('price', '>', 0),
    // limit(2),
    orderBy('price', 'desc')

  )

  const productsCollection = useCollection(q)

  const filteredProducts = computed(() => {
    return productsCollection.value.filter(product => product.category === selectedCategory.value)
  })

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

  async function updateProduct(docRef, product) {
    // console.log(product)
    const { image, url, ...values } = product

    if (image.length) {
      await updateDoc(docRef, {
        ...values,
        image: url.value
      })
    } else {
      await updateDoc(docRef, values)
    }

  }

  async function deleteProduct(id) {
    // console.log(id)
    if (confirm('Desea eliminar el producto?')) {
      {
        const docRef = doc(db, 'products', id)
        const docSnap = await getDoc(docRef)
        const { image } = docSnap.data()
        const imageRef = storageRef(storage, image)

        await Promise.all([
          deleteDoc(docRef),
          deleteObject(imageRef)
        ])
      }

    }
  }

  return {
    createProduct,
    updateProduct,
    deleteProduct,
    productsCollection,
    categories,
    selectedCategory,
    categoryOptions,
    noResults,
    filteredProducts
  }
})