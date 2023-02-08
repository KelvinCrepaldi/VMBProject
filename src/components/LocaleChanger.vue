<template>
  <v-sheet class="bg-transparent">
    <v-select
      v-model="$i18n.locale"
      :items="['pt', 'en']"
      label="locale"
      variant="underlined"
    ></v-select>
  </v-sheet>
</template>

<script>
export default {
  name: "LocaleChanger",
  data() {
    return { langs: ["pt", "en"] };
  },
};
</script>
