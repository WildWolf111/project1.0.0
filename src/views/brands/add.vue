<script>
import Layout from "../../layouts/main.vue";
import PageHeader from "@/components/page-header";
import appConfig from "../../../app.config";
import BrandsDataService from "/src/services/BrandsDataService";

export default {
  
  page: {
    title: "Basic Elements",
    meta: [{ name: "description", content: appConfig.description }],
  },
  data() {
    return {
      title: "Добавление нового брэнда",
        Brand:{
        Id: '',
        Name:"",
        Slug:"",
        },

       
    };
    
  },
  components: {
    Layout,
    PageHeader,
  },
    methods: {
    addedBrand() {
         
      var data = {
        "Name":this.Brand.Name,
        "Slug":this.Brand.Slug,
        
      };
 
      BrandsDataService.create(data)
        .then(response => {
          this.Brand.id = response.data.id;
          console.log(response.data)
          this.submitted = true;


          if (response.data.message = 202){
        
                this.Brand.Name = ""
                this.Brand.Slug = ""
        }
        else{
        return response.data.message}

        })
        .catch(e => {
          console.log(e);
        });
    },
    
    newBrand() {
      this.submitted = false;
      this.Brand = {};
    }
  }
    
};
</script>

<template>
  <Layout>
    <PageHeader :title="title" :items="items" />
    
     <div class="row">
          <div>
              <label for="labelInput" class="form-label">{{ $t("t-name") }}</label>
             <input type="Text" class="form-control" id="labelInput" required v-model="Brand.Name" >
          </div>                     
     </div> 

      <div class="row">
          <div>
              <label for="labelInput" class="form-label">   {{ $t("t-slug") }}</label>
              <input type="Text" class="form-control" id="labelInput" required v-model="Brand.Slug" >
          </div>                     
     </div>

      
<p>
 
    </p>
  
     <div class="row">
     <div>
        <b-button @click="addedBrand" variant="success" class="waves-effect waves-light" >{{ $t("t-Added") }}</b-button>       
        </div>             
     </div>
      




    </Layout>
</template>
