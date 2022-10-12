<script setup>
defineProps({
    rocket: Object,
    payload: Object
})
</script>

<template>
    <div class="flex flex-wrap opacity-90">
        <div 
            class="h-32 bg-gradient-to-b from-white/[.10] to-transparent rounded-t-lg p-2 mr-2"
            v-if="rocket.rocket_name"
        >
            <div class="flex items-center">
                <div class="mr-1.5">
                    <div class="font-bold text-sm">Rocket</div>
                    <div class="text-sm">{{rocket.rocket_name}}</div>
                </div>
                
                <img :src="'/img/rockets/'+rocket.rocket_thumb+'_sm.png'" alt="" class="h-24">
            </div>
        </div>


        <div
            class="h-32 bg-gradient-to-b from-white/[.10] to-transparent rounded-t-lg p-2 relative md:max-w-[240px]"
            v-if="payload.payload_name"
        >
            <div class="font-bold text-sm"><i class="la la-shopping-bag"></i> Payload</div>

            <table class="text-sm">
                <tr>
                    <td class="pr-3 opacity-75 align-top">Name</td>
                    <td>{{payload.payload_name}}</td>
                </tr>
                <tr>
                    <td class="pr-3 opacity-75 align-top">Type</td>
                    <td>{{payload.payload_type}}</td>
                </tr>
                <tr>
                    <td class="pr-3 opacity-75 align-top">Customer</td>
                    <td>{{payload.payload_customer}}</td>
                </tr>
                <tr>
                    <td class="pr-3 opacity-75 align-top">Nationality</td>
                    <td>{{payload.payload_nationality}}</td>
                </tr>
            </table>
        </div>
    </div>
</template>