<template>  
  <div class="new">
      <h2 id='tplType'></h2>
      <p id = "errMsg1" class="alert alert-daver" style="display: none;"></p>
      <form class="form-horizontal edit-user-form well" role="form">            
        <div class="form-group">
          <label for="inputName" class="col-sm-2 control-label">Template Name</label>
          <div class="col-sm-10">
            <input type="text" placeholder="Enter template name...." v-model="template.name" class="form-control">
          </div>
        </div>

        <div class="form-group">
          <label for="inputEmail3" class="col-sm-2 control-label">Versoin</label>
          <div class="col-sm-10">
            <input type="text" placeholder="enter version"  v-model="template.version" class="form-control" >
          </div>
        </div> 

        <div class="form-group">
          <label for="inputEmail3" class="col-sm-2 control-label">Content</label>
          <div class="col-sm-10">
            <input type="text" placeholder="Ener contents of tempalte" v-model="template.content" class="form-control" >
          </div>
        </div>
      
        <div class="form-group">
          <div class="col-sm-offset-2 col-sm-10">
            <input type="submit"  class="btn btn-primary" id="btn_submit" v-on:click="saveTemplate()">
         
          </div>
        </div>
      </form>
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

		mounted:function(){
			if(this.$route.params.id){
				$('#tplType').html("Edit Template")        
			}else{
				$('#tplType').html("Create Template")
			}			
		},
		// watch: {
		//   '$route': 'fetchData'
		// },
		methods: {
			fetchData (params) {
				console.log('inside fetchdata')
				if(this.$route.params.id){
					this.$http.get('http://localhost:8000/templates/'+ this.$route.params.id).then(response => {
						// get body data
						this.template = response.body;

						}, response => {
							// error callback
					});
				}
			},
			saveTemplate: function () {
				if(this.$route.params.id){
					console.log('editing tempale')
					this.$http.put('http://localhost:8000/templates/'+ this.$route.params.id, this.template).then(response => {
							// get body data
							console.log("success respone ")
							this.template = response.body;
							this.$router.push('/') 

						}, response => {
							console.log("error respone ")
							console.log(response)
							// error callback
					});
				}else{		
					console.log('creating tempale')			
					// this.ajaxRequest = true;
					this.$http.post('http://localhost:8000/templates', this.template).then(response => {
							// get body data
							console.log("success respone ")
							this.template = response.body;
							this.$router.push('/') 

						}, response => {
							console.log("error respone ")
							console.log(response)
							// error callback
					});			
				}			
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
	paddiv: 0;
	}

	li {
	display: inline-block;
	margin: 0 10px;
	}

	a {
	color: #42b983;
	}
</style>
