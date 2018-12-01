<template>
  <v-container>
    <v-layout
      text-xs-center
      wrap
      align-center
      justify-center
    >
      <v-flex xs4 sm3 md2 d-flex>
        <v-select
          :items="items"
          label="Solo field"
          solo
        ></v-select>
        </v-flex>
      <v-flex xs8 sm7 md6>
        <v-text-field
          v-model="text"
          label="Solo"
          placeholder="search..."
          solo
        ></v-text-field>
      </v-flex>
    <v-btn flat icon @click="onSearchClicked">
      <v-icon>search</v-icon>
    </v-btn>
    </v-layout>
    <Card v-for="(book) in books" :key="book.book_id" :book="book"></Card>
  </v-container>
</template>

<script>
import Card from '../components/Card.vue'
import searcher from '../services/search'

export default {
  components: {
    Card
  },
  data: () => ({
    items: ['タイトル', '著者'],
    books: [],
    text: '',
    error: ''
  }),
  methods: {
    onSearchClicked: function () {
      let self = this
      searcher.bookSearch(this.text, 'title')
        .then(function (books) {
          books.forEach(book => {
            self.books.splice(0, self.books.length, ...books)
          })
        }).catch(function (e) {
          console.log(e.message)
        })
    }
  }
}
</script>

<style>
</style>
