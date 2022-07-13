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
      title: "Добавление нового продукта",
        Product:{
        Id: '',
        Name:"",
        Slug:"",
        SKU:"",
        Short_description:"",
        Full_description:"",
        Brand:{
          Id:-1,
        },
        Sort:0,
        },
        Brands:[
          {
            id:-1,
            text:""
          }
        ],
          jsonPages: {
                PageNumber: 1,
                TotalRecords: 100
      },
       jsonFields: [{
                name:'',
                value: ''
      }],
        
    };
    
  },
  components: {
    Layout,
    PageHeader,
    Select2
  },
    methods: {
    addedProduct() {
      var data = {
        "Name":this.Product.Name,
        "Slug":this.Product.Slug,
        "SKU":this.Product.SKU,
        "short_description":this.Product.Short_description,
        "full_description":this.Product.Full_description,
        "Brand": {
          "Id":parseInt(this.Product.Brand.Id)
          },
        "sort":this.Product.Sort,
      };
       
      ProductsDataService.create(data)
      
        .then(response => {
          this.Product.id = response.data.id;
              console.log("***********************S")
                console.log(response.data)
          this.submitted = true;
             if (response.data.message = 200){
        
                this.Product.Name = ""
                this.Product.Slug = ""
                this.Product.SKU = ""
                this.Product.Short_description = ""
                this.Product.Full_description = ""
                this.Product.Brand.Id = ""
             

        }
        else{
        return response.data.message}
          
        })
        .catch(e => {
          console.log(e);
        });
    },
    
    newCompany() {
      this.submitted = false;
      this.Product = {};
    },
    retrieveBrands(){
      this.jsonPages = {
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
        
    
           console.log(response.data)

          this.perPage = response.data.pg_length;
          
          this.page = response.data.pg_number;
                
                
               
           for(let i = 0; i < response.data.List.length; i++){
        
              let currentBrand = response.data.List[i];
           
              this.Brands[i]={
                
                id:currentBrand.Id,

                text:currentBrand.Name

              };

           


          }
          //this.Brands = response.data.Brands;
console.log("<<<<<<<<<<<>>>>>>>>>>>>>>>")

              console.log(this.Brands)
         
        })
        .catch(e => {
          console.log(e);
        });
    },
     
  },
   mounted() {
    this.retrieveBrands();
  },
    
};
</script>

<template>
  <Layout>
    <PageHeader :title="title" :items="items" />
    
     <div class="row">
          <div>
              <label for="labelInput" class="form-label">{{ $t("t-name") }}</label>
             <input type="Text" class="form-control" id="labelInput" required v-model="Product.Name" >
          </div>                     
     </div> 

      <div class="row">
          <div>
              <label for="labelInput" class="form-label">   {{ $t("t-slug") }}</label>
              <input type="Text" class="form-control" id="labelInput" required v-model="Product.Slug" >
          </div>                     
     </div>

    

      <div class="row">
          <div>
              <label for="labelInput" class="form-label">  {{ $t("t-SKU") }}</label>
             <input type="Text" class="form-control" id="labelInput" required v-model="Product.SKU" >
          </div>                     
     </div>

      <div class="row">
          <div>
              <label for="labelInput" class="form-label"> {{ $t("t-short_description") }}</label>
             <input type="Text" class="form-control" id="labelInput" required v-model="Product.Short_description" >
          </div>                     
     </div>  

 <div class="row">
          <div>
              <label for="labelInput" class="form-label">  {{ $t("t-full_description") }}</label>
              <input type="Text" class="form-control" id="labelInput" required v-model="Product.Full_description" >
          </div>                     
  </div>
<p>
 
    </p>

 

<div class="col-xxl-3 col-md-6">
    <label for="exampleDataList" class="form-label">{{ $t("t-brands") }}</label>
    <Select2 v-model.number="Product.Brand.Id" :options="this.Brands" />
</div>



    <p>
 
    </p>
  
     <div class="row">
     <div>
        <b-button @click="addedProduct" variant="success" class="waves-effect waves-light" >{{ $t("t-Added") }}</b-button>       
        </div>             
     </div>





    </Layout>
</template>
