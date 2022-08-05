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
      title: "Добавление новой компании",
        Country:{
        Id: '',
        Name:"",
        Code:"",
        },

       
    };
    
  },
  components: {
    Layout,
    PageHeader,
  },
    methods: {

      
    addedCountry() {
        
      var data = {
        "name":this.Country.Name,
        "code":parseInt(this.Country.Code),
        
      };
  console.log(data)
      CountryDataService.create(data)
        .then(response => {
          this.Country.Id = response.data.id;
          console.log(response.data)
          this.submitted = true;
            console.log(data)

          if (response.data.message = 202){
        
                this.Country.Name = ""
                this.Country.Code = ""
        }
        else{
        return response.data.message}

        })
        .catch(e => {
          console.log(e);
        });
    },
    
    newCountry() {
      this.submitted = false;
      this.Country = {};
    }
  }
    
};
</script>

<template>
  <Layout>
    <PageHeader :title="title" :items="items" />
    
     <div class="row">
          <div>
              <label for="labelInput" class="form-label">{{ $t("t-Country") }}</label>
             <input type="Text" class="form-control" id="labelInput" required v-model="Country.Name" >
          </div>                     
     </div> 

      <div class="row">
          <div>
              <label for="labelInput" class="form-label">   {{ $t("t-Code") }}</label>
              <input type="Text" class="form-control" id="labelInput" required v-model="Country.Code" >
          </div>                     
     </div>

      
<p>
 
    </p>
  
     <div class="row">
     <div>
        <b-button @click="addedCountry" variant="success" class="waves-effect waves-light" >{{ $t("t-Added") }}</b-button>       
        </div>             
     </div>
      




    </Layout>
</template>
