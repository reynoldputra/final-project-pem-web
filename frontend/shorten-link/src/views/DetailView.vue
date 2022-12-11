<template>
  <div class="bg-[#1F1D2B]">
    <div class="relative z-0 overflow-hidden min-h-screen pb-16">
      <Alert
        :msg="this.alert.msg"
        :status="this.alert.status"
        @close="close"
        :class="this.alert.isShow ? '-translate-y-0' : 'translate-y-32'"
      />
      <Navbar :name="this.nama_user" @logout="logout" class="pt-10"> </Navbar>
      <div
        class="flex flex-col justify-center w-full max-w-[900px] pt-32 mx-auto relative z-20"
      >
        <div
          class="bg-[#353551] w-[800px] shadow-xl rounded-xl px-14 py-10 mx-auto "
        >
          <div class="flex justify-between pt-4">
            <div>
              <img
                class="w-6 cursor-pointer"
                @click="$router.push('/dashboard')"
                src="../../public/img/detail/back.png"
              />
            </div>
            <div class="flex gap-2">
              <label for="my-modal1" class="cursor-pointer"
                ><img src="../../public/img/detail/editButton.png" alt=""
              /></label>

              <input type="checkbox" id="my-modal1" class="modal-toggle" />
              <div class="modal">
                <div
                  class="modal-box w-[388px] h-[468px] bg-[#212121 ] p-10 flex flex-col justify-between"
                >
                  <h3 class="font-bold text-lg flex gap-2 text-[#08A0F7]">
                    <img
                      src="../../public/img/detail/editblueIcon.png"
                      alt=""
                    />
                    Update link
                  </h3>
                  <div>
                    Alias
                    <input
                      v-model="edit.alias"
                      type="text"
                      class="input w-full max-w-xs mt-3 bg-[#4B4B59]"
                    />
                  </div>
                  <div>
                    URL
                    <input
                      v-model="edit.url"
                      type="text"
                      class="input w-full max-w-xs mt-3 bg-[#4B4B59]"
                    />
                  </div>
                  <div class="modal-action flex justify-between">
                    <label
                      for="my-modal1"
                      class="flex justify-center items-center text-[#08A0F7]"
                      >Back</label
                    >
                    <label
                      for="my-modal1"
                      class="bg-[#08A0F7] btn text-[#FFFFFF]"
                      @click="updateShorten()"
                      >Update</label
                    >
                  </div>
                </div>
              </div>
              <label for="my-modal" class="cursor-pointer"
                ><img src="../../public/img/detail/deleteButton.png" alt="" />
              </label>

              <input type="checkbox" id="my-modal" class="modal-toggle" />
              <div class="modal">
                <div
                  class="flex flex-col justify-between modal-box w-[388px] h-[468px] bg-[#1D1D1D]"
                >
                  <img
                    class="w-12 mx-auto pt-24"
                    src="../../public/img/detail/dangerIcon.png"
                    alt=""
                  />
                  <h3 class="font-bold text-lg"></h3>
                  <p class="text-red-500 text-2xl text-center px-16">
                    Are you sure want to permanently
                    <span class="font-bold">delete</span> this url?
                  </p>
                  <div class="modal-action flex justify-center items-center">
                    <label
                      for="my-modal"
                      class="btn bg-[#D9D9D9] text-[#7E7E7E] w-40"
                      >No</label
                    >
                    <label
                      for="my-modal"
                      class="btn bg-[#EC4F3C] text-[#FFFFFF] w-40"
                      @click="deleteShorten()"
                      >YES</label
                    >
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="py-8">
            <h1 class="text-white font-bold text-2xl pt-4">{{ alias }}</h1>
            <p class="pt-4 text-[#08A0F7]">
              {{ url }}
            </p>
            <div
              class="font-semibold text-white rounded-full py-1 text-center bg-gradient-to-r from-[#957ADC] to-[#4B89DD] w-24 mt-6 shadow-lg"
            >
              {{ count }}
            </div>
          </div>
          <div class="flex flex-col bg-[#2d2d42] rounded-lg p-4 gap-y-3 shadow-lg ">
            <div class="text-white font-bold text-2xl">Activites</div>
            <div class="grid grid-cols-2 justify-between gap-x-8">
              <div >
                <div class="text-lg text-white ">
                  <div class="pb-2 text-slate-50 font-semibold">
                  Group by day
                </div>
                  <div class="flex justify-between pb-1" v-for="(gday, index) in groupbyDay" :key="index">
                    <div>{{ gday.date }}</div>
                    <div class="text-blue-400 pr-4">{{ gday.count }}</div>
                  </div>
                </div>
              </div>
              <div>
                <div class="text-lg text-white">
                  <div class="pb-2 text-slate-50 font-semibold">
                  Group by hours
                </div>
                  <div class="flex gap-4 justify-between pb-1" v-for="(ghour, index) in groupbyHour" :key="index">
                    <div>{{ ghour.time }}</div>
                    <div class="text-blue-400 pr-4">{{ ghour.count }}</div>
                  </div>
                </div>
              </div>
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
  </div>
</template>

<script>
import Navbar from "../components/Navbar.vue";
import Alert from "../components/Alert.vue";
import axios from "axios";
import { auth } from "../firebase/firebase";
import { signOut } from "@firebase/auth";
import cookies from "vue-cookies";

const token = await cookies.get("token");
const username = await cookies.get("username");

export default {
  data() {
    return {
      nama_user: username,
      alert: {
        isShow: false,
        status: false,
        msg: "",
      },
      alias: this.$route.params.alias,
      url: "",
      count: "",
      id: "",
      edit: {
        url: "",
        alias: "",
      },
      groupbyDay: [],
      groupbyHour: [],
    };
  },
  components: {
    Navbar,
    Alert,
  },
  methods: {
    close() {
      this.alert.isShow = !this.alert.isShow;
    },
    show(status, msg) {
      this.alert.isShow = !this.alert.isShow;
      console.log(this.alert.isShow);
      this.alert.status = status;
      this.alert.msg = msg;
    },
    async deleteShorten() {
      const res = axios
        .delete(`http://localhost:3001/api/shorten/${this.id}`, {
          headers: {
            authorization: `Bearer ${token}`,
          },
        })
        .catch((e) => {
          this.show(false, "Error, delete shorten link failed");
        });
      this.show(true, "Shorten link has been deleted successfully");
      setTimeout(() => this.$router.push({ name: "dashboard" }), 1500);
    },
    async updateShorten() {
      const _res = await axios
        .patch(`http://localhost:3001/api/shorten/${this.id}`, this.edit, {
          headers: {
            authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          this.alias = this.edit.alias;
          this.show(true, "Shorten link has been updated!");
          this.getShorten();
        })
        .catch((err) => {
          this.show(false, "Error, update shorten link failed");
        });
      return _res;
    },
    getShorten() {
      axios
        .get("http://localhost:3001/api/shorten/" + this.alias, {
          headers: {
            authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          this.url = res.data.data.url;
          this.edit.url = res.data.data.url;
          this.alias = res.data.data.alias;
          this.edit.alias = res.data.data.alias;
          this.count = res.data.data.count;
          this.id = res.data.data.id;
          this.groupbyDay.push(
            ...res.data.data.countClick.groupByDay
          );
          this.groupbyHour.push(
            ...res.data.data.countClick.groupByHour
          );
 
        });
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

  mounted() {
    this.getShorten();
  },
};
</script>
