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
          <th>
            <a href="#" @click.prevent="change_sort('title')">Title</a>
            <span v-if="this.sort_field == 'title' && this.sort_direction == 'asc'">&uarr;</span>
            <span v-if="this.sort_field == 'title' && this.sort_direction == 'desc'">&darr;</span>
          </th>
          <th>
            <a href="#" @click.prevent="change_sort('post_text')">Post Text</a>
            <span v-if="this.sort_field == 'post_text' && this.sort_direction == 'asc'">&uarr;</span>
            <span v-if="this.sort_field == 'post_text' && this.sort_direction == 'desc'">&darr;</span>
          </th>
          <th>
            <a href="#" @click.prevent="change_sort('created_at')">Created Date</a>
            <span v-if="this.sort_field == 'created_at' && this.sort_direction == 'asc'">&uarr;</span>
            <span v-if="this.sort_field == 'created_at' && this.sort_direction == 'desc'">&darr;</span>
          </th>
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
      sort_field: "created_at",
      sort_direction: "desc",
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
    change_sort(field) {
      if (this.sort_field == field) {
        this.sort_direction = this.sort_direction === "asc" ? "desc" : "asc";
      } else {
        this.sort_field = field;
        this.sort_direction = "asc";
      }
      this.getPosts();
    },

    getPosts(page = 1) {
      axios
        .get(
          "http://localhost:8000/api/posts?page=" +
            page +
            "&category_id=" +
            this.category_id +
            "&sort_field=" +
            this.sort_field +
            "&sort_direction=" +
            this.sort_direction
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