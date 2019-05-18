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
              <v-card-text :class="{ closed: descriptionClosed }" class="py-0" ref="description">{{book.description}}</v-card-text>
              <v-card-text v-show="overflowed" class="py-0">
                <p v-show="overflowed && descriptionClosed" class="my-0 py-0">···</p>
                <small class="read-more primary--text" @click="onAccordionClicked">{{ accordionText }}</small>
              </v-card-text>
              <v-card-actions class="mt-2">
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
      error: '',
      overflowed: false,
      accordionText: '続きを読む',
      descriptionClosed: true
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
    },
    onAccordionClicked () {
      if (this.descriptionClosed) {
        this.accordionText = '閉じる'
      } else {
        this.accordionText = '続きを読む'
      }
      this.descriptionClosed = !this.descriptionClosed
    }
  },

  watch: {
    book: function (val) {
      let flag = false
      if (!val.length) this.overflowed = flag
      // process
      this.$nextTick(function () {
        let description = this.$refs.description
        if (description) {
          this.overflowed = description.scrollHeight > description.clientHeight
        }
      })
    }
  }
}
</script>

<style scoped>
.v-card__actions {
  justify-content: flex-end;
}
.closed {
  overflow: hidden;
  height: 6em;
}
.read-more {
  cursor: pointer
}
</style>
