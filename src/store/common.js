import { defineStore } from 'pinia';

export const useCommonStore = defineStore('common', {
  state: () => {
    return {
      isCollapse: false,
    };
  },

  actions: {
    C_SET_ISCOLLAPSE(value) {
      this.$patch((state) => {
        state.isCollapse = value;
      });
    },
  },

  persist: {
    enabled: true,
    // strategies: [{ key: '', storage: localStorage }],
    // paths: []
  },
});
