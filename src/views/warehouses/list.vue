<script>
    import Layout from "../../layouts/main.vue";
    import PageHeader from "@/components/page-header";
    import appConfig from "../../../app.config";

    import "prismjs";
    import "prismjs/themes/prism.css";

    import UniversalDataService from "../../services/UniversalDataService";
    import router from "../../router";

    export default {
        page: {
            title: "Warehouses",
            meta: [{ name: "description", content: appConfig.description }],
        },
        data() {
            return {
                type_list:'warehouses/list',
                 main_type:'warehouses',
                list_items:[],
                title: "Warehouses ",
                items: [
                    {
                        text: "Главная",
                        href: "/",
                    },
                    {
                        text: "Warehouses",
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

            }

        },

        mounted() {
            this.list();
        },
    };
</script>

<template>
    <Layout>
        <PageHeader :title="title" :items="items"/>

        <div class="row">
            <div class="col-xl-12">


                        <div class="live-preview">
                            <div class="table-responsive">
                                <table class="table table-primary table-striped align-middle table-nowrap mb-0">
                                    <thead>
                                        <tr>
                                            <th scope="col">Id</th>
                                            <th scope="col">Name</th>
                                            <th scope="col">Slug</th>
                                            <th scope="col">Address</th>
                                            <th scope="col"></th>
                                           
                                            
                                        
                                        </tr>
                                    </thead>
                                    <tbody>
                                    <tr v-for="item in list_items" :key="item.id">

                                    <td><a href="#" class="fw-medium">{{item.id}}</a></td>
                                      
                                       <td>{{item.name}}</td>
                                        <td>{{item.slug}}</td>
                                        <td>{{item.Address}}</td>

                                        <td>
                                            <div class="hstack gap-3 flex-wrap">
                                              
                                                <a @click="edit(item.id)" href="javascript:void(0);" class="link-primary fs-15"><i class="ri-edit-2-line"></i></a>

                                                <a href="javascript:void(0);" class="link-danger fs-15"><i class="ri-delete-bin-line" @click="remove(item.id)"></i></a>
                                            </div>
                                        </td>
                                    </tr>

                                    </tbody>

                                </table>
                                <!-- end table -->
                            </div>
                            <!-- end table responsive -->
                        </div>

            </div>
            <!-- end col -->
        </div>
        <!--end row-->
    </Layout>
</template>
