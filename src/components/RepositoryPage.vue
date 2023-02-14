<template>
  <div class="wrapper">
    <div class="header">
      <button class="btn" @click="$router.push('/')">Back to Main</button>
      <h1>Repository:{{ $route.params.title }}</h1>
    </div>
    <span v-if="this.isLoading" class="loader"></span>
    <div class="repoList" v-else>
      <h2>Issues: {{this.countIssues}} of {{this.currentIssues.totalCount}}</h2>
      <IssueItem
          v-for="(issue, index) in this.currentIssues.nodes"
          :index="index"
          :issue='issue'
          :key="index"
      >
      </IssueItem>
    </div>
  </div>
</template>

<script>
import {mapActions, mapState} from 'vuex'
import IssueItem from "@/components/IssueItem";

export default {
  name: "RepositoryPage",
  components: {IssueItem},
  methods: {
    ...mapActions({
      fetchRepo: 'fetchRepo',
    })
  },
  computed: {
    ...mapState({
      isLoading: state => state.repositories.isLoading,
      currentIssues: state => state.repositories.currentIssues,
      countIssues: state => state.repositories.countIssues
    })
  },
  mounted() {
    this.fetchRepo()
  }
}
</script>

<style scoped lang="scss">
@import "../common/sass/mixins";

.wrapper {
  width: 100%;
  padding: 50px 0;
  @include flex(column, flex-start, center);
  background: linear-gradient(90deg, rgba(40, 154, 59, 1) 13%, rgba(163, 232, 167, 1) 100%, rgba(68, 138, 36, 1) 100%, rgba(78, 233, 72, 1) 100%, rgba(97, 177, 86, 1) 100%);
.header{
  @include flex(column, center, center);
  gap:10px;
}

  .repoList {
    @include flex(column, center, center);
    width: 80%;
  }

  .loader {
    @include loader;
  }

  .btn {
    align-items: center;
    background-clip: padding-box;
    background-color: #fa6400;
    border: 1px solid transparent;
    border-radius: .25rem;
    box-shadow: rgba(0, 0, 0, 0.02) 0 1px 3px 0;
    box-sizing: border-box;
    color: #fff;
    cursor: pointer;
    display: inline-flex;
    font-size: 16px;
    font-weight: 600;
    justify-content: center;
    line-height: 1.25;
    margin: 0 auto;
    min-height: 3rem;
    padding: calc(.875rem - 1px) calc(1.5rem - 1px);
    position: relative;
    text-decoration: none;
    transition: all 500ms;
    user-select: none;
    touch-action: manipulation;
    vertical-align: baseline;
    width: 200px;

    &:hover, &:focus {
      background-color: #fb8332;
      box-shadow: rgba(0, 0, 0, 0.1) 0 4px 12px;
    }

    &:hover {
      transform: translateY(-1px);
    }

    &:active {
      background-color: #c85000;
      box-shadow: rgba(0, 0, 0, .06) 0 2px 4px;
      transform: translateY(0);
    }
  }
}
</style>