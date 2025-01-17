<script setup>
import {computed, ref} from "vue";
const props = defineProps({
  name: {
    type: String,
    default: ''
  }
});

const emits = defineEmits(['searchText']);

const searchText = computed({
  get: () => props.name,
  set: val => {
    emits('searchText', val);
  }
});


</script>

<template>
  <p class="mb-3">
    站點名稱搜尋: <input class="border" type="text" v-model="searchText">
  </p>
</template>

<style scoped>

</style>