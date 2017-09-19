/* eslint no-param-reassign: */
import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);
export default new Vuex.Store({
  state: {
    searchInput: '',
  },
  mutations: {
    SET_VALUE(state, input) {
      state.searchInput = input;
    },
  },
  actions: {
    setValue({ commit }, input) {
      commit('SET_VALUE', input);
    },
  },
  getters: {
    searchValue: state => state.searchInput,
  },
});
