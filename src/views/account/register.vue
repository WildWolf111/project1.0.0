<script>
import { required,  helpers, email, minLength, sameAs,  } from "@vuelidate/validators";
import useVuelidate from "@vuelidate/core";
import { mapState } from "vuex";
import RegistrateDataService from "/src/services/RegistrateDataService";



import {
  authMethods,
  authFackMethods,
  notificationMethods,
} from "@/state/helpers";

import appConfig from "../../../app.config";
import mailboxVue from "../apps/mailbox.vue";

export default {
    setup() {
    return { v$: useVuelidate() };
  },
  page: {
    title: "Register",
    meta: [
      {
        name: "description",
        content: appConfig.description,
      },
    ],
  },
  components: {
  },
  data() {
    return {
      user: {
        login: "",
        role:-1,
        password: "",
        displayname: "",
        
        email:"",
        password_check:""
      },
      submitted: false,
      regError: null,
      tryingToRegister: false,
      isRegisterError: false,
      registerSuccess: false,
    };
  },
  validations: {
    user: {
      login: {
        required: helpers.withMessage("Login is required", required),
      },
      password: {
        required: helpers.withMessage("Password is required", required),
        minLength: minLength(8)
      },
      
        name: {
          
        },
        surname: {
        
        },
        email: {
          required: helpers.withMessage("Email is required", required, email),
        },
    },
  },
  computed: {
    ...mapState("authfack", ["status"]),
    notification() {
      return this.$store ? this.$store.state.notification : null;
    },
  },
  methods: {
    ...authMethods,
    ...authFackMethods,
    ...notificationMethods,
      
      
    addedUser() {
       this.submitted = true;
      this.v$.$touch();

      if (this.v$.$invalid) {
        return;
      }else{
      var data = {
        "login":this.user.login,
        "password":this.user.password,
        "name":this.user.name,
        "midlenmae":this.user.middlename,
        "surname":this.user.surname,
        "email":this.user.email,
        
      };
       console.log(data);
      RegistrateDataService.create(data)
        .then(response => {
          this.user.id = response.data.id;
          console.log(response.data);
            
            
            const login = this.user.login;
              const password =this.user.password;
            this.loginF({
              login,
             password,
            });
          this.submitted = true;
        })
        .catch(e => {
          console.log(e);
        });
      }
    },
    
    newUser() {
      this.submitted = false;
      this.user = {};
    }
  },
    // Try to register the user in with the email, username
    // and password they provided.
    tryToRegisterIn() {
      this.submitted = true;
      // stop here if form is invalid
      this.v$.$touch();

      if (this.v$.$invalid) {
        return;
      } else {
        
     this.user.role=6;
          console.log(this.user)
        
      }
    },
    
       mounted() {
   console.log(this.v$);
  }, 
       } 

</script>

<template>
    <div class="auth-page-wrapper pt-5">
            <!-- auth page bg -->
            <div class="auth-one-bg-position auth-one-bg"  id="auth-particles">
                <div class="bg-overlay"></div>
                
                <div class="shape">
                    <svg xmlns="http://www.w3.org/2000/svg" version="1.1" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 1440 120">
                        <path d="M 0,36 C 144,53.6 432,123.2 720,124 C 1008,124.8 1296,56.8 1440,40L1440 140L0 140z"></path>
                    </svg>
                </div>
            </div>

            <!-- auth page content -->
            <div class="auth-page-content">
                <div class="container">
                    <div class="row">
                        <div class="col-lg-12">
                            <div class="text-center mt-sm-5 mb-4 text-white-50">
                              
                            </div>
                        </div>
                    </div>
                    <!-- end row -->

                    <div class="row justify-content-center">
                        <div class="col-md-8 col-lg-6 col-xl-5">
                            <div class="card mt-4">
                            
                                <div class="card-body p-4"> 
                                    <div class="text-center mt-2">
                                        <h5 class="text-primary">Создайте новый аккаунт</h5>
                                    </div>
                                    <div class="p-2 mt-4">
                                        <form class="needs-validation" @submit.prevent="addedUser">
                                            <b-alert
                                            v-model="registerSuccess"
                                            class="mt-3"
                                            variant="success"
                                            dismissible
                                            >Registration successfull.</b-alert
                                            >

                                            <b-alert
                                            v-model="isRegisterError"
                                            class="mt-3"
                                            variant="danger"
                                            dismissible
                                            >{{ regError }}</b-alert
                                            >

                                            <div
                                            v-if="notification.message"
                                            :class="'alert ' + notification.type"
                                            >
                                            {{ notification.message }}
                                            </div>
                                            
                                            



                                            <div class="mb-3">
                                                <label for="username" class="form-label">login <span class="text-danger">*</span></label>
                                                <input type="text" class="form-control" v-model="user.login" 
                                                :class="{
                    'is-invalid': submitted && v$.user.login.$error,
                  }" id="login" placeholder="Enter login" required>
                                                <div
                  v-if="submitted && v$.user.login.$error"
                  class="invalid-feedback"
                >
                  <span v-if="v$.user.login.required.$message">{{
                    v$.user.login.required.$message
                  }}</span>
                </div>
                                            </div>
                                      
                                       <div class="mb-3">
                                                <label for="useremail" class="form-label">Email <span class="text-danger">*</span></label>
                                                <input type="email" class="form-control"  v-model="user.email" id="useremail"
                                                  :class="{
                    'is-invalid': submitted && v$.user.email.$error,
                  }"  placeholder="Enter email address" required>  
                                               <div
                  v-for="(item, index) in v$.user.email.$errors"
                  :key="index"
                  class="invalid-feedback"
                >
                  <span v-if="item.$message">{{ item.$message }}</span>
                </div>   
                                            </div>


                           <div class="mb-2">
                                                <label for="userpassword" class="form-label">Password <span class="text-danger">*</span></label>
                                                <input type="password" class="form-control"   v-model="user.password"  :class="{
                    'is-invalid': submitted && v$.user.password.$error,
                  }" id="userpassword" placeholder="Enter password" required>
                                                <div
                  v-if="submitted && v$.user.password.$error"
                  class="invalid-feedback"
                >
                  <span v-if="v$.user.password.required.$message">{{
                    v$.user.password.required.$message
                  }}</span>
                </div>    
                                            </div>
                                                      
                          
                          
                       <div class="mb-2">
                                                <label for="userpassword" class="form-label">Password Check <span class="text-danger">*</span></label>
                                                <input type="password" class="form-control"   v-model="user.password"  :class="{
                    'is-invalid': submitted && v$.user.password.$error,
                  }" id="userpassword" placeholder="Enter password" required>
                                                <div
                  v-if="submitted && v$.user.password.$error"
                  class="invalid-feedback"
                >
                  <span v-if="v$.user.password.required.$message">{{
                    v$.user.password.required.$message
                  }}</span>
                </div>    
                                            </div>






                          
                          <div class="mb-2">
                              <label for="text" class="form-label">{{"t-DisplayName"}} <span class="text-danger">*</span></label>
                              <input type="text" class="form-control"   v-model="user.displayname" placeholder="Enter Name" >
                          </div>


                          




                                            <div class="mb-4">
                                                <p class="mb-0 fs-12 text-muted fst-italic">By registering you agree to the Velzon <a href="#" class="text-primary text-decoration-underline fst-normal fw-medium">Terms of Use</a></p>
                                            </div>
                                            
                                            <div class="mt-4">
                                                <button  class="btn btn-success w-100" type="submit">Sign Up</button>
                                            </div>

                                            <div class="mt-4 text-center">
                                                <div class="signin-other-title">
                                                    <h5 class="fs-13 mb-4 title text-muted">Create account with</h5>
                                                </div>

                                                <div>
                                                    <button type="button" class="btn btn-primary btn-icon waves-effect waves-light"><i class="ri-facebook-fill fs-16"></i></button>
                                                    <button type="button" class="btn btn-danger btn-icon waves-effect waves-light ms-1"><i class="ri-google-fill fs-16"></i></button>
                                                    <button type="button" class="btn btn-dark btn-icon waves-effect waves-light ms-1"><i class="ri-github-fill fs-16"></i></button>
                                                    <button type="button" class="btn btn-info btn-icon waves-effect waves-light ms-1"><i class="ri-twitter-fill fs-16"></i></button>
                                                </div>
                                            </div>
                                        </form>

                                    </div>
                                </div>
                                <!-- end card body -->
                            </div>
                            <!-- end card -->

                            <div class="mt-4 text-center">
                                <p class="mb-0">Already have an account ? <router-link to="/login" class="fw-semibold text-primary text-decoration-underline"> Signin </router-link> </p>
                            </div>
                        </div>
                    </div>
                    <!-- end row -->
                </div>
                <!-- end container -->
            </div>
            <!-- end auth page content -->

            <!-- footer -->
            <footer class="footer">
                <div class="container">
                    <div class="row">
                        <div class="col-lg-12">
                            <div class="text-center">
                                <p class="mb-0 text-muted">&copy; {{new Date().getFullYear()}} Velzon. Crafted with <i class="mdi mdi-heart text-danger"></i> by Themesbrand</p>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
            <!-- end Footer -->
    </div>
    <!-- end auth-page-wrapper -->
</template>