<template>
  <div>
    <v-layout>
      <v-row>
        <v-col cols="12" md="2">
          <v-card>
            <v-list-item>
              <v-list-item-content>
                <v-list-item-title class="text-h6">Bloco: 0{{ data.bloco }}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>

            <v-divider></v-divider>

            <v-list-item>
              <v-list-item-content>
                <!-- <v-list-item-title class="text-subtitle-2">Bloco: {{ data.bloco }}</v-list-item-title> -->
                <v-list-item-subtitle>Total de jogos: {{ totalMatchs }}</v-list-item-subtitle>
                <v-list-item-subtitle>Jogos disputados: {{ totalMatchsDisputed }}</v-list-item-subtitle>
                <v-list-item-subtitle>
                  <!-- <v-avatar size="12" class="red"></v-avatar> -->
                  <v-avatar size="12" class="ml-1" v-for="(match, index) in matchResultsSymbol" :class="match.color" :key="index" />
                </v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>

            <v-list-item>
              <v-list-item-content>
                <v-list-item-title class="text-subtitle-2">Total de pontos: {{ totalPoints }}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-card>
        </v-col>

        <v-col cols="12" md="5">
          <v-card>
            <apexchart type="area" height="350" :options="dataRound.options" :series="dataRound.series" :key="chartKey * 1" />
          </v-card>
        </v-col>
        <v-col cols="12" md="5">
          <v-card>
            <apexchart type="area" height="350" :options="dataMetas.options" :series="dataMetas.series" :key="chartKey * 2" />
          </v-card>
        </v-col>
      </v-row>
    </v-layout>
  </div>
</template>

<script>
export default {
  props: {
    data: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      chartKey: 0,
      jogosDisputados: 0,
      dataMetas: {
        series: [
          {
            name: '',
            data: []
          }
        ],
        options: {
          chart: {
            id: this.chartKey * 2,
            toolbar: {
              show: false // 👈 Desativa o menu do gráfico
            },
            selection: {
              enabled: false // 👈 Remove a seleção do gráfico
            },
            zoom: {
              enabled: false // 👈 Também remove zoom via seleção, se estiver habilitado
            }
          },
          title: {
            text: '',
            align: 'left'
          },
          annotations: {
            yaxis: [
              {
                y: 10,
                type: 'range',
                borderColor: '#2196F3',
                fillColor: '#2196F3',
                opacity: 0.2,
                label: {
                  position: 'left',
                  borderColor: '#2196F3',
                  style: {
                    fontSize: '10px',
                    color: '#fff',
                    background: '#2196F3',
                    padding: {
                      left: 5,
                      right: 5,
                      top: 0,
                      bottom: 2
                    }
                  },
                  offsetX: 60,
                  text: 'Libertadores'
                }
              },
              {
                y: 9,
                type: 'range',
                borderColor: '#A5D6A7',
                fillColor: '#A5D6A7',
                opacity: 0.2,
                label: {
                  borderColor: '#A5D6A7',
                  position: 'center',
                  style: {
                    fontSize: '10px',
                    color: '#fff',
                    background: '#A5D6A7',
                    padding: {
                      left: 5,
                      right: 5,
                      top: 0,
                      bottom: 2
                    }
                  },
                  text: 'Pré-libertadores'
                }
              },
              {
                y: 8,
                type: 'range',
                borderColor: '#FFEB3B',
                fillColor: '#FFEB3B',
                opacity: 0.2,
                label: {
                  borderColor: '#FFEB3B',
                  style: {
                    fontSize: '10px',
                    color: '#fff',
                    background: '#FFEB3B',
                    padding: {
                      left: 5,
                      right: 5,
                      top: 0,
                      bottom: 2
                    }
                  },
                  text: 'Sulamericana'
                }
              }
            ]
          },
          xaxis: {
            categories: []
          },
          yaxis: {
            min: 0,
            max: 10,
            tickAmount: 10,
            forceNiceScale: false,
            labels: {
              formatter: (val) => val
            }
          },
          dataLabels: {
            enabled: true
          },
          tooltip: {
            y: {
              formatter: (val, { series, seriesIndex, dataPointIndex, w }) => {
                const match = w.config.chart.customMatches?.[dataPointIndex];
                if (!match) return `${val} pontos`;

                const { home, away } = match;
                const team = w.config.chart.customTeam;
                const isHome = home.id === team.id;
                const teamScore = isHome ? home.score : away.score;
                const opponentScore = isHome ? away.score : home.score;

                const result = teamScore > opponentScore ? 'Vitória' : teamScore < opponentScore ? 'Derrota' : 'Empate';

                return `${result} ${home.name} ${home.score}x${away.score} ${away.name}`;
              }
            }
          }
        }
      },
      dataRound: {
        series: [
          {
            name: '',
            data: []
          }
        ],
        options: {
          chart: {
            id: this.chartKey * 1,
            toolbar: {
              show: false // 👈 Desativa o menu do gráfico
            },
            selection: {
              enabled: false // 👈 Remove a seleção do gráfico
            },
            zoom: {
              enabled: false // 👈 Também remove zoom via seleção, se estiver habilitado
            }
          },
          title: {
            text: '',
            align: 'left'
          },
          xaxis: {
            categories: []
          },
          yaxis: {
            min: 0,
            max: 3,
            tickAmount: 2,
            forceNiceScale: false,
            labels: {
              formatter: (val) => ([0, 1, 2].includes(val) ? val : val == 2 ? '3' : '')
            }
          },
          dataLabels: {
            enabled: true
          },
          tooltip: {
            y: {
              formatter: (val, { series, seriesIndex, dataPointIndex, w }) => {
                const match = w.config.chart.customMatches?.[dataPointIndex];
                if (!match) return `${val} pontos`;

                const { home, away } = match;
                const team = w.config.chart.customTeam;
                const isHome = home.id === team.id;
                const teamScore = isHome ? home.score : away.score;
                const opponentScore = isHome ? away.score : home.score;

                const result = teamScore > opponentScore ? 'Vitória' : teamScore < opponentScore ? 'Derrota' : 'Empate';

                return `${result} ${home.name} ${home.score}x${away.score} ${away.name}`;
              }
            }
          }
        }
      }
    };
  },
  mounted() {
    console.log(this.data);
  },
  watch: {
    data: {
      immediate: true,
      deep: true,
      handler(val) {
        const matches = Array.isArray(val.matches) ? val.matches : [];
        const team = val.team;

        this.dataRound.options.xaxis.categories = matches.map((_, i) => `Rodada ${i + 1}`);
        this.dataRound.series[0].data = matches.map((item) => this.calcMatch(item.match));
        this.dataRound.options.title.text = `Pontos por rodadas`;
        this.dataRound.options.chart.customMatches = matches.map((m) => m.match);
        this.dataRound.options.chart.customTeam = team;

        let total = 0;
        this.dataMetas.series[0].data = matches.map((item) => {
          const pontos = this.calcMatch(item.match) || 0;
          if (!pontos) return null;
          total += pontos;
          return total;
        });

        this.dataMetas.options.xaxis.categories = matches.map((_, i) => `Rodada ${i + 1}`);
        this.dataMetas.options.title.text = `Evolução por metas`;
        this.dataMetas.options.chart.customMatches = matches.map((m) => m.match);
        this.dataMetas.options.chart.customTeam = team;

        const maxPontos = matches.length * 3;
        this.dataMetas.options.yaxis.max = maxPontos;
        this.dataMetas.options.yaxis.tickAmount = maxPontos;

        const metaTop = matches.length === 6 ? 10 : 4;
        const metaMid = matches.length === 6 ? 9 : 3;
        const metaLow = matches.length === 6 ? 8 : 1;

        this.dataMetas.options.annotations.yaxis[0].y = metaTop;
        this.dataMetas.options.annotations.yaxis[1].y = metaMid;
        this.dataMetas.options.annotations.yaxis[2].y = metaLow;

        this.chartKey++;
      }
    }
  },

  computed: {
    isReady() {
      return this.data && Array.isArray(this.data.matches) && this.data.matches.length > 0;
    },
    totalMatchs() {
      return this.data?.matches.length;
    },
    totalPoints() {
      let total = 0;

      this.data.matches.forEach((item) => {
        const matchPoints = this.calcMatch(item.match);
        if (typeof matchPoints === 'number') {
          total += matchPoints;
        }
      });

      return total;
    },
    totalMatchsDisputed() {
      if (!Array.isArray(this.data?.matches)) return 0;

      return this.data.matches.filter(({ match }) => {
        return match?.home?.score !== null && match?.away?.score !== null;
      }).length;
    },
    matchResultsSymbol() {
      if (!Array.isArray(this.data?.matches)) return [];

      return this.data.matches.map(({ match }) => {
        if (!match?.home || !match?.away) return { result: 'indefinido', color: 'grey' };

        const { home, away } = match;

        if (home.score === null || away.score === null) {
          return { result: 'não disputado', color: null };
        }

        const isHome = home.id === this.data.team.id;
        const isAway = away.id === this.data.team.id;

        let points = 0;
        if (isHome) {
          points = home.score > away.score ? 3 : home.score === away.score ? 1 : 0;
        } else if (isAway) {
          points = away.score > home.score ? 3 : away.score === home.score ? 1 : 0;
        }

        if (points === 3) return { result: 'vitória', color: 'green' };
        if (points === 1) return { result: 'empate', color: 'grey' };
        return { result: 'derrota', color: 'red' };
      });
    }
  },

  methods: {
    calcMatch(match) {
      if (!match || !match.home || !match.away || !this.data.team) return 0;

      const { home, away } = match;

      if (home.score === null || away.score === null) {
        return null;
      }
      const isHome = home.id === this.data.team.id;
      const isAway = away.id === this.data.team.id;

      if (isHome) {
        if (home.score > away.score) return 3;
        if (home.score === away.score) return 1;
        return 0;
      }

      if (isAway) {
        if (away.score > home.score) return 3;
        if (away.score === home.score) return 1;
        return 0;
      }

      return null;
    }
  }
};
</script>
