<template>
  <div class="about">
    <h1>Admin</h1>

    <div class="card">
      {{ user }}, you are currently logged in as an administrator.
      <!-- Secret info -->
      <p class="read-the-docs">This is a secret message for admins only.</p>
      <!-- Create count down timer -->
      <p class="read-the-docs">You will be logged out in {{ msg }}.</p>
    </div>
  </div>
</template>
<script>
import state from "../service";
export default {
  name: "AdminView",

  data() {
    return {
      msg: "1 minute",
      user: "",
      time: 60,
    };
  },
  methods: {
    countDown() {
      // create a countdown function
      this.time--;
      this.msg = this.time + " seconds";
      // if time has ended, log user out
      if (this.time === 0) {
        //TODO: log user out
        clearInterval(this.timer);
        // send to signout page
        window.location.href = "/auth/signout";
      }
    },
  },
  mounted() {
    console.log("AdminView mounted");
    this.user = state.user.name;
    // call countDown function
    this.timer = setInterval(this.countDown, 1000);
  },
};
</script>
