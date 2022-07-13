<script>
import Layout from "../../layouts/main.vue";
import PageHeader from "@/components/page-header";
import appConfig from "../../../app.config";
import ProductsDataService from "/src/services/ProductsDataService";
import BrandsDataService from "/src/services/BrandsDataService";
import Select2 from 'vue3-select2-component';

export default {
  
  page: {
    title: "Basic Elements",
    meta: [{ name: "description", content: appConfig.description }],
  },
  data() {
   return {
      currentProduct:{
          Id:-1,
          Name:"",
          Slug:"",
          SKU:"",
          short_description:"",
          full_description:"",
          Brand:{
            Id:-1,
          },
      },
      message: '',
        Brands:[
          {
            id:-1,
            text:""
          }
        ],
        selectBrand:
          {
            id:-1,
            text:""
          }
        ,
    };
    
  },
  components: {
    Layout,
    PageHeader,
    Select2
  },
    methods: {
    getProduct(id) {
       
       ProductsDataService.get(id)
        .then(response => {
         
            console.log(response.data)
            if (response.status == 200){
              this.currentProduct = response.data;
            }else{
              this.$router.push({path: "/products"});
              
            }
          
        })
        .catch(e => {
          console.log(e);
        });
    },

    updateProduct() {
        
        this.currentProduct.Brand.Id = parseInt(this.currentProduct.Brand.Id);
       ProductsDataService.update(this.currentProduct.Id, this.currentProduct)
       
        .then(response => {
         
          this.message = 'The Product was updated successfully!';
        if (response.data.status_code == 200){
        this.$router.push({path: "/products"})}
        else{
        return response.data.message}
        })
        
        .catch(e => {
          console.log(e);
        });
        
    },

    deleteProduct() {
      
      ProductsDataService.delete(this.currentProduct.Id)
        .then(response => {
         
          this.$router.push({ name: "product" });
        if (response.status == 202){
        this.$router.push({path: "/products"})}
        else{
        return response.data.message}
        
        })
        .catch(e => {
          console.log(e);
        });
        
    },
    
       retrieveBrands(){
        
      this. jsonPages = {
               pg_number:1,
                  pg_length: 1000
            };
         
            if (this.search!=""){
            this.jsonFields = [{
                field:"name",
                value: this.search
            }];
            }else{
                this.jsonFields = [];
            }


       BrandsDataService.getAll(this.jsonFields,[],this.jsonPages)
        .then(response => {
          console.log(response.data);
          for(let i = 0; i < response.data.List.length; i++){
            console.log("<<<<<<<<<<>>>>>>>>>>>>")
            console.log(response.data.List.length)
              let currentBrand = response.data.List[i];
            if (currentBrand.Id == this.currentProduct.Brand.Id){
                this.selectBrand.id = currentBrand.Id;
                this.selectBrand.text = currentBrand.Name;
            }
              this.Brands[i]={
                id:currentBrand.Id, 
                text:currentBrand.Name
              };
              
          }
          //this.Brands = response.data.Brands;
        
         
        })
        .catch(e => {
          console.log(e);
        });
    },
     mySelectEvent({id, text}){
            this.currentProduct.Brand.Id = id;
            this.currentProduct.Brand.Name = text;
     }
  },
  mounted() {
    this.message = '';
    
    this.getProduct(this.$route.params.id);
     this.retrieveBrands();
     
    
  }

    
};
</script>

<template>
  <Layout>
    <PageHeader :title="title" :items="items" />
    
     <div class="row">
          <div>
              <label for="labelInput" class="form-label">{{ $t("t-name") }}</label>
             <input type="text" class="form-control" id="labelInput" required  v-model="currentProduct.Name" >
          </div>                     
     </div> 

      <div class="row">
          <div>
              <label for="labelInput" class="form-label">   {{ $t("t-slug") }}</label>
              <input type="text" class="form-control" id="labelInput" required v-model="currentProduct.Slug" >
          </div>                     
     </div>
        <div class="row">
          <div>
              <label for="labelInput" class="form-label">   {{ $t("t-SKU") }}</label>
              <input type="Text" class="form-control" id="labelInput" required v-model="currentProduct.SKU" >
          </div>                     
     </div>
           <div class="row">
          <div>
              <label for="labelInput" class="form-label"> {{ $t("t-short_description") }}</label>
             <input type="Text" class="form-control" id="labelInput" required v-model="currentProduct.short_description" >
          </div>                     
     </div>  

 <div class="row">
          <div>
              <label for="labelInput" class="form-label">  {{ $t("t-full_description") }}</label>
              <input type="Text" class="form-control" id="labelInput" required v-model="currentProduct.full_description" >
          </div>                     
  </div>

<div class="col-xxl-3 col-md-6">
    <label for="exampleDataList" class="form-label">{{ $t("t-brands") }}</label>
    <Select2 v-model="currentProduct.Brand.Id" :options="this.Brands" @select="mySelectEvent($event)"/>
</div>

      
<p>
 
    </p>
  
    
            <div class="row">
                <div>
                    <b-button @click="updateProduct" variant="success" class="waves-effect waves-light" >{{ $t("t-Save") }}</b-button> 
                              
                </div> 
            </div>




    </Layout>
</template>
