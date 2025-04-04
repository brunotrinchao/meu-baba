<!-- eslint-disable prettier/prettier -->
<template>
  <v-list class="pa-0" v-if="group.length">
    <v-list-item v-for="(match, matchIndex) in group" :key="matchIndex" :class="calcResultMatch(match)" :id="match.id">
      <v-row class="align-content-space-between">
        <v-col cols="2" class="pa-0">
          <v-icon>{{ match?.round }}.</v-icon>
        </v-col>
        <v-col cols="4" class="align-center text-center pa-0 align-content-center align-self-center">
          <img :id-team="match?.match.home.id" :src="getLogo(match?.match.home.logo)" alt="Home Logo" class="team-logo align-center text-center" height="30" />
        </v-col>
        <v-col cols="2" class="align-center text-center pa-0"><v-icon color="gray">mdi-alpha-x</v-icon></v-col>
        <v-col cols="4" class="align-center text-center pa-0 align-content-center align-self-center">
          <img :id-team="match?.match.away.id" :src="getLogo(match?.match.away.logo)" alt="Home Logo" class="team-logo align-center text-center" height="30" />
        </v-col>
      </v-row>
    </v-list-item>
    <v-list-item v-if="group.length < 6"></v-list-item>
    <v-list-item v-if="group.length < 6"></v-list-item>
    <v-list-item v-if="group.length < 6"></v-list-item>
    <v-list-item v-if="group.length < 6"></v-list-item>
  </v-list>
</template>
<!-- eslint-disable prettier/prettier -->
<script>
export default {
  props: {
    index: {
      type: Number,
      required: true
    },
    group: {
      type: Array,
      required: true
    },
    calcResultMatch: {
      type: Function,
      required: true
    },
    getLogo: {
      type: Function,
      required: true
    }
  },
  data() {
    return {};
  },

  mounted() {
    console.log({ carregou: this.group });
  },

  methods: {}
};
</script>
