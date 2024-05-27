<script setup>
// import { formatCurrency } from "../helpers";
import { formatCurrency } from "../helpers/index.js";
defineProps({
    product: {
        type: Object,
    },
});
</script>

<template>
    <li
        class="flex items-center space-x-6 border border-gray-200 p-6 bg-white shadow"
    >
        <img :src="product.image" :alt="product.name" class="h-24 w-24" />

        <div class="space-y-2">
            <h3 class="text-gay-900">{{ product.name }}</h3>
            <p class="font-extrabold">{{ formatCurrency(product.price) }}</p>
            <p>{{ product.availability }}</p>
        </div>
    </li>
</template>

<style scoped></style>
