<template>
  <div class="bg-[#1F1D2B]">
    <div class="relative z-0 overflow-hidden h-screen">
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
                    type="text"
                    class="input w-full max-w-xs mt-3 bg-[#4B4B59]"
                  />
                </div>
                <div>
                  URL
                  <input
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
                    class="btn bg-[#08A0F7] btn text-[#FFFFFF]"
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
                    >YES</label
                  >
                </div>
              </div>
            </div>
          </div>
          <h1 class="text-white font-bold text-2xl pt-4">urlaliasname</h1>
          <p class="pt-4 text-[#08A0F7]">
            https://www.youtube.com/vfsadfsdfsadfasfsasfas
          </p>
          <div
            class="font-semibold text-white rounded-full py-1 text-center bg-gradient-to-r from-[#957ADC] to-[#4B89DD] w-24 mt-6 shadow-lg"
          >
            8 Click
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

export default {
  components: {
    Navbar,
  },
};
</script>
