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
        
    translit(word){
      var answer = '';
      var converter = {
        'а': 'a',    'б': 'b',    'в': 'v',    'г': 'g',    'д': 'd',
        'е': 'e',    'ё': 'e',    'ж': 'zh',   'з': 'z',    'и': 'i',
        'й': 'y',    'к': 'k',    'л': 'l',    'м': 'm',    'н': 'n',
        'о': 'o',    'п': 'p',    'р': 'r',    'с': 's',    'т': 't',
        'у': 'u',    'ф': 'f',    'х': 'h',    'ц': 'c',    'ч': 'ch',
        'ш': 'sh',   'щ': 'sch',  'ь': '',     'ы': 'y',    'ъ': '',
        'э': 'e',    'ю': 'yu',   'я': 'ya',
    
        'А': 'A',    'Б': 'B',    'В': 'V',    'Г': 'G',    'Д': 'D',
        'Е': 'E',    'Ё': 'E',    'Ж': 'Zh',   'З': 'Z',    'И': 'I',
        'Й': 'Y',    'К': 'K',    'Л': 'L',    'М': 'M',    'Н': 'N',
        'О': 'O',    'П': 'P',    'Р': 'R',    'С': 'S',    'Т': 'T',
        'У': 'U',    'Ф': 'F',    'Х': 'H',    'Ц': 'C',    'Ч': 'Ch',
        'Ш': 'Sh',   'Щ': 'Sch',  'Ь': '',     'Ы': 'Y',    'Ъ': '',
        'Э': 'E',    'Ю': 'Yu',   'Я': 'Ya',   ' ': '-'
      };
    
      for (var i = 0; i < word.length; ++i ) {
        if (converter[word[i]] == undefined){
          answer += word[i];
        } else {
          answer += converter[word[i]];
        }
      }
    
      return answer;
    },
     Transliteration(){
       
        this.Warehouse.Slug = this.translit(this.Warehouse.Name);

      },
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
  },
  
 
};
</script>

<template>
  <Layout>
    <PageHeader :title="title" :items="items" />
    
     <div class="row">
          <div>
              <label for="labelInput" class="form-label">{{ $t("t-name") }}</label>
             <input type="Text" class="form-control" id="labelInput" required v-model="Warehouse.Name"  @keyup="Transliteration" >
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
