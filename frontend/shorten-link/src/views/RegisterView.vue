<script></script>

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
      <div class="font-bold text-lg">REGISTER</div>
      <div class="form-control w-full max-w-xs">
        <label class="label">
          <span class="label-text">Email</span>
        </label>
        <input
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
          class="input input-bordered w-64 max-w-xs rounded-md"
        />
        <label class="label"> </label>
      </div>
      <button class="btn btn-sm rounded-lg bg-sky-500">create</button>
      <div class="mt-4 text-xs">Already have an account?</div>
      <button class="text-xs underline underline-offset-1 text-sky-500">
        Log in
      </button>
    </div>
  </div>
</template>
