<script>
import Layout from "../../layouts/main.vue";
import PageHeader from "@/components/page-header";
import appConfig from "../../../app.config";
import ProductsDataService from "/src/services/ProductsDataService";

export default {
  
  page: {
    title: "Basic Elements",
    meta: [{ name: "description", content: appConfig.description }],
  },
  
 data() {
    return {
       
      Products: [],
      currentProducts: null,
      currentIndex: -1,
      title: "",

 
         PageRequest: {
            Fields: [{
               Name :'',
               Value:'',
               Operation:'',
               Order:'',
            }],
            PageNumber:0,
            PageLenght:0,
            TotalRecords:0,
            TotalPage:0,
        },
       page: 1,
      perPage: 7,
      pages: [],
      jsonPages: {
                PageNumber: 0,
                TotalRecords:0,
      },
       jsonFields: [{
                name:'',
                value: ''
      }],
      search:"",
    
    }; 
       
  },

  components: {
    Layout,
    PageHeader,
  },
   methods: {
    setPage(numPage){
 console.log(this.setPage)
        this.page = numPage;
         this.retrieveProducts();
        
    },
    retrieveProducts() {
         console.log("*******************")
          console.log(this.page)
        this.jsonPages = {
          pg_number:this.page,
          pg_length: this.perPage
      };

      if (this.search!=""){
       this.jsonFields = [{
          field:"name",
          value: this.search
       }];
       }else{
           this.jsonFields = [];
       }


       ProductsDataService.getAll(this.jsonFields,[],this.jsonPages)
        .then(response => {
         console.log(response.data)
          this.Products = response.data.List;
           
          this.perPage = response.data.pg_length;
          
          this.page = response.data.pg_number;
          
          let i=0;
          for(i=0; i<response.data.total_pg;i++){
              this.pages[i]=i+1;
           
          }

         
        })
        .catch(e => {
          console.log(e);
        });
    },

    refreshList() {
      this.retrieveProducts();
      this.currentProducts = null;
      this.currentIndex = -1;
    },

    setActiveProducts(products, index) {
      this.currentProducts = products;
      this.currentIndex = products ? index : -1;
    },

    removeAllProducts() {
       ProductsDataService.deleteAll()
        .then(response => {
     
          this.refreshList();
        })
        .catch(e => {
          console.log(e);
        });
    },
    

    getProductByName(){
         this.retrieveProducts();
         this.pages = [];
      
    },

     deleteProduct(id) {
     
      ProductsDataService.delete(id)
        .then(response => {
        
         
        if (response.data.message = 202){
        this.retrieveProducts();
        console.log()
        }
        else{
        return response.data.message}
        
        })
        .catch(e => {
          console.log(e);
        });
        
    }
  },
  mounted() {
    this.retrieveProducts();
  },
    
};
</script>

<template>
  <Layout>
    <PageHeader :title="title" :items="items" />
    
    <div>
    <h4>Products</h4>
    </div>

<div>
    <div class="col-lg-6">
         <div class="input-group">
                <input type="text" class="form-control" aria-label="Recipient's username" aria-describedby="button-addon2" id="search" v-model="search">
                <button class="btn btn-outline-success" type="button" id="button-addon2" @click="getProductByName" key="enter">search</button>
        
         </div>
    </div>
</div>
<p></p>
  
     <table class="table table-primary table-striped align-middle table-nowrap mb-0">
    <thead>
        <tr>
            <th scope="col">Id</th>
            <th scope="col">Name</th>
            <th scope="col">Slug</th>
            <th scope="col">Brand</th>
            <th scope="col">SKU</th>
            <th scope="col">Short_description</th>
            <th scope="col"></th>
            
            
        
        </tr>
    </thead>
    <tbody>
        <tr v-for="(Product, index) in Products" :key="index">
    
           
            <td>{{ Product.Id }}</td>
            <td>{{ Product.Name }}</td>
            <td>{{ Product.Slug }}</td>
            <td>{{ Product.Brand.Name}}</td>
            <td>{{ Product.SKU}}</td>
            <td>{{ Product.short_description}}</td>
           
            
            <td>
                <div class="hstack gap-3 flex-wrap">
                    <router-link :to="{name: 'ProductEdit', params: { id: Product.Id }}"> <a href="javascript:void(0);" class="link-primary fs-15"><i class="ri-edit-2-line"></i></a></router-link>
                    <a href="javascript:void(0);" class="link-success fs-15"><i class="ri-delete-bin-line" @click="deleteProduct(Product.Id)"></i></a>
                </div>
            </td>
        </tr>
       
    </tbody>
    <p></p>
</table>

<div class="pagination-wrap hstack gap-2">
              <a
                class="page-item pagination-prev disabled"
                href="#"
                v-if="page != 1"
                @click="setPage((--page))"
              >
                Previous
              </a>
              <ul class="pagination listjs-pagination mb-0">
                <li
                 :class="{
                              active: pageNumber == page,
                              disabled: pageNumber == '...',
                            }"
                  v-for="(pageNumber, index) in pages.slice(page - 1, page + 5)"
                  :key="index"
                  @click="setPage(page = pageNumber)"
                >
                  <a class="page" href="#"  @click="setPage(pageNumber)">{{ pageNumber }}</a>
                </li>
              </ul>
              <a
                class="page-item pagination-next"
                href="#"
                @click="setPage(++page)"
                v-if="page < pages.length"
              >
                Next
              </a>
            </div>




    </Layout>
</template>
