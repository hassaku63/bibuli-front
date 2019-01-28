<template :ref="returnModal">
  <v-dialog v-model="dialog" max-width="320">
    <v-card>
      <v-card-title class="title mp-4">{{title}} を返却します</v-card-title>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn flat @click="close">キャンセル</v-btn>
        <v-btn flat color="primary">OK</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  data: () => {
    return {
      dialog: false,
      title: '魔法の世紀'
    }
  },

  methods: {
    close: function () {
      this.dialog = false
    },
    open: function (book) {
      this.title = book.title
      this.dialog = true
    }
  }
}
</script>
