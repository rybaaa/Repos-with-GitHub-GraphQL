<template>
  <div class="main">
    <div class="loading" v-if="this.isLoading">Loading...</div>
    <div v-else class="dropdown">
      <h3>Repositories: {{this.count}} of {{this.totalRepositories}}</h3>
      <SimpleTypeahead
          id="typeahead_id"
          placeholder="Search..."
          :items="this.repositories"
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
import {mapState, mapActions} from 'vuex'

// import axios from 'axios'
// import query from '@/query/query'
// import data from '@/query/data'

export default {
  name: "MainPage",
  methods: {
    ...mapActions({
      fetchRepos: 'fetchRepos'
    }),
    // async getGitHubData() {
    //   this.isLoading = false
    //   try{
    //     const response = await axios.post(
    //         `https://api.github.com/graphql`,
    //         {
    //           query,
    //         },
    //         {
    //           headers: {
    //             'Content-Type': 'application/json',
    //             Authorization: 'token ' + data["token"],
    //           },
    //         }
    //     )
    //     console.log(response)
    //     this.login = response.data.data.repositoryOwner.login
    //     this.repositories = response.data.data.repositoryOwner.repositories.nodes.map(name=>name.name)
    //     this.totalRepositories = response.data.data.repositoryOwner.repositories.totalCount
    //     this.count = response.data.data.repositoryOwner.repositories.nodes.length
    //   }
    //   catch {
    //     alert('Error occurred')
    //   }
    //   finally {
    //     this.isLoading = true
    //   }
    // },
    selectItemEventHandler(item){
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
      count: state => state.repositories.count
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