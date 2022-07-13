import { userService } from '../../helpers/authservice/user.service';
import router from '../../router/index'

const user = JSON.parse(localStorage.getItem('user'));

export const state = user ? { status: { loggeduser: true }, user } : { status: {}, user: null };

export const actions = {
    // Logs in the user.
    // eslint-disable-next-line no-unused-vars
    loginF({ dispatch, commit }, { login, password }) {
        commit('loginRequest', { login });

        userService.login(login, password)
            .then(
                user => {
                    commit('loginSuccess', user);
                    router.push('/');


                }
            ).catch(err => {
                if (err.response) {
                    let message = '';
                    switch (err.response.data.status_code) {
                        case 400:
                            message = 'login or password is invalid';
                            break;

                        case 400:
                            message = 'login or password is invalid';
                            break;

                        default:
                            message = 'We are so sorry, but authentification server is unreacheable';
                            break;
                    }

                    commit('loginFailure', err);
                    dispatch('notification/error', message, { root: true });
                    // client received an error response (5xx, 4xx)
                } else if (err.request) {
                    // client never received a response, or request never left 
                } else {
                    // anything else 
                }

            });
    },
    // Logout the user
    logout({ commit }) {
        userService.logout();
        commit('logout');
    },
    // register the user
    registeruser({ dispatch, commit }, user) {
        commit('registerRequest', user);
        userService.register(user)
            .then(
                user => {
                    commit('registerSuccess', user);

                    router.push('/login');
                },
                error => {
                    commit('registerFailure', error);
                    dispatch('notification/error', error, { root: true });
                }
            );
    }
};

export const mutations = {
    loginRequest(state, user) {
        state.status = { loggingIn: true };
        state.user = user;
    },
    loginSuccess(state, user) {
        state.status = { loggeduser: true };
        state.user = user;
    },
    loginFailure(state) {
        state.status = { loggeduser: false };
        state.user = null;
    },
    logout(state) {
        state.status = {};
        state.user = null;
    },
    registerRequest(state) {
        state.status = { registering: true };
    },
    registerSuccess(state) {
        state.status = {};
    },
    registerFailure(state) {
        state.status = {};
    }
};