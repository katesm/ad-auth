<template>
  <div class="home">
    <h1>{{ name }}</h1>

    <div class="card">
      This project is used to test out AD Authentication and Authorization
      <div v-if="auth">
        <p class="read-the-docs">
          Great! {{ name }} you're currently signed in. Here's some info about
          you.
        </p>
        <p><strong>Email:</strong> {{ email }}</p>
        <p><strong>Phone:</strong> {{ phone }}</p>
        <a href="/auth/signout">
          <button class="btn btn-primary">Sign Out</button></a
        >
      </div>

      <div v-else>
        <p class="read-the-docs">
          You're not signed in. Please sign in to continue.
        </p>
        <!-- signin button -->
        <a href="/auth/signin">
          <button class="btn btn-primary">Sign In</button>
        </a>
      </div>
    </div>
  </div>
</template>

<script>
import state from "../service";
export default {
  name: "HomeView",
  data() {
    return {
      name: "Hello",
      auth: false,
      email: "",
      phone: "",
    };
  },
  props: {},

  mounted() {
    console.log("HomeView mounted");
    console.log(state.user);
    if (state.user.isAuth) {
      this.name = state.user.name;
      this.auth = state.user.isAuth;
      this.email = state.user.mail;
      this.phone = state.user.mobilePhone;
    }
  },
};
</script>
<style>
.read-the-docs {
  color: #888;
}
</style>
