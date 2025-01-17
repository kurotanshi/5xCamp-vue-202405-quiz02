<script setup>
import { useGameStore } from '@/stores/gameStore.js';
import {storeToRefs} from "pinia";
import {ref, watch} from "vue";


const gameStore = useGameStore();
const { cards, openedCard } = storeToRefs(gameStore);

const { gameInit } = gameStore;
gameInit();
const endGame = ref(0);

watch(endGame, (value) => {
  if(endGame.value === 16){
    alert('恭喜破關，再來一局？');
    gameInit();
  }
})

const clickHandler = (idx ) => {
  openedCard.value.push(idx);

  if(openedCard.value.length === 2){
    if(cards.value[openedCard.value[0]] === cards.value[openedCard.value[1]]){
      setTimeout(() => {
        cards.value[openedCard.value[0]] = 0;
        cards.value[openedCard.value[1]] = 0;
        openedCard.value = [];
        endGame.value += 2;
        }, 1000);
    }else{
      setTimeout(() => {
        openedCard.value = [];
      }, 1000);
    }
  }
}
</script>
<template>
  <div
      v-for="(n, idx) in cards"
      class="flip-card"
      :class="{
          'open': openedCard.includes(idx)
        }"
      @click="clickHandler(idx,n)">
    <div class="flip-card-inner" v-if="cards[idx] > 0">
      <div class="flip-card-front"> {{n}}</div>
      <div class="flip-card-back">

        <img :src="`./img/cat-0${n}.jpg`" alt="">
      </div>
    </div>
  </div>
</template>

<style scoped src="./MatchGame.css"></style>