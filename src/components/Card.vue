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

  data () {
    return {
      stockStr: '在庫なし',
      stockColor: '#AAA'
    }
  },

  created: function () {
    if (this.book.stock > 0) {
      this.stockStr = '残り: ' + this.book.stock
      this.stockColor = 'primary'
    }
  }
}
</script>

<style scoped>
.v-card { cursor: pointer; }
</style>
