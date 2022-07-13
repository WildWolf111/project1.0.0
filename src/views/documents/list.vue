<script>
import Layout from "../../layouts/main.vue";
import PageHeader from "@/components/page-header";
import appConfig from "../../../app.config";
import DocumentsDataService from "/src/services/DocumentsDataService";

export default {
  
  page: {
    title: "Basic Elements",
    meta: [{ name: "description", content: appConfig.description }],
  },
  
 data() {
    return {
       
      Documents: [],
      currentDocuments: null,
      currentIndex: -1,
      title: "",

 
         PageRequest: {
            Fields: [{
               Name :'',
               Value:'',
               Operation:'',
               Order:'',
            }],
            PageNumber:0,
            PageLenght:0,
            TotalRecords:0,
            TotalPage:0,
        },
      page: 1,
      perPage: 7,
      pages: [],
      jsonPages: {
                PageNumber: 0,
                TotalRecords:0,
      },
       jsonFields: [{
                name:'',
                value: ''
      }],
      search:"",
    
    }; 
       
  },

  components: {
    Layout,
    PageHeader,
  },
   methods: {







    setPage(numPage){
 console.log(this.setPage)
        this.page = numPage;
         this.retrieveDocuments();
        
    },
  HoldDocument(id){


   DocumentsDataService.holddocument(id)
    
        
        .then(response => {

            if (response.data.status_code == 200){
               this.retrieveDocuments()
             }
        
       
      
        })
        
        .catch(e => {
          console.log(e);
        });

  },

  UnholdDocument(id){


   DocumentsDataService.unholddocument(id)
    
        
        .then(response => {

          
             if (response.data.status_code == 200){
               this.retrieveDocuments()
             }
       
      
        })
        
        .catch(e => {
          console.log(e);
        });

  },




    retrieveDocuments() {
         console.log("*******************")
          console.log(this.page)
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


       DocumentsDataService.getAll(this.jsonFields,[],this.jsonPages)
        .then(response => {


          this.Documents = response.data.List;
           
          this.perPage = response.data.pg_length;
          
          this.page = response.data.pg_number;
          
          let i=0;
          for(i=0; i<response.data.total_pg;i++){
              this.pages[i]=i+1;

          
          }
            console.log("-------")
            console.log(this.Documents)
         
        })
        .catch(e => {
          console.log(e);
        });
    },

    refreshList() {
      this.retrieveDocuments();
      this.currentDocuments = null;
      this.currentIndex = -1;
     
    },

    setActiveDocuments(documents, index) {
      this.currentDocuments = documents;
      this.currentIndex = documents ? index : -1;
    },

    removeAllDocuments() {
       DocumentsDataService.deleteAll()
        .then(response => {
     
          this.refreshList();
        })
        .catch(e => {
          console.log(e);
        });
    },
    

    getDocumentByName(){
         this.retrieveDocuments();
         this.pages = [];
      
    },

     deleteDocument(id) {
     
      DocumentsDataService.delete(id)
        .then(response => {
        
         
        if (response.data.message = 202){
        this.retrieveDocuments();
        console.log()
        }
        else{
        return response.data.message}
        
        })
        .catch(e => {
          console.log(e);
        });
        
    }
  },
  mounted() {
    this.retrieveDocuments();
  },
    
};
</script>

<template>
  <Layout>
    <PageHeader :title="title" :items="items" />
    
    <div>
    <h4>Documents</h4>
    </div>

<div>
    <div class="col-lg-6">
         <div class="input-group">
                <input type="text" class="form-control" aria-label="Recipient's username" aria-describedby="button-addon2" id="search" v-model="search">
                <button class="btn btn-outline-success" type="button" id="button-addon2" @click="getDocumentByName" key="enter">search</button>
        
         </div>
    </div>
</div>
<p></p>
  
     <table class="table table-primary table-striped align-middle table-nowrap mb-0">
    <thead>
        <tr>
            <th scope="col">Id</th>
            <th scope="col">Дата создания</th>
            <th scope="col">от кого</th>
            <th scope="col">кому</th>
            <th scope="col">тип документа</th>
            <th scope="col">сумма</th>
            <th scope="col">статус</th>
            <th scope="col"></th>
            
            
        
        </tr>
    </thead>
    <tbody>
        <tr v-for="(Document, index) in Documents" :key="index">
    
            <td>{{ Document.id}}</td>
            <td>{{ Document.creation_date }}</td>
            <td>{{ Document.CompanySender.name}}</td>
            <td>{{ Document.CompanyRecipient.name}}</td>
            <td>{{ Document.DocumentType.name}}</td>
            <td>{{ Document.sum}}</td>
            <td>{{ Document.Status.name}}</td>
           
            
            <td>
                <div class="hstack gap-3 flex-wrap">

                  <template  v-if="Document.Status.id == 1">
                  <a href="javascript:void(0);" class="link-warning fs-15"><i class=" ri-arrow-right-line" @click="UnholdDocument(Document.id)" ></i></a>
                  </template>
                  
                  <template  v-else>
                   <a href="javascript:void(0);" class=" link-warning fs-15"><i class="ri-arrow-left-line" @click="HoldDocument(Document.id)"></i></a>
                  </template>
                   


                   <router-link :to="{name: 'DocumentsView', params: { id: Document.id }}"> <a href="javascript:void(0);" class="link-success fs-15"><i class="ri-file-paper-2-fill"></i></a></router-link>
                   
                   
                   <template v-if="Document.Status.id == 1">
                    <router-link :to="{name: 'DocumentsEdit', params: { id: Document.id }}"> <a href="javascript:void(0);" class="link-primary fs-15"><i class="ri-edit-2-line"></i></a></router-link>
                   </template>

                   <template v-else>
                     </template>

                 
                  
                  
                    
                    <template v-if="Document.Status.id == 1">
                    <a href="javascript:void(0);" class="link-danger fs-15"><i class="ri-delete-bin-line" @click="deleteDocument(Document.id)"></i></a>
                  </template>
                  <template v-else>
                     </template>
                
                
                </div>
            </td>
        </tr>
       
    </tbody>
    <p></p>
</table>

<div class="pagination-wrap hstack gap-2">
              <a
                class="page-item pagination-prev disabled"
                href="#"
                v-if="page != 1"
                @click="setPage((--page))"
              >
                Previous
              </a>
              <ul class="pagination listjs-pagination mb-0">
                <li
                 :class="{
                              active: pageNumber == page,
                              disabled: pageNumber == '...',
                            }"
                  v-for="(pageNumber, index) in pages.slice(page - 1, page + 5)"
                  :key="index"
                  @click="setPage(page = pageNumber)"
                >
                  <a class="page" href="#"  @click="setPage(pageNumber)">{{ pageNumber }}</a>
                </li>
              </ul>
              <a
                class="page-item pagination-next"
                href="#"
                @click="setPage(++page)"
                v-if="page < pages.length"
              >
                Next
              </a>
            </div>




    </Layout>
</template>
