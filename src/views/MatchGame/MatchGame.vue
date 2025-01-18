<script setup>
import { ref, watch } from 'vue';
import Card from './components/Card.vue';

// 試完成以下功能：
//  1. 點擊卡片，卡片會翻開 (已完成)
//  2. 點擊兩張不同的卡片，卡片會翻回去 
//  3. 點擊兩張相同的卡片，卡片會消失
//  4. 當所有卡片都消失時，顯示「恭喜破關，再來一局？」的對話框，按下確定後重置遊戲
//  5. 將卡片獨立抽出為 Card.vue 元件

const cards = ref([]);
const openedCard = ref([]);

// 遊戲初始化，洗牌
const gameInit = () => {
  const numArr = [...new Array(16).keys()].map(i => ++i);
  numArr.sort(() => Math.random() - 0.5);
  cards.value = numArr.map(d => (d % 8) + 1);
  openedCard.value = [];
}

const lastOpenedCard = ref([]);

const clickHandler = (idx) => {    
  openedCard.value.push(idx);
  lastOpenedCard.value.push(idx);

  // 如果已經有兩張卡片被翻開，檢查是否相同
  if (lastOpenedCard.value.length === 2) {
    checkMatch();
    lastOpenedCard.value = [];
  }
  
  // 一秒後將 openedCard 清空 (牌面覆蓋回去)
  window.setTimeout(() => {
    openedCard.value = [];
  }, 1000);
}

const checkMatch = () => {
  const idx1 = lastOpenedCard.value[0];
  const idx2 = lastOpenedCard.value[1];
  if (cards.value[idx1] === cards.value[idx2]) {
    // 相同，消失
    window.setTimeout(() => {
      cards.value[idx1] = 0;
      cards.value[idx2] = 0;
    }, 1000);
  }
}

// Watch for changes in cards to check if all cards are gone
watch(cards, (newCards) => {
  if (newCards.every(card => card === 0)) {
    if (confirm("恭喜破關，再來一局？")) {
      gameInit();
    }
  }
}, {deep: true});

gameInit();

</script>

<template>
  <div class="bg-emerald-900 h-[100vh] w-full top-0 left-0 z-10 absolute">

    <div class="my-10 text-white text-center ">
      <div class="mb-8 text-5xl">五倍對對碰</div>
      <button 
        @click="gameInit"
        class="rounded font-bold bg-blue-500 mx-6 text-white py-2 px-4 hover:bg-blue-700">開始</button>
    </div>

    <div class="rounded-xl mx-auto border-4 mt-12 grid grid-flow-col p-10 w-[900px] gap-2 grid-rows-4">
      
      <Card 
        v-for="(n, idx) in cards"
        :key="idx"
        :value="n"
        :isOpen="openedCard.includes(idx)"
        :index="idx"
        @click="clickHandler"/>
      
    </div>
  </div>
</template>

<style scoped src="./MatchGame.css"></style>