<!-- <template>
    <input type="search" v-model="searchQuery" @input="search" />
  </template>
  
  <script lang="ts">
  import { ref } from 'vue';
  
  export default {
    setup() {
      const searchQuery = ref('');
  
      const search = () => {
        this.$emit('search', searchQuery.value);
      };
  
      return {
        searchQuery,
        search,
      };
    },
  };
  </script> -->