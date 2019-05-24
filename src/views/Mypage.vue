<template>
  <v-layout justify-center>
    <v-flex xs12 sm6 class="pb-5">
      <div class="text-xs-center" v-show="loading">
        <v-progress-circular indeterminate color="primary" :width="3"></v-progress-circular>
      </div>
      <v-card v-show="!loading" v-if="bookList && bookList.length">
        <v-list two-line>
          <template v-for="book in bookList">

            <v-list-tile
              :key="book.rental_id"
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
      <p class="empty-list" v-show="!loading" v-else>現在レンタルしている本はありません。</p>
    </v-flex>
    <div class="logout">
      <a class="logout-link" @click="logout">ログアウト</a>
    </div>
    <ReturnModal ref="returnModal"></ReturnModal>
  </v-layout>
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
      loading: true
    }
  },

  created: function () {
    if (!store.state.rentalList.length) {
      books.listRentals()
        .then((result) => {
          store.commit('setRentalList', result)
          this.loading = false
        }, (e) => {
          console.log(e)
        })
    } else {
      this.loading = false
    }
  },

  computed: {
    today () {
      return new Date()
    },
    bookList () {
      return store.state.rentalList.sort((a, b) => {
        return (a.due_date < b.due_date) ? -1 : (a.due_date > b.due_date) ? 1 : 0
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
    },
    logout () {
      Auth.logout()
      store.commit('logout')
      router.push('/login')
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
  bottom: .5rem;
  right: 0;
  left: 0;
  text-align: center;
}
.empty-list {
  padding-left: 16px;
  padding-right: 16px;
}
</style>
