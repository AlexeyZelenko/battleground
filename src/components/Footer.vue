<template>
  <v-container>
    <v-footer
        dark
        padless
    >
      <v-card
          class="flex"
          flat
          tile
      >
        <v-card-text class="py-2 white--text text-center footer_class">
          {{ new Date().getFullYear() }} — <strong>Vuetify</strong>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-text>
          <v-row
              align="center"
              class="spacer"
              justify="center"
              no-gutters
          >
            <v-col
                cols="6"
                md="1"
                sm="2"
            >
              <template>
                <v-container
                    fluid
                    style="height: 60px"
                >
                  <v-row justify="center">
                    <v-menu
                        bottom
                        min-width="200px"
                        offset-y
                        rounded
                    >
                      <template v-slot:activator="{ on }">
                        <v-btn
                            v-on="on"
                            icon
                            x-large
                        >
                          <v-avatar
                              color="brown"
                              size="64"
                          >
                            <img alt="" src="@/assets/avatar.png">
                          </v-avatar>
                        </v-btn>
                      </template>
                      <v-card>
                        <v-list-item-content class="justify-center">
                          <div class="mx-auto text-center">
                            <v-avatar class="avatar">
                              <span class="white--text headline">{{ user.initials }}</span>
                            </v-avatar>
                            <h3>{{ user.fullName }}</h3>
                            <p class="caption mt-1">
                              {{ user.email }}
                            </p>
                            <v-divider class="my-3"></v-divider>
                            <v-btn
                                depressed
                                rounded
                                text
                                href="https://github.com/AlexeyZelenko/battleground"
                            >
                              Git проэкта
                            </v-btn>
                          </div>
                        </v-list-item-content>
                      </v-card>
                    </v-menu>
                  </v-row>
                </v-container>
              </template>
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
    </v-footer>
  </v-container>
</template>

<script>
export default {
  name: 'HelloWorld',
  data: () => ({
    user: {
      initials: 'OZ',
      fullName: "Oleksii Zelenko",
      email: 'zelenkooleksii75@gmail.com',
    },
  }),
}
</script>

<style lang="scss">
@import '../assets/styles/styles.scss';

.avatar {
  background-color: $green-bg;
}
</style>
