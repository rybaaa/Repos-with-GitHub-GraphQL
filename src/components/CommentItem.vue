<template>
  <div class="wrapper">
    <div v-if="true" class="comment">
      <h3>Comment №{{ index + 1 }}</h3>
      <span>Description: {{ comment.bodyText }}</span>
      <span>Created: {{ comment.createdAt.replace(/[A-Z]/g, ' ') }}</span>
    </div>
    <div v-else>
      <h3>No comments in this issue</h3>
    </div>
  </div>
</template>

<script>
import {mapMutations} from "vuex";

export default {
  name: "CommentItem",
  props: {
    comment: {
      type: Object,
      required: true
    },
    index: {
      type: Number,
      required: true
    },
  },
  methods: {
    ...mapMutations({
      setCommentsAreVisible: 'setCommentsAreVisible'
    }),
  },
}
</script>

<style lang="scss" scoped>
.wrapper {
  display: flex;
  flex-direction: column;

  .comment {
    display: flex;
    flex-direction: column;
  }

  .noComment {
    width: 100px;
    height: 100px;
  }
}
</style>