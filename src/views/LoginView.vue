<!-- eslint-disable prettier/prettier -->
<template>
  <div>
    <v-layout align-center justify-center v-if="!authenticated">
      <v-flex xs12 sm8 md4>
        <v-card class="pa-5">
          <v-card-title class="justify-center">
            <span class="headline">Login</span>
          </v-card-title>
          <v-card-text>
            <v-form @submit.prevent="login">
              <v-text-field v-model="email" label="E-mail" prepend-icon="mdi-email" type="email" required></v-text-field>
              <v-text-field v-model="password" label="Senha" prepend-icon="mdi-lock" type="password" required></v-text-field>
              <v-btn color="primary" block type="submit" :loading="loading">Entrar</v-btn>
            </v-form>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
    <div v-else>
      <v-row>
        <v-col class="col-8">
          <v-select :items="rodadas" label="Rodada" v-model="rodadaSelecionada"></v-select>
        </v-col>
        <v-col class="col-4">
          <h6><v-btn text color="error" @click="logout()">Logout</v-btn></h6>
        </v-col>
      </v-row>
      <v-layout justify-center>
        <v-container fluid class="pa-0">
          <v-simple-table class="w-100">
            <template v-slot:default>
              <thead>
                <tr>
                  <th class="text-center" width="50">Mandante</th>
                  <th class="text-left" width="80"></th>
                  <th class="text-left"></th>
                  <th class="text-center" width="80"></th>
                  <th class="text-center" width="50">Visitante</th>
                  <th class="text-center"></th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="match in matchs" :key="match.id">
                  <td class="text-center">
                    <img :id-team="match?.match.home.id" :src="getLogo(match?.match.home.logo)" alt="Home Logo" class="team-logo" height="20" />
                  </td>
                  <td>
                    <v-text-field v-model="match.match.home.score" outlined type="number" min="0" hide-details dense style="min-width: 50px"></v-text-field>
                  </td>
                  <td class="text-center">X</td>
                  <td>
                    <v-text-field v-model="match.match.away.score" outlined type="number" min="0" hide-details dense style="min-width: 50px"></v-text-field>
                  </td>
                  <td class="text-center">
                    <img :id-team="match?.match.away.id" :src="getLogo(match?.match.away.logo)" alt="Away Logo" class="team-logo" height="20" />
                  </td>
                  <td class="text-center">
                    <v-btn icon color="primary" @click="salvarJogo(match.id)">Salvar</v-btn>
                  </td>
                </tr>
              </tbody>
            </template>
          </v-simple-table>
        </v-container>
      </v-layout>
    </div>
  </div>
</template>
<!-- eslint-disable prettier/prettier -->
<script>
import { mapActions } from 'vuex';
import Swal from 'sweetalert2';
export default {
  data() {
    return {
      email: '',
      password: '',
      loading: false,
      authenticated: false,
      rodadaSelecionada: null,
      rodadas: Array.from({ length: 38 }, (_, i) => i + 1),
      matchs: []
    };
  },
  watch: {
    authenticated: {
      handler() {
        this.getRounds();
      }
    },
    rodadaSelecionada: {
      handler(newVal) {
        this.obterRound(newVal);
      }
    }
  },
  methods: {
    getLogo(logo) {
      return require(`@/assets/logos/${logo}`);
    },
    login() {
      this.loading = true;

      if (this.email != process.env.VUE_APP_LOGIN && this.password != process.env.VUE_APP_PASSWORD) {
        Swal.fire({
          text: 'Login/Senha errados',
          icon: 'error',
          toast: true,
          // position: 'top-end',
          showConfirmButton: false,
          timer: 2000,
          timerProgressBar: false
        });
      }
      this.loading = false;
      this.authenticated = true;
      // setTimeout(() => {
      //   // Simula login
      //   alert(`Email: ${this.email}\nSenha: ${this.password}`);
      //   this.loading = false;
      // }, 1000);
    },
    goToRegister() {
      // Navegar para tela de cadastro
      alert('Navegar para o cadastro');
    },
    async obterRound(round) {
      this.matchs = await this.getRound(round);
    },
    async salvarJogo(id) {
      const jogo = this.matchs.find((m) => m.id === id);
      if (jogo) {
        let params = {
          score_home: jogo.match.home.score,
          score_away: jogo.match.away.score
        };
        await this.saveGameScore({ id: jogo.id, params });
        // Aqui você pode fazer o POST/PUT para uma API, ou só mostrar no console por enquanto
        console.log('Salvando jogo:', {
          id: jogo.id,
          home: jogo.match.home.name,
          homeScore: jogo.match.home.score,
          away: jogo.match.away.name,
          awayScore: jogo.match.away.score
        });
      }
    },
    logout() {
      this.authenticated = false;
      this.rodadaSelecionada = null;
      this.rodadaSelecionada = [];
    },
    ...mapActions(['getRounds', 'getRound', 'saveGameScore'])
  }
};
</script>
<!-- eslint-disable prettier/prettier -->

<style scoped>
.headline {
  font-weight: 500;
}
.team-logo {
  display: block;
  margin: 0 auto;
}

.v-simple-table {
  width: 100% !important;
}
</style>
