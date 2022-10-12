<script setup>
defineProps({
    info: Object
})
</script>


<template>
    <div class="text-[0.8rem] opacity-90 mb-1 md:mb-0">
        <span class="font-semibold">Flight {{info.flight_no}}. </span>
        <span class="opacity-75">{{info.date}}</span>
    </div>
    
    <div class="text-3xl font-semibold opacity-95">{{info.name}}</div>

    <div class="flex items-center text-sm mbg-1 opacity-95 mb-1 md:mb-0">
        <div class="mr-5">
            <span v-show="info.success">
                <i class="la la-check text-lg"></i> Successfully Launched
            </span>
            <span v-show="info.failure && info.failure.length">
                <i class="la la-times text-base"></i> Failed Launch
            </span>
            <span v-show="info.success == null && info.upcoming && info.failure && !info.failure.length">
                <i class="la la-clock text-base"></i> Upcoming Launch...
            </span>
        </div>
    </div>

    <div class="text-sm mb-2 text-white/75 relative">
        <div class="hidden md:inline">{{info.details ? info.details.substring(0, 180) : ''}}</div>
        <div v-if="info.details && info.details.length > 179" class="inline">
            <div class="group inline">
                <span class="font-semibold hidden md:inline">...See more</span>
                <div class="static md:absolute md:z-10 md:top-0 w-full md:border md:border-white/[.15] md:rounded md:p-2 md:bg-black md:invisible md:opacity-0 md:group-hover:visible md:group-hover:opacity-100 duraton-0">
                    {{info.details}}
                </div>
            </div>
        </div>
    </div>
</template>