<template>
  <v-card flat color="transparent">
    <v-img :src="book.thumbnail_Url" aspect-ratio="0.75">
      <v-chip :color="stockColor" text-color="white" small label>
        <span>{{ stockStr }}</span>
      </v-chip>
    </v-img>
    <v-card-title class="caption px-0 py-1">{{book.title}} | {{book.author}}</v-card-title>
  </v-card>
</template>

<script>
export default {
  props: ['book'],

  computed: {
    stock: function () {
      return parseInt(this.book.stock)
    },
    stockStr: function () {
      return this.stock ? `残り: ${this.stock}` : '在庫なし'
    },
    stockColor: function () {
      return this.stock ? 'primary' : '#AAA'
    }
  }
}
</script>

<style scoped>
.v-card { cursor: pointer; }
</style>
