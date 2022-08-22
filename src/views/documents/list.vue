<script>
    import Layout from "../../layouts/main.vue";
    import PageHeader from "@/components/page-header";
    import appConfig from "../../../app.config";

    import "prismjs";
    import "prismjs/themes/prism.css";

    import DocumentsDataService from "../../services/DocumentsDataService";
    import UniversalDataService from "../../services/UniversalDataService";
    import router from "../../router";
    
    export default {
        page: {
            title: "Documents",
            meta: [{ name: "description", content: appConfig.description }],
        },
        data() {
            return {
                type_list:'documents/list',
                main_type:'documents',
                list_items:[],
                title: "Documents",
                
                items: [
                    {
                        text: "Главная",
                        href: "/",
                    },
                    {
                        text: "Documents",
                        active: true,
                    },
                    
                ],
                
            };
        },
        components: {
            Layout,
            PageHeader,
        },



        methods:{
   
            list(){

                UniversalDataService.setPath(this.type_list);
                UniversalDataService.list([])
                    .then(response => {

                        //dispatch('notification/success', 'Получение списка прошло успешно', { root: true });
                        this.list_items = response.data.List;
                        console.log(response.data.List)
                        
                    })
                    .catch(error => {
                        //dispatch('notification/error', error, { root: true });
                        console.log(error);
                    });

                    
            },
   

  HoldDocument(id){


   DocumentsDataService.holddocument(id)
    
        
        .then(response => {

            if (response.data.status_code == 200){
               this.list();
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
               this.list();
             }
       
      
        })
        
        .catch(e => {
          console.log(e);
        });

  },


   remove(id){
                UniversalDataService.setPath(this.main_type);
                UniversalDataService.delete(id)
                    .then(() => {
                        //dispatch('notification/success', 'Удаление прошло успешно', { root: true });
                        this.list();
                    })
                    .catch(error => {
                        //dispatch('notification/error', error, { root: true });
                        console.log(error);
                    });

            },
            edit(id){
                router.push('/'+this.main_type+'/'+id);

            },

  

   
    

    getDocumentByName(){
         this.retrieveDocuments();
         this.pages = [];
      
    },
 
   
  },
   computed: {
        localeDate() {
            // Конвертируем число в строку. Для этого существуют специальные методы
            // toLocaleDateString() или toLocaleString() или toLocaleTimeString()
            // Итоговая строка будет зависеть от локализации системы пользователя. 
            // Для русской локали это будет "01.02.2020", 
            // для американской "2/1/2020", 
            // для немецкой — "1.2.2020"
            // Вы НЕ должны устанавливать формат даты самостоятельно
            return (new Date(this.creation_date)).toLocaleDateString() 
        },
    },
 mounted() {
            this.list();
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
         <tr v-for="item in list_items" :key="item.id">

        <td><a href="#" class="fw-medium">{{item.id}}</a></td>
    
            
           <td>{{ item.creation_date }}</td>
            <td>{{ item.CompanySender.name}}</td>
            <td>{{ item.CompanyRecipient.name}}</td>
            <td>{{ item.DocumentType.name}}</td>
            <td>{{ item.sum}}</td>
            <td>{{ item.Status.name}}</td>
           
            
            <td>
                <div class="hstack gap-3 flex-wrap">

                  <template  v-if="item.Status.id == 1">
                  <a href="javascript:void(0);" class="link-warning fs-15"><i class=" ri-arrow-right-line" @click="UnholdDocument(item.id)" ></i></a>
                  </template>
                  
                  <template  v-else>
                   <a href="javascript:void(0);" class=" link-warning fs-15"><i class="ri-arrow-left-line" @click="HoldDocument(item.id)"></i></a>
                  </template>
                   


                   
                   
                   
                   <template v-if="item.Status.id == 1">
                    <a @click="edit(item.id)" href="javascript:void(0);" class="link-primary fs-15"><i class="ri-edit-2-line"></i></a>

                    <a href="javascript:void(0);" class="link-danger fs-15"><i class="ri-delete-bin-line" @click="remove(item.id)"></i></a>

                    
                   </template>

                   <template v-else>
                     </template>

                 
                  
                  
                    
                   
                
                
                </div>
            </td>
        </tr>
       
    </tbody>
    <p></p>
</table>





    </Layout>
</template>
