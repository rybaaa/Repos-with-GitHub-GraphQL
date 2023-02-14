<template>
  <div class="issue" @click="showComments">
    <h2>Issue №{{ index + 1 }}</h2>
    <h3>Title:{{ issue.title }}</h3>
    <span>Description:{{ issue.bodyText }}</span>
    <span>Status: {{ issue.state }}</span>
    <h2 v-show="isActive">Comments</h2>
    <div v-show="this.issue.comments.nodes.length" class="comments">
      <div
          v-for="(comment,index) in this.issue.comments.nodes"
          :key="index"
          class="item"
      >
        <CommentItem
            v-show="isActive"
            :index='index'
            :comment='comment'
        >
        </CommentItem>
      </div>
    </div>
    <div v-show="isActive && !this.issue.comments.nodes.length">
      <h3>No comments in this issue</h3>
    </div>
  </div>
</template>

<script>
import CommentItem from "@/components/CommentItem";

export default {
  name: "IssueItem",
  data() {
    return {
      isActive: false
    }
  },
  components: {CommentItem},
  props: {
    issue: {
      type: Object,
      required: true
    },
    index: {
      type: Number,
      required: true
    },
  },
  methods: {
    showComments() {
      this.isActive = !this.isActive
    }
  },
  computed: {}
}
</script>

<style lang="scss" scoped>
@import "../common/sass/mixins";
.issue {
  width: 80%;
  margin: 20px auto;
  background-color: #fa6400;
  border-radius: 20px;
  padding: 15px;
  display: flex;
  flex-direction: column;
  gap: 5px;
  color: #fff;
  cursor: pointer;

  &:hover {
    opacity: 0.8;
  }
  .comments{
    @include flex(column, flex-start, center);
    width: 100%;
    .item{
      width: 100%;
    }
  }
}
</style>