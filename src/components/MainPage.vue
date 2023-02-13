<template>
  <div class="main">
    <div class="loading" v-if="this.isLoading">Loading...</div>
    <div v-else class="dropdown">
      <h3>Repositories: {{this.count}} of {{this.totalRepositories}}</h3>
      <SimpleTypeahead
          id="typeahead_id"
          placeholder="Search..."
          :items="this.repositories.map(repo=>repo.name)"
          :minInputLength="0"
          @selectItem="selectItemEventHandler"
      >
      </SimpleTypeahead>
    </div>
  </div>
</template>

<script>
import SimpleTypeahead from 'vue3-simple-typeahead'
import 'vue3-simple-typeahead/dist/vue3-simple-typeahead.css'
import {mapState, mapActions, mapMutations} from 'vuex'

export default {
  name: "MainPage",
  methods: {
    ...mapMutations({
      setCurrentRepo: 'setCurrentRepo'
    }),
    ...mapActions({
      fetchRepos: 'fetchRepos'
    }),
    selectItemEventHandler(item){
      const repo = this.repositories.find(repo=>repo.name===item)
      this.setCurrentRepo(repo)
      this.$router.push(`/repository/${item}`)
    }
  },
  components: {
    SimpleTypeahead
  },
  computed: {
    ...mapState({
      isLoading: state => state.repositories.isLoading,
      login: state => state.repositories.login,
      repositories:state => state.repositories.repositories,
      totalRepositories: state => state.repositories.totalRepositories,
      count: state => state.repositories.count,
    }),
  },
  mounted() {
    this.fetchRepos()
  }
}
</script>

<style lang="scss">
.main{
  width: 80%;
  display: flex;
  justify-content: center;
  flex-direction: column;
  margin: 0 auto 200px;
  .loading{
    border: 1px solid red;
  }
  .dropdown{
    display: flex;
    flex-direction: column;
    gap:20px;
    width: 100%;
  }
}
</style>