<template>
  <v-app id="inspire">
    <v-app-bar app color="white" flat>
      <v-container class="py-0 fill-height">
        <v-avatar class="mr-10" color="black darken-1" size="32"
          ><v-icon dark> mdi-currency-btc </v-icon></v-avatar
        >

        <h1>VBM Project</h1>

        <v-spacer></v-spacer>

        <v-responsive max-width="260"> </v-responsive>
      </v-container>
    </v-app-bar>

    <v-main class="grey lighten-3">
      <v-container>
        <v-row>
          <v-col cols="2">
            <v-sheet rounded="lg">
              <v-list color="transparent">
                <v-text-field
                  label="Filtrar"
                  auto-grow
                  variant="outlined"
                  rows="1"
                  row-height="15"
                  clearable=""
                ></v-text-field>

                <v-list-item
                  v-for="(coin, index, key) in coins"
                  :key="index"
                  link
                >
                  <v-list-item-content>
                    <v-list-item-title
                      @click="fetchTrades(Object.keys(coins)[key], coin)"
                    >
                      {{ coin }}
                    </v-list-item-title>
                  </v-list-item-content>
                </v-list-item>

                <v-divider class="my-2"></v-divider>

                <v-list-item link color="grey lighten-4">
                  <v-list-item-content>
                    <v-list-item-title> Refresh </v-list-item-title>
                  </v-list-item-content>
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
    links: ["Dashboard", "Messages", "Profile", "Updates"],
    coins: {
      WLUNA: "Wrapped LUNA Token",
      XLM: "Stellar",
      XRP: "XRP",
      XTZ: "Tezos",
      YBOFT: "BSC Young Boys",
      YFI: "yearn.finance",
      YGG: "Yield Guild Games",
      ZRX: "0x",
      ONS05BRL: "None",
      CSH08BRL: "None",
      P12BRL: "None",
      FTBRL: "None",
    },
  }),
  setup() {
    const appStore = useAppStore();
    return { fetchTrades: appStore.fetchTrades };
  },
  computed: {
    theme() {
      return this.$vuetify.theme.dark ? "dark" : "light";
    },
  },
};
</script>
