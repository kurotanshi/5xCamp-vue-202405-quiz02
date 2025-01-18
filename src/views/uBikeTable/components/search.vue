<script setup>

const emits = defineEmits(['updateSearch'])

const updateSearch = (e) => {
    emits('updateSearch', e.target.value)
}

</script>

<template>
    <p class="mb-3">
      站點名稱搜尋: <input class="border" type="text" @input="updateSearch">
    </p>
</template>