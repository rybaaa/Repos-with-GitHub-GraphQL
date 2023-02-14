<template>
  <div class="main">
    <span v-if="this.isLoading" class="loader"></span>
    <div v-else class="dropdown">
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
      setCurrentRepo: 'setCurrentRepo',
    }),
    ...mapActions({
      fetchRepos: 'fetchRepos',
      loadNextRepos: 'loadNextRepos',
      loadPrevRepos:'loadPrevRepos'
    }),
    selectItemEventHandler(item) {
      const repo = this.repositories.find(repo => repo.name === item)
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
      avatar: state => state.repositories.avatar,
      repositories: state => state.repositories.repositories,
      totalRepositories: state => state.repositories.totalRepositories,
      count: state => state.repositories.count,
      hasNextPage: state => state.repositories.hasNextPage,
      hasPreviousPage: state => state.repositories.hasPreviousPage
    }),
  },
  mounted() {
    this.fetchRepos()
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
  }
}
</style>