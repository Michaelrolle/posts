<template>
  <div>
    <!-- <p v-for="error in errors">{{error}}</p> -->
    <select v-model="category_id" class="form-control col-md-3">
      <option value>choose category</option>
      <option v-for="category in categories.data" :value="category.id">{{category.name}}</option>
    </select>
    <table class="table">
      <thead>
        <tr>
          <th>Title</th>
          <th>Post text</th>
          <th>Created date</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="post in posts.data" :key="post.id">
          <td>{{post.title}}</td>
          <td>{{post.post_text}}</td>
          <td>{{post.created_at}}</td>
          <td></td>
        </tr>
      </tbody>
    </table>
    <pagination :data="posts" @pagination-change-page="getPosts"></pagination>
  </div>
</template>

<script>
export default {
  data() {
    return {
      categories: [],
      posts: {},
      errors: [],
      category_id: "",
    };
  },

  mounted() {
    this.getPosts();
    this.getCategories();
  },

  watch: {
    category_id(value) {
      this.getPosts();
    },
  },

  methods: {
    getPosts(page = 1) {
      axios
        .get(
          "http://localhost:8000/api/posts?page=" +
            page +
            "&category_id=" +
            this.category_id
        )
        .then((response) => {
          this.posts = response.data;
        })
        .catch((err) => (this.errors = err));
    },

    getCategories() {
      axios
        .get("http://localhost:8000/api/categories")
        .then((response) => {
          this.categories = response.data;
        })
        .catch((err) => (this.errors = err));
    },
  },
};
</script>

<style>
</style>