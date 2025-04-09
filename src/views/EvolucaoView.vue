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
      type: 'line',
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
          name: 'series-1',
          data: [30, 40, 35, 50, 49, 60, 70, 91]
        }
      ]
    };
  },
  computed: {
    getOptions() {
      return {
        ...this.options,
        colors: this.series.map((_, index) => this.colors[index % this.colors.length])
      };
    },
    getSeries() {
      return this.series;
    }
  }
};
</script>
