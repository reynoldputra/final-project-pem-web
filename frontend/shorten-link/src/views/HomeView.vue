<template>
    <div class="bg-[#1F1D2B]">
        
      <div class="relative w-full flex justify-center items-center z-0 overflow-hidden min-h-screen pb-16">
        <div class="m-auto animate-pulse text-white text-8xl font-bold rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10 hover:text-9xl hover:duration-[400ms] hover:transition-all cursor-pointer" @click="this.$router.push('/login')">al-az.me</div>
        <div
          class="blur-[100px] w-[625px] h-[625px] animate-pulse  bg-[#957ADC66] rounded-full -right-44 -bottom-72 -z-10 opacity-60 absolute"
        ></div>
        <div
          class="w-[577px] h-[577px] animate-pulse rounded-full bg-[#00385B] blur-[100px] -top-28 -left-44 -z-10 opacity-60 absolute"
        ></div>
      </div>
    </div>
  </template>