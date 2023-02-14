<template>
  <div class="wrapper">
    <div class="header">
      <button class="btn" @click="$router.push('/')">Back to Main</button>
      <h1>Repository:{{ $route.params.title }}</h1>
    </div>
    <span v-if="this.isLoading" class="loader"></span>
    <div class="issuesList" v-else>
      <div class="issuesPagination">
        <div @click="this.fetchPrevIssues" v-show="this.hasPreviousPage" class="icons">
          <div class="triangle-left"></div>
          <span class="icon_text">Load previous repositories</span>
        </div>
        <h2>Issues: {{ this.countIssues }} of {{ this.currentIssues.totalCount }}</h2>
        <div @click="this.fetchNextIssues" v-show="this.hasNextPage" class="icons">
          <div class="triangle-right"></div>
          <span class="icon_text">Load next repositories</span>
        </div>
      </div>
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
      fetchIssues: 'issues/fetchIssues',
      fetchPrevIssues: 'issues/fetchPrevIssues',
      fetchNextIssues: 'issues/fetchNextIssues'
    })
  },
  computed: {
    ...mapState({
      isLoading: state => state.issues.isLoading,
      currentIssues: state => state.issues.currentIssues,
      countIssues: state => state.issues.countIssues,
      hasNextPage: state => state.issues.hasNextPage,
      hasPreviousPage: state => state.issues.hasPreviousPage
    })
  },
  mounted() {
    this.fetchIssues(this.$route.params.title)
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

  .header {
    @include flex(column, center, center);
    gap: 10px;
  }

  .issuesList {
    @include flex(column, center, center);
    width: 80%;
    .issuesPagination{
      @include flex(row, center, center);
      gap:10px;
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