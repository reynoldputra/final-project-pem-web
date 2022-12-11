<template>
  <div class="relative flex justify-center flex-col overflow-hidden min-h-screen">
    <Alert :msg="this.alert.msg" :status="this.alert.status"  @close="close" :class="this.alert.isShow ? '-translate-y-0' : 'translate-y-32'"/>
    <Navbar :name="this.nama_user" @logout="logout" class="pt-10"> </Navbar>
    <div
      class="flex flex-col justify-center w-full max-w-[900px] pt-32 mx-auto"
    >
      <input
        type="url"
        class="rounded-2xl text-base text-white py-4 px-10 bg-[#252836] focus:outline-2 focus:outline-[#08A0F7] active:outline-2 active:outline-[#08A0F7] hover:outline-1 hover:outline-[#08A0F7] outline-none w-full shadow-lg"
        name=""
        id=""
        v-model="url"
      />
      <div class="flex justify-between pt-7">
        <input
          type="text"
          class="rounded-2xl text-base text-white py-4 px-10 bg-[#252836] focus:outline-2 focus:outline-[#08A0F7] active:outline-2 active:outline-[#08A0F7] hover:outline-1 hover:outline-[#08A0F7] outline-none w-72 shadow-lg"
          placeholder="Alias (optional)"
          v-model="shorten"
        />
        <button
          class="py-4 px-16 rounded-xl font-bold text-white hover:text-slate-300 bg-[#08A0F7] shadow-lg hover:outline-2 hover:outline hover:outline-[#08A0F7]"
          @click="generateLink(url, shorten)"
        >
          Create
        </button>
      </div>
      <div
        class="font-semibold text-white rounded-xl py-3 text-center text-xl bg-gradient-to-r from-[#957ADC] to-[#4B89DD] tracking-widest mt-16 shadow-lg"
      >
        URL LIST
      </div>
      <div class="bg-[#252836] mt-8 mb-24 rounded-xl shadow-xl px-12 py-10">
        <div
          class="grid grid-cols-6 py-3"
          v-for="(link, index) in links"
          :key="index"
        >
          <div
            class="text-white col-span-2 font-normal tracking-wider flex cursor-pointer"
            @click="redirectLinks(link.alias)"
          >
            <p class="self-center">{{ link.alias }}</p>
          </div>
          <div class="text-[#08A0F7] col-span-3 tracking-wider flex">
            <p class="self-center hover:cursor-pointer truncate max-w-xs">
              {{ link.url }}
            </p>
          </div>
          <div
            class="font-bold text-white text-center rounded-2xl bg-[#957ADC] px-6 py-1 w-fit col-span-1 tracking-wider cursor-pointer"
            @click="$router.push(`/dashboard/url/${link.alias}`)"
          >
            <p class="self-center">Detail</p>
          </div>
        </div>
      </div>
    </div>
    <div
      class="blur-[100px] w-[625px] h-[625px]  animate-pulse bg-[#957ADC66] rounded-full -right-44 -bottom-72 -z-10 opacity-60 absolute"
    ></div>
    <div
      class="w-[577px] h-[577px] rounded-full  animate-pulse bg-[#00385B] blur-[100px] -top-28 -left-44 -z-10 opacity-60 absolute"
    ></div>
  </div>
</template>

<script>
import axios from "axios";
import cookies from "vue-cookies";
import Navbar from "../components/Navbar.vue";
import { auth } from "../firebase/firebase";
import { signOut } from "@firebase/auth";
import Alert from "../components/Alert.vue";
import {validateURL} from "../lib/validation"
const port = 3001;
export default {
  components: {
    Navbar,
    Alert
  },
  data() {
    return {
      shorten:"",
      url:"https://",
      alert:{
        isShow: false,
        status: false,
        msg:''
      },
      token:cookies.get("token"),
      nama_user: cookies.get("username"),  
      links: [],
    };
  },
  beforeMount() {
    this.getLinks();
  },
  methods: {
    close(){
      this.alert.isShow = !this.alert.isShow
    },
    show(status, msg) {
      this.alert.isShow = !this.alert.isShow
      this.alert.status = status;
      this.alert.msg = msg;
    },
    async generateLink(url, shorten) {
      if(!validateURL(url)){
        this.show(false, "URL is not valid")
        return;
      }
      const res = await axios
        .post(
          `http://localhost:${port}/api/shorten`,
          {
            url: url,
            alias: shorten,
          },
          {
            headers: {
              authorization: `Bearer ${this.token}`,
            },
          }
        )
        .catch();
      this.show(res.data.status, res.data.message);
      this.getLinks();
    },
    async getLinks() {
      const res = await axios
        .get(`http://localhost:${port}/api/shorten`, {
          headers: {
            authorization: `Bearer ${this.token}`,
          },
        })
        .catch();
      this.links = [];
      this.links.push(...res.data.data);
    },
    async redirectLinks(alias) {
      this.$router.push("/in/" + alias);
    },
    async logout() {
      await signOut(auth)
        .then(() => {
          cookies.remove("token");
          cookies.remove("username");
          this.$router.push({ name: "login" });
        })
        .catch((err) => console.log(err));
    },
  },
};
</script>
