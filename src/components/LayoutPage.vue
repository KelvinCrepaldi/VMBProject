<template>
  <v-app id="inspire" class="bg-bgcolor">
    <v-app-bar app flat class="bg-containers">
      <v-container class="py-0 fill-height">
        <v-avatar class="mr-10" color="green darken-1" size="40"
          ><v-icon dark> mdi-currency-btc </v-icon></v-avatar
        >

        <h1>BitcoinMarket.vue</h1>

        <v-spacer></v-spacer>
        <LocaleChanger></LocaleChanger>

        <v-responsive max-width="260"> </v-responsive>
      </v-container>
    </v-app-bar>

    <v-main class="lighten-3">
      <v-container>
        <v-row>
          <v-col cols="2">
            <v-sheet rounded="lg">
              <v-text-field
                class="bg-containers rounded-lg"
                v-bind:label="$t('message.search')"
                auto-grow
                variant="filled"
                rows="1"
                row-height="15"
                v-model="searchValue"
                append-inner-icon="mdi-magnify"
              ></v-text-field>
              <v-list class="bg-containers rounded-lg" max-height="70vh">
                <v-list-item v-for="(coin, index) in coinsList" :key="index">
                  <v-btn class="w-100 my-1" @click="fetchTrades(coin)">
                    {{ coin.key }}
                  </v-btn>
                </v-list-item>
              </v-list>
            </v-sheet>
          </v-col>

          <v-col>
            <v-sheet min-height="70vh" rounded="lg">
              <DataTable></DataTable>
            </v-sheet>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import DataTable from "./DataTable.vue";
import { useAppStore } from "@/store/app";
import LocaleChanger from "./LocaleChanger.vue";

export default {
  name: "LayoutPage",
  components: { DataTable, LocaleChanger },
  data: () => ({
    searchValue: "",
  }),
  setup() {
    const appStore = useAppStore();
    return {
      fetchTrades: appStore.fetchTrades,
      getCoinsList: appStore.getCoinsList,
    };
  },
  computed: {
    coinsList() {
      if (this.searchValue.trim().length > 0) {
        return this.getCoinsList.filter((coin) =>
          coin.key.includes(this.searchValue.trim().toUpperCase())
        );
      }
      return this.getCoinsList;
    },
  },
};
</script>

<style>
/* width */
::-webkit-scrollbar {
  width: 15px;
}

/* Track */
::-webkit-scrollbar-track {
  background: #0000002d;
  border-radius: 30px;
}

/* Handle */
::-webkit-scrollbar-thumb {
  background: #383838;
  border-radius: 30px;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: #000000;
}
</style>
