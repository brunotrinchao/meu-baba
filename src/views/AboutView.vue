<template>
  <div class="about">
    <v-row dense>
      <v-col v-for="(group, index) in groups" :key="index">
        <v-card light elevation="1" class="rounded-lg overflow-hidden">
          <v-card-title class="text-h5 pa-2 align-center text-center align-content-center align-self-center">Bloco 0{{ index + 1 }}</v-card-title>
          <v-divider></v-divider>
          <!-- <v-progress-linear value="15" color="deep-purple accent-4"></v-progress-linear> -->
          <v-card-text class="pa-0" v-show="groups.length">
            <Match :index="index" :group="group" :calcResultMatch="calcResultMatch" :getLogo="getLogo" />
            <ListaItem
              :index="index"
              :group="group"
              title="Libertadores"
              systemBarHeight="20px"
              :metaData="totalPoint.libertadores.meta"
              :saldoTotalData="saldoTotalLibertadores"
              :saldoData="saldoLibertadores"
              :isGroupPlayed="isGroupPlayed"
              :calcGroup="calcGroup"
              :calcularSaldo="calcularSaldo"
              :calculaSaldoTotal="calculaSaldoTotal"
              color="blue lighten-2"
            />
            <ListaItem
              :index="index"
              :group="group"
              title="Pré-Libertadores"
              systemBarHeight="10px"
              :metaData="totalPoint.prelibertadores.meta"
              :saldoTotalData="saldoTotalPreLibertadores"
              :saldoData="saldoPreLibertadores"
              :isGroupPlayed="isGroupPlayed"
              :calcGroup="calcGroup"
              :calcularSaldo="calcularSaldo"
              :calculaSaldoTotal="calculaSaldoTotal"
              color="green lighten-3"
            />
            <ListaItem
              :index="index"
              :group="group"
              title="Sulamericana"
              systemBarHeight="10px"
              :metaData="totalPoint.sulamericana.meta"
              :saldoTotalData="saldoTotalSulamericana"
              :saldoData="saldoSulamericana"
              :isGroupPlayed="isGroupPlayed"
              :calcGroup="calcGroup"
              :calcularSaldo="calcularSaldo"
              :calculaSaldoTotal="calculaSaldoTotal"
              color="yellow lighten-4"
            />
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
// import { matches } from '@/db/db.js';
import ListaItem from '@/components/ListaItem';
import Match from '@/components/Match';

export default {
  name: 'AboutView',
  components: {
    ListaItem,
    Match
  },
  data() {
    return {
      time: 'Bahia',
      // matches: matches,
      totalPoint: {
        libertadores: {
          meta: [],
          total: 64
        },
        prelibertadores: {
          meta: [],
          total: 57
        },
        sulamericana: {
          meta: [],
          total: 49
        }
      },
      groups: [],
      saldoLibertadores: [0, 0, 0, 0, 0, 0, 0],
      saldoPreLibertadores: [0, 0, 0, 0, 0, 0, 0],
      saldoSulamericana: [0, 0, 0, 0, 0, 0, 0],
      saldoTotalLibertadores: [0, 0, 0, 0, 0, 0, 0],
      saldoTotalPreLibertadores: [0, 0, 0, 0, 0, 0, 0],
      saldoTotalSulamericana: [0, 0, 0, 0, 0, 0, 0],
      ptcToGroup: [0, 0, 0, 0, 0, 0, 0]
    };
  },

  watch: {
    groupMatch: {
      handler() {
        this.divideIntoGroups();
      }
    }
  },

  computed: {
    ...mapGetters(['groupMatch', 'teamSelected'])
  },

  mounted() {
    this.calcMeta();
  },

  async created() {
    this.calcMeta();
  },

  methods: {
    divideIntoGroups() {
      const totalMatches = this.groupMatch.length;
      const groupCount = 6; // Número de grupos com 6 jogos
      const groupSize = 6; // Tamanho de cada grupo (exceto o último)

      let currentIndex = 0;
      this.groups = [];
      // Cria os primeiros 5 grupos com 6 jogos
      for (let i = 0; i < groupCount; i++) {
        const group = [];
        for (let j = 0; j < groupSize; j++) {
          if (currentIndex < totalMatches) {
            group.push(this.groupMatch[currentIndex]);
            currentIndex++;
          }
        }

        this.groups.push(group);
      }

      const remainingMatches = this.groupMatch.slice(currentIndex);
      this.groups.push(remainingMatches);
    },

    getLogo(logo) {
      console.log('AvoutView', logo);
      return require(`@/assets/logos/${logo}`);
    },

    calcMatch(match) {
      const { home, away } = match;
      if (home.score === null || away.score === null) {
        return null;
      }

      if (home.id === this.teamSelected.id) {
        if (home.score > away.score) {
          return '+3';
        } else if (home.score === away.score) {
          return '+1'; // Empate
        } else {
          return 0; // Bahia perdeu
        }
      } else if (away.id === this.teamSelected.id) {
        if (away.score > home.score) {
          return '+3'; // Bahia ganhou
        } else if (away.score === home.score) {
          return '+1'; // Empate
        } else {
          return 0; // Bahia perdeu
        }
      }

      // Caso não seja o Bahia jogando
      return null;
    },

    calcResultMatch(group) {
      const result = this.calcMatch(group.match);
      console.log({ calcResultMatch: group });
      if (result === '+3') {
        return 'green green--text text--accent-4';
      } else if (result === '+1') {
        return 'grey grey--text text--accent-4';
      } else if (result === 0) {
        return 'red red--text text--accent-4';
      } else {
        return '';
      }
    },

    calcGroup(matchs) {
      let score = 0;
      matchs.forEach((item) => {
        const result = this.calcMatch(item.match);
        if (result === '+3') {
          score += 3;
        } else if (result === '+1') {
          score += 1;
        } else {
          score;
        }
      });
      return {
        acumulado: score
      };
    },

    calcularSaldo(meta, acumulado, index) {
      const saldo = acumulado - meta;
      let ret = this.formatarSaldo(saldo);
      this.saldoLibertadores[index] = ret;
      this.saldoPreLibertadores[index] = ret;
      this.saldoSulamericana[index] = ret;
      return ret;
    },

    formatarSaldo(saldo) {
      return saldo >= 0 ? `+${saldo}` : saldo.toString();
    },

    calculaSaldoTotal(saldoTotal, index, saldo) {
      if (index === 0) {
        saldoTotal[index] = Number(saldo);
      } else {
        saldoTotal[index] = Number(saldoTotal[index - 1] || 0) + Number(saldo);
      }
      return saldoTotal[index];
    },

    calcMeta() {
      const metas = {
        libertadores: 10,
        prelibertadores: 9,
        sulamericana: 8
      };

      Object.keys(this.totalPoint).forEach((key) => {
        let total = this.totalPoint[key].total;
        let valorMeta = metas[key];
        let numGrupos = Math.floor(total / valorMeta);
        let restante = total % valorMeta;

        this.totalPoint[key].meta = new Array(numGrupos).fill(valorMeta);
        if (restante > 0) {
          this.totalPoint[key].meta.push(restante);
        }
      });
    },

    isGroupPlayed(group) {
      return group.some((item) => item.match.home.score !== null || item.match.away.score !== null);
    }
  }
};
</script>
