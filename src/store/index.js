import Vue from 'vue'
import Vuex from 'vuex'
import search from '@/utils/search'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    ListPackages: {}
  },
  mutations: {
    SET_DATA (state, data) {
      state.ListPackages = data
    },
  },
  actions: {
    async getData ({ commit }, payload) {
      const searchNPM = payload.name
      const currentPage = payload.currentPage
      const itemsPerPage = payload.pageCount
      const response = await search(`${searchNPM}`, `${currentPage}`, `${itemsPerPage}`)
      const data = response.response
      commit('SET_DATA', data)
    },
  },
  getters: {
    PACKAGES: s => s.ListPackages
  },
  modules: {
  }
})
