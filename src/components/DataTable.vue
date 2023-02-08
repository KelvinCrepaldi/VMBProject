<template>
  <v-container fill-height class="hello bg-containers rounded-lg">
    <h1 class="text-center">Trades</h1>

    <v-card class="mx-auto" width="90%" prepend-icon="mdi-hand-coin">
      <template v-slot:title> {{ getSelectedCoin.name }} </template>

      <v-row class="mx-auto text-center">
        <p class="w-100 text-center">
          {{
            $t("message.tradePeriod", {
              date1: getLatestTrade.dateStr,
              date2: getOldestTrade.dateStr,
              sumValue: getSumTradesBRL,
            })
          }}
        </p>
        <p class="w-100 text-center">
          {{ $t("message.limitMessage") }}
        </p>
      </v-row>

      <v-row class="mx-auto mb-1" width="90%">
        <v-col cols="4">
          {{ $t("message.from") }}
          <Datepicker v-model="dataFrom" :max-date="new Date()"></Datepicker>
        </v-col>
        <v-col cols="4">
          {{ $t("message.to") }}
          <Datepicker v-model="dataTo" :max-date="new Date()"></Datepicker>
        </v-col>
        <v-col class="d-flex align-end mb-1">
          <v-btn class="d-flex" width="150" @click="handleFilterDate"
            >{{ $t("message.filter") }}
          </v-btn>
        </v-col>
      </v-row>

      <v-container>
        <v-data-table
          :sort-by="sortBy"
          v-if="getTrades"
          :headers="headers"
          :items="getTrades"
          :items-per-page="10"
          class="elevation-1"
          multi-sort
          density="compact"
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

const getSelectedCoin = computed(() => {
  return store.getSelectedCoin;
});

const getSumTradesBRL = computed(() => {
  return store.getSumTradesBRL;
});

const getLatestTrade = computed(() => {
  return store.getLatestTrade;
});
const getOldestTrade = computed(() => {
  return store.getOldestTrade;
});

const sortBy = [{ key: "dateStr", order: "desc" }];

const dataFrom = ref(Date.now());

const dataTo = ref(Date.now());

const handleFilterDate = () => {
  store.fetchTrades(store.selectedCoin, dataFrom.value, dataTo.value);
};

onMounted(() => {
  store.fetchTrades({ key: "ETH", name: "Ethereum" });
});
</script>
