<script setup>
import LaunchImagesSlide from './launches/LaunchImagesSlide.vue'
import RocketAndPayload from './launches/RocketAndPayload.vue'
import Links from './launches/Links.vue'
import LaunchInfo from './launches/LaunchInfo.vue'

import axios from 'axios'
import { ref, onMounted, computed, watchEffect } from 'vue'
import { useStore } from 'vuex'

const lheight = ref(null)

const seldate = ref(null)

const store = useStore()

const launch = computed(() => { return store.state.launchView })

const dates = ref([])

//watch when selected year is changed, then filter launches for where launch year == selected year
watchEffect(() => {
    dates.value = store.state.launches.filter((d) => d.year == store.state.selectedYear)
})

//when dates select scroll movement buttons are clicked
const scrollDate = (direction) => {

    //if right button is clicked, scroll date container to right by 150px
    if(direction == 'right') {
        document.querySelector('#dates').scrollLeft += 150
    }

    //if left button is clicked, scroll date container to left by 150px
    if(direction == 'left') {
        document.querySelector('#dates').scrollLeft -= 150
    }
}


const reset = () => {
    //set dates container to start position
    document.querySelector('#dates').scrollLeft = 0
}


//change launch action
const changeLaunch = async(id, from, year) => {
    //make dates unclickable until launch is loaded
    document.getElementById("clickables").classList.add('pointer-events-none')

    if(year !== null) {
        store.commit('changeDateYear', 'start')
    }

    //set fixed height of launch container so date container will remain
    lheight.value = document.getElementById("lhold").clientHeight

    //toggle launch display
    store.commit('setLaunchload', false)
    store.commit('setSpinner', true)

    //scroll selected date into view
    setTimeout(() => document.getElementById(id).scrollIntoView({inline: "center"}), year !== null ? 1300 : 0)

    //fetch launch
    await axios.get("https://api.spacexdata.com/v4/launches/"+id)
    .then((res) => {
        store.dispatch('setLaunchView', res.data)

        setTimeout(() => {
            store.commit('setLaunchload', true)
            store.commit('setSpinner', false)

            //make dates clickable
            document.getElementById("clickables").classList.remove('pointer-events-none')
        }, 2000)
    })
    .catch((er) => {
        //make dates clickable
        document.getElementById("clickables").classList.remove('pointer-events-none')

        //toggle error state
        store.commit('error', true)
    })
}

onMounted(() => {

    //method to scroll selected date into view in date container
    let bringDate = () => {
        try{
            //if element is in DOM
            let el = document.getElementById('dates').getAttribute("current")
            document.getElementById(el).scrollIntoView({inline: "center"})
            return true
        } 
        catch {
            return false
        }
    }

    //try it
    bringDate()
    
    //if document loaded
    window.addEventListener("load", () => {
        let time = sessionStorage.getItem("opened") === null ? 4000 : 2000

        setTimeout(() => {
            //toggle loading states
            store.commit('toggleLoad')
            store.commit('setLaunchload', true)
            
            sessionStorage.setItem("opened", "1")
        }, time)


        //bring into view selected day in date container
        setTimeout(() => {
            if(!bringDate()){
                //i had to add one falback here, incase date container has not been mounted
                setTimeout(() => {
                    bringDate()
                }, 1000)
            }
        }, time + 1000)
    })
})
</script>


<template>
    <div class="w-[98.5vw] sm:max-w-xl md:max-w-3xl lg:max-w-4xl mx-auto mb-20 px-2 sm:px-3 md:mt-10">

        <div class="relative w-full" :style="$store.state.spinner ? 'height: '+lheight+'px' : ''">
        <Transition
            enter-active-class="animate__animated animate__zoomIn"
            leave-active-class="animate__animated animate__zoomOut"
        >
            <div
                class="flex items-center justify-center w-full h-full text-white/80 text-6xl bg-transparent absolute top-0"
                v-if="$store.state.spinner"
            >
                <i class="la la-pule la-spin la-spinner"></i>
            </div>
        </Transition>


        <Transition
            enter-active-class="animate__animated animate__zoomInDown"
            leave-active-class="animate__animated animate__zoomOutUp"
        >
            <div
                id="lhold" class="md:flex justify-center items-center"
                v-if="$store.state.launchload"
            >
                <div>
                    <div class="text-white/[.40] text-[0.8rem] mb-2">
                        <div
                            class="cursor-pointer inline hover:text-white/90 mr-3"
                            :class="$store.state.launchView.info?.id == launch.next ? 'text-white/90' : ''"
                            @click="changeLaunch(launch.next, 'date', launch.next.nyear)"
                        >
                            Next Launch
                        </div>
                        <div
                            class="cursor-pointer inline hover:text-white/90"
                            :class="$store.state.launchView.info?.id == launch.latest ? 'text-white/90' : ''"
                            @click="changeLaunch(launch.latest, 'date', launch.lyear)"
                        >
                            Latest Launch
                        </div>
                    </div>
                    <div
                        class="bg-[url('../../../public/img/default.jpg')] bg-cover bg-center bg-no-repeat w-full h-40 xsm:h-60 sm:h-72 md:w-[24rem] md:h-64 lg:w-[28rem] lg:h-72 rounded-lg overflow-hidden"
                    >
                        <LaunchImagesSlide :images="launch.info?.images"/>
                    </div>
                </div>

                <div class="md:ml-5 mt-3 md:mt-none text-white">
                    <LaunchInfo :info="launch.info" />


                    <RocketAndPayload
                        :rocket="launch.rocket"
                        :payload="launch.payload"
                    />


                    <Links :links="launch.links" />

                </div>
            </div>
        </Transition>
        </div>



        <!--date-->
        <Transition
            enter-active-class="animate__animated animate__flipInX"
            leave-active-class="animate__animated animate__flipOutX"
        >
            <div id="clickables" class="w-full md:w-5/6 lg:w-4/6 text-white text-center mx-auto relatve" v-show="!$store.state.load">
                <div class="text-sm font-bold opacity-[.80] mt-2 mb:mt-4 mb-2">
                    <i
                        class="la la-angle-left text-base cursor-pointer hover:scale-x-[2] active:-translate-x-2.5"
                        @click="$store.commit('changeDateYear', 'forward');reset()"
                    ></i>

                    <div class="inline mx-5">{{$store.state.selectedYear}}</div>

                    <i
                        class="la la-angle-right text-base cursor-pointer hover:scale-x-[2] active:translate-x-2.5"
                        @click="$store.commit('changeDateYear', 'backward');reset()"
                    ></i>
                </div>

                <div class="flex items-center justify-center w-full opacity-90">
                    <i class="la la-chevron-circle-left text-2xl cursor-pointer hover:scale-125 active:-translate-x-2.5" @click="scrollDate('left')"></i>

                    <div
                        id="dates"
                        class="max-w-[80%] sm:max-w-auto sm:w-auto inline-flex items-center text-center mx-2 sm:mx-5 overflow-x-hidden scroll-smooth no-scrollbar"
                        v-show="!$store.state.load"
                        :current="launch.info?.id"
                    >
                        <div
                            v-for="date in dates" :key="date.id"
                            :id="date.id"
                            class="text-center cursor-pointer hover:opacity-100 mx-3 sm:mx-5 inline-block"
                            :class="$store.state.launchView.info?.date == date.date ? 'opacity-100' : 'opacity-50'"
                            @click="$store.state.launchView.info?.date !== date.date ? changeLaunch(date.id, 'date', null) : ''"
                        >
                            <div class="text-xs font-bold leading-tight">{{date.day}}</div>
                            <div class="text-xs leading-tight">{{date.month}}</div>
                            <div class="text-sm leading-tight">
                                <i class="la la-dot-circle" :class="$store.state.launchView.info?.date == date.date ? 'la-pulse' : ''"></i>
                            </div>
                        </div>

                        <div v-if="dates && !dates.length" class="opacity-50">
                            <div class="text-xs font-bold leading-tight">No</div>
                            <div class="text-xs leading-tight">Launches</div>
                            <div class="text-sm leading-tight"><i class="la la-dot-circle"></i></div>
                        </div>
                    </div>

                    <i
                        class="la la-chevron-circle-right text-2xl cursor-pointer hover:scale-125 active:translate-x-2.5"
                        @click="scrollDate('right')"
                    ></i>
                </div>
            </div>
        </Transition>

    </div>
    <!--end Lanches view-->

</template>