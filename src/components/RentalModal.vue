<template :ref="rentalModal">
  <v-dialog v-model="dialog" max-width="640">
    <v-card>
      <v-container>
        <v-layout row wrap align-start>
          <v-flex sm5>
            <v-img v-bind:src="book.thumbnail_url"></v-img>
          </v-flex>
          <v-flex sm7>
            <v-card-title class="headline">{{book.title}}</v-card-title>
            <v-card-text class="pt-0 pb-1">{{book.author}}</v-card-text>
            <v-card-text class="pt-0">{{book.isbn13}}</v-card-text>
            <v-flex sm12>
              <v-card-text class="pt-0">{{book.description}}</v-card-text>
              <v-card-actions>
                <v-btn flat="flat" @click="close">キャンセル</v-btn>
                <v-btn class="primary">借りる</v-btn>
              </v-card-actions>
            </v-flex>
          </v-flex>
        </v-layout>
      </v-container>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  data: function () {
    return {
      dialog: false,
      book: {}
    }
  },
  methods: {
    open (book) {
      this.dialog = true
      this.book = book
    },
    close () {
      this.dialog = false
    }
  }
}
</script>

<style scoped>
.v-card__actions {
  justify-content: flex-end;
}
</style>
