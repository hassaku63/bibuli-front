<template>
  <v-toolbar app flat>
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
.v-toolbar {
  background-color: #4CB5AB !important;
}
a {
  color: #FFF !important;
  text-decoration: none;
}
a.router-link-exact-active:not(.logo) {
  border-bottom: 4px solid #FFF;
}
</style>
