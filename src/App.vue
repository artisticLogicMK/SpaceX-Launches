<script setup>
import Loader from './components/Loader.vue'
import BottomTab from './components/BottomTab.vue'
import Launches from './components/Launches.vue'
import Rockets from './components/Rockets.vue'
import About from './components/About.vue'

import axios from 'axios'
import moment from 'moment'
import { useTippy } from "vue-tippy/composition"
import { useStore } from 'vuex'
import { onBeforeMount, onMounted, ref } from 'vue'


const load = ref(true)
const store = useStore()

//tooltip tippjs config
useTippy('.targets', {
  theme: 'custom',
  arrow: true,
  followCursor: false
})


onBeforeMount( async() => {
  
  await axios.get("https://api.spacexdata.com/v4/launches")
  .then((res) => {
    //resort by year, recent launches first
    let sorted = res.data.sort((a,b) => b.flight_number - a.flight_number)

    //get needed data from result
    sorted.forEach(el => {
      store.commit('pushLaunchData', {
        id: el.id,
        name: el.name,
        flight_no: el.flight_number,
        date: moment(el.date_utc).format('MMM Do, YYYY'),
        year: Number(moment(el.date_utc).format('YYYY')),
        month: moment(el.date_utc).format('MMM'),
        day: moment(el.date_utc).format('DD')
      })
    })
  })

  //fetch latest launch data to populate in default launch data
  await axios.get("https://api.spacexdata.com/v4/launches/latest")
  .then((res) => {
    store.dispatch('setLaunchView', res.data)
  })

})

onMounted(() => {
  load.value = false
})

</script>

<template>

  <!--head-->
  <div class="absolute left-2.5 md:left-0 top-3 md:top-4">
      <img src="/img/logo.svg" alt="spacex_logo" class="w-28 xsm:w-36 md:w-48 md:pl-9">
  </div>
  
  <img src="/img/light33.png" class="fixed right-0 top-0 opacity-[.65] w-56 xsm:w-64 sm:w-72 lg:w-96">
  <div
    class="targets text-white/[.30] hover:text-white/90 text-[0.8rem] absolute top-2 xsm:top-3 lg:top-3 right-[45%] xsm:right-[35%] sm:right-[40%] z-10 cursor-pointer"
    @click="$store.state.activeTab !== 4 ? $store.commit('changeTab', 4) : ''"
    v-if="$store.state.activeTab !== 4"
    data-tippy-content="Watch Planet Rotation"
  >
    <span class="text-lg"><i class="la la-atom"></i></span>
  </div>


  <div id="tabdisplay" class="duration-500">
    <Loader v-if="$store.state.load || $store.state.activeTab == 4"/>

    <Launches v-if="$store.state.activeTab == 1" />

    <Rockets v-if="$store.state.activeTab == 2" />

    <About v-if="$store.state.activeTab == 3" />
  </div>
  
  <BottomTab v-if="!$store.state.load"/>

  <div
    class="bg-red-400/75 text-white px-3 py-1 fixed bottom-0 text-xs w-full z-10 left-0 text-center"
    v-if="$store.state.error"
  >
    There was a problem connecting...
    <button
      class="border border-white/75 font-semibold px-2 py-0.5 rounded hover:bg-white/25"
      @click="$store.commit('error', false)"
      v-if="$store.state.error"
    >
      Okay
    </button>
  </div>

</template>
