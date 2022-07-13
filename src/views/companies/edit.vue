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
      currentCompany:{
        Id:0,
        Name:"",
        Slug:"",
        INN:0,
        KPP:0,
        IsInternal:false,
        
        },
      message: ''
    };
    
  },
  components: {
    Layout,
    PageHeader,
  },
    methods: {
    getCompany(id) {
 
       CompaniesDataService.get(id)
        .then(response => {
            console.log(response.data);
            if (response.status === 200){
              this.currentCompany = response.data;
            }else{
              this.$router.push({path: "/companies"});
              
            }
            console.log('---------------------------------')
           console.log(response)
        })
        .catch(e => {
          console.log(e);
        });
    },

    updateCompany() {
     

       console.log(this.currentCompany);
       CompaniesDataService.update(this.currentCompany.id, this.currentCompany)
       
        .then(response => {
       
          this.message = 'The Company was updated successfully!';
        if (response.data.status_code == 200){
        this.$router.push({path: "/companies"})}
        else{
        return response.data.message}
        console.log(response.data)
        console.log(this.currentCompany)
        })
       
        .catch(e => {
          console.log(e);
        });
        
    },

    deleteCompany() {
      
      CompaniesDataService.delete(this.currentCompany.Id)
        .then(response => {
      
          this.$router.push({ name: "company" });
        if (response.status == 202){
        this.$router.push({path: "/companies"})}
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
    
    this.getCompany(this.$route.params.id);
  }

    
};
</script>

<template>
  <Layout>
    <PageHeader :title="title" :items="items" />
    
     <div class="row">
          <div>
              <label for="labelInput" class="form-label">{{ $t("t-name") }}</label>
             <input type="Text" class="form-control" id="labelInput" required  v-model="currentCompany.name" >
          </div>                     
     </div> 

      <div class="row">
          <div>
              <label for="labelInput" class="form-label">   {{ $t("t-slug") }}</label>
              <input type="Text" class="form-control" id="labelInput" required v-model="currentCompany.slug" >
          </div>                     
     </div>
       <div class="row">
          <div>
              <label for="labelInput" class="form-label">   {{ $t("t-inn") }}</label>
              <input type="Text" class="form-control" id="labelInput" required v-model.number="currentCompany.inn" >
          </div>                     
     </div>
       <div class="row">
          <div>
              <label for="labelInput" class="form-label">   {{ $t("t-kpp") }}</label>
              <input type="Text" class="form-control" id="labelInput" required v-model.number="currentCompany.kpp" >
          </div>                     
     </div>

      <div class="row">
          <div>
                <div class="form-check form-switch form-switch-lg" dir="ltr">
                  <label class="form-check-label" for="SwitchCheck3">   {{ $t("t-Internal") }}</label>
                  <input type="hidden" class="form-check-input" role="switch" id="SwitchCheck3" v-model="currentCompany.IsInternal"/>
                  <input class="form-check-input" type="checkbox" role="switch" id="SwitchCheck3" checked required v-model="currentCompany.IsInternal">
                </div>
          </div>                     
      </div> 




<p>
 
    </p>
  
    
            <div class="row">
                <div>
                    <b-button @click="updateCompany" variant="success" class="waves-effect waves-light" >{{ $t("t-Save") }}</b-button> 
                              
                </div> 
            </div>




    </Layout>
</template>
