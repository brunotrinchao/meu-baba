<!-- eslint-disable prettier/prettier -->
<template>
  <div class="stats-group">
    <div class="card">
      <div class="card-header" :class="getGroupClass(groupType)">
        {{ groupTitle }}
      </div>
      <div class="card-body">
        <ul class="list-group list-group-flush">
          <li class="list-group-item" v-for="(match, index) in groupMatches" :key="index">
            <div class="match-details">
              <div class="teams">
                <img :src="getLogo(match.home.logo)" class="team-logo" height="25" alt="Home Team" />
                <span class="vs">X</span>
                <img :src="getLogo(match.away.logo)" class="team-logo" height="25" alt="Away Team" />
              </div>
              <div class="scores">
                <strong>{{ match.home.score }} - {{ match.away.score }}</strong>
              </div>
            </div>
            <div class="progress-bar">
              <b-progress :value="calculateProgress(match)" max="100" height="10px">
                <b-progress-bar :value="calculateProgress(match)" variant="info"></b-progress-bar>
              </b-progress>
            </div>
            <div class="match-status">
              <small v-if="match.home.score !== null && match.away.score !== null">Status: {{ getMatchStatus(match) }}</small>
              <small v-else>Status: Not Played</small>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<!-- eslint-disable prettier/prettier -->
<script>
export default {
  name: 'StatsGroup',
  props: {
    groupType: {
      type: String,
      required: true
    },
    groupMatches: {
      type: Array,
      required: true
    },
    groupTitle: {
      type: String,
      required: true
    }
  },
  methods: {
    getLogo(logo) {
      console.log('startGroup', logo);
      return require(`@/assets/logos/${logo}`);
    },
    calculateProgress(match) {
      // Calcula o progresso com base nos scores
      if (match.home.score !== null && match.away.score !== null) {
        return 100; // Se o jogo foi feito
      }
      return 0; // Caso contrário
    },
    getMatchStatus(match) {
      if (match.home.score > match.away.score) {
        return 'Home Wins';
      } else if (match.home.score < match.away.score) {
        return 'Away Wins';
      }
      return 'Draw';
    },
    getGroupClass(type) {
      // Retorna uma classe de cor para o cabeçalho
      if (type === 'libertadores') {
        return 'bg-primary text-white';
      } else if (type === 'prelibertadores') {
        return 'bg-success text-white';
      } else if (type === 'sulamericana') {
        return 'bg-warning text-dark';
      }
      return '';
    }
  }
};
</script>
<!-- eslint-disable prettier/prettier -->
<style scoped>
.match-details {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.teams {
  display: flex;
  justify-content: center;
  align-items: center;
}

.vs {
  margin: 0 10px;
}

.team-logo {
  margin: 0 5px;
}

.progress-bar {
  margin-top: 10px;
}

.match-status {
  margin-top: 5px;
  text-align: center;
}
</style>
