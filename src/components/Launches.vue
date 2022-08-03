<template>
    <div class="w-[98.5vw] sm:max-w-xl md:max-w-3xl lg:max-w-4xl mx-auto mb-20 px-2 sm:px-3 md:mt-10">

        <div class="relative w-full" :style="$store.state.spinner ? 'height: '+lheight+'px' : ''">
        <Transition
            enter-active-class="animate__animated animate__zoomIn"
            leave-active-class="animate__animated animate__zoomOut"
        >
            <div class="flex items-center justify-center w-full h-full text-white/80 text-6xl bg-transparent absolute top-0" v-if="$store.state.spinner">
                <i class="la la-pule la-spin la-spinner"></i>
            </div>
        </Transition>


        <Transition
            enter-active-class="animate__animated animate__zoomInDown"
            leave-active-class="animate__animated animate__zoomOutUp"
        >
            <div id="lhold" class="md:flex justify-center items-center" v-if="$store.state.launchload">
                <div>
                    <div class="text-white/[.40] text-[0.8rem] mb-2">
                        <div
                            class="cursor-pointer inline hover:text-white/90 mr-3"
                            :class="$store.state.launchView.id == launch.next ? 'text-white/90' : ''"
                            @click="changeLaunch(launch.next, 'date', launch.next.nyear)"
                        >
                            Next Launch
                        </div>
                        <div
                            class="cursor-pointer inline hover:text-white/90"
                            :class="$store.state.launchView.id == launch.latest ? 'text-white/90' : ''"
                            @click="changeLaunch(launch.latest, 'date', launch.lyear)"
                        >
                            Latest Launch
                        </div>
                    </div>
                    <div
                        class="bg-[url('../../../public/img/default.jpg')] bg-cover bg-center bg-no-repeat w-full h-40 xsm:h-60 sm:h-72 md:w-[24rem] md:h-64 lg:w-[28rem] lg:h-72 rounded-lg overflow-hidden"
                    >
                        <LaunchImagesSlide :images="launch.images"/>
                    </div>
                </div>

                <div class="md:ml-5 mt-3 md:mt-none text-white">
                    <div class="text-[0.8rem] opacity-90 mb-1 md:mb-0">
                        <span class="font-semibold">Flight {{launch.flight_no}}. </span>
                        <span class="opacity-75">{{launch.date}}</span>
                    </div>
                    
                    <div class="text-3xl font-semibold opacity-95">{{launch.name}}</div>

                    <div class="flex items-center text-sm mbg-1 opacity-95 mb-1 md:mb-0">
                        <div class="mr-5">
                            <span v-show="launch.success">
                                <i class="la la-check text-lg"></i> Successfully Launched
                            </span>
                            <span v-show="launch.failure && launch.failure.length">
                                <i class="la la-times text-base"></i> Failed Launch
                            </span>
                            <span v-show="launch.success == null && launch.upcoming && launch.failure && !launch.failure.length">
                                <i class="la la-clock text-base"></i> Upcoming Launch...
                            </span>
                        </div>
                    </div>

                    <div class="text-sm mb-2 text-white/75 relative">
                        <div class="hidden md:inline">{{launch.details ? launch.details.substring(0, 180) : ''}}</div>
                        <div v-if="launch.details && launch.details.length > 179" class="inline">
                            <div class="group inline">
                                <span class="font-semibold hidden md:inline">...See more</span>
                                <div class="static md:absolute md:z-10 md:top-0 w-full md:border md:border-white/[.15] md:rounded md:p-2 md:bg-black md:invisible md:opacity-0 md:group-hover:visible md:group-hover:opacity-100 duraton-0">
                                    {{launch.details}}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="flex flex-wrap opacity-90" v-if="launch.rocket_name">
                        <div 
                            class="h-32 bg-gradient-to-b from-white/[.10] to-transparent rounded-t-lg p-2 mr-2"
                        >
                            <div class="flex items-center">
                                <div class="mr-1.5">
                                    <div class="font-bold text-sm">Rocket</div>
                                    <div class="text-sm">{{launch.rocket_name}}</div>
                                </div>
                                
                                <img :src="'/img/rockets/'+launch.rocket_thumb+'_sm.png'" alt="" class="h-24">
                            </div>
                        </div>

                        <div class="h-32 bg-gradient-to-b from-white/[.10] to-transparent rounded-t-lg p-2 relative md:max-w-[240px]" v-if="launch.payload_name">
                            <div class="font-bold text-sm"><i class="la la-shopping-bag"></i> Payload</div>

                            <table class="text-sm">
                                <tr>
                                    <td class="pr-3 opacity-75">Name</td>
                                    <td>{{launch.payload_name}}</td>
                                </tr>
                                <tr>
                                    <td class="pr-3 opacity-75">Type</td>
                                    <td>{{launch.payload_type}}</td>
                                </tr>
                                <tr>
                                    <td class="pr-3 opacity-75 align-top">Customer</td>
                                    <td>{{launch.payload_customer}}</td>
                                </tr>
                                <tr>
                                    <td class="pr-3 opacity-75">Nationality</td>
                                    <td>{{launch.payload_nationality}}</td>
                                </tr>
                            </table>
                        </div>
                    </div>

                    <div class="text-sm opacity-90" v-if="launch.article || launch.webcast || launch.reddit">
                        <div class="opacity-75"><i class="la la-link"></i> Learn More</div>

                        <div class="break-words">
                                <div class="hover:underline inline mr-2" v-if="launch.article"><a :href="launch.article" target="_blank"><i class="la la-newspaper text-base"></i>&nbsp;Article</a></div>
                                <div class="hover:underline inline mr-2" v-if="launch.webcast"><a :href="launch.webcast" target="_blank"><i class="la la-youtube text-base"></i>&nbsp;Webcast</a></div>
                                <div class="hover:underline inline mr-2" v-if="launch.reddit"><a :href="launch.reddit" target="_blank"><i class="la la-reddit text-base"></i>&nbsp;Reddit</a></div>
                        </div>
                    </div>

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
                    <i class="la la-angle-left text-base cursor-pointer hover:scale-x-[2] active:-translate-x-2.5" @click="$store.commit('changeDateYear', 'forward');reset()"></i>

                    <div class="inline mx-5">{{$store.state.selectedYear}}</div>

                    <i class="la la-angle-right text-base cursor-pointer hover:scale-x-[2] active:translate-x-2.5" @click="$store.commit('changeDateYear', 'backward');reset()"></i>
                </div>

                <div class="flex items-center justify-center w-full opacity-90">
                    <i class="la la-chevron-circle-left text-2xl cursor-pointer hover:scale-125 active:-translate-x-2.5" @click="scrollDate('left')"></i>

                    <div
                        id="dates"
                        class="max-w-[80%] sm:max-w-auto sm:w-auto inline-flex items-center text-center mx-2 sm:mx-5 overflow-x-hidden scroll-smooth no-scrollbar"
                        v-show="!$store.state.load"
                        :current="launch.id"
                    >
                        <div
                            v-for="date in dates" :key="date.id"
                            :id="date.id"
                            class="text-center cursor-pointer hover:opacity-100 mx-3 sm:mx-5 inline-block"
                            :class="$store.state.launchView.date == date.date ? 'opacity-100' : 'opacity-50'"
                            @click="$store.state.launchView.date !== date.date ? changeLaunch(date.id, 'date', null) : ''"
                        >
                            <div class="text-xs font-bold leading-tight">{{date.day}}</div>
                            <div class="text-xs leading-tight">{{date.month}}</div>
                            <div class="text-sm leading-tight"><i class="la la-dot-circle" :class="$store.state.launchView.date == date.date ? 'la-pulse' : ''"></i></div>
                        </div>

                        <div v-if="dates && !dates.length" class="opacity-50">
                            <div class="text-xs font-bold leading-tight">No</div>
                            <div class="text-xs leading-tight">Launches</div>
                            <div class="text-sm leading-tight"><i class="la la-dot-circle"></i></div>
                        </div>
                    </div>

                    <i class="la la-chevron-circle-right text-2xl cursor-pointer hover:scale-125 active:translate-x-2.5" @click="scrollDate('right')"></i>
                </div>
            </div>
        </Transition>

    </div>
    <!--end Lanches view-->

<div class="bg-white">


</div>

</template>

<script setup>
import axios from 'axios'
import { ref, onMounted, computed, watchEffect } from 'vue'
import { useStore } from 'vuex'
import LaunchImagesSlide from './launches/LaunchImagesSlide.vue'

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
    document.querySelector('#dates').scrollLeft = 0
}

const changeLaunch = async(id, from, year) => {
    //make dates unclickable untill launch is loaded
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
    
    //if component loaded
    window.addEventListener("load", () => {
        let time = 3000
        if(sessionStorage.getItem("opened") === null) {
            time = 6000
        }

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