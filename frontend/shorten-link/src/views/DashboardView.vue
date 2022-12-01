<template>
  <div class="relative flex justify-center flex-col overflow-hidden">
    <Navbar :name="this.nama_user" class="pt-10"> </Navbar>
    <div class="flex flex-col justify-center w-full max-w-[900px] pt-32 mx-auto">
      <input
        type="text"
        class="rounded-2xl text-base text-white py-4 px-10 bg-[#252836] focus:outline-2 focus:outline-[#08A0F7] active:outline-2 active:outline-[#08A0F7] hover:outline-1 hover:outline-[#08A0F7] outline-none w-full shadow-lg"
        name=""
        id=""
        placeholder="Paste url ..."
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
          @click="create(url, shorten)"
        >
          Create
        </button>
      </div>
      <div
        class="font-semibold text-white rounded-xl py-3 text-center text-xl bg-gradient-to-r from-[#957ADC] to-[#4B89DD] tracking-widest mt-16 shadow-lg"
      >
        URL LIST
      </div>
      <div class="bg-[#252836] mt-8 mb-24 rounded-xl shadow-xl  px-12 py-10">
        <div class="grid grid-cols-6 py-3" v-for="(links, index) in 8">
          <div class="text-white col-span-2 font-normal tracking-wider flex">
            <p class="self-center">asdfasdfasd</p>
            
          </div>
          <div class="text-[#08A0F7] col-span-3 tracking-wider flex">
            <p class="self-center hover:cursor-pointer">https://www.youtube.com/v...</p>
            
          </div>
          <div
            class="font-bold text-white text-center rounded-2xl bg-[#957ADC] px-6 py-1 w-fit col-span-1 tracking-wider"
          >
          <p class="self-center">8 Click</p>
          </div>
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
</template>

<script>
import Navbar from "./components/Navbar.vue";
export default {
  components: {
    Navbar,
  },
  data() {
    return {
      nama_user: "Ahnaf Musyaffa",
      links: [
        {
          shortenLink: "",
          originalLink: "",
          counts: 0,
        },
      ],
    };
  },
};
</script>
