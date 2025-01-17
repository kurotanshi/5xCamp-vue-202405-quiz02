<script setup>
import { ref, computed } from 'vue';

const props = defineProps({
  uBikeStops: Array,
  searchText: String,
  currentPage: Number,
  COUNT_OF_PAGE: Number
});

// 目前的排序選項
const currentSort = ref('sno');
// 是否為降冪排序
const isSortDesc = ref(false);

// 關鍵字 Highlight
const keywordsHighlight = (text, keyword) => {
  if (keyword === '') return text;
  const reg = new RegExp(keyword, 'gi');
  return text.replace(reg, `<span style="color: red;">${keyword}</span>`);
};

// 篩選後的站點資料
const filtedUbikeStops = computed(() => {
  return props.uBikeStops.length === 0
    ? []
    : props.uBikeStops.filter(d => d.sna.includes(props.searchText));
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
  const start = (props.currentPage - 1) * props.COUNT_OF_PAGE;
  const end =
    start + props.COUNT_OF_PAGE <= sortedUbikeStops.value.length
      ? start + props.COUNT_OF_PAGE
      : sortedUbikeStops.value.length;
  return sortedUbikeStops.value.slice(start, end);
});

// 指定排序
const setSort = sortType => {
  if (sortType === currentSort.value) {
    isSortDesc.value = !isSortDesc.value;
  } else {
    currentSort.value = sortType;
    isSortDesc.value = false;
  }
};
</script>

<template>
  <table class="table table-striped">
    <thead>
      <tr>
        <th @click="setSort('sno')">
          #
          <span v-show="currentSort === 'sno'">
            <i class="fa" :class="isSortDesc ? 'fa-sort-desc' : 'fa-sort-asc'" aria-hidden="true"></i>
          </span>
        </th>
        <th>
          場站名稱
        </th>
        <th>
          場站區域
        </th>
        <th @click="setSort('available_return_bikes')" class="pointer">
          目前可用車輛
          <span v-show="currentSort === 'available_return_bikes'">
            <i class="fa" :class="isSortDesc ? 'fa-sort-desc' : 'fa-sort-asc'" aria-hidden="true"></i>
          </span>
        </th>
        <th @click="setSort('total')" class="pointer">
          總停車格
          <span v-show="currentSort === 'total'">
            <i class="fa" :class="isSortDesc ? 'fa-sort-desc' : 'fa-sort-asc'" aria-hidden="true"></i>
          </span>
        </th>
        <th>
          資料更新時間
        </th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="s in slicedUbikeStops" :key="s.sno">
        <td>{{ s.sno }}</td>
        <td v-html="keywordsHighlight(s.sna, props.searchText)"></td>
        <td>{{ s.sarea }}</td>
        <td>{{ s.available_return_bikes }}</td>
        <td>{{ s.total }}</td>
        <td>{{ (s.mday) }}</td>
      </tr>
    </tbody>
  </table>
</template>

<style scoped>
.pointer {
  cursor: pointer;
}
</style>