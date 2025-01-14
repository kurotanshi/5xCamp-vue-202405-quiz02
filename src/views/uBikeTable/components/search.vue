<script setup>
import { ref, computed, watch } from 'vue';
// 修改這份 YouBike 即時資訊表，並加上
// 1. 站點名稱搜尋

// 搜尋文字
const searchText = computed({
  get: ()=> {
    return props.searchText;
  },
  set: (nValue)=>{
    emits('setSearchText', nValue);
  }
});
const props = defineProps({
  searchText : String
})

const emits = defineEmits(['setSearchText']);
</script>

<template>
    <p class="mb-3">
      站點名稱搜尋: <input class="border" type="text" v-model="searchText">
    </p>
</template>
