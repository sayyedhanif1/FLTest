<template>  
  <div class="container">
        <h1>Template List</h1>
        <table class="table stripped">
          <thead>
            <tr>
              <th>Name </th>
              <th>Version </th>
              <th>Content </th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
              <tr v-for="template in templates">
                <td>{{ template.name }}</td>
                <td>{{ template.version }}</td>
                <td>{{ template.content }}</td>
                <td>
				  <a :href="'#show/' + template._id" class="btn btn-success">Show</a>
                  <a :href="'#edit/' + template._id" class="btn btn-primary">Edit</a>
                  <a v-on:click="delTemplate(template._id)" class="btn btn-danger">Delete</a>
                 </td>                
              </tr> 
          </tbody>          
        </table>
        <div class="container">
           <span class="navbar-text pull-right"><a class="btn btn-primary" href="#new">Add New Template</a></span>
        </div>
    </div>
</template>

<script>
	export default {
  		name: 'hello',
  		data () {
			return {
			'templates': []
			}
		},
		created () {
			this.fetchData()
		},
		watch: {
			'$route': 'fetchData'
		},  
		methods: {
			fetchData () {
				this.$http.get('http://localhost:8000/templates').then(response => {
						// success callback
						// get body data
						this.templates = response.body;

					}, response => {
						// error callback
				});
			},
			delTemplate: function (id) {
				this.$http.delete('http://localhost:8000/templates/'+ id).then(response => {
						// get body data
						this.fetchData();

					}, response => {
						console.log("error respone ")
						console.log(response)
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
</style>

