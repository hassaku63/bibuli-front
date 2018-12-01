<template>
<ul>
<li>{{book.title}}</li>
<li>{{book.author}}</li>
</ul>
</template>

<script>
export default {
  props: ['book']
}
</script>
