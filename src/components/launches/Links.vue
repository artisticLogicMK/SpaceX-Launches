<script setup>
defineProps({
    links: Object
})
</script>

<template>
    <div class="text-sm opacity-90" v-if="links.article || links.webcast || links.reddit">
        <div class="opacity-75"><i class="la la-link"></i> Learn More</div>

        <div class="break-words">
                <div class="hover:underline inline mr-2" v-if="links.article"><a :href="links.article" target="_blank"><i class="la la-newspaper text-base"></i>&nbsp;Article</a></div>
                <div class="hover:underline inline mr-2" v-if="links.webcast"><a :href="links.webcast" target="_blank"><i class="la la-youtube text-base"></i>&nbsp;Webcast</a></div>
                <div class="hover:underline inline mr-2" v-if="links.reddit"><a :href="links.reddit" target="_blank"><i class="la la-reddit text-base"></i>&nbsp;Reddit</a></div>
        </div>
    </div>
</template>