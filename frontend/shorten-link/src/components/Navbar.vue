<script>
export default {
  props: ["name"],
};
</script>

<template>
  <div class="w-full flex justify-between mx-auto max-w-7xl px-10">
    <div class="self-center"><img src="../../public/img/navbar/login.svg" class="w-10" alt="" /></div>
    <div class="flex gap-5 justify-center bg-[#252836] py-3 px-7 rounded-2xl shadow-lg">
      <img src="../../public/img/navbar/user.svg" />
      <div class="self-center text-xl text-white font-semibold">{{ name }}</div>
    </div>
  </div>
</template>
