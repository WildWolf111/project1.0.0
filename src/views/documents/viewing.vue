<script>
import Layout from "../../layouts/main.vue";
import PageHeader from "@/components/page-header";
import appConfig from "../../../app.config";
import Select2 from 'vue3-select2-component';
import DocumentsDataService from "/src/services/DocumentsDataService";



export default {
  
  page: {
    title: "Basic Elements",
    meta: [{ name: "description", content: appConfig.description }],
  },
  data() {
   return {
      Document:{
    Id:0,
    DocumentType:{
      id:2,
      name:''
    },
    CompanySender:{
          Id:'',
          Name:''
      },
    CompanyRecipient:{
          Id:'',
          Name:''
      },
        Status:{
          Id:'',
          Name:''
        },
    Items:[],
    Comment:'',
  
    PriceType:{
        Id:'',
        Name:'',
      },
    DeadLine:'',
    Sum:'',
      },
     
    };
    
  },
  components: {
    Layout,
    PageHeader,
    Select2
  },
    methods: {

returntolist(){
 
 this.$router.push({path: "/documents"})
  
  },



    getDocument(id) {
         
       DocumentsDataService.get(id)
        .then(response => {
          
           this.Document = response.data;
           this.Document.Deadline = this.Document.Deadline.split('T')[0];
          console.log(response.data)
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

    },
    
  },
  mounted() {
    this.message = '';
    
    this.getDocument(this.$route.params.id);
     
     
    
  }

    
};
</script>

<template>
  <Layout>
    <PageHeader :title="title" :items="items" />
    
      <div class="live-preview">
                          <form class="row g-3 needs-validation" novalidate>
                          <div class="col-md-4 position-relative">
                              <label for="exampleDataList" class="form-label" >От кого</label>
                              <input type="text" class="form-control" id="validationTooltip03" readonly  v-model="Document.CompanyRecipient.name" >
                          </div>



                                <div class="col-md-4 position-relative">
                                    <label for="exampleDataList" class="form-label" >Кому</label>
                                     <input type="text" class="form-control" id="validationTooltip03" readonly   v-model="Document.CompanySender.name">

                                </div>

                                <div class="col-md-4 position-relative">
                                    <label for="exampleDataList" class="form-label" >сумма</label>
                                     <input type="text" class="form-control" id="validationTooltip03" readonly   v-model="Document.sum">

                                </div>




                                <div class="col-md-6 position-relative">
                                    <label for="validationTooltip03" class="form-label">Статус</label>
                                    <input type="text" class="form-control" id="validationTooltip03" readonly v-model="Document.Status.name">
                                   
                                </div>

                               
                                  <div class="col-md-6 position-relative">
                                    <label for="validationTooltip03" class="form-label">Тип</label>
                                    <input type="text" class="form-control" id="validationTooltip03" readonly  v-model="Document.DocumentType.name">
                                   
                                </div>



                                <div class="col-md-6 position-relative">
                                    <label for="validationTooltip03" class="form-label">Коментарий</label>
                                    <input type="text" class="form-control" id="validationTooltip03" readonly  v-model="Document.comment">
                                   
                                </div>



                            <div class="col-xxl-3 col-md-6">
                                    <div>
                                        <label for="exampleInputdate" class="form-label">Дата исполнения</label>
                                        <input type="date" class="form-control" id="exampleInputdate" readonly v-model="Document.Deadline" >
                                    </div>
                            </div>




                              
<p>
 
    </p>





 <div>

    <table class="table table-primary table-striped align-middle table-nowrap mb-0">
    <thead>
        <tr>
            <th scope="col">Product</th>
            <th scope="col">Warehouse</th>
            <th scope="col">Warehouse_cell</th>
             <th scope="col">GTD</th>
              <th scope="col">Quantity</th>
               <th scope="col">Price</th>
               
            <th scope="col">TrustedSignId</th>
            
            
        
        </tr>
    </thead>
    <tbody>
        <tr v-for="(Item) in Document.Items" :key="Item.id">
    
           
            <td>{{  Item.Product.id }}</td>
            <td></td>
            <td>{{  Item.WarehouseCell.id }}</td>
            <td>{{  Item.Gtd.num_id}}</td>
            <td>{{  Item.quantity }}</td>
            <td>{{  Item.price }}</td>
            <td>{{  Item.trusted_sign_id }}</td>
            
        </tr>
       
    </tbody>
    <p></p>
</table>
<!--изменить кнопку на красивую-->

<b-button variant="success" class="btn-animation waves-effect waves-light" data-text="back to list" @click="returntolist"><span>back to list</span></b-button>



 </div>






                            </form>
                        </div>




    </Layout>
</template>
