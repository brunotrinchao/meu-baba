<!-- eslint-disable prettier/prettier -->
<template>
  <v-layout>
    <v-row>
      <v-col class="col-3">
        <v-card>
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title>Single-line item</v-list-item-title>
            </v-list-item-content>
          </v-list-item>

          <v-list-item two-line>
            <v-list-item-content>
              <v-list-item-title>Two-line item</v-list-item-title>
              <v-list-item-subtitle>Secondary text</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>

          <v-list-item three-line>
            <v-list-item-content>
              <v-list-item-title>Three-line item</v-list-item-title>
              <v-list-item-subtitle>Secondary line text Lorem ipsum dolor sit amet,</v-list-item-subtitle>
              <v-list-item-subtitle>consectetur adipiscing elit.</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-card>
      </v-col>
      <v-col class="col-9">
        <v-card>
          <apexchart height="350" :type="type" :options="getOptions" :series="getSeries"></apexchart>
        </v-card>
      </v-col>
    </v-row>
  </v-layout>
</template>
<!-- eslint-disable prettier/prettier -->
<script>
export default {
  data() {
    return {
      type: 'area',
      colors: [
        '#0056b3', // Azul escuro (variação do primary)
        '#20c997', // Verde médio (variação do success)
        '#e74c3c', // Vermelho vivo (variação do danger)
        '#fd7e14', // Laranja (variação do warning)
        '#6f42c1', // Roxo (variação do secondary)
        '#d63384', // Rosa vibrante (variação adicional)
        '#495057', // Cinza escuro (complementar do dark)
        '#74c0fc', // Azul claro (variação do info)
        '#f9c74f', // Amarelo (diferente do warning)
        '#37b24d' // Verde escuro (variação alternativa do success)
      ],
      series: [
        {
          name: 'Time A',
          data: [1, 4]
        },
        {
          name: 'Time B',
          data: [8, 2]
        },
        {
          name: 'Libertadores (64 pts)',
          data: [10, 10, 10, 10, 10, 10, 4]
        },
        {
          name: 'Pré-Libertadores (57 pts)',
          data: Array(7).fill(57)
        },
        {
          name: 'Sul-Americana (49 pts)',
          data: Array(7).fill(49)
        }
      ]
    };
  },
  computed: {
    getOptions() {
      return {
        chart: {
          id: 'evolucao-dos-times',
          toolbar: { show: false }
        },
        title: {
          text: '',
          align: 'left'
        },
        xaxis: {
          categories: ['Bloco 1', 'Bloco 2', 'Bloco 3', 'Bloco 4', 'Bloco 5', 'Bloco 6', 'Bloco 7'],
          title: { text: 'Blocos' }
        },
        yaxis: {
          title: { text: 'Pontos Acumulados' },
          min: 0,
          max: 70
        },
        colors: this.colors,
        stroke: {
          curve: 'smooth',
          width: 2,
          dashArray: [0, 0, 5, 5, 5] // Metas com linha tracejada
        },
        fill: {
          type: 'gradient',
          gradient: {
            shadeIntensity: 1,
            opacityFrom: 0.4,
            opacityTo: 0,
            stops: [0, 90, 100]
          }
        },
        markers: {
          size: 5
        },
        tooltip: {
          shared: true,
          intersect: false,
          y: {
            formatter: (val) => `${val} pts`
          }
        },
        legend: {
          position: 'top',
          horizontalAlign: 'center'
        }
      };
    },
    getSeries() {
      return this.series;
    }
  }
};
</script>
