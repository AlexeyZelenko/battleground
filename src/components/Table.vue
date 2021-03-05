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
    <!--    Объем поиска-->
    <!--    <v-text-field-->
    <!--        :value="pageCount"-->
    <!--        @input="pageCount = parseInt($event, 100)"-->
    <!--        label="Объем поиска"-->
    <!--        max="100"-->
    <!--        min="-1"-->
    <!--        type="number"-->
    <!--    ></v-text-field>-->
    <v-data-table
        :headers="headers"
        :items="PACKAGES.hits"
        :items-per-page="itemsPerPage"
        :page.sync="page"
        class="elevation-1"
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
                  class="display-1 text--primary"
                  v-html="editedItem.ownername"
              ></p>
              <v-card-title>
                <span class="headline" v-html="editedItem.name"></span>
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
                          <v-img :src=owneravatar></v-img>
                        </v-list-item-avatar>
                      </v-list-item>

                      <v-list-item link>
                        <v-list-item-content>
                          <v-list-item-title class="title">
                            {{ ownername }}
                          </v-list-item-title>
                          <v-list-item-subtitle>
                            {{ ownerlink }}
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
            color=blue
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
  </v-container>
</template>

<script>
import {mapActions, mapGetters} from 'vuex'

export default {
  data: () => ({
    page: 1,
    pageCount: 100,
    itemsPerPage: 10,
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
      {text: 'author', value: 'ownername'},
      {text: 'avatar', value: 'owner.avatar'},
      {text: 'license', value: 'license'},
      {text: 'Actions', value: 'actions', sortable: false},
    ],
    editedItem: {
      name: '',
      version: null,
      description: '',
      homepage: '',
      author: '',
      github: '',
      owner: {},
      ownername: '',
      ownerlink: '',
      owneravatar: ''
    }
  }),

  computed: {
    ...mapGetters([
      'PACKAGES',
    ])
  },

  watch: {
    dialog(val) {
      val || this.close()
    }
  },

  methods: {
    ...mapActions([
      'getData',
    ]),
    async submit() {
      const value = {
        name: this.name,
        page: this.page,
        pageCount: this.pageCount
      }
      this.getData(value)
    },
    clear() {
      this.name = ''
    },

    editItem(item) {
      const _ = require('lodash')
      const deepCopy = _.cloneDeep(item.owner)
      this.ownername = deepCopy.name
      this.ownerlink = deepCopy.link
      this.owneravatar = deepCopy.avatar
      this.editedItem = item
      this.dialog = true
    },

    close() {
      this.dialog = false
    }
  },
}
</script>