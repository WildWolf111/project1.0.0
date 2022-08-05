<script>
import Layout from "../../layouts/main.vue";
import PageHeader from "@/components/page-header";
import appConfig from "../../../app.config";
import GTDDataService from "/src/services/GTDDataService";
import CountryDataService from "/src/services/CountryDataService";
import Select2 from 'vue3-select2-component';

export default {
  
  page: {
    title: "Basic Elements",
    meta: [{ name: "description", content: appConfig.description }],
  },
  data() {
   return {
      currentGTD:{
          id:-1,
          NumId:"",
         Country:{
            Id:-1,
            Name:""
         },
      },
      message: '',
        Countries:[
          {
            id:-1,
            text:""
          }
        ],
        selectCountry:
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
    getGTD(id) {
       
       GTDDataService.get(id)
        .then(response => {
         
            console.log(response.data)
            if (response.status == 200){
              this.currentGTD = response.data;
            }else{
              this.$router.push({path: "/GTDs"});
              
            }
          
        })
        .catch(e => {
          console.log(e);
        });
    },

    updateGTD() {
        
        this.currentGTD.Country.Id = parseInt(this.currentGTD.Country.Id);
       GTDDataService.update(this.currentGTD.id, this.currentGTD)
       
        .then(response => {
         
          this.message = 'The GTD was updated successfully!';
        if (response.data.status_code == 200){
        this.$router.push({path: "/GTDs"})}
        else{
        return response.data.message}
        })
        
        .catch(e => {
          console.log(e);
        });
        
    },

    deleteGTD() {
      
      GTDDataService.delete(this.currentGTD.Id)
        .then(response => {
         
          this.$router.push({ name: "GTD" });
        if (response.status == 202){
        this.$router.push({path: "/GTDs"})}
        else{
        return response.data.message}
        
        })
        .catch(e => {
          console.log(e);
        });
        
    },
    
       retrieveCountries(){
        
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


       CountryDataService.getAll(this.jsonFields,[],this.jsonPages)
        .then(response => {
          console.log(response.data);
          for(let i = 0; i < response.data.List.length; i++){
            console.log("<<<<<<<<<<>>>>>>>>>>>>")
            console.log(response.data.List)
              let currentCountry = response.data.List[i];
            if (currentCountry.Id == this.currentGTD.Country.Id){
                this.selectCountry.id = currentCountry.id;
                this.selectCountry.text = currentCountry.name;
            }
              this.Countries[i]={
                id:currentCountry.id, 
                text:currentCountry.name
              };
              
          }
          //this.Countries = response.data.Countries;
        
         
        })
        .catch(e => {
          console.log(e);
        });
    },
     mySelectEvent({id, text}){
            this.currentGTD.Country.Id = id;
            this.currentGTD.Country.Name = text;
     }
  },
  mounted() {
    this.message = '';
    
    this.getGTD(this.$route.params.id);
     this.retrieveCountries();
     
    
  }

    
};
</script>

<template>
  <Layout>
    <PageHeader :title="title" :items="items" />
    
     <div class="row">
          <div>
              <label for="labelInput" class="form-label">{{ $t("t-name") }}</label>
             <input type="text" class="form-control" id="labelInput" required  v-model.number="currentGTD.num_id" >
          </div>                     
     </div> 

  

<div class="col-xxl-3 col-md-6">
    <label for="exampleDataList" class="form-label">{{ $t("t-countries") }}</label>
    <Select2 v-model.number="currentGTD.Country.id" :options="this.Countries" @select="mySelectEvent($event)"/>
</div>

      
<p>
 
    </p>
  
    
            <div class="row">
                <div>
                    <b-button @click="updateGTD" variant="success" class="waves-effect waves-light" >{{ $t("t-Save") }}</b-button> 
                              
                </div> 
            </div>




    </Layout>
</template>
