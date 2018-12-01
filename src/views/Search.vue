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
          :items="types"
          v-model="type"
          label="by"
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
      <v-layout>
        <Card v-for="(book) in books" :key="book.book_id" :book="book"></Card>
      </v-layout>
    </v-container>
</template>

<script>
import Card from '../components/Card.vue'
import searcher from '../services/search'

const types = {
  'タイトル': 'title',
  '著者': 'author'
}

export default {
  components: {
    Card
  },
  data: () => ({
    type: 'タイトル',
    types: ['タイトル', '著者'],
    books: [],
    text: '',
    error: ''
  }),
  methods: {
    onSearchClicked: function () {
      let self = this
      console.log(self.type)
      searcher.bookSearch(self.text, types[self.type])
        .then(function (books) {
          books.forEach(book => {
            self.books.splice(0, self.books.length, ...books)
          })
        }).catch(function (e) {
          self.books.splice(0, self.books.length)
          console.log(e.message)
        })
    }
  }
}
</script>

<style>
</style>
