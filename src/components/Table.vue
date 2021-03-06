<template>
  <v-container>
    <v-container>
      <form @submit.prevent="submit">
        <v-text-field
            v-model="name"
            :counter="100"
            label="Название пакета"
            required
        ></v-text-field>

        <v-btn
            class="mr-4"
            type="submit"
        >
          Поиск
        </v-btn>
        <v-btn @click="clear">
          Очистить
        </v-btn>
      </form>
    </v-container>
    <div
        v-if="listPACKAGES"
        class="text-center ma-3"
    >
      <v-btn
          class="ma-2"
          outlined
          style="color: green"
          tile
          @click="prevSlide">
        <v-icon left>mdi-chevron-left</v-icon>
        Назад
      </v-btn>
      <v-btn
          class="ma-2"
          style="color: green"
          tile
      >
        {{ this.currentPage + 1 }}
      </v-btn>
      <v-btn
          class="ma-2"
          outlined
          style="color: green"
          tile
          @click="nextSlide">
        <v-icon left>mdi-chevron-right</v-icon>
        Вперед
      </v-btn>
    </div>
    <v-data-table
        v-if="listPACKAGES"
        :headers="headers"
        :items="listPACKAGES"
        hide-default-footer
    >
      <template v-slot:top>
        <v-toolbar>
          <v-toolbar-title>Результаты поиска</v-toolbar-title>
          <v-divider
              class="mx-4"
              inset
              vertical
          ></v-divider>
          <v-spacer></v-spacer>
          <v-dialog
              v-model="dialog"
              max-width="500px"
          >
            <v-card>
              <p
                  class="display-1 text--primary py-4 pa-4"
                  v-html="editedItem.name"
              ></p>
              <v-card-title>
                <span
                    class="headline"
                    v-html="editedItem.owner.name"
                >
                </span>
              </v-card-title>
              <v-card-text>
                <v-container>
                  <v-row>
                    <v-card-text>
                      <v-chip-group
                          active-class="deep-purple accent-4 white--text"
                          column
                      >
                        <v-chip>{{ editedItem.version }}</v-chip>
                        <v-chip>{{ editedItem.license }}</v-chip>
                      </v-chip-group>
                    </v-card-text>
                    <v-container fluid>
                      <v-row>
                        <v-col cols="12">
                          <v-combobox
                              v-model="select"
                              :items="getListPackageVersion.versions"
                              dense
                              label="Выбрать версию"
                          ></v-combobox>
                        </v-col>
                      </v-row>
                    </v-container>
                    <v-divider class="mx-4"></v-divider>
                    <div class="my-4 subtitle-1">
                      {{ editedItem.description }}
                    </div>
                    <v-col
                        cols="12"
                        md="4"
                        sm="6"
                    >
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>
              <v-spacer></v-spacer>
              <div class="showFile">
                <v-card-actions>
                  <v-btn
                      icon
                      @click="showPackageFile"
                  >
                    <v-icon>{{ show ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
                  </v-btn>
                  <v-spacer></v-spacer>
                  <p>Файлы выбранной версии</p>
                </v-card-actions>

                <v-expand-transition>
                  <div v-show="show">
                    <v-divider></v-divider>

                    <v-card-text>
                      <h3>Здесь будут файлы версии {{ select }}</h3>
                      <p style="margin: 10px">default <strong>{{ getFilePackage.default }}</strong></p>
<!--                      <p style="margin: 10px">Массивов - {{ getFilePackage.files.length }}</p>-->
                    </v-card-text>

                  </div>
                </v-expand-transition>
              </div>

              <v-footer
                  dark
                  padless
              >
                <v-card
                    class="flex"
                    flat
                    tile
                >
                  <v-row>

                  </v-row>
                  <v-card-title class="teal">
                    <strong class="subheading">Информация об авторе</strong>

                    <v-spacer></v-spacer>

                    <v-list class="teal">
                      <v-list-item>
                        <v-list-item-avatar>
                          <v-img :src=personAvatar></v-img>
                        </v-list-item-avatar>
                      </v-list-item>

                      <v-list-item link>
                        <v-list-item-content>
                          <v-list-item-title class="title">
                            {{ personName }}
                          </v-list-item-title>
                          <v-list-item-subtitle>
                            {{ personLink }}
                          </v-list-item-subtitle>
                        </v-list-item-content>

                      </v-list-item>
                    </v-list>

                  </v-card-title>

                </v-card>
              </v-footer>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                    color="blue darken-1"
                    text
                    @click="close"
                >
                  Закрыть
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-toolbar>
      </template>
      <template
          v-slot:item.owner.avatar="{ item }">
        <img
            :src="item.owner.avatar"
            alt="avatar"
            style="max-width: 48px; max-height: 120px; margin: 5px; border-radius: 4px;"
        >
      </template>
      <template v-slot:item.version="{ item }">
        <v-chip
            :color="getColor(item.version)"
            dark
        >
          {{ item.version }}
        </v-chip>
      </template>
      <template v-slot:item.license="{ item }">
        <v-chip
            color="green"
            dark
        >
          {{ item.license }}
        </v-chip>
      </template>
      <template v-slot:item.actions="{ item }">
        <v-btn
            class="mx-2"
            color="teal"
            dark
            fab
            small
            @click="editItem(item)"
        >
          <v-icon dark>
            mdi-format-list-bulleted-square
          </v-icon>
        </v-btn>
      </template>
    </v-data-table>
    <div
        v-if="listPACKAGES"
        class="text-center ma-3"
    >
      <v-btn
          class="ma-2"
          outlined
          style="color: green"
          tile
          @click="prevSlide">
        <v-icon left>mdi-chevron-left</v-icon>
        Назад
      </v-btn>
      <v-btn
          class="ma-2"
          style="color: green"
          tile
      >
        {{ this.currentPage + 1 }}
      </v-btn>
      <v-btn
          class="ma-2"
          outlined
          style="color: green"
          tile
          @click="nextSlide">
        <v-icon left>mdi-chevron-right</v-icon>
        Вперед
      </v-btn>
    </div>
  </v-container>
</template>

<script>
import {mapActions, mapGetters} from 'vuex'

export default {
  data: () => ({
    show: false,
    select: '',
    currentPage: 0,
    pageCount: 10,
    name: '',
    dialog: false,
    headers: [
      {
        text: 'Title',
        align: 'start',
        sortable: false,
        value: 'name',
        width: "1%",
        divider: true,
      },
      {text: 'version', value: 'version'},
      {text: 'description', value: 'description'},
      {text: 'avatar', value: 'owner.avatar'},
      {text: 'license', value: 'license'},
      {text: 'Actions', value: 'actions', sortable: false},
    ],
    personName: '',
    personLink: '',
    personAvatar: '',
    editedItem: {
      name: '',
      version: null,
      description: '',
      homepage: '',
      author: '',
      github: '',
      owner: {},
    }
  }),

  computed: {
    ...mapGetters([
      'PACKAGES',
      'getListPackageVersion',
      'getFilePackage'
    ]),
    listPACKAGES() {
      return this.PACKAGES.hits
    },
    payload() {
      return {
        name: this.name,
        currentPage: this.currentPage,
        pageCount: this.pageCount
      }
    }
  },

  methods: {
    ...mapActions([
      'getData',
      'listVersionData',
      'filePackageData'
    ]),
    async showPackageFile() {
      this.show = !this.show
      const value =
          {
            package: this.name || this.name,
            version: this.select || this.editedItem.version
          }
      await this.$store.dispatch('filePackageData', value)
    },
    getColor(version) {
      const versionColor = +version[0]
      if (versionColor < 1) return 'red'
      else if (versionColor === 1) return 'orange'
      else if (versionColor === 2) return 'yellow'
      else if (versionColor === 3) return 'green'
      else if (versionColor === 4) return 'red'
      else if (versionColor === 5) return 'grey'
      else if (versionColor === 6) return '#911'
      else if (versionColor === 7) return '#541'
      else return 'blue'
    },
    async prevSlide() {
      if (this.currentPage > 0) {
        this.currentPage--
        await this.$store.dispatch('getData', this.payload)
      }
    },
    async nextSlide() {
      if (this.currentPage >= this.PACKAGES.nbPages) {
        this.currentPage = 0
      } else
        this.currentPage++
      await this.$store.dispatch('getData', this.payload)
    },
    async submit() {
      await this.$store.dispatch('getData', this.payload)
    },
    clear() {
      this.name = ''
    },

    async editItem(item) {
      const _ = require('lodash')
      const deepCopy = _.cloneDeep(item.owner)
      this.name = item.name
      this.personName = deepCopy.name
      this.personLink = deepCopy.link
      this.personAvatar = deepCopy.avatar
      this.editedItem = item
      this.dialog = true
      await this.$store.dispatch('listVersionData', item.name)
    },

    close() {
      this.dialog = false
    }
  },
}
</script>

<style lang="scss">
.btn {
  color: $green-color
}

.showFile {
  margin-bottom: 15px;
}
</style>