// Utilities
import { defineStore } from "pinia";
import axios from "axios";
import coins from "../data/coins.json";

const formatData = (number) => {
  return ("0" + number).substr(-2);
};

const formatterBRL = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "BRL",
});

function findMostRecentandOldestDate(list) {
  let latestTrade = list[0]; // earliest possible date
  let oldestTrade = list[0];

  list.forEach((item) => {
    if (item.date < latestTrade.date) {
      latestTrade = item;
    }

    if (item.date > oldestTrade.date) {
      oldestTrade = item;
    }
  });

  return {
    latestTrade,
    oldestTrade,
  };
}

export const useAppStore = defineStore("app", {
  state: () => ({
    trades: [],
    selectedCoin: "",
    coinsList: coins,
    sumTradesBRL: 0,
    latestTrade: "",
    oldestTrade: "",
  }),
  getters: {
    getTrades(state) {
      return state.trades;
    },
    getCoinsList(state) {
      return state.coinsList;
    },
    getSumTradesBRL(state) {
      return formatterBRL.format(state.sumTradesBRL);
    },
    getSelectedCoin(state) {
      return state.selectedCoin;
    },
    getLatestTrade(state) {
      return state.latestTrade;
    },
    getOldestTrade(state) {
      return state.oldestTrade;
    },
  },
  actions: {
    async fetchTrades(coin, sinceDate, untilDate) {
      try {
        let dataTrades = [];

        if (sinceDate) {
          const sinceEraUnix = Math.floor(sinceDate / 1000);
          const untilEraUnix = Math.floor(untilDate / 1000);
          dataTrades = await axios.get(
            `https://www.mercadobitcoin.net/api/${coin.key}/trades/${sinceEraUnix}/${untilEraUnix}/`
          );
        } else {
          dataTrades = await axios.get(
            `https://www.mercadobitcoin.net/api/${coin.key}/trades/`
          );
        }

        if (dataTrades.data.length === 0) {
          throw new Error("Coin not found in database.");
        }

        dataTrades.data.forEach((element) => {
          //format date
          const date = new Date(element.date * 1000);
          const formatHours = formatData(date.getHours());
          const formatMinutes = formatData(date.getMinutes());
          const formatSeconds = formatData(date.getSeconds());
          const formatDay = formatData(date.getDate());
          const formatMouth = formatData(date.getMonth() + 1);
          const dateString = ` ${formatDay}/${formatMouth}/${date.getFullYear()} - ${formatHours}:${formatMinutes}:${formatSeconds}`;
          element.dateStr = dateString;

          //calc total per row
          const totalPerRow = element.amount * element.price;
          element.total = totalPerRow;

          //format values to BRL monetary value
          element.totalBRL = formatterBRL.format(element.total);
          element.priceBRL = formatterBRL.format(element.price);

          return element;
        });
        this.trades = dataTrades.data;

        // sum all trades and calculate total
        this.sumTradesBRL = this.trades.reduce((acc, current) => {
          return acc + current.total;
        }, 0);

        //selected coin
        this.selectedCoin = coin;

        // find the dates of the filtered period
        const findDatesOfPeriod = findMostRecentandOldestDate(this.trades);
        this.latestTrade = findDatesOfPeriod.latestTrade;
        this.oldestTrade = findDatesOfPeriod.oldestTrade;
      } catch (error) {
        console.log(error);
        alert(error);
      }
    },
  },
});
