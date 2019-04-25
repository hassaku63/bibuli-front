<template :ref="returnModal">
  <v-dialog v-model="dialog" max-width="320">
    <v-card>
      <v-card-title class="title mp-4">{{title}} を返却します</v-card-title>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn flat @click="close">キャンセル</v-btn>
        <v-btn flat color="primary" @click="onReturnClicked" :loading="loading">{{ buttonText }}</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import books from '../services/books.js'

export default {
  data: () => {
    return {
      dialog: false,
      title: '',
      loading: false,
      buttonText: ''
    }
  },

  methods: {
    close () {
      this.dialog = false
    },
    open (book) {
      this.title = book.title
      this.buttonText = '返す'
      this.dialog = true
    },
    onReturnClicked () {
      this.loading = true
      console.log('clicked')
      books.returnBook()
        .then((result) => {
          console.log(result)
        }, (e) => {
          console.log(e)
        })
      this.loading = false
      this.buttonText = 'OK'
      setTimeout(() => {
        this.dialog = false
      }, 500)
    }
  }
}
</script>
