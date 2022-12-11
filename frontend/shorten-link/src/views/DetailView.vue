<template>
  <div class="bg-[#1F1D2B]">
    <div class="relative z-0 overflow-hidden h-screen">
      <Alert
        :msg="this.alert.msg"
        :status="this.alert.status"
        @close="close"
        :class="this.alert.isShow ? '-translate-y-0' : 'translate-y-32'"
      />
      <Navbar name="Reynold Putra" class="pt-10"> </Navbar>
      <div
        class="flex flex-col justify-center w-full max-w-[900px] pt-32 mx-auto relative z-20"
      >
        <div
          class="bg-[#353551] w-[800px] h-[300px] shadow-xl rounded-xl py-6 px-20 mx-auto"
        >
          <div class="flex justify-end gap-2 pt-4">
            <label for="my-modal1" class=""
              ><img src="../../public/img/detail/editButton.png" alt=""
            /></label>

            <input type="checkbox" id="my-modal1" class="modal-toggle" />
            <div class="modal">
              <div
                class="modal-box w-[388px] h-[468px] bg-[#212121 ] p-10 flex flex-col justify-between"
              >
                <h3 class="font-bold text-lg flex gap-2 text-[#08A0F7]">
                  <img src="../../public/img/detail/editblueIcon.png" alt="" />
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
            <label for="my-modal" class=""
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
      </div>
      <div
        class="blur-[100px] w-[625px] h-[625px] bg-[#957ADC66] rounded-full -right-44 -bottom-72 -z-10 opacity-60 absolute"
      ></div>
      <div
        class="w-[577px] h-[577px] rounded-full bg-[#00385B] blur-[100px] -top-28 -left-44 -z-10 opacity-60 absolute"
      ></div>
    </div>
  </div>
</template>

<script>
import Navbar from "../components/Navbar.vue";
import Alert from "../components/Alert.vue";
import axios from "axios";
import cookies from "vue-cookies";
const token = cookies.get("token");

export default {
  data() {
    return {
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
      const _res = await axios
        .delete(`http://localhost:3001/api/shorten/${this.id}`, {
          headers: {
            authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          this.show(true, "Shorten link has been deleted successfully");
          this.getShorten();
        })
        .catch((err) => {
          this.show(false, "Error, delete shorten link failed");
        });

      return _res;
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
          console.log(res.data.data);
          this.url = res.data.data.url;
          this.edit.url = res.data.data.url;
          this.alias = res.data.data.alias;
          this.edit.alias = res.data.data.alias;
          this.count = res.data.data.count;
          this.id = res.data.data.id;
        });
    },
  },

  mounted() {
    this.getShorten();
  },
};
</script>
