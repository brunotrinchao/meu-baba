<!-- eslint-disable prettier/prettier -->
<template>
  <div>
    <v-system-bar :height="systemBarHeight"></v-system-bar>
    <v-list class="pa-0" dense :color="color">
      <v-subheader>
        <span>{{ title }}</span>
      </v-subheader>
      <v-divider></v-divider>
      <v-list-item class="px-2" dense>
        <v-row>
          <v-col>
            <v-list-item-title>Meta:</v-list-item-title>
            <v-list-item-subtitle>{{ metaData[index] }}</v-list-item-subtitle>
          </v-col>
          <v-col>
            <v-list-item-title>Acumulado:</v-list-item-title>
            <v-list-item-subtitle>{{ isGroupPlayed(group) ? calcGroup(group).acumulado : null }}</v-list-item-subtitle>
          </v-col>
        </v-row>
      </v-list-item>
      <v-divider></v-divider>
      <v-list-item class="px-2" dense>
        <v-row>
          <v-col>
            <v-list-item-title>Saldo:</v-list-item-title>
            <v-list-item-subtitle>
              {{ isGroupPlayed(group) ? calcularSaldo(metaData[index], calcGroup(group).acumulado, index) : null }}
            </v-list-item-subtitle>
          </v-col>
          <v-col>
            <v-list-item-title>Saldo total:</v-list-item-title>
            <v-list-item-subtitle>
              {{ isGroupPlayed(group) ? calculaSaldoTotal(saldoTotalData, index, saldoData[index]) : null }}
            </v-list-item-subtitle>
          </v-col>
        </v-row>
      </v-list-item>
      <v-divider></v-divider>
      <v-list-item class="px-2" dense>
        <v-row>
          <v-col>
            <v-list-item-title>
              Aproveitamento:
              <span>
                {{ isGroupPlayed(group) ? calcAproveitamento(calcGroup(group).acumulado).percentual : null }}
              </span>
            </v-list-item-title>
          </v-col>
        </v-row>
      </v-list-item>
    </v-list>
  </div>
</template>
<!-- eslint-disable prettier/prettier -->
<script>
export default {
  props: {
    index: {
      type: Number,
      required: true
    },
    group: {
      type: Array,
      required: true
    },
    title: {
      type: String,
      required: true
    },
    systemBarHeight: {
      type: String,
      default: '10px'
    },
    metaData: {
      type: Array,
      required: true
    },
    saldoTotalData: {
      type: Array,
      required: true
    },
    saldoData: {
      type: Array,
      required: true
    },
    isGroupPlayed: {
      type: Function,
      required: true
    },
    calcGroup: {
      type: Function,
      required: true
    },
    calcularSaldo: {
      type: Function,
      required: true
    },
    calculaSaldoTotal: {
      type: Function,
      required: true
    },
    color: {
      type: String
    }
  },

  data() {
    return {
      win: 3,
      draw: 1,
      lose: 0
    };
  },

  computed: {
    pontosAcumulados(group) {
      return this.calcGroup(group).acumulado;
    }
  },

  mounted() {},

  methods: {
    calcAproveitamento(acumulado) {
      // const jogos = this.group?.length || 0;
      const pontosPossiveis = this.metaData[this.index];

      if (pontosPossiveis === 0) {
        return {
          percentual: '0.00%',
          color: 'red'
        };
      }

      const aproveitamento = (acumulado / pontosPossiveis) * 100;
      const percentual = `${aproveitamento.toFixed(2)}%`;

      let color = 'error';
      if (aproveitamento >= 80) {
        color = 'primary';
      } else if (aproveitamento >= 50) {
        color = 'warning';
      }

      return { percentual, color };
    }
  }
};
</script>
