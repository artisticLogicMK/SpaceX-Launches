<script setup>
import axios from 'axios'
import { onBeforeMount, ref } from 'vue'
import { useStore } from 'vuex'

const store = useStore()

const about = ref(null)

onBeforeMount( async() => {
    await axios.get("https://api.spacexdata.com/v4/company")
    .then((res) => {
        about.value = res.data
    })
    .catch((er) => {
        //toggle error state
        store.commit('error', true)
    })
})
</script>

<template>
    <div class="max-w-xl mx-auto md:mt-11 mb-20 px-2" v-if="about">

        <div class="opacity-[.85]">
            <div class="mt-3">
                <img src="/img/logo.svg">
            </div>

            <div class="text-white/90 text-sm mt-3">
                {{about.summary}}
            </div>

            <div class="text-white/90 text-sm my-3">Founded by Elon Musk, 2002.</div>

            <div class="text-white/90 text-sm my-3"><span class="text-white/50">Valuation:</span> ${{Number(about.valuation).toLocaleString()}}</div>

            <div class="flex flex-wrap">
                <div class="text-sm mr-3 mt-1">
                    <span class="text-white/50"><i class="la la-user"></i> CEO</span><br/>
                    <span class="text-white/90">{{about.ceo}}</span>
                </div>
                <div class="text-sm mr-3 mt-1">
                    <span class="text-white/50"><i class="la la-user"></i> COO</span><br/>
                    <span class="text-white/90">{{about.coo}}</span>
                </div>
                <div class="text-sm mr-3 mt-1">
                    <span class="text-white/50"><i class="la la-user"></i> CTO</span><br/>
                    <span class="text-white/90">{{about.cto}}</span>
                </div>
                <div class="text-sm mr-3 mt-1">
                    <span class="text-white/50"><i class="la la-user"></i> CTO Propulsion</span><br/>
                    <span class="text-white/90">{{about.cto_propulsion}}</span>
                </div>
            </div>

            <div class="flex flex-wrap mt-3">
                <div class="text-sm mr-4 mt-1 text-center">
                    <span class="text-white/50"><i class="la la-users"></i> Employees</span><br/>
                    <span class="text-white/90">{{Number(about.employees).toLocaleString()}}</span>
                </div>
                <div class="text-sm mr-4 mt-1 text-center">
                    <span class="text-white/50"><i class="la la-rocket"></i> Rockets</span><br/>
                    <span class="text-white/90">{{about.vehicles}}</span>
                </div>
                <div class="text-sm mr-4 mt-1 text-center">
                    <span class="text-white/50"><i class="la la-map-marked-alt"></i> Launch Sites</span><br/>
                    <span class="text-white/90">{{about.launch_sites}}</span>
                </div>
                <div class="text-sm mr-4 mt-1 text-center">
                    <span class="text-white/50"><i class="la la-tools"></i> Test Sites</span><br/>
                    <span class="text-white/90">{{about.test_sites}}</span>
                </div>
            </div>

            <div class="text-white/50 text-sm mt-3">Address</div>
            <div class="text-white/90 text-sm" v-if="about.headquarters">
                <i class="la la-map-marker"></i> 
                {{about.headquarters.address}}, {{about.headquarters.city}}, {{about.headquarters.state}}.
            </div>
            <div class="flex flex-wrap justify-start text-white/90 text-sm" v-if="about.links">
                <div class="inline mr-3"><a :href="about.links.website" target="_blank"><i class="la la-globe"></i> {{about.links.website}}</a></div>
                <div class="inline"><a :href="about.links.twitter" target="_blank"><i class="la la-twitter"></i> {{about.links.twitter}}</a></div>
            </div>

            <div class="text-white/90 text-sm mt-3">App Created by <a href="https://artisticlogicmk.one" target="_blank" class="underline">MK (artisticlogicmk.one)</a></div>
            <div class="text-white/90 text-sm mt-1">See the code at Github: <a href="https://github.com/artisticLogicMK/SpaceX-Launches" target="_blank" class="underline">artisticLogicMK/SpaceX-Launches</a></div>
            <div class="text-white/90 text-sm mt-1">API data from <a href="https://github.com/r-spacex/SpaceX-API" target="_blank" class="underline">github.com/r-spacex/SpaceX-API</a></div>
        </div>

    </div>

    <div class="flex flex-col items-center text-center text-white/90" v-else>
        <div><i class="la la-spinner la-spin text-7xl"></i></div>
    </div>
</template>