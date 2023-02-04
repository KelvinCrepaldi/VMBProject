// Utilities
import { defineStore } from "pinia";
import axios from "axios";

export const useAppStore = defineStore("app", {
  state: () => ({
    ticker: [],
  }),
  getters: {
    getTicker(state) {
      return state.ticker;
    },
  },
  actions: {
    async fetchData() {
      try {
        const data = await axios.get(
          "https://www.mercadobitcoin.net/api/BTC/ticker/"
        );
        this.ticker = data.data;
      } catch (error) {
        alert(error);
        console.log(error);
      }
    },
  },
});
