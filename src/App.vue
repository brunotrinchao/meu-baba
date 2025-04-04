<!-- eslint-disable prettier/prettier -->
<template>
  <v-app>
    <Preloader />
    <v-app-bar app elevation="0" light class="white">
      <!-- <div class="d-flex align-center"> -->
      <v-toolbar-title>Metas</v-toolbar-title>
      <!-- </div> -->

      <v-spacer></v-spacer>
      <v-row>
        <v-col></v-col>
        <v-col class="col-4">
          <SelectTimes />
        </v-col>
        <!-- <v-col class="col-1">
          <v-btn icon color="blue">
            <v-icon>mdi-share</v-icon>
          </v-btn>
        </v-col> -->
      </v-row>
    </v-app-bar>

    <v-main class="grey--lighten-3">
      <v-container fluid>
        <router-view />
      </v-container>
    </v-main>

    <v-footer padless>
      <small class="pa-4">
        <i>
          *Metas de pontuação com base na média das últimas edições e projeções do DP. de matemática da UFMG, afim de obter 99% de chances em cada cenário. 64
          PTS LIBERTADORES / 57 PTS PRÉ LIBERTADORES / 49 PTS SUL-AMERICANA. As metas podem sofrer alterações nos blocos finais conforme o cenário do campeonato
          atual.
        </i>
      </small>
    </v-footer>
  </v-app>
</template>
<!-- eslint-disable prettier/prettier -->
<script>
import { mapActions, mapGetters } from 'vuex';
import SelectTimes from '@/components/SelectTimes';
import Preloader from '@/components/preloader';
export default {
  name: 'App',

  components: { SelectTimes, Preloader },

  data: () => ({}),

  computed: {
    ...mapGetters(['teams'])
  },

  beforeMount() {
    this.indexTeams();
  },

  methods: {
    getLogo(logo) {
      return require(`@/assets/logos/${logo}`);
    },
    ...mapActions(['indexTeams'])
  }
};
</script>
<!-- eslint-disable prettier/prettier -->
<style>
.grey--lighten-3 {
  background-color: #eee;
}
</style>
