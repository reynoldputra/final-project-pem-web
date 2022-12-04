<template>
    <div class="relative overflow-hidden h-screen bg-[#1F1D2B]">
        <div class="relative z-100">
            <Navbar name="Reynold Putra" class="pt-10  "> </Navbar>
            <div
                class="flex flex-col justify-center w-full max-w-[900px] pt-32 mx-auto relative z-20"
            >
                <div class="bg-[#353551] w-[800px] h-[300px] shadow-xl rounded-xl py-6 px-20 mx-auto">
                        <div class="flex justify-end gap-2 pt-4 ">
                            <img src="../../public/img/detail/deleteButton.png" alt="">
                            <img src="../../public/img/detail/editButton.png" alt="">
                        </div>
                        <h1 class="text-white font-bold text-2xl pt-4">urlaliasname</h1>
                        <p class="pt-4 text-[#08A0F7]">https://www.youtube.com/vfsadfsdfsadfasfsasfas</p>
                        <div
                            class="font-semibold text-white rounded-full py-1 text-center bg-gradient-to-r from-[#957ADC] to-[#4B89DD] w-24 mt-6 shadow-lg"
                        >
                            8 Click
                        </div>
                </div>
            </div>
        </div>
        <!-- <div
        class=" blur-[100px] w-[625px] h-[625px] bg-[#957ADC66] rounded-full -right-44 -bottom-72 z-0 opacity-60 absolute"
        ></div>
        <div
        class="w-[577px] h-[577px] rounded-full bg-[#00385B] blur-[100px] -top-28 -left-44 z-0 opacity-60 absolute"
        ></div>  -->
    </div>
</template>

<script>
import Navbar from '../components/Navbar.vue'

export default {
    components: {
        Navbar
    }
}

</script>