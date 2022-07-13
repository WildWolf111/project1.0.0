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
      currentBrand:{
          Id:-1,
          Name:"",
          Slug:""
      },
      message: ''
    };
    
  },
  components: {
    Layout,
    PageHeader,
  },
    methods: {
    getBrand(id) {
       
       BrandsDataService.get(id)
        .then(response => {
            
            if (response.status == 200){
              this.currentBrand = response.data;
            }else{
              this.$router.push({path: "/brands"});
              
            }
          
        })
        .catch(e => {
          console.log(e);
        });
    },

    updateBrand() {
       
       BrandsDataService.update(this.currentBrand.Id, this.currentBrand)
       
        .then(response => {
          
          this.message = 'The Brand was updated successfully!';
        if (response.data.status_code == 200){
        this.$router.push({path: "/brands"})}
        else{
        return response.data.message}
        })
        
        .catch(e => {
          console.log(e);
        });
        
    },

    deleteBrand() {
      
      BrandsDataService.delete(this.currentBrand.Id)
        .then(response => {
        
          this.$router.push({ name: "brand" });
        if (response.status == 202){
        this.$router.push({path: "/brands"})}
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
    
    this.getBrand(this.$route.params.id);
  }

    
};
</script>

<template>
  <Layout>
    <PageHeader :title="title" :items="items" />
    
     <div class="row">
          <div>
              <label for="labelInput" class="form-label">{{ $t("t-name") }}</label>
             <input type="Text" class="form-control" id="labelInput" required  v-model="currentBrand.Name" >
          </div>                     
     </div> 

      <div class="row">
          <div>
              <label for="labelInput" class="form-label">   {{ $t("t-slug") }}</label>
              <input type="Text" class="form-control" id="labelInput" required v-model="currentBrand.Slug" >
          </div>                     
     </div>

      
<p>
 
    </p>
  
    
            <div class="row">
                <div>
                    <b-button @click="updateBrand" variant="success" class="waves-effect waves-light" >{{ $t("t-Save") }}</b-button> 
                              
                </div> 
            </div>




    </Layout>
</template>
