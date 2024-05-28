<script setup>
import { formatCurrency } from "../helpers/index.js";
import { useCartStore } from "../stores/cart.js";

const cart = useCartStore();

defineProps({
    item: {
        type: Object,
    },
});
</script>

<template>
    <li>
        <img
            :src="item.image"
            :alt="'Imagen de ' + item.name"
            class="h-24 w-24 flex-none rounded-md"
        />

        <div class="flex-auto space-y-2">
            <h3 class="text-gray-900">{{ item.name }}</h3>
            <p>{{ formatCurrency(item.price) }}</p>
            <select
                name=""
                id=""
                class="w-32 text-center p-2 rounded-lg bg-white"
            >
                <option
                    v-for="n in cart.checkProductAvailability(item)"
                    :value="n"
                    :key="n"
                >
                    {{ n }}
                </option>
            </select>
        </div>
    </li>
</template>

<style scoped></style>
