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

    <Vue3DownUpButton >
      <template #top>
        <img src="@/assets/buttonTop.png" >
      </template>
      <template #down>
        <img src="@/assets/buttonDown.png" >
      </template>
    </Vue3DownUpButton>

  </v-app>
</template>

<script>
import Footer from './components/Footer';
import Table from './components/Table';
import Vue3DownUpButton from 'vuejs3-up-down-button'

export default {
  name: 'App',

  components: {
    Footer,
    Table,
    Vue3DownUpButton
  },

  data: () => ({
    page: 1
  }),
};
</script>
