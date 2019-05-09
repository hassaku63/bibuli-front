<template>
<v-container>
  <v-layout row>
    <v-flex xs12 sm6 offset-sm3>
      <v-card v-if="bookList && bookList.length">
        <v-list two-line>
          <template v-for="book in bookList">

            <v-list-tile
              :key="book.title"
              avatar
            >
              <v-list-tile-avatar>
                <img :src="book.thumbnail_Url">
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
      <p class="empty-list" v-else>現在レンタルしている本はありません。</p>
    </v-flex>
    <div class="logout">
      <a class="logout-link" @click="logout">ログアウト</a>
    </div>
  </v-layout>
  <ReturnModal ref="returnModal" @remove="remove"></ReturnModal>
</v-container>
</template>

<script>
import ReturnModal from '../components/ReturnModal.vue'
import books from '../services/books.js'
import Auth from '../services/auth.js'
import store from '../store.js'
import router from '../router.js'

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
      user: 'ahaha',
      bookList: []
    }
  },

  created: function () {
    books.listRentals()
      .then((result) => {
        console.log(result)
        this.bookList = result
      }, (e) => {
        console.log(e)
      })
  },

  computed: {
    today: () => {
      return new Date()
    }
  },

  methods: {
    isExpired (dueDate) {
      dueDate = new Date(dueDate)
      return dueDate < this.today
    },
    openModal (book) {
      this.$refs.returnModal.open(book)
    },
    logout () {
      Auth.logout()
      store.commit('logout')
      router.push('/login')
    },
    remove (bookId) {
      console.log(bookId)
      for (let i = 0; i < this.bookList.length; i++) {
        if (this.bookList[i].book_id === bookId) {
          this.bookList.splice(i, 1)
        }
      }
    }
  }
}
</script>

<style scoped>
.red {
  color: #FF0000;
}
.logout {
  position: absolute;
  bottom: 1rem;
  right: 0;
  left: 0;
  text-align: center;
}
.empty-list {
  padding-left: 16px;
  padding-right: 16px;
}
</style>
