<script>
import Layout from "../../layouts/main.vue";
import PageHeader from "@/components/page-header";
import appConfig from "../../../app.config";
import WarehouseDataService from "/src/services/WarehouseDataService";

export default {
  
  page: {
    title: "Basic Elements",
    meta: [{ name: "description", content: appConfig.description }],
  },
  data() {
    return {
      title: "Добавление нового склада",
        Warehouse:{
        Id: '',
        Name:"",
        Slug:"",
        },

       
    };
    
  },
  components: {
    Layout,
    PageHeader,
  },
    methods: {
    addedWarehouse() {
         
      var data = {
        "Name":this.Warehouse.Name,
        "Slug":this.Warehouse.Slug,
        
      };
 
      WarehouseDataService.create(data)
        .then(response => {
          this.Warehouse.Id = response.data.id;
          console.log(response.data)
          this.submitted = true;


          if (response.data.message = 202){
        
                this.Warehouse.Name = ""
                this.Warehouse.Slug = ""
        }
        else{
        return response.data.message}

        })
        .catch(e => {
          console.log(e);
        });
    },
    
    newWarehouse() {
      this.submitted = false;
      this.Warehouses = {};
    }
  }
    
};
</script>

<template>
  <Layout>
    <PageHeader :title="title" :items="items" />
    
     <div class="row">
          <div>
              <label for="labelInput" class="form-label">{{ $t("t-name") }}</label>
             <input type="Text" class="form-control" id="labelInput" required v-model="Warehouse.Name" >
          </div>                     
     </div> 

      <div class="row">
          <div>
              <label for="labelInput" class="form-label">   {{ $t("t-slug") }}</label>
              <input type="Text" class="form-control" id="labelInput" required v-model="Warehouse.Slug" >
          </div>                     
     </div>

      
<p>
 
    </p>
  
     <div class="row">
     <div>
        <b-button @click="addedWarehouse" variant="success" class="waves-effect waves-light" key="enter">{{ $t("t-Added") }}</b-button>       
        </div>             
     </div>
      




    </Layout>
</template>
