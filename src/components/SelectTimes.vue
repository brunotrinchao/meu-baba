<!-- eslint-disable prettier/prettier -->
<template>
  <v-select v-model="selectedTeam" :items="teams" label="Selecione um time" outlined dense single-line hide-details disabled>
    <template v-slot:selection="{ item }">
      <v-avatar tile size="32" class="mr-2">
        <img :src="getLogo(item.logo)" alt="logo" />
      </v-avatar>
      <span class="team-name" v-text="item.name"></span>
    </template>
    <template v-slot:item="{ item }">
      <v-list-item-avatar tile>
        <img :src="getLogo(item.logo)" alt="logo" />
      </v-list-item-avatar>
      <v-list-item-content>
        <v-list-item-title v-html="item.name"></v-list-item-title>
      </v-list-item-content>
    </template>
  </v-select>
</template>
<!-- eslint-disable prettier/prettier -->
<script>
import { times } from '@/db/times.js';

export default {
  data() {
    return {
      selectedTeam: {
        id: 'bahia',
        name: 'Bahia',
        logo: 'bahia.svg'
      },
      teams: times
    };
  },

  mounted() {
    console.log({ AQUI: this.teams });
  },

  methods: {
    getLogo(logo) {
      return require(`@/assets/logos/${logo}`);
    }
  }
};
</script>
<!-- eslint-disable prettier/prettier -->
<style scoped>
.team-name {
  font-weight: bold;
}
</style>
