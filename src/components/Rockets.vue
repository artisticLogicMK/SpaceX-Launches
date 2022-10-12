<script setup>
import RocketImages from './rockets/RocketImages.vue'

import axios from 'axios'
import moment from 'moment'
import { onBeforeMount, ref } from 'vue'
import { useStore } from 'vuex'

const store = useStore()

//state for storing rockets
const rockets = ref([])

//state for active rocket view by slection
const activeRocket = ref({})

//state for toggle rocket display/when opening another
const toggle = ref(true)

//state for toggle show rocket images
const showImages = ref(false)

const setRocket = (i) => {
    showImages.value = false //hide images for next rocket by default

    //hide rocket display
    toggle.value = false

    //assign to selected rocket to activeRocket
    activeRocket.value = rockets.value[i]

    //and then show rocket display
    setTimeout(() => toggle.value = true, 600)
}

onBeforeMount( async() => {
    await axios.get("https://api.spacexdata.com/v4/rockets")
    .then((res) => {
        //collect only needed data from api then push to rockets state
        res.data.forEach((rkt, index) => {
            rockets.value.push({
                name:         rkt.name,
                id:           rkt.id,
                index:        index,
                first_flight: moment(rkt.first_flight).format('MMM Do, YYYY'),
                description:  rkt.description,
                picture:      '/img/rockets/'+rkt.name.replace(' ', '_')+'.png',
                images:       rkt.flickr_images.slice(0, 4),
                cost:         rkt.cost_per_launch.toLocaleString(),
                height_m:     rkt.height.meters.toLocaleString(),
                height_f:     rkt.height.feet.toLocaleString(),
                diameter_m:   rkt.diameter.meters.toLocaleString(),
                diameter_f:   rkt.diameter.feet.toLocaleString(),
                mass_kg:      rkt.mass.kg.toLocaleString(),
                mass_lb:      rkt.mass.lb.toLocaleString(),
                wikipedia:    rkt.wikipedia
            })
        })

        //set a default activeRocket to display
        activeRocket.value = rockets.value[1]
    })
    .catch((er) => {
        //toggle error state
        store.commit('error', true)
    })
})
</script>

<template>
    <div class="max-w-xl mx-auto mb-20 px-2 sm:px-3 mt-2 md:mt-11 bg-rd-300" v-if="rockets.length">

        <div class="flex flex-wrap justify-center text-sm mb-3 relative">
            <div
                class="rounded-full border border-white/25 text-white/50 hover:border-white/75 hover:text-white/[.85] active:bg-white/[.15] px-3 py-1 cursor-pointer mr-2 mb-1.5"
                v-for="rocket in rockets"
                :key="rocket.id"
                :class="rocket.id == activeRocket.id ? 'border-white/75 text-white/[.85]' : ''"
                @click="setRocket(rocket.index)"
            >
                {{rocket.name}}
            </div>
        </div>

        <Transition
            enter-active-class="animate__animated animate__zoomIn"
            leave-active-class="animate__animated animate__zoomOut"
        >
            <div class="sm:flex items-center mt-4 max-w-xl min-h-[417px]" v-if="toggle">

                <div class="text-center">
                    <div class="inline-flex justify-start items-center">
                        <div class="border-r border-white/75 text-center text-white/[.80] text-sm pr-1 -mt-5 h-72" style="writing-mode: vertical-lr;">
                            Height: {{activeRocket.height_m}}m
                        </div>
                        <div class="text-center">
                            <img :src="activeRocket.picture" :alt="activeRocket.name" class="h-96 sm:ml-3 inline-block max-w-none">
                            <div class="border-t border-white/75 text-center text-white/[.80] text-sm pb-1 mt-2">
                                Diameter: {{activeRocket.diameter_m}}m
                            </div>
                        </div>
                    </div>
                </div>

                <div class="sm:ml-4 mt-2 sm:mt-none">
                    <div class="text-white/95 opacity-90 text-2xl font-semibold opacity-90 mb-1">{{activeRocket.name}}</div>

                    <div class="text-white/75 text-sm opacity-90">{{activeRocket.description}}</div>

                    <div class="flex flex-wrap text-sm mt-3 opacity-90">
                        <div class="mr-4 mb-1">
                            <span class="font-semibold text-white/95">First Flight</span><br/>
                            <span class="text-white/75">{{activeRocket.first_flight}}</span>
                        </div>
                        <div class="mr-4 mb-1">
                            <span class="font-semibold text-white/95">Mass</span><br/>
                            <span class="text-white/75">{{activeRocket.mass_kg}} kg</span>
                        </div>
                        <div class="text-start mb-1">
                            <span class="font-semibold text-white/95">Cost per launch</span><br/>
                            <span class="text-white/75">${{activeRocket.cost}}</span>
                        </div>
                    </div>

                    <div class="text-white/95 text-sm mt-3 mb-1 cursor-pointer opacity-90" @click="showImages = !showImages">
                        <i class="la la-image"></i> 
                        View {{activeRocket.name}} Pictures 
                        <i :class="showImages ? 'la la-angle-up' : 'la la-angle-down'"></i>
                    </div>

                    <div>
                        <RocketImages v-if="showImages" :images="activeRocket.images"/>
                    </div>

                    <div class="text-white/95 text-sm mt-3 mb-1 opacity-90" v-if="activeRocket.wikipedia">
                        <a :href="activeRocket.wikipedia" target="_blank" class="hover:underline"><i class="la la-wikipedia-w"></i> Wikipedia</a>
                    </div>
                </div>
                
            </div>
        </Transition>

    </div>

    <div class="flex flex-col items-center text-center text-white/90" v-else>
        <div><i class="la la-spinner la-spin text-7xl"></i></div>
    </div>
</template>