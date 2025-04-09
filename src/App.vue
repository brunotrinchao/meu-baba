<!-- eslint-disable prettier/prettier -->
<template>
  <v-app>
    <Preloader />
    <v-app-bar app elevation="0" light class="white">
      <!-- <div class="d-flex align-center"> -->
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title>
        <img :src="getLogo()" height="30" />
        {{ newTitle }} |
        <span v-if="$vuetify.breakpoint.mdAndUp">{{ getTeamName }}</span>
        <span v-else>
          <img :src="getTeamLogo()" height="30" />
        </span>
      </v-toolbar-title>
      <!-- </div> -->

      <v-spacer></v-spacer>
      <v-row v-if="$vuetify.breakpoint.mdAndUp">
        <v-spacer></v-spacer>
        <v-col class="col-md-4 col-sm-12">
          <SelectTimes />
        </v-col>
      </v-row>
    </v-app-bar>

    <v-main class="grey--lighten-3">
      <v-container fluid class="py-5" ref="targetShare">
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

          <!-- <v-btn icon class="mx-4" @click="shareMeta">
            <v-icon>mdi-share</v-icon>
          </v-btn> -->
        </v-card-text>
      </v-card>
    </v-footer>

    <v-navigation-drawer v-model="drawer" absolute temporary class="blue-grey lighten-5">
      <v-list-item>
        <v-list-item-content v-if="$vuetify.breakpoint.mdAndDown">
          <SelectTimes v-if="getTeamSelected" />
        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>
      <v-list-item v-for="item in items" :key="item.title" link :to="item.page">
        <v-list-item-icon>
          <v-icon>{{ item.icon }}</v-icon>
        </v-list-item-icon>

        <v-list-item-content>
          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <!-- <v-list dense>
        <v-list-item
          v-for="item in items"
          :key="item.title"
          link
        >
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list> -->
    </v-navigation-drawer>
  </v-app>
</template>
<!-- eslint-disable prettier/prettier -->
<script>
import { mapActions, mapGetters } from 'vuex';
import SelectTimes from '@/components/SelectTimes';
import Preloader from '@/components/preloader';
import html2canvas from 'html2canvas';
import { EventBus } from '@/event-bus';
export default {
  name: 'App',

  components: { SelectTimes, Preloader },

  data: () => ({
    drawer: null,
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
    ],
    imageMeta: null,
    items: [
      { title: 'Home', icon: 'mdi-home', page: 'home' },
      { title: 'Metas por bloco', icon: 'mdi-view-dashboard', page: 'metas' },
      { title: 'Evolução dos times', icon: 'mdi-chart-areaspline', page: 'evolucao' }
    ]
  }),

  computed: {
    getTeamName() {
      return this.teamSelected.name ?? null;
    },
    getTeamSelected() {
      return this.teamSelected.id ?? null;
    },
    // showSelectTeams(){
    //   return this.$router
    // },
    ...mapGetters(['teams', 'teamSelected'])
  },

  beforeMount() {
    EventBus.$on('drawer-close', () => {
      this.drawer = false;
    });
    this.indexTeams();
  },

  mounted() {
    document.title = this.newTitle;
    console.log(this.$route.name);
  },

  methods: {
    getLogo() {
      return require(`@/assets/logo.png`);
    },
    getTeamLogo() {
      return this.teamSelected.logo ? require(`@/assets/logos/${this.teamSelected.logo}`) : null;
    },
    shareMeta() {
      const alvo = this.$refs.targetShare;

      html2canvas(alvo).then((canvas) => {
        const imagemGerada = canvas.toDataURL('image/png');
        this.imageMeta = imagemGerada;

        // Se quiser baixar direto:
        const link = document.createElement('a');
        link.href = imagemGerada;
        link.download = 'print-meubaba.png';
        link.click();
      });
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
