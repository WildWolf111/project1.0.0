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
    Document_type:{
      id:2
    },
    CompanySender:{
          Id:'',
      },
    CompanyRecipient:{
          Id:'',
      },
        Status:{
          Id:'',
        },
    Items:[{
        Id:0,
        TrustedSignId:'',
        Product:{
          Id:'',
        } ,
        Quantity:'',
        Price:'',
        GTD:{
          Id:'',
        },
        Warehouse:{
          Id:'',
        },
        Warehousecell:{
          Id:'',
        },       
        }],
    Comment:'',
  
    PriceType:{
        Id:'',
        Name:'',
      },
    DeadLine:'',
    Sum:'',
      },

 jsonItems:[{
        Id:0,
        trusted_sign_id:'',
        Product:{
          id:'',
        } ,
        quantity:'',
        price:'',
        GTD:{
          id:"",
        },
        Warehouse:{
          id:'',
        },
        Warehousecell:{
          id:'',
        },       
        }],
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
  Warehouse_cells:[
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
        Warehousecell:{
          Id:'',
          Name:'',
        },
        
        });
      
    }, //добавление новой строки(конец)
      
      
            //удаление строки
      RemoveField: function(index){

        this.Document.Items.splice(index,1);

      },//удаление строки конец
      

     





    AddIncome() {
    
  
      let i=0;
        for(i=0; i<this.Document.Items.length;i++){
          let customItem = this.Document.Items[i];
 

         
        this.jsonItems[i]={
        'id':0,

        'trusted_sign_id':customItem.TrustedSignId,
        'Product':{
           'id':customItem.Product.Id,
        } ,
        'quantity':customItem.Quantity,
        'price':customItem.Price,
        'GTD':{
          'Id':customItem.GTD.Id,
        },
         'Warehouse':{
           'id':customItem.Warehouse.Id,

         },
     'Warehousecell':{
           'id':customItem.Warehousecell.Id,
         }    
        };
        

      }
    

      var date = new Date(this.Document.DeadLine);


      var data = {
      'id':this.Document.Id,
      'DocumentType':{
        'id':2
      },
    'CompanySender':{
          'Id':this.Document.CompanySender.Id,
      },
    'CompanyRecipient':{
          'Id':this.Document.CompanyRecipient.Id,
      },
    'Items':this.jsonItems,
    'comment':this.Document.Comment,
  
    'PriceType':{
        'id':0,//расхардкодить как прикрчу
      },
    'DeadLine':date.toISOString(),
    'sum':parseInt(this.Document.Sum),


      };
      

      DocumentsDataService.create(data)
        .then(response => {



          
          this.Document.Id = response.data.id;
       
          this.submitted = true;
        })
        //.catch(e => {
         // console.log(e);
        //});
       
    },
    
    newDocument() {
      this.submitted = false;
      this.Document = {};
    },


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
    retrieveWarehouse_cells() {

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
              
               this.Warehouse_cells[i]={
        
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
     
          console.log('=-===-==-=-=-=-=-=-=-')
       console.log(this.GTDs)  
        })
        .catch(e => {
          console.log(e);
        });
    },
    
  },

   mounted() {
   this.retrieveWarehouse_cells();
   this.retrieveCompanies();
   this.retrieveWarehouses();
   this.retrieveProducts();
   this.retrieveGTDs();
   //this.retrieveWarehouse_cells();

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
                                <Select2 v-model.number="Document.CompanySender.Id" :options="this.Companies"/>

                            </div>



                                <div class="col-md-4 position-relative">
                                    <label for="exampleDataList" class="form-label" >Кому</label>
                                     <Select2 v-model.number="Document.CompanyRecipient.Id" :options="this.Companies"/>

                                </div>






                                <div class="col-md-6 position-relative">
                                    <label for="validationTooltip03" class="form-label">Коментарий</label>
                                    <input type="text" class="form-control" id="validationTooltip03"  v-model="Document.Comment">
                                   
                                </div>

                               

                            <div class="col-xxl-3 col-md-6">
                                    <div>
                                        <label for="exampleInputdate" class="form-label">Дата исполнения</label>
                                        <input type="date" class="form-control" id="exampleInputdate" v-model="Document.DeadLine">
                                    </div>
                            </div>




                              
<p>
 
    </p>





 <div>

   <table class="table table-primary table-striped align-middle table-nowrap mb-0">
    <thead>
        <tr>
              <!-- items -->
            <th scope="row2">Product</th>
            <th scope="row2">Warehouse</th>
            <th scope="row2">Warehousecell</th>
            <th scope="row2">GTD</th>
            <th scope="row2">Quantity</th>
            <th scope="row2">Price</th>
            <th scope="row2">TrustedSignId</th>
            <th scope="row2"></th>
            
            
            
        
        </tr>
    </thead>
    <tbody>
        <tr v-for="(Item, index) in Document.Items" :key="index" >
    
           
            <td  scope="row2"><Select2 v-model.number="Item.Product.Id" :options='this.Products'/></td>
            <td  scope="row2"><Select2 v-model.number="Item.Warehouse.Id" :options='this.Warehouses'/></td>
            <td  scope="row2"><Select2 v-model.number="Item.Warehousecell.Id" :options='this.Warehouse_cells'/></td>
            <td  scope="row2"><Select2 v-model.number="Item.GTD.Id" :options='this.GTDs'/></td>
            <td  scope="row2"><input type="text" v-model.number="Item.Quantity"></td>
            <td  scope="row2"><input type="text" v-model.number="Item.Price"></td>
            <td  scope="row2"><input type="text" v-model.number="Item.TrustedSignId"></td>
           
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
                  <button class="btn btn-success" type="button" @click="AddIncome">Added</button>
                 <font color="white">|||</font>
                   <input type="button" value="add new row"  class="btn btn-warning" @click="AddField">
    </div>
         <p>
 
    </p>
  
                    
                           
                           
                           
                           
                           
                            </form>
                        </div>





    </Layout>
</template>
