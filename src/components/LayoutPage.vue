<template>
  <v-app id="inspire">
    <v-app-bar app color="white" flat>
      <v-container class="py-0 fill-height">
        <v-avatar class="mr-10" color="green darken-1" size="32"
          ><v-icon dark> mdi-currency-btc </v-icon></v-avatar
        >

        <h1>VBM Project</h1>

        <v-spacer></v-spacer>

        <v-responsive max-width="260"> </v-responsive>
      </v-container>
    </v-app-bar>

    <v-main class="lighten-3">
      <v-container>
        <v-row>
          <v-col cols="2">
            <v-sheet rounded="lg">
              <v-list color="transparent">
                <v-text-field
                  label="Buscar..."
                  auto-grow
                  variant="outlined"
                  rows="1"
                  row-height="15"
                  clearable=""
                  v-model="searchValue"
                ></v-text-field>
                <v-list-item
                  v-for="(coin, index) in coinsList"
                  :key="index"
                  link
                >
                  <v-list-item-content>
                    <v-list-item-title @click="fetchTrades(coin)">
                      {{ coin.key }}
                    </v-list-item-title>
                  </v-list-item-content>
                  <v-divider class="my-2"></v-divider>
                </v-list-item>
              </v-list>
            </v-sheet>
          </v-col>

          <v-col>
            <v-sheet min-height="70vh" rounded="lg">
              <CoinDataTable></CoinDataTable>
            </v-sheet>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import CoinDataTable from "./CoinDataTable.vue";
import { useAppStore } from "@/store/app";

export default {
  name: "LayoutPage",
  components: { CoinDataTable },
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
