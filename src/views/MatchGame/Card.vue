<script setup>
import { useGameStore } from '@/stores/gameStore.js';
import {storeToRefs} from "pinia";


const gameStore = useGameStore();
const { cards, openedCard } = storeToRefs(gameStore);

const { gameInit } = gameStore;
gameInit();

const clickHandler = (idx ) => {
  openedCard.value.push(idx);
  console.log(openedCard.value);

  if(openedCard.value.length === 2){
    if(cards.value[openedCard.value[0]] === cards.value[openedCard.value[1]]){
      setTimeout(() => {
        cards.value[openedCard.value[0]] = 0;
        cards.value[openedCard.value[1]] = 0;
        openedCard.value = [];
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