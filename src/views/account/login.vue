<script>
import { mapState } from "vuex";
import { required,  helpers } from "@vuelidate/validators";
import useVuelidate from "@vuelidate/core";
import appConfig from "../../../app.config";

import {
  authFackMethods,
  notificationMethods,
} from "@/state/helpers";

export default {
  setup() {
    return { v$: useVuelidate() };
  },
  page: {
    title: "Login",
    meta: [
      {
        name: "description",
        content: appConfig.description,
      },
    ],
  },
  data() {
    return {
      login: "",
      password: "",
      submitted: false,
      authError: null,
      tryingToLogIn: false,
      isAuthError: false,
    };
  },
  validations: {
    login: {
      required: helpers.withMessage("login is required", required),
    
    },
    password: {
      required: helpers.withMessage("Password is required", required),
    },
  },
  computed: {
    ...mapState("authfack", ["status"]),
    notification() {
      return this.$store ? this.$store.state.notification : null;
     
    },
    
  },
  methods: {
    ...authFackMethods,
    ...notificationMethods,
    // Try to log the user in with the username
    // and password they provided.
    tryToLogIn() {
      this.submitted = true;
      // stop here if form is invalid
      this.v$.$touch();
     
      if (this.v$.$invalid) {
        return;
      } else {
        
           const {login, password } = this;
          
          if (login && password) {
            this.loginF({
              login,
              password,
            });
          }
      }
    },
  },
};
</script>

<template>
  <div class="auth-page-wrapper pt-5">
    <!-- auth page bg -->
    <div class="auth-one-bg-position auth-one-bg" id="auth-particles">
      <div class="bg-overlay"></div>

      <div class="shape">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          version="1.1"
          xmlns:xlink="http://www.w3.org/1999/xlink"
          viewBox="0 0 1440 120"
        >
          <path
            d="M 0,36 C 144,53.6 432,123.2 720,124 C 1008,124.8 1296,56.8 1440,40L1440 140L0 140z"
          ></path>
        </svg>
      </div>
    </div>

    <!-- auth page content -->
    <div class="auth-page-content">
      <div class="container">
        <div class="row">
          <div class="col-lg-12">
            <div class="text-center mt-sm-5 mb-4 text-white-50">
              <div>
                <router-link to="/" class="d-inline-block auth-logo">
                  <img
                    src="@/assets/images/logo-light.png"
                    alt=""
                    height="20"
                  />
                </router-link>
              </div>
              <p class="mt-3 fs-15 fw-medium">
                
              </p>
            </div>
          </div>
        </div>
        <!-- end row -->

        <div class="row justify-content-center">
          <div class="col-md-8 col-lg-6 col-xl-5">
            <div class="card mt-4">
              <div class="card-body p-4">
                <div class="text-center mt-2">
                  <h5 class="text-primary">Добро пожаловать</h5>
                  <p class="text-muted">Авторизируйтесь что-бы продолжить работу.</p>
                </div>
                <div class="p-2 mt-4">
                  <b-alert
                    v-model="isAuthError"
                    variant="danger"
                    class="mt-3"
                    dismissible
                    >{{ authError }}</b-alert
                    
                  >

                  <div
                    v-if="notification.message"
                    :class="'alert ' + notification.type"
                  >
                    {{ notification.message }}
                  </div>

                  <form @submit.prevent="tryToLogIn">
                    <div class="mb-3">
                      <label for="login" class="form-label">login</label>
                      <input
                        type="text"
                        class="form-control"
                        id="login"
                        placeholder="Enter login"
                        v-model="login"
                        :class="{
                          'is-invalid': submitted && v$.login.$error,
                        }"
                      />
                      <div
                        v-for="(item, index) in v$.login.$errors"
                        :key="index"
                        class="invalid-feedback"
                      >
                        <span v-if="item.$message">{{ item.$message }}</span>
                      </div>
                    </div>

                    <div class="mb-3">
                      <div class="float-end">
                        <router-link
                          to="/forgot-password"
                          class="text-muted"
                          >Forgot password?</router-link
                        >
                      </div>
                      <label class="form-label" for="password-input"
                        >Password</label
                      >
                      <div class="position-relative auth-pass-inputgroup mb-3">
                        <input
                          type="password"
                          v-model="password"
                          class="form-control pe-5"
                          :class="{
                            'is-invalid': submitted && v$.password.$error,
                          }"
                          placeholder="Enter password"
                          id="password-input"
                        />
                        <button
                          class="
                            btn btn-link
                            position-absolute
                            end-0
                            top-0
                            text-decoration-none text-muted
                          "
                          type="button"
                          id="password-addon"
                        >
                          <i class="ri-eye-fill align-middle"></i>
                        </button>
                        <div
                          v-if="submitted && v$.password.$error"
                          class="invalid-feedback"
                        >
                          <span v-if="v$.password.required.$message">{{
                            v$.password.required.$message
                          }}</span>
                        </div>
                      </div>
                    </div>

                    <div class="form-check">
                      <input
                        class="form-check-input"
                        type="checkbox"
                        value=""
                        id="auth-remember-check"
                      />
                      <label class="form-check-label" for="auth-remember-check"
                        >Remember me</label
                      >
                    </div>

                    <div class="mt-4">
                      <button class="btn btn-success w-100" type="submit">
                        Sign In
                      </button>
                    </div>

                    <div class="mt-4 text-center">
                      <div class="signin-other-title">
                        <h5 class="fs-13 mb-4 title">Sign In with</h5>
                      </div>
                      <div>
                        <button
                          type="button"
                          class="
                            btn btn-primary btn-icon
                            waves-effect waves-light
                          "
                        >
                          <i class="ri-facebook-fill fs-16"></i>
                        </button>
                        <button
                          type="button"
                          class="
                            btn btn-danger btn-icon
                            waves-effect waves-light
                            ms-1
                          "
                        >
                          <i class="ri-google-fill fs-16"></i>
                        </button>
                        <button
                          type="button"
                          class="
                            btn btn-dark btn-icon
                            waves-effect waves-light
                            ms-1
                          "
                        >
                          <i class="ri-github-fill fs-16"></i>
                        </button>
                        <button
                          type="button"
                          class="
                            btn btn-info btn-icon
                            waves-effect waves-light
                            ms-1
                          "
                        >
                          <i class="ri-twitter-fill fs-16"></i>
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
              <!-- end card body -->
            </div>
            <!-- end card -->

            <div class="mt-4 text-center">
              <p class="mb-0">
                Don't have an account ?
                <router-link
                  to="/register"
                  class="fw-semibold text-primary text-decoration-underline"
                >
                  Signup
                </router-link>
              </p>
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
              <p class="mb-0 text-muted">
                &copy; {{ new Date().getFullYear() }} Velzon. Crafted with
                <i class="mdi mdi-heart text-danger"></i> by Themesbrand
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
    <!-- end Footer -->
  </div>
  <!-- end auth-page-wrapper -->
</template>