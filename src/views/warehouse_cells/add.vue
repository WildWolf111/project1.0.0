<script>
import Layout from "../../layouts/main.vue";
import PageHeader from "@/components/page-header";
import appConfig from "../../../app.config";
import Warehouse_cellDataService from "/src/services/Warehouse_cellDataService";
import WarehouseDataService from "/src/services/WarehouseDataService";
import Select2 from 'vue3-select2-component';

export default {
  
  page: {
    title: "Basic Elements",
    meta: [{ name: "description", content: appConfig.description }],
  },
  data() {
    return {
      title: "Добавление нового продукта",
        Warehouse_cell:{
        Id: '',
        Name:"",
        Slug:"",
        Warehouse:{
          Id:-1,
          Name:'',
        },
        },
        Warehouses:[
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
    addedWarehouse_cell() {
      var data = {
        "Name":this.Warehouse_cell.Name,
        "Slug":this.Warehouse_cell.Slug,
        "Warehouse":{
          "Id":parseInt(this.Warehouse_cell.Warehouse.Id),
          "Name":this.Warehouse_cell.Warehouse.Name,
        },
      };
       
      Warehouse_cellDataService.create(data)
      
        .then(response => {
          this.Warehouse_cell.Id = response.data.id;
              console.log("***********************S")
                console.log(response.data)
          this.submitted = true;
             if (response.data.message = 200){
        
                this.Warehouse_cell.Name = ""
                this.Warehouse_cell.Slug = ""
                this.Warehouse_cell.Warehouse = {
          Id:-1,
          Name:'',
        };
              
               console.log("***********************S")
                console.log(response.data)

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
      this.Warehouse_cell = {};
    },
    retrieveWarehouse_cells(){
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
            

            WarehouseDataService.getAll(this.jsonFields,[],this.jsonPages)
        .then(response => {
        console.log('111111111111111111111111111111')
    console.log(response.data)
           
          this.perPage = response.data.pg_length;
          
          this.page = response.data.pg_number;
                
                console.log("========================")
                console.log(response.data.List)
              
           for(let i = 0; i < response.data.List.length; i++){
        
              let currentWarehouses = response.data.List[i];
           
              this.Warehouses[i]={
                
                id:currentWarehouses.id,

                text:currentWarehouses.name  

              };

           


          }
          //this.Warehouse_cells = response.data.Warehouse_cells;
         
        })
        .catch(e => {
          console.log(e);
        });
    },
     
  },
   mounted() {
    this.retrieveWarehouse_cells();
  },
    
};
</script>

<template>
  <Layout>
    <PageHeader :title="title" :items="items" />
    
     <div class="row">
          <div>
              <label for="labelInput" class="form-label">{{ $t("t-name") }}</label>
             <input type="Text" class="form-control" id="labelInput" required v-model="Warehouse_cell.Name" >
          </div>                     
     </div> 

      <div class="row">
          <div>
              <label for="labelInput" class="form-label">   {{ $t("t-slug") }}</label>
              <input type="Text" class="form-control" id="labelInput" required v-model="Warehouse_cell.Slug" >
          </div>                     
     </div>

<p>
 
    </p>

 

<div class="col-xxl-3 col-md-6">
    <label for="exampleDataList" class="form-label">{{ $t("t-Warehouse") }}</label>
    <Select2 v-model.number="Warehouse_cell.Warehouse.Id" :options="this.Warehouses" />
</div>



    <p>
 
    </p>
  
     <div class="row">
     <div>
        <b-button @click="addedWarehouse_cell" variant="success" class="waves-effect waves-light" >{{ $t("t-Added") }}</b-button>       
        </div>             
     </div>





    </Layout>
</template>
