<template>
  <v-toolbar app flat class="primary">
    <v-toolbar-title class="headline">
      <router-link to="/" class="logo">bibuli</router-link>
    </v-toolbar-title>
    <v-spacer></v-spacer>
    <router-link to="/search">検索</router-link>
  </v-toolbar>
</template>

<script>
</script>

<style>
.v-toolbar a {
  color: #FFF;
  text-decoration: none;
}
.v-toolbar a.router-link-exact-active:not(.logo) {
  border-bottom: 4px solid #FFF;
}
</style>
