<template>
  <v-app>
    <v-app-bar
        app
        color="primary"
        dark
    >
      <div class="d-flex align-center">

        <v-img
            alt="Vuetify Logo"
            class="shrink mr-2"
            contain
            src="https://cdn.vuetifyjs.com/images/logos/vuetify-logo-dark.png"
            transition="scale-transition"
            width="40"
        />

        <h2>Поиск пакетов NPM</h2>

      </div>

      <v-spacer></v-spacer>

    </v-app-bar>

    <v-main>
      <Table/>
    </v-main>

    <Footer/>

  </v-app>
</template>

<script>
import Footer from './components/Footer';
import Table from './components/Table';

export default {
  name: 'App',

  components: {
    Footer,
    Table
  },

  data: () => ({
    page: 1
  }),
};
</script>
