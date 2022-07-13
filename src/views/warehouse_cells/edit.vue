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
      currentWarehouse_cell:{
          Id:-1,
          Name:"",
          Slug:"",
          SKU:"",
          short_description:"",
          full_description:"",
          Warehouse:{
            Id:-1,
          },
      },
      message: '',
        Warehouses:[
          {
            id:-1,
            text:""
          }
        ],
        selectWarehouse:
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
    getWarehouse_cell(id) {
       
       Warehouse_cellDataService.get(id)
        .then(response => {
         
            console.log(response.data)
            if (response.status == 200){
              this.currentWarehouse_cell = response.data;
            }else{
              this.$router.push({path: "/warehouse_cell"});
              
            }
          
        })
        .catch(e => {
          console.log(e);
        });
    },

    updateWarehouse_cell() {
        
        this.currentWarehouse_cell.Warehouse.Id = parseInt(this.currentWarehouse_cell.Warehouse.Id);
       Warehouse_cellDataService.update(this.currentWarehouse_cell.id, this.currentWarehouse_cell)
       
        .then(response => {
         
          this.message = 'The Warehouse_cell was updated successfully!';
        if (response.data.status_code == 200){
        this.$router.push({path: "/warehouse_cell"})}
        else{
        return response.data.message}
        })
        
        .catch(e => {
          console.log(e);
        });
        
    },

  
    
       retrieveWarehouses(){
        
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


       WarehouseDataService.getAll(this.jsonFields,[],this.jsonPages)
        .then(response => {
          console.log(response.data);
          for(let i = 0; i < response.data.List.length; i++){
            console.log("<<<<<<<<<<>>>>>>>>>>>>")
            console.log(response.data.List.length)
              let currentWarehouse = response.data.List[i];
            if (currentWarehouse.id == this.currentWarehouse_cell.Warehouse.Id){
                this.selectWarehouse.id = currentWarehouse.id;
                this.selectWarehouse.text = currentWarehouse.Name;
            }
              this.Warehouses[i]={
                id:currentWarehouse.id, 
                text:currentWarehouse.name
              };
              
          }
          //this.Warehouses = response.data.Warehouses;
        
         
        })
        .catch(e => {
          console.log(e);
        });
    },
     mySelectEvent({id, text}){
            this.currentWarehouse_cell.Warehouse.Id = id;
            this.currentWarehouse_cell.Warehouse.Name = text;
     }
  },
  mounted() {
    this.message = '';
    
    this.getWarehouse_cell(this.$route.params.id);
     this.retrieveWarehouses();
     
    
  }

    
};
</script>

<template>
  <Layout>
    <PageHeader :title="title" :items="items" />
    
     <div class="row">
          <div>
              <label for="labelInput" class="form-label">{{ $t("t-name") }}</label>
             <input type="text" class="form-control" id="labelInput" required  v-model="currentWarehouse_cell.name" >
          </div>                     
     </div> 

      <div class="row">
          <div>
              <label for="labelInput" class="form-label">   {{ $t("t-slug") }}</label>
              <input type="text" class="form-control" id="labelInput" required v-model="currentWarehouse_cell.slug" >
          </div>                     
     </div>
       

<div class="col-xxl-3 col-md-6">
    <label for="exampleDataList" class="form-label">{{ $t("t-warehouses") }}</label>
    <Select2 v-model="currentWarehouse_cell.Warehouse.id" :options="this.Warehouses" @select="mySelectEvent($event)"/>
</div>

      
<p>
 
    </p>
  
    
            <div class="row">
                <div>
                    <b-button @click="updateWarehouse_cell" variant="success" class="waves-effect waves-light" >{{ $t("t-Save") }}</b-button> 
                              
                </div> 
            </div>




    </Layout>
</template>
