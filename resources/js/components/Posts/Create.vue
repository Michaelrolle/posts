<template>
  <div>
    <form @submit.prevent="submit_form">
      Post Title
      <br />
      <input type="text" class="form-control" v-model="fields.title" />
      <div class="alert alert-danger" v-if="errors && errors.title">{{errors.title[0]}}</div>
      <br />Post Text
      <textarea class="form-control" name id rows="3" v-model="fields.post_text"></textarea>
      <div class="alert alert-danger" v-if="errors && errors.post_text">{{errors.post_text[0]}}</div>Category
      <select class="form-control" v-model="fields.category_id">
        <option v-for="category in categories" :value="category.id">{{ category.name}}</option>
      </select>
      <div class="alert alert-danger" v-if="errors && errors.category_id">{{errors.category_id[0]}}</div>

      <br />
      <input type="submit" class="btn btn-primary" value="Save post" />
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      categories: {},
      fields: {
        title: "",
        post_text: "",
        category_id: "",
      },
      errors: {},
    };
  },

  mounted() {
    axios
      .get("http://localhost:8000/api/categories")
      .then((response) => {
        this.categories = response.data.data;
      })
      .catch((err) => (this.errors = err));
  },

  methods: {
    submit_form() {
      axios
        .post("http://localhost:8000/api/posts", this.fields)
        .then((response) => {
          this.$router.push("/");
        })
        .catch((err) => {
          if (err.response.status === 422) {
            this.errors = err.response.data.errors;
          }
        });
    },
  },
};
</script>

<style>
</style>