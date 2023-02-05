<template>
  <v-container fill-height class="hello">
    <h1 class="text-center">Trades</h1>
    <v-card class="mx-auto" width="90%" prepend-icon="mdi-ethereum ">
      <template v-slot:title> {{ getCoinName }} </template>

      <v-card-text>
        <v-data-table
          v-if="getTrades"
          :headers="headers"
          :items="getTrades"
          :items-per-page="5"
          class="elevation-1"
        ></v-data-table>
      </v-card-text>
    </v-card>
    <h1 class="text-center"></h1>
  </v-container>
</template>

<script setup>
import { onMounted, computed } from "vue";
import { useAppStore } from "@/store/app";

const store = useAppStore();
const getTrades = computed(() => {
  return store.getTrades;
});
const getCoinName = computed(() => {
  return store.coinName;
});

const headers = [
  {
    title: "ID",
    align: "start",
    sortable: false,
    key: "tid",
  },
  { title: "Amount", key: "amount" },
  { title: "Date", key: "date" },
  { title: "Price", key: "price" },
  { title: "Type", key: "type" },
];
onMounted(() => {
  store.fetchTrades("ETH", "Etherium");
});
</script>
