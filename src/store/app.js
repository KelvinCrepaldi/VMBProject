// Utilities
import { defineStore } from "pinia";
import axios from "axios";

export const useAppStore = defineStore("app", {
  state: () => ({
    trades: [],
    coinName: "",
  }),
  getters: {
    getTrades(state) {
      return state.trades;
    },
  },
  actions: {
    async fetchTrades(key, coin) {
      try {
        const data = await axios.get(
          `https://www.mercadobitcoin.net/api/${key}/trades/`
        );
        this.trades = data.data;
        this.coinName = coin;
      } catch (error) {
        alert(error);
        console.log(error);
      }
    },
  },
});
