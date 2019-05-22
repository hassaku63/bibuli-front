<template>
  <v-app>
    <NavBar></NavBar>
    <v-content>
      <v-container>
        <router-view/>
      </v-container>
    </v-content>
    <v-footer>&copy; 2019- bibuli.</v-footer>
  </v-app>
</template>

<script>
import NavBar from './components/NavBar'

export default {
  name: 'App',
  components: {
    NavBar
  },

  data () {
    return {
      //
    }
  }
}
</script>

<style scoped>
.v-content, .v-footer { background-color: #EEEEEE !important; }
.v-footer {
  padding: 0 24px;
  color: #707070!important;
  font-size: .75rem;
}
</style>
