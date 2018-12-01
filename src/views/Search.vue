<template>
  <v-container>
    <v-layout
      text-xs-center
      wrap
      align-center
      justify-center
    >
      <v-flex xs4 sm3 md2 d-flex>
        <v-select
          :items="items"
          label="Solo field"
          solo
        ></v-select>
        </v-flex>
      <v-flex xs8 sm7 md6>
        <v-text-field
          label="Solo"
          placeholder="search..."
          solo
        ></v-text-field>
      </v-flex>
      <v-icon>search</v-icon>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    items: ['タイトル', '著者']
  })
}
</script>

<style>

</style>
