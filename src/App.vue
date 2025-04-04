<!-- eslint-disable prettier/prettier -->
<template>
  <v-app>
    <Preloader />
    <v-app-bar app elevation="0" light class="white">
      <!-- <div class="d-flex align-center"> -->
      <v-toolbar-title>
        <img :src="getLogo()" height="30" />
        {{ newTitle }} | {{ getTeamName }}
      </v-toolbar-title>
      <!-- </div> -->

      <v-spacer></v-spacer>
      <v-row>
        <v-col></v-col>
        <v-col class="col-4">
          <SelectTimes />
        </v-col>
      </v-row>
    </v-app-bar>

    <v-main class="grey--lighten-3">
      <v-container fluid class="py-5">
        <router-view />
      </v-container>
    </v-main>

    <v-footer padless>
      <v-card flat class="text-center" width="100%">
        <v-card-text class="pt-4">
          *Metas de pontuação com base na média das últimas edições e projeções do DP. de matemática da UFMG, afim de obter 99% de chances em cada cenário. 64
          PTS LIBERTADORES / 57 PTS PRÉ LIBERTADORES / 49 PTS SUL-AMERICANA. As metas podem sofrer alterações nos blocos finais conforme o cenário do campeonato
          atual.
        </v-card-text>

        <v-divider></v-divider>

        <v-card-text>
          {{ new Date().getFullYear() }} —
          <strong>Bruno Trinchão</strong>
          <v-btn v-for="item in links" :key="item.icon" class="mx-4" :href="item.href" icon target="_blank" rel="noopener">
            <v-icon size="24px">
              {{ item.icon }}
            </v-icon>
          </v-btn>
        </v-card-text>
      </v-card>
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

  data: () => ({
    newTitle: `Meu Baba © ${process.env.VUE_APP_YEAR_ACTUAL}`,
    links: [
      {
        icon: 'mdi-email',
        href: 'mailto:contato@meubaba.com'
      },
      {
        icon: 'mdi-twitter',
        href: 'https://x.com/brunotrinchao'
      },
      {
        icon: 'mdi-linkedin',
        href: 'https://www.linkedin.com/in/bruno-trinchao/'
      }
    ]
  }),

  computed: {
    getTeamName() {
      return this.teamSelected.name ?? null;
    },
    ...mapGetters(['teams', 'teamSelected'])
  },

  beforeMount() {
    this.indexTeams();
  },

  mounted() {
    document.title = this.newTitle;
  },

  methods: {
    getLogo() {
      return require(`@/assets/logo.png`);
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
