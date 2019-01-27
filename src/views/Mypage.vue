<template>
<v-container>
  <v-layout row>
    <v-flex xs12 sm6 offset-sm3>
      <v-card>
        <v-list three-line>
          <template v-for="(book, index) in books">
            <v-subheader>{{ user }}さん</v-subheader>

            <v-list-tile
              :key="book.title"
              avatar
            >
              <v-list-tile-avatar>
                <img :src="book.thumbnail">
              </v-list-tile-avatar>

              <v-list-tile-content>
                <v-list-tile-title v-html="book.title"></v-list-tile-title>
                <v-list-tile-sub-title v-html="book.due_date"></v-list-tile-sub-title>
              </v-list-tile-content>

              <v-list-tile-action>
                <v-btn flat :color="expired(book.due_date)">返却</v-btn>
              </v-list-tile-action>
            </v-list-tile>

          </template>
        </v-list>
      </v-card>
    </v-flex>
  </v-layout>
</v-container>
</template>

<script>
export default {
  data: () => {
    return {
      setting: {
        divider: true,
        inset: true
      },
      user: 'ahaha',
      books: [
        {
          thumbnail: 'https://images-fe.ssl-images-amazon.com/images/I/51bPeV7xPFL.jpg',
          title: '魔法の世紀',
          due_date: '2019/1/30'
        }
      ]
    }
  },

  computed: {
    today: () => {
      return new Date()
    }
  },

  methods: {
    expired: function (dueDate) {
      dueDate = new Date(dueDate)
      return dueDate > this.today ? 'primary' : 'error'
    }
  }
}
</script>
