<script setup></script>

<template>
    <div class="flex justify-between p-1">
        <dt class="font-bold">
            <slot name="label" />
        </dt>
        <dd class="text-gray">
            <slot></slot>
        </dd>
    </div>
</template>

<style scoped></style>
