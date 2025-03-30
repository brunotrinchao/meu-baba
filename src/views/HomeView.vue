<template>
  <div class="home">
    <h2 class="my-4">Metas míminas por bloco de 06 jogos.</h2>
    <b-progress height="14px" class="mt-2 mb-2" :max="max" show-value>
      <b-progress-bar :value="libertadoresProgress" variant="primary">
        <span>
          <strong>{{ libertadoresProgress.toFixed(2) }}%</strong>
        </span>
      </b-progress-bar>
      <!-- Libertadores -->
      <b-progress-bar :value="prelibertadoresProgress" variant="success">
        <span>
          <strong>{{ prelibertadoresProgress.toFixed(2) }}%</strong>
        </span>
      </b-progress-bar>
      <!-- Pré-Libertadores -->
      <b-progress-bar :value="sulamericanaProgress" variant="warning">
        <span>
          <strong>{{ sulamericanaProgress.toFixed(2) }}%</strong>
        </span>
      </b-progress-bar>
      <!-- Sulamericana -->
    </b-progress>

    <div class="row">
      <div class="col col-sm-12 col-lg mb-4 p-1" v-for="(group, index) in groups" :key="index">
        <div class="card h-100">
          <div class="card-header bg-secodary">Bloco {{ index + 1 }}</div>
          <div class="card-body p-0">
            <ul class="list-group list-group-flush p-0 m-o">
              <li class="list-group-item p-2" :class="calcResultMatch(match)" v-for="(match, matchIndex) in group" :key="matchIndex">
                <div class="row align-items-center">
                  <div class="col-3 px-2">
                    <h4 class="m-0">{{ match.round }}</h4>
                  </div>
                  <div class="col">
                    <div class="row align-items-center">
                      <div class="col-5 px-1">
                        <img :src="getLogo(match.home.logo)" alt="Home Logo" class="team-logo" height="25" />
                      </div>
                      <div class="col-2 px-1">X</div>
                      <div class="col-5 px-1">
                        <img :src="getLogo(match.away.logo)" alt="Away Logo" class="team-logo" height="25" />
                      </div>
                    </div>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>

    <div class="row mb-3">
      <div class="col col-md-3 col-lg p-1" v-for="(matchs, index) in groupsLibertadores" :key="index">
        <div class="card">
          <div class="card-header bg-primary text-white">Libertadores</div>
          <div class="card-body p-1">
            <ul class="list-group list-group-flush text-left">
              <li class="list-group-item p-2">
                <div class="mb-1">
                  <small>
                    <strong>Meta:</strong>
                    {{ metaLibertadores[index] }}
                  </small>
                </div>
                <div class="mb-1">
                  <small>
                    <strong>Acumulado:</strong>
                    {{ isGroupPlayed(matchs) ? calcGroup(matchs).acumulado : null }}
                  </small>
                </div>
                <div class="mb-1">
                  <small>
                    <strong>Saldo:</strong>
                    {{ isGroupPlayed(matchs) ? calcularSaldo(metaLibertadores[index], calcGroup(matchs).acumulado, index) : null }}
                  </small>
                </div>
                <div class="mb-1">
                  <small>
                    <strong>Saldo Total:</strong>
                    {{ isGroupPlayed(matchs) ? calculaSaldoTotal(saldoTotalLibertadores, index, saldoLibertadores[index]) : null }}
                  </small>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>

    <div class="row mb-3">
      <div class="col col-md-3 col-lg p-1" v-for="(matchs, index) in groupsPreLibertadores" :key="index">
        <div class="card">
          <div class="card-header bg-success text-white">Pré-Libertadores</div>
          <div class="card-body p-1">
            <ul class="list-group list-group-flush text-left">
              <li class="list-group-item p-2" v-for="(item, matchIndex) in calcGroup(matchs)" :key="matchIndex">
                <div class="mb-1">
                  <small>Meta: {{ metaPreLibertadores[index] }}</small>
                </div>
                <div class="mb-1">
                  <small>Acumulado: {{ calcGroup(matchs).acumulado }}</small>
                </div>
                <div class="mb-1">
                  <small>Saldo: {{ metaPreLibertadores[index] }}</small>
                </div>
                <div class="mb-1">
                  <!-- <small>Saldo Total: {{ calculaSaldoTotal(saldoTotalPreLibertadores, index, metaPreLibertadores[index]) }}</small> -->
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>

    <div class="row mb-3">
      <div class="col col-md-3 col-lg p-1" v-for="(matchs, index) in groupsSulamericana" :key="index">
        <div class="card">
          <div class="card-header bg-warning text-white">Sulamericana</div>
          <div class="card-body p-1">
            <ul class="list-group list-group-flush text-left">
              <li class="list-group-item p-2" v-for="(item, matchIndex) in calcGroup(matchs)" :key="matchIndex">
                <div class="mb-1">
                  <small>Meta: {{ metaSulamericana[index] }}</small>
                </div>
                <div class="mb-1">
                  <small>Acumulado: {{ calcGroup(matchs).acumulado }}</small>
                </div>
                <div class="mb-1">
                  <small>Saldo: {{ metaSulamericana[index] }}</small>
                </div>
                <div class="mb-1">
                  <small>Saldo Total: {{ saldoTotalSulamericana[index] }}</small>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>

    <small>
      *Metas de pontuação com base na média das últimas edições e projeções do DP. de matemática da UFMG, afim de obter 99% de chances em cada cenário. 64 PTS
      LIBERTADORES / 67 PTS LIBERTADORES / 49 PTS SUL-AMERICANA. As metas podem sofrer alterações nos blocos finais conforme o cenário do campeonato atual.
    </small>
  </div>
</template>

<script>
import { matches } from '@/db/db.js';

export default {
  name: 'HomeView',
  data() {
    return {
      time: 'Bahia',
      totalScore: 0,
      max: 62, // Pontuação máxima para comparação (sempre 62 por ser Libertadores)
      libertadoresGoal: 62, // Meta para Libertadores
      prelibertadoresGoal: 57, // Meta para Pré-Libertadores
      sulamericanaGoal: 48, // Meta para Sulamericana
      matches: matches,
      groups: [],
      groupsLibertadores: [],
      groupsPreLibertadores: [],
      groupsSulamericana: [],
      metaLibertadores: [10, 10, 10, 10, 10, 10, 3],
      metaPreLibertadores: [9, 9, 9, 9, 9, 9, 3],
      metaSulamericana: [8, 8, 8, 8, 8, 8, 3],
      saldoLibertadores: [0, 0, 0, 0, 0, 0, 0],
      saldoPreLibertadores: [0, 0, 0, 0, 0, 0, 0],
      saldoSulamericana: [0, 0, 0, 0, 0, 0, 0],
      saldoTotalLibertadores: [0, 0, 0, 0, 0, 0, 0],
      saldoTotalPreLibertadores: [0, 0, 0, 0, 0, 0, 0],
      saldoTotalSulamericana: [0, 0, 0, 0, 0, 0, 0]
    };
  },

  computed: {
    // Progresso da Libertadores
    libertadoresProgress() {
      return (this.totalScore / this.libertadoresGoal) * 100;
    },
    // Progresso da Pré-Libertadores
    prelibertadoresProgress() {
      return (this.totalScore / this.prelibertadoresGoal) * 100;
    },
    // Progresso da Sulamericana
    sulamericanaProgress() {
      return (this.totalScore / this.sulamericanaGoal) * 100;
    }
  },

  async created() {
    this.divideIntoGroups();
    this.updateTotalScore();
  },

  methods: {
    divideIntoGroups() {
      const totalMatches = this.matches.length;
      const groupCount = 6; // Número de grupos com 6 jogos
      const groupSize = 6; // Tamanho de cada grupo (exceto o último)

      let currentIndex = 0;

      // Cria os primeiros 5 grupos com 6 jogos
      for (let i = 0; i < groupCount; i++) {
        const group = [];
        for (let j = 0; j < groupSize; j++) {
          if (currentIndex < totalMatches) {
            group.push(this.matches[currentIndex]);
            currentIndex++;
          }
        }

        if (i < 6) {
          this.groupsLibertadores.push(group);
          this.groupsPreLibertadores.push(group);
          this.groupsSulamericana.push(group);
        } else {
          // Último bloco, que recebe uma meta reduzida
          this.groupsLibertadores.push(group);
          this.groupsPreLibertadores.push(group);
          this.groupsSulamericana.push(group);
        }

        this.groups.push(group);
      }

      const remainingMatches = this.matches.slice(currentIndex);
      this.groupsLibertadores.push(remainingMatches);
      this.groupsPreLibertadores.push(remainingMatches);
      this.groupsSulamericana.push(remainingMatches);
      this.groups.push(remainingMatches);
    },

    getLogo(logo) {
      return require(`@/assets/logos/${logo}`);
    },

    calcMatch(match) {
      const { home, away } = match;
      if (home.score === null || away.score === null) {
        return null;
      }

      if (home.time === this.time) {
        if (home.score > away.score) {
          return '+3';
        } else if (home.score === away.score) {
          return '+1'; // Empate
        } else {
          return 0; // Bahia perdeu
        }
      } else if (away.time === this.time) {
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
    updateTotalScore() {
      this.totalScore = this.groups.flat().reduce((score, match) => {
        const result = this.calcMatch(match);
        if (result === '+3') {
          return score + 3;
        } else if (result === '+1') {
          return score + 1;
        } else {
          return score;
        }
      }, 0);
    },

    calcGroup(matchs) {
      let score = 0;
      matchs.forEach((match) => {
        const result = this.calcMatch(match);
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

    calculaSaldoTotal(saldoTotal, index, saldo) {
      if (index === 0) {
        saldoTotal[index] = Number(saldo);
      } else {
        saldoTotal[index] = Number(saldoTotal[index - 1] || 0) + Number(saldo);
      }
      return saldoTotal[index];
    },

    formatarSaldo(saldo) {
      return saldo >= 0 ? `+${saldo}` : saldo.toString();
    },

    calcResultMatch(match) {
      const result = this.calcMatch(match);
      if (result === '+3') {
        return 'bg-success';
      } else if (result === '+1') {
        return 'bg-secondary';
      } else if (result === 0) {
        return 'bg-danger';
      } else {
        return '';
      }
    },

    isGroupPlayed(group) {
      return group.some((match) => match.home.score !== null || match.away.score !== null);
    }
  }
};
</script>
<style scoped>
.overflow-x-auto {
  display: flex;
  overflow-x: auto;
  padding-bottom: 15px; /* Ajuste de espaço se necessário */
}
</style>
