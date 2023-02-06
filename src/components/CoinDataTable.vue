<template>
  <v-container fill-height class="hello" :color="red">
    <h1 class="text-center">Trades</h1>

    <v-card class="mx-auto" width="90%" prepend-icon="mdi-hand-coin ">
      <template v-slot:title> {{ getCoin.name }} </template>

      <v-row class="mx-auto" width="90%">
        <v-col cols="4">
          De: <Datepicker v-model="dataFrom"></Datepicker>
        </v-col>
        <v-col cols="4">
          Até: <Datepicker v-model="dataTo"></Datepicker>
        </v-col>
        <v-col class="d-flex align-end mb-1">
          <v-btn class="d-flex" @click="handleFilterDate">Filtrar</v-btn>
        </v-col>
      </v-row>

      <v-container>
        <v-data-table
          v-if="getTrades"
          :headers="headers"
          :items="getTrades"
          :items-per-page="10"
          class="elevation-1"
        >
        </v-data-table>
      </v-container>
    </v-card>

    <h1 class="text-center"></h1>
  </v-container>
</template>

<script setup>
import { onMounted, computed } from "vue";
import { useAppStore } from "@/store/app";
import Datepicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";
import { ref } from "vue";
import headers from "../data/tableHeaders.json";

const store = useAppStore();

const getTrades = computed(() => {
  return store.getTrades;
});

const getCoin = computed(() => {
  return store.selectedCoin;
});

const dataFrom = ref(new Date());

const dataTo = ref(new Date());

const handleFilterDate = () => {
  store.fetchTradesByDate(store.selectedCoin, dataFrom.value, dataTo.value);
};

onMounted(() => {
  store.fetchTrades({ key: "ETH", name: "Etherium" });
});
</script>
