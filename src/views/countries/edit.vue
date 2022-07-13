<script>
import Layout from "../../layouts/main.vue";
import PageHeader from "@/components/page-header";
import appConfig from "../../../app.config";
import CountryDataService from "/src/services/CountryDataService";

export default {
  
  page: {
    title: "Basic Elements",
    meta: [{ name: "description", content: appConfig.description }],
  },
  data() {
   return {
      currentCountry:{
          Id:-1,
          Name:"",
          Code:0,
      },
      message: ''
    };
    
  },
  components: {
    Layout,
    PageHeader,
  },
    methods: {
    getCountry(id) {
       
       CountryDataService.get(id)
        .then(response => {
          console.log("696969696969696969696969696969696969")
            console.log(response.data)
            if (response.status == 200){
              this.currentCountry = response.data;
            }else{
              this.$router.push({path: "/countries"});
              
            }
          
        })
        .catch(e => {
          console.log(e);
        });
    },

    updateCountry() {
       
       CountryDataService.update(this.currentCountry.id, this.currentCountry)
    
        
        .then(response => {

          
             console.log("14881488148814881488148814881488")
          console.log(response.data)

          parseInt(this.currentCountry.Code)
          this.message = 'The Country was updated successfully!';
        if (response.data.status_code == 200){
        this.$router.push({path: "/countries"})}
        else{
        return response.data.message}
      
        })
        
        .catch(e => {
          console.log(e);
        });
        
    },

 
  },
  mounted() {
    this.message = '';
    
    this.getCountry(this.$route.params.id);
  }

    
};
</script>

<template>
  <Layout>
    <PageHeader :title="title" :items="items" />
    
     <div class="row">
          <div>
              <label for="labelInput" class="form-label">{{ $t("t-code") }}</label>
             <input type="Text" class="form-control" id="labelInput" required  v-model.number="currentCountry.code" >
          </div>                     
     </div> 

      <div class="row">
          <div>
              <label for="labelInput" class="form-label">   {{ $t("t-name") }}</label>
              <input type="Text" class="form-control" id="labelInput" required v-model="currentCountry.name" >
          </div>                     
     </div>

      
<p>
 
    </p>
  
    
            <div class="row">
                <div>
                    <b-button @click="updateCountry" variant="success" class="waves-effect waves-light" >{{ $t("t-Save") }}</b-button> 
                              
                </div> 
            </div>




    </Layout>
</template>
