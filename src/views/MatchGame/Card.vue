<script>
import { ref } from 'vue';
</script>
<template>
  <div
      v-for="(n, idx) in cards"
      class="flip-card"
      :class="{
          'open': openedCard.includes(idx)
        }"
      @click="clickHandler(idx)">
    <div class="flip-card-inner" v-if="cards[idx] > 0">
      <div class="flip-card-front"> {{n}}</div>
      <div class="flip-card-back">

        <img :src="`./img/cat-0${n}.jpg`" alt="">
      </div>
    </div>
  </div>
</template>