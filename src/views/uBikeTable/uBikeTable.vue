<script setup>
import { ref, computed, watch } from 'vue';
import SearchVue from './components/search.vue';
import uBikeTableVue from './components/uBikeTable.vue';
import PaginationVue from './components/pagination.vue';
// 修改這份 YouBike 即時資訊表，並加上
// 1. 站點名稱搜尋
// 2. 目前可用車輛 / 總停車格 的排序功能
// 3. 加入分頁功能，每頁 20 筆資料

// 欄位說明:
// https://data.taipei/dataset/detail?id=c6bc8aed-557d-41d5-bfb1-8da24f78f2fb
// sno(站點代號)、sna(場站中文名稱)、total(場站總停車格)、available_rent_bikes(場站目前車輛數量)、
// sarea(場站區域)、mday(資料更新時間)、latitude(緯度)、longitude(經度)、ar(地點)、sareaen(場站區域英文)、
// snaen(場站名稱英文)、aren(地址英文)、available_return_bikes(空位數量)、act(全站禁用狀態)、
// srcUpdateTime(YouBike2.0系統發布資料更新的時間)、updateTime(大數據平台經過處理後將資料存入DB的時間)、
// infoTime(各場站來源資料更新時間)、infoDate(各場站來源資料更新時間)

// 目前的排序選項
const currentSort = ref('sno');
// 是否為降冪排序
const isSortDesc = ref(false);

// 所有站點資料
const uBikeStops = ref([]);
// 搜尋文字
const searchText = ref('');
// 目前頁碼
const currentPage = ref(1);
// 一頁幾筆資料
const COUNT_OF_PAGE = 10;
// 頁碼最多顯示幾頁
const PAGINATION_MAX = 10;


fetch('https://tcgbusfs.blob.core.windows.net/dotapp/youbike/v2/youbike_immediate.json')
  .then(res => res.text())
  .then(data => {
    uBikeStops.value = JSON.parse(data);
  });

function setSearchText(nValue) {
  searchText.value = nValue;
}
// 監聽搜尋文字，若有變動則將頁碼回歸第一頁
watch(searchText, () => {
  currentPage.value = 1;
});

// 篩選後的站點資料
const filtedUbikeStops = computed(() => {
  return uBikeStops.value.length === 0
    ? []
    : uBikeStops.value.filter(d => d.sna.includes(searchText.value));
});

// 排序後的站點資料
const sortedUbikeStops = computed(() => {
  const filtedStops = [...filtedUbikeStops.value];

  return isSortDesc.value
    ? filtedStops.sort((a, b) => b[currentSort.value] - a[currentSort.value])
    : filtedStops.sort((a, b) => a[currentSort.value] - b[currentSort.value]);
});


// 分頁後的站點資料
const slicedUbikeStops = computed(() => {
  const start = (currentPage.value - 1) * COUNT_OF_PAGE;
  const end =
    start + COUNT_OF_PAGE <= sortedUbikeStops.value.length
      ? start + COUNT_OF_PAGE
      : sortedUbikeStops.value.length;
  return sortedUbikeStops.value.slice(start, end);
});

// 總頁數
const totalPageCount = computed(() => {
  return Math.ceil(filtedUbikeStops.value.length / COUNT_OF_PAGE);
});

// 分頁的尾端
const pagerEnd = computed(() => {
  return totalPageCount.value <= PAGINATION_MAX
    ? totalPageCount.value
    : PAGINATION_MAX;
});

// 分頁的位移，用來確保目前的頁碼固定出現在中間
const pagerAddAmount = computed(() => {
  const tmp =
    totalPageCount.value <= PAGINATION_MAX
      ? 0
      : currentPage.value + 4 - pagerEnd.value;
  return tmp <= 0
    ? 0
    : totalPageCount.value - (PAGINATION_MAX + tmp) < 0
      ? totalPageCount.value - PAGINATION_MAX
      : tmp;
});

// 換頁
const setPage = page => {
  if (page < 1 || page > totalPageCount.value) {
    return;
  }
  currentPage.value = page;
};

function setCurrentSort(nValue) {
  currentSort.value = nValue;
}
function setSortDesc(nValue) {
  isSortDesc.value = nValue;
}
</script>

<template>
  <div class="app">
    <SearchVue :searchText="searchText" @setSearchText="setSearchText"></SearchVue>

    <uBikeTableVue :slicedUbikeStops="slicedUbikeStops" 
                  :searchText="searchText"
                  :currentSort="currentSort"
                  :isSortDesc="isSortDesc"
                  @setCurrentSort="setCurrentSort"
                  @setSortDesc="setSortDesc"></uBikeTableVue>
  </div>
  <!-- 頁籤 -->
  <PaginationVue @setPage="setPage"
              :currentPage="currentPage"
              :pagerAddAmount="pagerAddAmount"
              :totalPageCount="totalPageCount"
              :pagerEnd="pagerEnd">
  </PaginationVue>
</template>

<style lang="scss" scoped>
.app {
  padding: 1rem;
}
</style>