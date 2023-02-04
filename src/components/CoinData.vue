<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <h1>ticker</h1>
    <div v-for="(ticker, index) in getTicker" :key="index">
      {{ ticker }}
    </div>
    <h1>Made By Actions</h1>
    <div v-for="user in users" :key="user.id">
      {{ user.id }} {{ user.name }} {{ user.address }}
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import { useAppStore } from "@/store/app";

const store = useAppStore();
const msg = ref("Welcome to my Vuex Store");
const getTicker = computed(() => {
  return store.getTicker;
});
const users = computed(() => {
  return store.ticker;
});
onMounted(() => {
  store.fetchData();
});
</script>
