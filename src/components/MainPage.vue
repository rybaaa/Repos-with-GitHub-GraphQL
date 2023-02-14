<template>
  <div class="main">
    <h1>REPOSITORIES SEARCHING</h1>
    <div v-show="!isAuth" class="login">
      <h2>Your token</h2>
      <input class="input" :value="token" @input="updateInput" type="text" placeholder="Enter your Github token to get access">
      <button class="btn" @click="initialize(true)">OK</button>
    </div>
    <span v-if="isLoading" class="loader"></span>
    <div v-if="!isLoading && isAuth" class="dropdown">
      <h2>{{this.login}}</h2>
      <img class="avatar" :src="this.avatar" alt="avatar"/>
      <div class="header">
        <div @click="loadPrevRepos" v-show="this.hasPreviousPage" class="icons">
          <div class="triangle-left"></div>
          <span class="icon_text">Load previous repositories</span>
        </div>
        <h2>Repositories: {{ this.count }} of {{ this.totalRepositories }}</h2>
        <div @click="this.loadNextRepos" v-show="this.hasNextPage" class="icons">
          <div class="triangle-right"></div>
          <span class="icon_text">Load next repositories</span>
        </div>
      </div>
      <SimpleTypeahead
          id="typeahead_id"
          placeholder="Search..."
          :items="this.repositories.map(repo=>repo.name)"
          :minInputLength="0"
          @selectItem="selectItemEventHandler"
      >
      </SimpleTypeahead>
      <h3>You can change your token if something went wrong</h3>
      <button @click="changeToken" class="btn2">Change token</button>
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
      setIsAuth: 'repositories/setIsAuth',
      setToken:'repositories/setToken',
      setCurrentRepo: 'issues/setCurrentRepo',
    }),
    ...mapActions({
      fetchRepos: 'repositories/fetchRepos',
      loadNextRepos: 'repositories/loadNextRepos',
      loadPrevRepos:'repositories/loadPrevRepos'
    }),
    selectItemEventHandler(item) {
      const repo = this.repositories.find(repo => repo.name === item)
      this.setCurrentRepo(repo)
      this.$router.push(`/repository/${item}`)
    },
    updateInput(event) {
      this.setToken(event.target.value)
      localStorage.setItem('token', event.target.value)
    },
    initialize(value){
      this.setIsAuth(value)
      this.fetchRepos()
    },
    changeToken(){
      this.setIsAuth(false)
    }
  },
  components: {
    SimpleTypeahead
  },
  computed: {
    ...mapState({
      isAuth: state => state.repositories.isAuth,
      token: state => state.repositories.token,
      isLoading: state => state.repositories.isLoading,
      login: state => state.repositories.login,
      avatar: state => state.repositories.avatar,
      repositories: state => state.repositories.repositories,
      totalRepositories: state => state.repositories.totalRepositories,
      count: state => state.repositories.count,
      hasNextPage: state => state.repositories.hasNextPage,
      hasPreviousPage: state => state.repositories.hasPreviousPage
    }),
  },
  mounted() {
  }
}
</script>

<style scoped lang="scss">
@import "../common/sass/mixins";

.main {
  width: 80%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin: 0 auto 200px;
  text-align:justify;

  .login{
    @include flex(row, center, center);
    gap: 10px;
    margin-top: 50px;
    .input{
      width: 400px;
      height: 40px;
      padding:5px;
      border-radius: 10px;
    }
    .btn{
      width: 50px;
      height: 40px;
      border-radius: 10px;
      background-color: #fa6400;
      cursor: pointer;
      &:hover{
        opacity: 0.8;
      }
    }
  }

  .loader {
    @include loader;
  }

  .dropdown {
    @include flex(column, flex-start, center);
    gap: 20px;
    width: 100%;

    .header {
      @include flex(row, center, center);
      gap: 30px;

      .icons {
        @include flex(column, center, center);
        cursor: pointer;

        .triangle-left {
          @include arrows;
          transform: rotate(-45deg);

          &:after {
            @include arrowsAfter;
          }
        }

        .triangle-right {
          @include arrows;
          transform: rotate(135deg);

          &:after {
            @include arrowsAfter;
          }
        }
        .icon_text{
          text-align: center;
        }
      }
    }
    .avatar{
      width: 100px;
      height: 100px;
    }
    .btn2{
      width: 200px;
      height: 40px;
      border-radius: 10px;
      background-color: #fa6400;
      cursor: pointer;
      &:hover{
        opacity: 0.8;
      }
    }
  }
}
</style>