<template :ref="rentalModal">
  <v-dialog v-model="dialog" max-width="640">
    <v-card>
      <v-container>
        <v-layout row wrap align-start>
          <v-flex sm5>
            <v-img v-bind:src="book.thumbnail_Url"></v-img>
          </v-flex>
          <v-flex sm7>
            <v-card-title class="headline">{{book.title}}</v-card-title>
            <v-card-text class="pt-0 pb-1">{{book.author}}</v-card-text>
            <v-card-text class="pt-0">{{book.isbn13}}</v-card-text>
            <v-flex sm12>
              <v-card-text class="pt-0">{{book.description}}</v-card-text>
              <v-card-actions>
                <v-btn flat="flat" @click="close">キャンセル</v-btn>
                <v-btn class="primary" @click="onRentalClicked" :loading="loading" :disabled="disabled">{{ buttonText }}</v-btn>
              </v-card-actions>
            </v-flex>
            <v-card-text v-if="error">
              <v-alert
                :value="true"
                color="warning"
                icon="priority_high"
                outline
              >{{error}}</v-alert>
            </v-card-text>
          </v-flex>
        </v-layout>
      </v-container>
    </v-card>
  </v-dialog>
</template>

<script>
import books from '../services/books.js'

export default {
  data: function () {
    return {
      dialog: false,
      book: {},
      buttonText: '',
      loading: false,
      disabled: false,
      error: ''
    }
  },
  methods: {
    open (book) {
      this.error = ''
      if (book.stock <= 0) {
        this.disabled = true
        this.buttonText = '在庫なし'
      } else {
        this.disabled = false
        this.buttonText = '借りる'
      }
      this.dialog = true
      this.book = book
    },
    close () {
      this.dialog = false
    },
    onRentalClicked () {
      this.dialog = true
      this.loading = true
      let bookId = this.book.book_id // 実IDを取得
      books.rentalBook(bookId)
        .then((result) => {
          if (!result.rental_id) {
            this.buttonText = 'ERROR'
            this.loading = false
            if (result.status.indexOf('out of stock!') !== -1) {
              this.error = '在庫が切れてしまいました...'
            }
          } else {
            this.buttonText = 'OK'
            this.loading = false
            setTimeout(() => {
              this.dialog = false
            }, 500)
          }
        }, (e) => {
          console.log(e)
          this.buttonText = 'Error'
          this.loading = false
        })
    }
  }
}
</script>

<style scoped>
.v-card__actions {
  justify-content: flex-end;
}
</style>
