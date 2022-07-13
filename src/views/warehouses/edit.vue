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
      currentWarehouse:{
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
    getWarehouse(id) {
       
       WarehouseDataService.get(id)
        .then(response => {
            console.log(response.data)
            if (response.status == 200){
              this.currentWarehouse = response.data;
            }else{
              this.$router.push({path: "/warehouses"});
              
            }
          
        })
        .catch(e => {
          console.log(e);
        });
    },

    updateWarehouse() {
       
       WarehouseDataService.update(this.currentWarehouse.id, this.currentWarehouse)
       
        .then(response => {
          
          this.message = 'The Warehouse was updated successfully!';
        if (response.data.status_code == 200){
        this.$router.push({path: "/warehouses"})}
        else{
        return response.data.message}
        })
        
        .catch(e => {
          console.log(e);
        });
        
    },

    deleteWarehouse() {
      
      WarehouseDataService.delete(this.currentWarehouse.Id)
        .then(response => {
        
          this.$router.push({ name: "warehouse" });
        if (response.status == 202){
        this.$router.push({path: "/warehouses"})}
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
    
    this.getWarehouse(this.$route.params.id);
  }

    
};
</script>

<template>
  <Layout>
    <PageHeader :title="title" :items="items" />
    
     <div class="row">
          <div>
              <label for="labelInput" class="form-label">{{ $t("t-name") }}</label>
             <input type="Text" class="form-control" id="labelInput" required  v-model="currentWarehouse.name" >
          </div>                     
     </div> 

      <div class="row">
          <div>
              <label for="labelInput" class="form-label">   {{ $t("t-slug") }}</label>
              <input type="Text" class="form-control" id="labelInput" required v-model="currentWarehouse.slug" >
          </div>                     
     </div>

      
<p>
 
    </p>
  
    
            <div class="row">
                <div>
                    <b-button @click="updateWarehouse" variant="success" class="waves-effect waves-light" >{{ $t("t-Save") }}</b-button> 
                              
                </div> 
            </div>




    </Layout>
</template>
