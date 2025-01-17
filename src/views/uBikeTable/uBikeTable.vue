<script setup>
import { ref, computed, watch } from 'vue';
import search from './components/search.vue';
import uBikeTable from './components/uBikeTable.vue';
import pagination from './components/pagination.vue';

// 所有站點資料
const uBikeStops = ref([]);
// 搜尋文字
const searchText = ref('');
// 目前頁碼
const currentPage = ref(1);
// 一頁幾筆資料
const COUNT_OF_PAGE = 10;

fetch('https://tcgbusfs.blob.core.windows.net/dotapp/youbike/v2/youbike_immediate.json')
  .then(res => res.text())
  .then(data => {
    uBikeStops.value = JSON.parse(data);
  });

const updateSearchText = (value) => {
  searchText.value = value;
}

// 監聽搜尋文字，若有變動則將頁碼回歸第一頁
watch(searchText, () => {
  currentPage.value = 1;
});

// 總頁數
const totalPageCount = computed(() => {
  return Math.ceil(uBikeStops.value.filter(d => d.sna.includes(searchText.value)).length / COUNT_OF_PAGE);
});

// 換頁
const updatePage = page => {
  currentPage.value = page;
};
</script>

<template>
  <div class="app">
    <search @updateSearch="updateSearchText"></search>

    <uBikeTable
      :uBikeStops="uBikeStops"
      :searchText="searchText"
      :currentPage="currentPage"
      :COUNT_OF_PAGE="COUNT_OF_PAGE"
    />

    <pagination
      :currentPage="currentPage"
      :totalPageCount="totalPageCount"
      :updatePage="updatePage"
    />
  </div>
</template>

<style lang="scss" scoped>
.app {
  padding: 1rem;
}

.pointer {
  cursor: pointer;
}

.pagination {
  display: flex;
  justify-content: center;
}

@media (max-width: 768px) {
  .sno {
    max-width: 50px; word-wrap: break-word;
  }
  .table td, .table th {
    padding: .5rem .25rem;
  }
}
</style>