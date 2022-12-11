<script>
import { db, auth } from "../firebase/firebase";
import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import axios from "axios";
import cookies from "vue-cookies";
import Alert from "../components/Alert.vue";

const port = 3001;
export default {
  components: {
    Alert,
  },
  data() {
    return {
      alert: {
        isShow: false,
        status: false,
        msg: "",
      },
    };
  },
  methods: {
    close() {
      this.alert.isShow = !this.alert.isShow;
    },
    show(status, msg) {
      this.alert.isShow = !this.alert.isShow;
      this.alert.status = status;
      this.alert.msg = msg;
    },
    async login(email, password) {
      const res = await signInWithEmailAndPassword(auth, email, password)
        .then((res) => {
          this.show(true, "Login berhasil");
          cookies.set("token", res._tokenResponse.idToken);
          this.$router.push({ name: "dashboard" });
        })
        .catch((err) => {
          this.show(false, err.code);
        });
    },
  },
};
</script>

<template>
  <div
    class="overflow-hidden relative flex justify-center items-center h-screen bg-[#1F1D2B]"
  >
  <Alert
      :msg="this.alert.msg"
      :status="this.alert.status"
      @close="close"
      :class="this.alert.isShow ? '-translate-y-0' : 'translate-y-32'"
    />
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
        class="py-1 px-4 font-bold rounded-lg bg-sky-500 text-white"
        @click="login(login_email, login_password)"
      >
        Submit
      </button>
      <div class="mt-4 text-sm">Don't have an account?</div>
      <a
        class="text-sm underline underline-offset-1 text-sky-500"
        href="/register"
      >
        Register
      </a>
    </div>
  </div>
</template>
