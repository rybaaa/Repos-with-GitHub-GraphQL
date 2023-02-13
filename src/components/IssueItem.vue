<template>
  <div class="issue" @click="showComments">
    <h2>Issue №{{ index + 1 }}</h2>
    <h3>Title:{{ issue.node.title }}</h3>
    <span>Description:{{ issue.node.bodyText }}</span>
    <div>Status: {{ issue.node.state }}</div>
    <h2 v-if="isActive">Comments</h2>
    <div
        v-for="(comment,index) in this.issue.node.comments.nodes"
        :key="index"
    >
      <CommentItem
          v-show="isActive"
          :index='index'
          :comment='comment'
      >
      </CommentItem>
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
  computed: {
  }
}
</script>

<style lang="scss" scoped>
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
  &:hover{
    opacity: 0.8;
  }
}
</style>