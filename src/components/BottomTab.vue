<template>
  <div class="flex justify-center">
    <div class="bg-gradient-to-b from-white/[.10] to-transparent rounded-t-xl fixed bottom-1 text-white text-center py-3 px-3 z-10 w-fit">
    
            <div
                class="tabs group relative inline-flex items-center justify-center w-12 h-12 text-center rounded-full opacity-95 border border-white/50 bg-black active:scale-125 mx-3 cursor-pointer"
                @click="$store.state.activeTab !== 1 ? $store.commit('changeTab', 1) : ''"
                data-tippy-content="Launches"
            >
                <div class="absolute w-full h-full right-0 rounded-full opacity-0 animate-spin group-hover:opacity-100" :class="$store.state.activeTab == 1 ? 'opacity-100' : ''" style="animation-duration: 3s;">
                    <div class="absolute rounded-full -right-1 p-1 bg-white animate-ping group-active:-right-3 group-active:animate-bounce">
                    </div>
                    <div class="absolute rounded-full -right-1 p-1 bg-white/75 group-active:-right-3">
                    </div>
                </div>
                <i class="la la-meteor text-3xl rotate-[135deg]"></i>
            </div>


            <div
                class="tabs group relative inline-flex items-center justify-center w-12 h-12 text-center rounded-full opacity-95 border border-white/50 bg-black active:scale-125 mx-3 cursor-pointer"
                @click="$store.state.activeTab !== 2 ? $store.commit('changeTab', 2) : ''"
                data-tippy-content="Rockets"
            >
                <div class="absolute w-full h-full right-0 rounded-full opacity-0 animate-spin group-hover:opacity-100" :class="$store.state.activeTab == 2 ? 'opacity-100' : ''" style="animation-duration: 3s;">
                    <div class="absolute rounded-full -right-1 p-1 bg-white animate-ping group-active:-right-3 group-active:animate-bounce">
                    </div>
                    <div class="absolute rounded-full -right-1 p-1 bg-white/75 group-active:-right-3">
                    </div>
                </div>
                <i class="la la-rocket text-3xl"></i>
            </div>


            <div
                class="tabs group relative inline-flex items-center justify-center w-12 h-12 text-center rounded-full opacity-95 border border-white/50 bg-black active:scale-125 mx-3 cursor-pointer" 
                @click="$store.state.activeTab !== 3 ? $store.commit('changeTab', 3) : ''"
                data-tippy-content="About SpaceX"
            >
                <div class="absolute w-full h-full right-0 rounded-full opacity-0 animate-spin group-hover:opacity-100" :class="$store.state.activeTab == 3 ? 'opacity-100' : ''" style="animation-duration: 3s;">
                    <div class="absolute rounded-full -right-1 p-1 bg-white animate-ping group-active:-right-3 group-active:animate-bounce">
                    </div>
                    <div class="absolute rounded-full -right-1 p-1 bg-white/75 group-active:-right-3">
                    </div>
                </div>
                <i class="la la-question text-3xl"></i>
            </div>
        </div>
    </div>

</template>

<script setup>
import { useTippy } from "vue-tippy/composition"

useTippy('.group', {
    theme: 'custom',
    arrow: true
})
</script>