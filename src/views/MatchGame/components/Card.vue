<template>
  <div 
    class="flip-card"
    :class="{ 'open': isOpen }"
    @click="handleClick">
    <div class="flip-card-inner" v-if="value > 0">
      <div class="flip-card-front">{{ value }}</div>
      <div class="flip-card-back">
        <img :src="`./img/cat-0${value}.jpg`" alt="">
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue';

const props = defineProps({
  value: Number,
  isOpen: Boolean,
  index: Number
});

console.log(props.value, props.isOpen, props.index);

const emits = defineEmits(['click']);

const handleClick = () => {
  emits('click', props.index);
};
</script>

<style scoped  src="../MatchGame.css">
/* Add your card-specific styles here */
</style>