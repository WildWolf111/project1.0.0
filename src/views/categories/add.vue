<script>
import Layout from "../../layouts/main.vue";
import PageHeader from "@/components/page-header";
import appConfig from "../../../app.config";
import CategoriesDataService from "/src/services/CategoriesDataService";

export default {
  
  page: {
    title: "Basic Elements",
    meta: [{ name: "description", content: appConfig.description }],
  },
  data() {
    return {
      title: "Добавление новой категории",
        Category:{
        Id:'',
        Name:"",
        Slug:"",
        Parent_id:1,
        },

       
    };
    
  },
  components: {
    Layout,
    PageHeader,
  },
    methods: {
    addedCategory() {
      var data = {
        "name":this.Category.Name,
        "slug":this.Category.Slug,
        "parent_id":this.Category.Parent_id
      };
  
      CategoriesDataService.create(data)
        .then(response => {
          this.Category.Id = response.data.id;
         
          this.submitted = true;

         if (response.data.message = 202){
        this.Category.Name = ""
        this.Category.Slug = ""
        }
        else{
        return response.data.message}

        })
        .catch(e => {
          console.log(e);
        });
    },
    
    newCategory() {
      this.submitted = false;
      this.Category = {};
    }
  },
 
};
</script>

<template>
  <Layout>
    <PageHeader :title="title" :items="items" />
    
     <div class="row">
          <div>
              <label for="labelInput" class="form-label">{{ $t("t-name") }}</label>
             <input type="Text" class="form-control" id="labelInput" required v-model="Category.Name" >
          </div>                     
     </div> 

      <div class="row">
          <div>
              <label for="labelInput" class="form-label">   {{ $t("t-slug") }}</label>
              <input type="Text" class="form-control" id="labelInput" required v-model="Category.Slug" >
          </div>                     
      </div> 
      
<p>
 
    </p>
  
     <div class="row">
     <div>
        <b-button @click="addedCategory" variant="success" class="waves-effect waves-light" >{{ $t("t-Added") }}</b-button>       
        </div>             
     </div>
      




    </Layout>
</template>
