<script>
import Layout from "../../layouts/main.vue";
import PageHeader from "@/components/page-header";
import appConfig from "../../../app.config";
import UsersDataService from "/src/services/UsersDataService";

export default {
  
  page: {
    title: "Basic Elements",
    meta: [{ name: "description", content: appConfig.description }],
  },
  
 data() {
    return {
       
      Users: [],
      currentUsers: null,
      currentIndex: -1,
      title: "",
    Companies:[
          {
            id:-1,
            text:""
          }
        ],
 
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
         this.retrieveUsers();
        
    },
    retrieveUsers() {
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


       UsersDataService.getAll(this.jsonFields,[],this.jsonPages)
        .then(response => {
         
          this.Users = response.data.List;
           
          this.perPage = response.data.pg_length;
          
          this.page = response.data.pg_number;
          
          let i=0;
          for(i=0; i<response.data.total_pg;i++){
              this.pages[i]=i+1;
           
          }

         
        })
        .catch(e => {
          console.log(e);
        });
    },

    refreshList() {
      this.retrieveUsers();
      this.currentUsers = null;
      this.currentIndex = -1;
    },

    setActiveUsers(users, index) {
      this.currentUsers = users;
      this.currentIndex = users ? index : -1;
    },

    removeAllUsers() {
       UsersDataService.deleteAll()
        .then(response => {
     
          this.refreshList();
        })
        .catch(e => {
          console.log(e);
        });
    },
    

    getUserByName(){
         this.retrieveUsers();
         this.pages = [];
      
    },

     deleteUser(id) {
     
      UsersDataService.delete(id)
        .then(response => {
        
         
        if (response.data.message = 202){
        this.retrieveUsers();
        console.log()
        }
        else{``
        return response.data.message}
        
        })
        .catch(e => {
          console.log(e);
        });
        
    }
  },
  mounted() {
    this.retrieveUsers();
  },
    
};
</script>

<template>
  <Layout>
    <PageHeader :title="title" :items="items" />
    
    <div>
    <h4>Users</h4>
    </div>

<div>
    <div class="col-lg-6">
         <div class="input-group">
                <input type="text" class="form-control" aria-label="Recipient's username" aria-describedby="button-addon2" id="search" v-model="search">
                <button class="btn btn-outline-success" type="button" id="button-addon2" @click="getUserByName" key="enter">search</button>
        
         </div>
    </div>
</div>
<p></p>
  
     <table class="table table-primary table-striped align-middle table-nowrap mb-0">
    <thead>
        <tr>
            <th scope="col">Id</th>
            <th scope="col">Name</th>
            <th scope="col">MidleName</th>
            <th scope="col">SurName</th>
            <th scope="col">SurName</th>
            <th scope="col">Role</th>
            
            
        
        </tr>
    </thead>
    <tbody>
        <tr v-for="(User, index) in Users" :key="index">
    
           
            <td>hgdsgrfdsgfdrs</td>
            <td>{{ gfdshgdsghfds }}</td>
            <td>{{ User.MidleName }}</td>
            <td>{{ User.SurName }}</td>
            <td ><Select2 v-model.number="User.Role.id" :options='this.Users' @class="bigdrop"/></td>
            
            <td>
                <div class="hstack gap-3 flex-wrap">
                   <router-link :to="{name: 'UserEdit', params: { id: User.Id }}"> <a href="javascript:void(0);" class="link-primary fs-15"><i class="ri-edit-2-line"></i></a></router-link>
                    <a href="javascript:void(0);" class="link-success fs-15"><i class="ri-delete-bin-line" @click="deleteUser(User.Id)"></i></a>
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
