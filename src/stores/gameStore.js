import {defineStore} from 'pinia';
import {ref} from "vue";

export const useGameStore = defineStore('game',() =>{
    const cards = ref([]);
    const openedCard = ref([]);
    const gameInit = () => {
        const numArr = [...new Array(16).keys()].map(i => ++i);
        numArr.sort(() => Math.random() - 0.5);
        cards.value = numArr.map(d => (d % 8) + 1);
        openedCard.value = [];
    }
    return {cards, openedCard, gameInit}
})