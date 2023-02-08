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
  let mostRecentDate = list[0]; // earliest possible date
  let mostOldestDate = list[0];

  list.forEach((item) => {
    if (item.date > mostRecentDate.date) {
      mostRecentDate = item;
    }

    if (item.date < mostOldestDate.date) {
      mostOldestDate = item;
    }
  });

  return {
    mostRecentDate: mostRecentDate,
    mostOldestDate: mostOldestDate,
  };
}

export const useAppStore = defineStore("app", {
  state: () => ({
    trades: [],
    selectedCoin: "",
    coinsList: coins,
    sumTradesBRL: 0,
    USDtoBRL: [],
    latestTrade: {},
    oldestTrade: {},
  }),
  getters: {
    getTrades(state) {
      return state.trades;
    },
    getCoinsList(state) {
      return state.coinsList;
    },
    getSumTradesBRL(state) {
      const calcBRL = state.sumTradesBRL * state.USDtoBRL.high;
      return formatterBRL.format(calcBRL);
    },
    getSelectedCoin(state) {
      return state.selectedCoin;
    },
  },
  actions: {
    async fetchTrades(coin, sinceDate, untilDate) {
      try {
        let dataTrades = [];

        if (sinceDate) {
          const sinceEraUnix = Math.floor(sinceDate.getTime() / 1000);
          const untilEraUnix = Math.floor(untilDate.getTime() / 1000);
          dataTrades = await axios.get(
            `https://www.mercadobitcoin.net/api/${coin.key}/trades/${sinceEraUnix}/${untilEraUnix}/`
          );
        } else {
          dataTrades = await axios.get(
            `https://www.mercadobitcoin.net/api/${coin.key}/trades/`
          );
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

          //format values to USD monetary value
          element.totalBRL = formatterBRL.format(element.total);
          element.priceBRL = formatterBRL.format(element.price);

          return element;
        });

        this.trades = dataTrades.data;

        this.sumTradesBRL = this.trades.reduce((acc, current) => {
          return acc + current.total;
        }, 0);

        this.selectedCoin = coin;

        const findDatesOfPeriod = findMostRecentandOldestDate(this.trades);

        this.latestTrade = findDatesOfPeriod[0];
        this.oldestTrade = findDatesOfPeriod[1];
      } catch (error) {
        alert(error);
        console.log(error);
      }
    },
    async fetchUSDtoBRL() {
      try {
        const data = await axios.get(
          `https://economia.awesomeapi.com.br/json/USD-BRL`
        );
        this.USDtoBRL = data.data[0];
      } catch (error) {
        alert(error);
        console.log(error);
      }
    },
  },
});
