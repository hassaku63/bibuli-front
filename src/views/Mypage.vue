<template>
<v-container>
  <v-layout row>
    <v-flex xs12 sm6 offset-sm3>
      <v-subheader>{{ user }}さん</v-subheader>
      <v-card>
        <v-list two-line>
          <template v-for="book in books">

            <v-list-tile
              :key="book.title"
              avatar
            >
              <v-list-tile-avatar>
                <img :src="book.thumbnail">
              </v-list-tile-avatar>

              <v-list-tile-content>
                <v-list-tile-title>{{ book.title }}</v-list-tile-title>
                <v-list-tile-sub-title class="caption">返却期限日: <span :class="{ 'red--text': isExpired(book.due_date) }">{{ book.due_date }}</span></v-list-tile-sub-title>
              </v-list-tile-content>

              <v-list-tile-action>
                <v-btn flat color="primary" @click="openModal(book)">返却</v-btn>
              </v-list-tile-action>
            </v-list-tile>

          </template>
        </v-list>
      </v-card>
    </v-flex>
  </v-layout>
  <ReturnModal ref="returnModal"></ReturnModal>
</v-container>
</template>

<script>
import ReturnModal from '../components/ReturnModal.vue'
import books from '../services/books.js'

export default {
  components: {
    ReturnModal
  },
  data: () => {
    return {
      setting: {
        divider: true,
        inset: true
      },
      user: 'ahaha'
      // books: [
      //   {
      //     thumbnail: 'https://images-fe.ssl-images-amazon.com/images/I/51bPeV7xPFL.jpg',
      //     title: '魔法の世紀',
      //     due_date: '2019/1/30'
      //   },
      //   {
      //     thumbnail: 'https://images-fe.ssl-images-amazon.com/images/I/51bPeV7xPFL.jpg',
      //     title: 'ある男',
      //     due_date: '2019/1/23'
      //   }
      // ]
    }
  },

  computed: {
    today: () => {
      return new Date()
    },
    books: () => {
      books.listRentals()
        .then((result) => {
          console.log('success')
          return result
        }, (e) => {
          console.log(e)
        })
    }
  },

  methods: {
    isExpired (dueDate) {
      dueDate = new Date(dueDate)
      return dueDate < this.today
    },
    openModal (book) {
      this.$refs.returnModal.open(book)
    }
  }
}
</script>

<style scoped>
.red {
  color: #FF0000;
}
</style>
