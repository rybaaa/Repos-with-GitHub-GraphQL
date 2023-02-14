<template>
  <div class="wrapper">
    <div class="comment">
      <h3>Comment №{{ index + 1 }}</h3>
      <span class="description">Description: {{ comment.bodyText }}</span>
      <span>Created: {{ comment.createdAt.replace(/[A-Z]/g, ' ') }}</span>
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
@import "../common/sass/mixins";
.wrapper {
  @include flex(column, center, center);
  border: 2px solid #282626;
  border-radius: 10px;
  margin-bottom: 10px;

  .comment {
    @include flex(column, center, center);
    padding:5px;
    gap:10px;
    .description{
      text-align: center;
      max-width: 80%;
    }
  }
}
</style>