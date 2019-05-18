<template>
<v-flex xs12 sm4>
  <v-card class="book-card">
    <v-img v-bind:src="book.thumbnail_Url" aspect-ratio="1.5">
    <v-chip color="primary" text-color="white" small label>
      <span>{{ stockChip }}</span>
    </v-chip>
    </v-img>
    <v-card-title>
      <div>
        <h3>{{book.title}}</h3>
        <div>{{book.author}} 著</div>
        <div>ISBN-{{book.isbn13}}</div>
      </div>
    </v-card-title>
  </v-card>
</v-flex>
</template>

<script>
export default {
  props: ['book'],

  computed: {
    stockChip: function () {
      if (this.book.stock <= 0) {
        return '在庫なし'
      }
      return '残り: ' + this.book.stock
    }
  }
}
</script>

<style scoped>
.book-card {
  cursor: pointer
}
.book-card .v-card__title {
  position: absolute;
  height: 60%;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0,0,0,.5);
  color: #FFF;
}
</style>
