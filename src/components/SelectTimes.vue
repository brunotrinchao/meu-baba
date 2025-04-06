<!-- eslint-disable prettier/prettier -->
<template>
  <v-select v-model="selected" :items="teamsList" label="Selecione um time" outlined dense single-line hide-details>
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
import { mapActions, mapGetters } from 'vuex';
import { EventBus } from '@/event-bus';
export default {
  data() {
    return {
      selected: {},
      teamsList: []
    };
  },

  watch: {
    teams: {
      handler(newVal) {
        this.teamsList = newVal || [];
      },
      immediate: true
    },
    selected: {
      handler(newVal) {
        this.selectTeam(newVal);
        EventBus.$emit('drawer-close');
      }
    },
    teamSelected: {
      handler(newVal) {
        if (newVal.id) {
          this.selected = newVal;
        }
      },
      immediate: true
    }
  },

  computed: {
    ...mapGetters(['teams', 'teamSelected'])
  },

  methods: {
    getLogo(logo) {
      return require(`@/assets/logos/${logo}`);
    },
    ...mapActions(['selectTeam'])
  }
};
</script>
<!-- eslint-disable prettier/prettier -->
<style scoped>
.team-name {
  font-weight: bold;
}
</style>
