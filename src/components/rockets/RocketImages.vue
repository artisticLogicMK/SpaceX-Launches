<script setup>
import { onMounted, ref } from 'vue'

const props = defineProps({
  images: Array
})

const images = ref([])

//image modal toggle
const popModal = ref(false)
const popModalImage = ref(null)

//click event on image => shows and populate clicked image in modal
const popImage = (image) => {
  popModalImage.value = image
  popModal.value = true
}

onMounted(() => {
    images.value = props.images
})
</script>


<template>
  <div>
    <div class="w-fit rounded-sm bg-[url('../../../public/img/logo.svg')] bg-contain bg-center bg-no-repeat inline-block mr-2 mt-0.5 hover:-translate-y-1.5 border border-white/25"
      v-for="image in images"
      :key="image"
    >
      <div
        class="w-20 h-12 bg-cover bg-center bg-no-repeat rounded-sm cursor-zoom-in"
        :style="'background-image: url('+image+')'"
        @click="popImage(image)"
      >
      </div>
    </div>
  </div>
  <div class="text-white/95 text-sm mti-3 italic">Click on image to enlarge.</div>

  <Transition
    enter-active-class="animate__animated animate__zoomIn animate__faster"
    leave-active-class="animate__animated animate__zoomOut animate__faster"
  >
    <div v-if="popModal" class="w-full mx-auto fixed inline-block top-4 left-0 z-10 pb-12 text-center">
        <div class="inline-block max-w-full mx-2 md:max-w-2xl lg:max-w-3xl xl:max-w-4xl 2xl:max-w-5xl">
            <div class="flex justify-between bg-black/90 text-white text-base rounded-t-lg border border-white/25 border-b-0 w-full px-3 py-1">
                <a :href="popModalImage" target="_blank" class=""><i class="la la-link"></i> Image link</a>
                <span
                class="cursor-pointer font-semibold hover:scale-125"
                @click="popModal = !popModal"
                >
                Close
                </span>
            </div>
            <img :src="popModalImage" class="shadow-xl rounded-b-lg border border-white/25 border-t-0">
        </div>
    </div>
  </Transition>
</template>