<script>
import Layout from "../../layouts/main.vue";
import PageHeader from "@/components/page-header";
import appConfig from "../../../app.config";
import CompaniesDataService from "/src/services/CompaniesDataService";

export default {
  
  page: {
    title: "Basic Elements",
    meta: [{ name: "description", content: appConfig.description }],
  },
  data() {
    return {
      title: "Добавление новой компании",
        Company:{
        Id:'',
        Name:"",
        Slug:"",
        INN:"",
        KPP:"",
        IsInternal:false,
        
        },

       
    };
    
  },
  components: {
    Layout,
    PageHeader,
  },
    methods: {
    addedCompany() {
      var data = {
        "name":this.Company.Name,
        "slug":this.Company.Slug,
        "inn":parseInt(this.Company.INN),
        "kpp":parseInt(this.Company.KPP),
        "is_internal":this.Company.IsInternal,
        
      };
      console.log(data);
  
      CompaniesDataService.create(data)
      
        .then(response => {
          this.Company.Id = response.data.id;
         
          this.submitted = true;

         if (response.data.message = 200){
        this.Company.Name = ""
        this.Company.Slug = ""
        this.Company.INN = ""
        this.Company.KPP = ""
        this.Company.IsInternal = ""
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
      this.Company = {};
    }
  },
 
};
</script>

<template>
  <Layout>
    <PageHeader :title="title" :items="items" />
    
     <div class="row">
          <div>
              <label for="labelInput" class="form-label">{{ $t("t-name") }}</label>
             <input type="Text" class="form-control" id="labelInput" required v-model="Company.Name" >
          </div>                     
     </div> 

      <div class="row">
          <div>
              <label for="labelInput" class="form-label">   {{ $t("t-slug") }}</label>
              <input type="Text" class="form-control" id="labelInput" required v-model="Company.Slug" >
          </div>                     
      </div> 
      
          <div class="row">
          <div>
              <label for="labelInput" class="form-label">   {{ $t("t-INN") }}</label>
              <input type="Text" class="form-control" id="labelInput" required v-model="Company.INN" >
          </div>                     
      </div> 

          <div class="row">
          <div>
              <label for="labelInput" class="form-label">   {{ $t("t-KPP") }}</label>
              <input type="Text" class="form-control" id="labelInput" required v-model="Company.KPP" >
          </div>                     
      </div> 
<p></p>
          <div class="row">
          <div>
              
                <div class="form-check form-switch form-switch-lg" dir="ltr">
                  <label class="form-check-label" for="SwitchCheck3">   {{ $t("t-Internal") }}</label>
                  <input type="hidden" class="form-check-input" role="switch" id="SwitchCheck3" v-model="Company.IsInternal"/>
                  <input class="form-check-input" type="checkbox" role="switch" id="SwitchCheck3" checked required v-model="Company.IsInternal">
                  </div>
          </div>                     
      </div> 




<p>
 
    </p>
  
     <div class="row">
     <div>
        <b-button @click="addedCompany" variant="success" class="waves-effect waves-light" >{{ $t("t-Added") }}</b-button>       
        </div>             
     </div>
      




    </Layout>
</template>
