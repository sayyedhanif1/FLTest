<template>
  
  <div class="new">
        <h1>Template add </h1>
        


      </div>
</template>

<script>
export default {
  name: 'new',
  data () {
    return {
      'templates': [{
        'name': 'n1',
        'version': 'v1',
        'content': 'contentts......'
      }]
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
