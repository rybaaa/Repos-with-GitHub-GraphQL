<template>
  <div class="main">
    <span v-if="this.isLoading" class="loader"></span>
    <div v-else class="dropdown">
      <div class="header">
        <div v-show="this.hasPreviousPage" class="icons">
          <div class="triangle-left"></div>
          <span>Load previous repositories</span>
        </div>
        <h2>Repositories: {{ this.count }} of {{ this.totalRepositories }}</h2>
        <div v-show="this.hasNextPage" class="icons">
          <div class="triangle-right"></div>
          <span>Load next repositories</span>
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
      fetchRepos: 'fetchRepos'
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

<style lang="scss">
@import "../common/sass/mixins";

.main {
  width: 80%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin: 0 auto 200px;

  .loader {
    width: 48px;
    height: 48px;
    border: 5px solid #FFF;
    border-bottom-color: transparent;
    border-radius: 50%;
    display: inline-block;
    box-sizing: border-box;
    animation: rotation 1s linear infinite;
  }

  @keyframes rotation {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
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
      }
    }
  }
}
</style>