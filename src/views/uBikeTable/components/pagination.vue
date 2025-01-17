<template>
  <nav v-if="pagerEnd > 0">
    <ul class="pagination">
      <li @click.prevent="setPage(1)" class="page-item">
        <a class="page-link" href>第一頁</a>
      </li>
      <li @click.prevent="setPage(currentPage - 1)" class="page-item">
        <a class="page-link" href>&lt;</a>
      </li>
      <li v-for="i in pagerEnd" :class="{ active: i + pagerAddAmount === currentPage }" :key="i"
        @click.prevent="setPage(i + pagerAddAmount)" class="page-item">
        <a class="page-link" href>{{ i + pagerAddAmount }}</a>
      </li>
      <li @click.prevent="setPage(currentPage + 1)" class="page-item">
        <a class="page-link" href>&gt;</a>
      </li>
      <li @click.prevent="setPage(totalPageCount)" class="page-item">
        <a class="page-link" href>最末頁</a>
      </li>
    </ul>
  </nav>
</template>

<script setup>
import { computed, ref } from 'vue';

const props = defineProps({
  currentPage: Number,
  totalPageCount: Number,
  updatePage: Function
});

const PAGINATION_MAX = 10;

// 分頁的尾端
const pagerEnd = computed(() => {
  return props.totalPageCount <= PAGINATION_MAX
    ? props.totalPageCount
    : PAGINATION_MAX;
});

// 分頁的位移，用來確保目前的頁碼固定出現在中間
const pagerAddAmount = computed(() => {
  const tmp =
    props.totalPageCount <= PAGINATION_MAX
      ? 0
      : props.currentPage + 4 - pagerEnd.value;
  return tmp <= 0
    ? 0
    : props.totalPageCount - (PAGINATION_MAX + tmp) < 0
      ? props.totalPageCount - PAGINATION_MAX
      : tmp;
});

const setPage = (page) => {
  if (page < 1 || page > props.totalPageCount) {
    return;
  }
  props.updatePage(page);
};
</script>

<style scoped>
.pagination {
  display: flex;
  justify-content: center;
}
</style>