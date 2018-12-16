<template :ref="rentalModal">
  <v-dialog v-model="dialog" max-width="640">
    <v-card>
      <img src="https://images-na.ssl-images-amazon.com/images/I/41XB0EDY2ZL._SX338_BO1,204,203,200_.jpg" alt="">
      <v-card-title class="headline">Test</v-card-title>
      <v-card-text>test text</v-card-text>
      <v-card-actions>
        <v-btn flat="flat" @click="close">キャンセル</v-btn>
        <v-btn class="primary">借りる</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  data: function () {
    return {
      dialog: false
    }
  },
  methods: {
    open () {
      this.dialog = true
    },
    close () {
      this.dialog = false
    }
  }
}
</script>
