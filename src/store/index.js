import Vue from 'vue'
import Vuex from 'vuex'
import search from '@/utils/search'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    ListPackages: {},
    ListPackageVersion: {},
    searchNPM: '',
    FilePackage: []
  },
  mutations: {
    SET_DATA (state, data) {
      state.ListPackages = data
    },
    SET_VERSION_DATA (state, data) {
      state.ListPackageVersion = data
    },
    SET_SEARCH_NPM (state, data) {
      state.searchNPM = data
    },
    SET_FILE_PACKAGE (state, data) {
      state.FilePackage = data
    },
  },
  actions: {
    async getData({commit}, payload) {
      const searchNPM = payload.name
      const currentPage = payload.currentPage
      const itemsPerPage = payload.pageCount
      const response = await search(`${searchNPM}`, `${currentPage}`, `${itemsPerPage}`)
      const data = response.response
      commit('SET_DATA', data)
    },
    async listVersionData({commit}, payload) {
      const response = await fetch(`https://data.jsdelivr.com/v1/package/npm/${payload}`)
      const data = await response.json()
      commit('SET_VERSION_DATA', data)
    },

    async filePackageData({commit}, payload) {
      const packageNPM = payload.package
      const version = payload.version
      const response = await fetch(`https://data.jsdelivr.com/v1/package/npm/${packageNPM}@${version}`)
      const data = await response.json()
      commit('SET_FILE_PACKAGE', data)
    }
  },
  getters: {
    PACKAGES: s => s.ListPackages,
    searchNPM: s => s.searchNPM,
    getListPackageVersion: s => s.ListPackageVersion,
    getFilePackage: s => s.FilePackage
  },
  modules: {
  }
})

