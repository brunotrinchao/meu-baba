<template>
  <div>
    <v-dialog
      v-model="dialog"
      ref="dialog"
      :fullscreen="$vuetify.breakpoint.smAndDown"
      :max-width="$vuetify.breakpoint.smAndDown ? '100%' : '80%'"
      :max-height="$vuetify.breakpoint.smAndDown ? '100%' : '80%'"
    >
      <v-card>
        <v-card-title class="headline">
          <span>{{ internalTitle }}</span>
          <v-spacer></v-spacer>
          <!-- Botão para fechar o diálogo -->
          <v-btn icon @click="dialog = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>

        <v-card-text>
          <component :is="internalComponent" :data="internalComponentData" />
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dialog: false,
      internalTitle: '',
      internalComponent: null,
      internalComponentData: null
    };
  },
  methods: {
    open({ title, component, componentData }) {
      this.internalTitle = null;
      this.internalComponent = null;
      this.internalComponentData = null;

      this.internalTitle = title;
      this.internalComponent = component;
      this.internalComponentData = componentData;

      this.dialog = true;
    },
    closeDialog() {
      this.internalTitle = null;
      this.internalComponent = null;
      this.internalComponentData = null;
      this.dialog = false;
    }
  }
};
</script>

<style scoped>
/* Adicione estilos personalizados aqui, se necessário */
</style>
