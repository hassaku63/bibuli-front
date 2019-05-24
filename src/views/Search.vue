<template>
    <v-layout justify-center wrap>
      <!--<v-flex xs4 sm3 md2>
        <v-select
          :items="types"
          v-model="type"
          label="by"
          solo
        ></v-select>
        </v-flex>-->
      <v-flex xs12 sm8 md6 class="search-bar">
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
      <v-flex xs12 sm8 md8>
        <v-alert
          :value="error"
          color="warning"
          icon="priority_high"
          outline
        >{{error}}</v-alert>
      </v-flex>
      <v-flex xs12>
        <v-container grid-list-xl fluid class="px-0">
          <v-layout justify-start row wrap class="book-list">
            <v-flex xs6 sm3 lg2 v-for="book in books" :key="book.book_id">
              <Card :book="book" @click.native="openModal(book)"></Card>
            </v-flex>
          </v-layout>
        </v-container>
      </v-flex>
      <RentalModal ref="rentalModal" @decr="decrStock"></RentalModal>
    </v-layout>
</template>

<script>
import Card from '../components/Card.vue'
import RentalModal from '../components/RentalModal.vue'
import Book from '@/services/books.js'

// const types = {
//   'タイトル': 'title'
//   '著者': 'author'
// }

export default {
  components: {
    Card,
    RentalModal
  },

  data: () => ({
    type: 'title',
    // types: ['タイトル'], //, '著者'],
    text: '',
    error: ''
  }),

  computed: {
    books: function () {
      return this.$store.state.searchList
    }
  },

  methods: {
    onSearchClicked: function () {
      let self = this
      self.error = ''
      Book.search(self.text, self.type)
        .then(function (books) {
          // books = []
          if (!books.length) {
            self.error = '該当する書籍が見つかりませんでした。'
          } else {
            self.$store.commit('setSearchList', books)
          }
        }).catch(function (e) {
          self.error = e.message
        })
    },
    openModal: function (book) {
      this.$refs.rentalModal.open(book)
    },
    decrStock: function (bookId) {
      this.$store.commit('decrStock', bookId)
      console.log(this.$store.state.searchList)
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
</style>
