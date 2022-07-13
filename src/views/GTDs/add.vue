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
      title: "Добавление нового GTD",
        GTD:{
        
        NumId:"",
      
        Country:{
          Id:-1,
          Name:'',
        },
        },
        Countries:[
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
    addedGTD() {
      var data = {
        "num_id":parseInt(this.GTD.NumId),
        
        "Country":{
          "Id":parseInt(this.GTD.Country.Id),
          "Name":this.GTD.Country.Name,
        },
      };
       
      GTDDataService.create(data)
      
        .then(response => {
          this.GTD.Id = response.data.id;
              console.log("***********************S")
                console.log(response.data)
          this.submitted = true;
             if (response.data.message = 200){
        
                this.GTD.NumId = ""
                
                this.GTD.Country = {
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
      this.GTD = {};
    },
    retrieveGTDs(){
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


            CountryDataService.getAll(this.jsonFields,[],this.jsonPages)
        .then(response => {
        console.log('111111111111111111111111111111')
    console.log(response.data)
           
          this.perPage = response.data.pg_length;
          
          this.page = response.data.pg_number;
                
                console.log("========================")
                console.log(response.data.List)
              
           for(let i = 0; i < response.data.List.length; i++){
        
              let currentCountries = response.data.List[i];
           
              this.Countries[i]={
                
                id:currentCountries.id,

                text:currentCountries.name  

              };

           


          }
          //this.GTDs = response.data.GTDs;
console.log("<<<<<<<<<<<>>>>>>>>>>>>>>>")

              console.log(this.Countries)
         
        })
        .catch(e => {
          console.log(e);
        });
    },
     
  },
   mounted() {
    this.retrieveGTDs();
  },
    
};
</script>

<template>
  <Layout>
    <PageHeader :title="title" :items="items" />
    
     <div class="row">
          <div>
              <label for="labelInput" class="form-label">{{ $t("t-name") }}</label>
             <input type="Text" class="form-control" id="labelInput" required v-model="GTD.NumId" >
          </div>                     
     </div> 

      

<p>
 
    </p>

 

<div class="col-xxl-3 col-md-6">
    <label for="exampleDataList" class="form-label">{{ $t("t-Country") }}</label>
    <Select2 v-model.number="GTD.Country.Id" :options="this.Countries" />
</div>



    <p>
 
    </p>
  
     <div class="row">
     <div>
        <b-button @click="addedGTD" variant="success" class="waves-effect waves-light" >{{ $t("t-Added") }}</b-button>       
        </div>             
     </div>





    </Layout>
</template>
