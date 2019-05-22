<template>
  <v-layout>
    <v-flex xs12 sm4 offset-sm4>
      <v-card class="mt-4 px-2 py-4">
        <v-card-title class="title">bibuliにログイン</v-card-title>
        <v-card-text>
          <v-form
            ref="form"
            v-model="valid"
            lazy-validation
          >
            <v-text-field
              v-model="email"
              :rules="emailRules"
              label="メールアドレス"
              type="email"
              name="email"
              required
            ></v-text-field>
            <v-text-field
              v-model="password"
              :append-icon="show ? 'visibility_off' : 'visibility'"
              :rules="[rules.required, rules.min]"
              :type="show ? 'text' : 'password'"
              name="password"
              label="パスワード"
              hint="At least 8 characters"
              counter
              @click:append="show = !show"
            ></v-text-field>
            <v-layout align-center justify-center class="mt-2">
              <v-btn
                :disabled="!valid"
                color="primary"
                @click="login"
              >
                ログイン
              </v-btn>
            </v-layout>
          </v-form>
        </v-card-text>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import store from '../store.js'
import router from '../router.js'
import Auth from '../services/auth.js'

export default {
  data: () => {
    return {
      email: '',
      password: '',
      show: false,
      valid: false,
      emailRules: [
        // v => !!v || 'E-mail is required',
        // v => /.+@.+/.test(v) || 'E-mail must be valid'
      ],
      rules: {
        required: value => !!value || 'Required.',
        min: v => v.length >= 8 || 'Min 8 characters',
        emailMatch: () => ('The email and password you entered don\'t match')
      }
    }
  },

  methods: {
    login: function () {
      if (this.$refs.form.validate()) {
        Auth.login(this.email, this.password).then(() => {
          store.commit('login')
          router.push(this.$route.query.redirect || 'search')
        }).catch((e) => {
          console.log(e)
        })
      }
    }
  }
}
</script>

<style scoped>
.title {
  justify-content: center;
}
</style>
