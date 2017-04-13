<template>  
  <div class="new">
        <h1>Template Detail</h1>
      <table class="table striped">
        <thead>
          <tr>
            <th>Name </th>
            <th>Version </th>
            <th>Content</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
      
          <tr>
            <td>{{template.name }}</td>
            <td>{{ template.version }}</td>
            <td>{{ template.content }}</td>
            <td><a :href="'#edit/' + template._id" class="btn btn-primary">Edit</a></td>
           
          </tr> 
      
        </tbody>

      </table>
    </div>
</template>

<script>
    export default {
      	name: 'new',
		data () {
			return {
				'template': {}
			}
		},

		created: function() {
			this.fetchData();
		},
		// watch: {
		//   '$route': 'fetchData'
		// },
		methods: {
			fetchData (params) {
				this.$http.get('http://localhost:8000/templates/'+ this.$route.params.id).then(response => {
						// get body data
						this.template = response.body;

					}, response => {
						// error callback
				});			
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
