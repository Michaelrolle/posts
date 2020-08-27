<template>
  <div>
    <form @submit.prevent="submit_form">
      Post Title
      <br />
      <input type="text" class="form-control" v-model="fields.title" />
      <br />Post Text
      <textarea class="form-control" name id rows="3" v-model="fields.post_text"></textarea>
      Category
      <select class="form-control" v-model="fields.category_id">
        <option v-for="category in categories" :value="category.id">{{ category.name}}</option>
      </select>

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
        });
    },
  },
};
</script>

<style>
</style>