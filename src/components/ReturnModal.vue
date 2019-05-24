<template :ref="returnModal">
  <v-dialog v-model="dialog" max-width="320">
    <v-card>
      <v-card-title class="title mp-4">{{ book.title }} を返却します</v-card-title>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn flat @click="close">キャンセル</v-btn>
        <v-btn flat color="primary" @click="onReturnClicked(book.rental_id)" :loading="loading">{{ buttonText }}</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import books from '../services/books.js'
import store from '../store.js'

export default {
  data: () => {
    return {
      dialog: false,
      loading: false,
      buttonText: '',
      book: {}
    }
  },

  methods: {
    open (book) {
      this.book = book
      this.buttonText = '返す'
      this.dialog = true
    },
    close () {
      this.dialog = false
    },
    onReturnClicked (rentalId) {
      console.log(rentalId)
      this.loading = true
      books.returnBook(rentalId)
        .then((result) => {
          this.loading = false
          this.buttonText = 'OK'
          setTimeout(() => {
            this.dialog = false
            store.commit('returnBook', rentalId)
            store.commit('incrStock', this.book.book_id)
          }, 500)
        }, (e) => {
          this.loading = false
          this.buttonText = 'Error'
          console.log(e)
        })
    }
  }
}
</script>
