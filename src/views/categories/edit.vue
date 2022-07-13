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
      currentCategory:{
       id_categories:-1,
        Name:"",
        Slug:"",
        parent_id:1,
      },
      message: ''
    };
    
  },
  components: {
    Layout,
    PageHeader,
  },
    methods: {
    getCategory(id) {
 
       CategoriesDataService.get(id)
        .then(response => {
            
            if (response.status === 200){
              this.currentCategory = response.data;
            }else{
              this.$router.push({path: "/categories"});
              
            }
            console.log('---------------------------------')
           console.log(response)
        })
        .catch(e => {
          console.log(e);
        });
    },

    updateCategory() {
       
       CategoriesDataService.update(this.currentCategory.id_categories, this.currentCategory)
       
        .then(response => {
          console.log('_____________________________')
           console.log(response)
          this.message = 'The Category was updated successfully!';
        if (response.data.status_code == 200){
        this.$router.push({path: "/categories"})}
        else{
        return response.data.message}
        })
        
        .catch(e => {
          console.log(e);
        });
        
    },

    deleteCategory() {
      
      CategoriesDataService.delete(this.currentCategory.id_categories)
        .then(response => {
      
          this.$router.push({ name: "category" });
        if (response.status == 202){
        this.$router.push({path: "/categories"})}
        else{
        return response.data.message}
        
        })
        .catch(e => {
          console.log(e);
        });
        
    }
  },
  mounted() {
    this.message = '';
    
    this.getCategory(this.$route.params.id);
  }

    
};
</script>

<template>
  <Layout>
    <PageHeader :title="title" :items="items" />
    
     <div class="row">
          <div>
              <label for="labelInput" class="form-label">{{ $t("t-name") }}</label>
             <input type="Text" class="form-control" id="labelInput" required  v-model="currentCategory.name" >
          </div>                     
     </div> 

      <div class="row">
          <div>
              <label for="labelInput" class="form-label">   {{ $t("t-slug") }}</label>
              <input type="Text" class="form-control" id="labelInput" required v-model="currentCategory.slug" >
          </div>                     
     </div>

      
<p>
 
    </p>
  
    
            <div class="row">
                <div>
                    <b-button @click="updateCategory" variant="success" class="waves-effect waves-light" >{{ $t("t-Save") }}</b-button> 
                              
                </div> 
            </div>




    </Layout>
</template>
