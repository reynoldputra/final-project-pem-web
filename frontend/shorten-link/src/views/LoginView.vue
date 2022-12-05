<script>
import { db, auth } from "../firebase/firebase";
import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import axios from "axios";
import cookies from "vue-cookies";

const port = 3001;
export default {
  methods: {
    async login(email, password) {
      const res = await signInWithEmailAndPassword(auth, email, password).catch(
        (err) => {
          console.log(err.code);
        }
      );
      cookies.set("token", res._tokenResponse.idToken);
      this.$router.push({ name: "dashboard" });
    },
  },
};
</script>

<template>
  <div
    class="overflow-hidden relative flex justify-center items-center h-screen bg-[#1F1D2B]"
  >
    <div
      class="absolute w-[577px] h-[577px] rounded-full bg-[#00385B] blur-3xl -top-[188px] -left-[207px] opacity-50"
    ></div>

    <div
      class="absolute w-[577px] h-[577px] rounded-full bg-[#957ADC] blur-3xl opacity-25 -bottom-[188px] -right-[207px]"
    ></div>
    <div
      class="flex flex-col justify-center items-center bg-[#252836] w-80 p-8 rounded-xl drop-shadow-lg"
    >
      <div class="font-bold text-lg">L O G I N</div>
      <div class="form-control w-full max-w-xs">
        <label class="label">
          <span class="label-text">Email</span>
        </label>
        <input
          v-model="login_email"
          type="text"
          placeholder="user@gmail.com"
          class="flex input input-bordered w-64 max-w-xs rounded-md justify-center items-center"
        />
        <label class="label"> </label>
      </div>
      <div class="form-control w-full max-w-xs">
        <label class="label">
          <span class="label-text">Password</span>
        </label>
        <input
          type="password"
          placeholder="Password"
          v-model="login_password"
          class="input input-bordered w-64 max-w-xs rounded-md"
        />
        <label class="label"> </label>
      </div>
      <button
        class="btn btn-sm rounded-lg bg-sky-500"
        @click="login(login_email, login_password)"
      >
        Submit
      </button>
      <div class="mt-4 text-xs">Don't have an account?</div>
      <button class="text-xs underline underline-offset-1 text-sky-500">
        Register
      </button>
    </div>
  </div>
</template>
