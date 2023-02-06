// Utilities
import { defineStore } from "pinia";
import axios from "axios";
import coins from "../data/coins.json";

export const useAppStore = defineStore("app", {
  state: () => ({
    trades: [],
    selectedCoin: "",
    coinsList: coins,
  }),
  getters: {
    getTrades(state) {
      return state.trades;
    },
    getCoinsList(state) {
      return state.coinsList;
    },
  },
  actions: {
    async fetchTrades(coin) {
      try {
        const data = await axios.get(
          `https://www.mercadobitcoin.net/api/${coin.key}/trades/`
        );
        data.data.forEach((element) => {
          const date = new Date(element.date * 1000);
          element.date = `${date}`;
          return element;
        });
        this.trades = data.data;
        this.selectedCoin = coin;
      } catch (error) {
        alert(error);
        console.log(error);
      }
    },
    async fetchTradesByDate(coin, sinceDate, untilDate) {
      const sinceEraUnix = Math.floor(sinceDate.getTime() / 1000);
      const untilEraUnix = Math.floor(untilDate.getTime() / 1000);
      try {
        const data = await axios.get(
          `https://www.mercadobitcoin.net/api/${coin.key}/trades/${sinceEraUnix}/${untilEraUnix}/`
        );

        data.data.forEach((element) => {
          const date = new Date(element.date * 1000);
          element.date = `${date}`;
          return element;
        });
        console.log(data.data);
        this.trades = data.data;
      } catch (error) {
        alert(error);
        console.log(error);
      }
    },
  },
});
