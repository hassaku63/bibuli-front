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
        <v-flex xs8 sm7 md6 class="search-bar">
          <v-text-field
            v-model="text"
            v-on:keyup.enter="onSearchClicked"
            label="Solo"
            placeholder="search..."
            class="search-text"
            solo
          ></v-text-field>
          <v-btn flat icon @click="onSearchClicked" class="search-icon">
            <v-icon>search</v-icon>
          </v-btn>
        </v-flex>
      </v-layout>
      <v-layout v-if="error">
        <v-alert
          :value="true"
          color="warning"
          icon="priority_high"
          outline
        >{{error}}</v-alert>
      </v-layout>
      <v-layout class="book-list">
        <Card v-for="(book) in books" :key="book.book_id" :book="book" @click.native="openModal(book)"></Card>
        <RentalModal ref="rentalModal"></RentalModal>
      </v-layout>
    </v-container>
</template>

<script>
import Card from '../components/Card.vue'
import RentalModal from '../components/RentalModal.vue'
import Book from '@/services/books.js'

const types = {
  'タイトル': 'title'
  // '著者': 'author'
}

export default {
  components: {
    Card,
    RentalModal
  },
  data: () => ({
    type: 'タイトル',
    types: ['タイトル'], //, '著者'],
    books: [],
    text: '',
    error: ''
  }),
  methods: {
    onSearchClicked: function () {
      let self = this
      self.error = ''
      Book.search(self.text, types[self.type])
        .then(function (books) {
          // books = []
          if (!books.length) {
            self.error = '該当する書籍が見つかりませんでした。'
          } else {
            books.forEach(book => {
              self.books.splice(0, self.books.length, ...books)
            })
          }
        }).catch(function (e) {
          self.books.splice(0, self.books.length)
          self.error = e.message
        })
    },
    openModal: function (book) {
      this.$refs.rentalModal.open(book)
    }
  }
}
</script>

<style>
.search-bar {
  position: relative;
}
.search-bar .search-icon {
  position: absolute;
  top: 0;
  right: 0;
}
.book-list {
  justify-content: space-between;
}
.book-list .v-responsive__content {
  width: 30%;
}
</style>
