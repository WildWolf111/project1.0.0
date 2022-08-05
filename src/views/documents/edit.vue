<style>
.select2 {
    width: 150px !important;
}
</style>
<script>
import Layout from "../../layouts/main.vue";
import PageHeader from "@/components/page-header";
import appConfig from "../../../app.config";
import Select2 from 'vue3-select2-component';
import ProductsDataService from "/src/services/ProductsDataService";
import DocumentsDataService from "/src/services/DocumentsDataService";
import CompaniesDataService from "/src/services/CompaniesDataService";
import Warehouse_cellDataService from "/src/services/Warehouse_cellDataService";
import WarehouseDataService from "/src/services/WarehouseDataService";
import GTDDataService from "/src/services/GTDDataService";
import moment from "moment-timezone";

export default {
  jsonpage: {
    title: "Basic Elements",
    meta: [{ name: "description", content: appConfig.description }],
  },
  data() {
    
    return {
      fields: [{ first: '',last: '' }],
      title: "Добавление нового документа",
      
      
      
      
     Document:{
    Id:0,
    DocumentType:{
      id:2,
      name:''
    },
    CompanySender:{
          Id:'',
          Name:''
      },
    CompanyRecipient:{
          Id:'',
          Name:''
      },
        Status:{
          Id:'',
          Name:''
        },
    Items:[],
    Comment:'',
  
    PriceType:{
        Id:'',
        Name:'',
      },
    DeadLine: '',
    Sum:'',
      },
  Companies:[
          {
            id:-1,
            text:""
          }
        ],
  GTDs:[
          {
            id:-1,
            text:""
          }
        ],
  Products:[
          {
            id:-1,
            text:""
          }
        ],
  Warehouses:[
          {
            id:-1,
            text:""
          }
        ],
  WarehouseCells:[
          {
            id:-1,
            text:""
          }
        ],

  Statuses:[
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



         getDocument(id) {
       
       DocumentsDataService.get(id)
        .then(response => {
           this.Document = response.data;
           //this.Document.Deadline = new Date( Date.parse(this.Document.Deadline) );
          
          this.Document.Deadline = this.Document.Deadline.split('T')[0];
          console.log("--------------------")
          console.log(this.Document)
        })
        .catch(e => {
          console.log(e);
        });
    },
      //добавление новой строки
       AddField: function () {

          this.submitted = false;
 
          
      this.Document.Items.push({
        Id:'',
        TrustedSignId:'',
        Product:{
          Id:'',
          Name:'',
        } ,
        Quantity:'',
        Price:'',
        GTD:{
          Id:'',
          NumId:''
        },
        Warehouse:{
          Id:'',
          Name:'',
        },
        WarehouseCell:{
          Id:'',
          Name:'',
        },
        
        });
      
    }, //добавление новой строки(конец)
      
      
            //удаление строки
      RemoveField: function(index){

        this.Document.Items.splice(index,1);

      },//удаление строки конец
      

     //полчение продукта (start)
        retrieveProducts(){
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



            ProductsDataService.getAll(this.jsonFields,[],this.jsonPages)
        .then(response => {

         let i=0;
          for(i=0; i<response.data.total_rec;i++){
               let currentProduct = response.data.List[i];
                this.Products[i]={
        
                id:currentProduct.Id,
                text:currentProduct.Name  

              };
 }
          //this.Brands = response.data.Brands;
        })
        .catch(e => {
          console.log(e);
        });
    },//конец блока (end)




//получение компаний
retrieveCompanies() {
      
         
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


       CompaniesDataService.getAll(this.jsonFields,[],this.jsonPages)
        .then(response => {
       
           
           
          let i=0;
          for(i=0; i<response.data.total_rec;i++){
               let currentCompany = response.data.List[i];
              
               this.Companies[i]={
        
                id:currentCompany.id,
                text:currentCompany.name  

              };
          }

        })
        .catch(e => {
          console.log(e);
        });

        
    },//конец

//получение складских ячеек
    retrieveWarehouseCells() {

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


       Warehouse_cellDataService.getAll(this.jsonFields,[],this.jsonPages)
        .then(response => {
     
         
         let i=0;
          for(i=0; i<response.data.pg_length;i++){
               let currentWarehouse_cell = response.data.List[i];
              
               this.WarehouseCells[i]={
        
                id:currentWarehouse_cell.id,
                text:currentWarehouse_cell.name  

              };
          }
  

         
        })
        .catch(e => {
          console.log(e);
        });
    },





 retrieveWarehouses() {
     
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


       WarehouseDataService.getAll(this.jsonFields,[],this.jsonPages)
        .then(response => {
     

         let i=0;
          for(i=0; i<response.data.total_rec;i++){
               let currentWarehouse = response.data.List[i];
         
               this.Warehouses[i]={
        
                id:currentWarehouse.id,
                text:currentWarehouse.name  

              };
          }
      
        })
        .catch(e => {
          console.log(e);
        });
    },



///////////////////   GTD   ///////////////////

  retrieveGTDs() {
     
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


       GTDDataService.getAll(this.jsonFields,[],this.jsonPages)
        .then(response => {
   
        this.perPage = response.data.pg_length;
          
          this.page = response.data.pg_number;
                
               
               
              
           for(let i = 0; i < response.data.List.length; i++){

              let currentGTD = response.data.List[i];
           
              this.GTDs[i]={
                
                id:currentGTD.id,

                text:currentGTD.num_id 

              };

      }
     
      
        })
        .catch(e => {
          console.log(e);
        });
    },
    

  updateDocument() {



     this.Document.Deadline = new Date( Date.parse(this.Document.Deadline)).toISOString();
console.log('8888888888888888888',this.Document);
      DocumentsDataService.update(this.Document.id, this.Document)
       
        .then(response => {
         
          this.message = 'The Document was updated successfully!';
        if (response.data.status_code == 200){
          
          console.log("*************")
          console.log(response.data.status_code)
          console.log(response.data.message)
          console.log("*************")
        
        this.$router.push({path: "/documents"})}
        
        
        else{
        return response.data.message}
        })
        
        .catch(e => {
          console.log(e);
        });
        
    },


  },

   mounted() {
   this.retrieveWarehouseCells();
   this.retrieveCompanies();
   this.retrieveWarehouses();
   this.retrieveProducts();
   this.retrieveGTDs();
   //this.retrieveWarehouseCells();
    this.getDocument(this.$route.params.id);

  },
    
};
</script>

<template>
  <Layout>
    <PageHeader :title="title" :items="items" />
    
      <div class="live-preview">
                            <form class="row g-3 needs-validation" novalidate>
                                <div class="col-md-4 position-relative">
                                <label for="exampleDataList" class="form-label" >От кого</label>
                                <Select2 v-model.number="Document.CompanySender.id" :options="this.Companies"/>

                            </div>



                                <div class="col-md-4 position-relative">
                                    <label for="exampleDataList" class="form-label" >Кому</label>
                                     <Select2 v-model.number="Document.CompanyRecipient.id" :options="this.Companies"/>

                                </div>






                                <div class="col-md-6 position-relative">
                                    <label for="validationTooltip03" class="form-label">Коментарий</label>
                                    <input type="text" class="form-control" id="validationTooltip03"  v-model="Document.сomment">
                                   
                                </div>

                               

                            <div class="col-xxl-3 col-md-6">
                                    <div>
                                        <label for="exampleInputdate" class="form-label">Дата исполнения</label>
                                        <input type="date" class="form-control" id="exampleInputdate" v-model="Document.Deadline">
                                    </div>
                            </div>




                              
<p>
 
    </p>





 <div>

   <table class="table table-primary table-striped align-middle table-nowrap mb-0">
    <thead>
        <tr>
              <!-- items -->
              
            <th >Product</th>
         
            <th>Warehousecell</th>
            
            <th >Quantity</th>
            <th >Price</th>
            <th >TrustedSignId</th>
            <th ></th>
            
            
            
        
        </tr>
    </thead>
    <tbody>
        <tr v-for="(Item,index) in Document.Items" :key="Item.id">
    
           
            <td><Select2 v-model.number="Item.Product.id" :options='this.Products' @class="bigdrop"/></td>
            
            <td ><Select2 v-model.number="Item.WarehouseCell.id" :options='this.WarehouseCells' @class="bigdrop"/></td>
            
            <td><input type="text" v-model.number="Item.quantity"></td>
            <td ><input type="text" v-model.number="Item.price"></td>
            <td ><input type="text" v-model.number="Item.trusted_sign_id"></td>
           
              <!-- delete Button -->
            <td>
                <a href="javascript:void(0);" class="link-danger fs-15"><i class="ri-delete-bin-line" @click="RemoveField(index)"></i></a>
            </td>
        
        </tr>
       
    </tbody>
    <p></p>
    
</table>

 </div>

    <p>
 
    </p>
  
    <div class="col-12">
                  <button class="btn btn-success" type="button" @click="updateDocument">Update</button>
                 <font color="white">|||</font>
                   <input type="button" value="add new row"  class="btn btn-warning" @click="AddField">
    </div>
         <p>
 
    </p>
  
                    
                           
                           
                           
                           
                           
                            </form>
                        </div>





    </Layout>
</template>
