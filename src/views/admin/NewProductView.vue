<script setup>
import { reactive } from "vue";
import { useRouter } from "vue-router";
import Link from "@/components/Link.vue";
import useImage from "../../composables/useImage.js";
import { useProductsStore } from "../../stores/products.js";

// solo los composables pueden extraersen de esta forma, los Store no porque rompen la reactividad
const { url, onFileChange, isImageUploaded } = useImage();
const products = useProductsStore();
const router = useRouter();

const formData = reactive({
    name: "",
    category: "",
    price: "",
    availability: "",
    image: "",
});

const submitHandler = async (data) => {
    const { image, ...values } = data;

    try {
        await products.createProduct({
            ...values,
            image: url.value,
        });
        router.push({ name: "products" });
    } catch (error) {
        console.log(error);
    }
};
</script>

<template>
    <div>
        <Link to="products">Volver</Link>
        <h1 class="text-4xl font-black my-10">Nuevo Producto</h1>

        <div class="flex justify-center bg-white shadow">
            <div class="mt-10 p-10 w-full 2xl:w-2/4">
                <FormKit
                    type="form"
                    submit-label="Agregar Producto"
                    incomplete-message="No se pudo enviar, revisa los mensajes"
                    @submit="submitHandler"
                    :value="formData"
                >
                    <!-- .trim sirve para quitar los espacios en blanco -->
                    <FormKit
                        type="text"
                        label="Nombre"
                        name="name"
                        placeholder="Nombre del producto"
                        validation="required"
                        :validation-messages="{
                            required: 'El nombre del producto es obligatorio',
                        }"
                        v-model.trim="formData.name"
                    />

                    <FormKit
                        type="file"
                        label="Imagen del producto"
                        name="image"
                        validation="required"
                        :validation-messages="{
                            required: 'La imagen del producto es obligatoria',
                        }"
                        accept=".jpg"
                        multiple="false"
                        @change="onFileChange"
                        v-model.trim="formData.image"
                    />

                    <div v-if="isImageUploaded">
                        <p class="font-black">Imagen del producto</p>
                        <img
                            :src="isImageUploaded"
                            alt="Nueva imagen producto"
                            class="w-32"
                        />
                        <!-- <img :src="url" alt=""> -->
                    </div>

                    <FormKit
                        type="select"
                        label="Categoria producto"
                        name="category"
                        validation="required"
                        :validation-messages="{
                            required:
                                'La categoria del producto es obligatoria',
                        }"
                        :options="products.categoryOptions"
                        v-model.number="formData.category"
                    />

                    <FormKit
                        type="number"
                        label="Precio del producto"
                        name="price"
                        placeholder="Precio del producto"
                        validation="required"
                        :validation-messages="{
                            required: 'El precio del producto es obligatorio',
                        }"
                        min="10000"
                        step="1000"
                        v-model.number="formData.price"
                    />

                    <FormKit
                        type="number"
                        label="Cantidad del producto"
                        name="availability"
                        placeholder="Cantidad del producto"
                        validation="required"
                        :validation-messages="{
                            required: 'La cantidad es obligatoria',
                        }"
                        min="1"
                        v-model.number="formData.availability"
                    />
                </FormKit>
            </div>
        </div>
    </div>
</template>

<style scoped></style>
