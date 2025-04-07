/* eslint-disable prettier/prettier */
import api from '@/api/api';
import Vue from 'vue';
import Vuex from 'vuex';
import Swal from 'sweetalert2';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    teams: [],
    teamSelected: {},
    groupMatch: [],
    championshipId: process.env.VUE_APP_CHAMPIONSHIP_ID,
    rounds: []
  },
  getters: {
    teams: (state) => state.teams,
    teamSelected: (state) => state.teamSelected,
    groupMatch: (state) => state.groupMatch
  },
  mutations: {
    SET_TEAMS(state, teams) {
      state.teams = teams;
    },
    SET_TEAM_SELECTED(state, team) {
      state.teamSelected = team;
    },
    SET_GROUP_MATCH(state, group) {
      state.groupMatch = group;
    },
    SET_ROUNDS(state, rounds) {
      state.rounds = rounds;
    }
  },
  actions: {
    async indexTeams({ commit, state }, params) {
      try {
        return await api.obter(`/${state.championshipId}/teams`, params).then((data) => {
          commit('SET_TEAMS', data);
          return data;
        });
      } catch (error) {
        console.error('Erro ao buscar times:', error);
        return [];
      }
    },
    async selectTeam({ commit, state }, team) {
      try {
        return await api.obter(`/${state.championshipId}/matches/team/${team.id}`, {}).then((data) => {
          if (!data.error) {
            commit('SET_GROUP_MATCH', data);

            commit('SET_TEAM_SELECTED', team);
            return data;
          }
          return [];
        });
      } catch (error) {
        console.error('Erro ao buscar partidas do time:', error);
        return [];
      }
    },
    async getRounds({ commit, state }) {
      try {
        return await api.obter(`/${state.championshipId}/matches`, {}).then((data) => {
          if (!data.error) {
            console.log(data);
            commit('SET_ROUNDS', data);
            return data;
          }
          return [];
        });
      } catch (error) {
        console.error('Erro ao buscar partidas do time:', error);
        return [];
      }
    },
    async getRound({ state }, roundSelected) {
      return state.rounds.filter((el) => el.round === roundSelected);
    },
    async saveGameScore({ state }, { id, params }) {
      try {
        return await api.alterar(`/${state.championshipId}/matches/${id}/score`, params).then((data) => {
          if (!data.error) {
            Swal.fire({
              title: 'Jogo salvo com sucesso!',
              icon: 'success',
              toast: true,
              showConfirmButton: false,
              timer: 2000,
              timerProgressBar: false
            });
            return;
          }
          Swal.fire({
            title: data.error,
            icon: 'error',
            toast: true,
            showConfirmButton: false,
            timer: 2000,
            timerProgressBar: false
          });
          return;
        });
      } catch (error) {
        console.error('Erro ao buscar partidas do time:', error);
      }
    }
  },
  modules: {}
});
