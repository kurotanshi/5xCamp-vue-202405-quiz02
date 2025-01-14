<script setup>
import { ref, computed, watch } from 'vue';

const emits = defineEmits(['setPage']);

const props = defineProps({
  currentPage : Number,
  pagerAddAmount : Number,
  totalPageCount : Number,
  pagerEnd : Number,
})

function setPage(nValue){
  emits('setPage',nValue)
}
</script>

<template>
  <!-- 頁籤 -->
  <nav v-if="pagerEnd > 0">
    <ul class="pagination">

      <li @click.prevent="emits('setPage',1)" class="page-item">
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

<style lang="scss" scoped>
.pagination {
  display: flex;
  justify-content: center;
}
</style>