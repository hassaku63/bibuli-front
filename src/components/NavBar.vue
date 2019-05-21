<template>
  <v-toolbar app flat dark class="primary">
    <v-toolbar-title class="headline">
      <router-link to="/" class="logo">bibuli</router-link>
    </v-toolbar-title>
    <v-spacer></v-spacer>
    <v-toolbar-items>
      <v-btn v-show="loggedIn" :to="{name: 'search'}" flat>検索</v-btn>
      <v-btn v-show="loggedIn" :to="{name: 'mypage'}" flat>マイページ</v-btn>
      <v-btn v-show="!loggedIn" :to="{name: 'login'}" flat>ログイン</v-btn>
    </v-toolbar-items>
  </v-toolbar>
</template>

<script>
export default {
  computed: {
    loggedIn: function () {
      return this.$store.state.loggedIn
    }
  }
}
</script>

<style scoped>
.v-toolbar a {
  color: #FFF;
  text-decoration: none;
}
.v-toolbar a.v-btn--active {
  position: relative;
}
.v-toolbar a.v-btn--active:after {
  display: block;
  content: "";
  background-color: #FFF;
  height: 4px;
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
}
</style>
