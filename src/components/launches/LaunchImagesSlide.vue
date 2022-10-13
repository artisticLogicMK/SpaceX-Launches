<script setup>
import { Splide, SplideSlide } from '@splidejs/vue-splide'
import { useTippy } from 'vue-tippy/composition'
import { defineComponent, ref } from 'vue'

const props = defineProps({
  images: Array
})

const images = props.images

//image modal toggle
const popModal = ref(false)
const popModalImage = ref(null)

//tippyjs config for tooltip
useTippy('.targets', {
    theme: 'custom',
    arrow: true,
    followCursor: 'horizontal'
})

//click event on image => shows and populate clicked image in modal
const popImage = (image) => {
  popModalImage.value = image
  popModal.value = true
}

//splidejs configuration options
const options = {
  cover:        true,
  rewind:       true,
  gap:          '0rem',
  pauseOnHover: true,
  autoplay:     true,
  interval:     4000,

  //classes for adding custom styling
  classes: {
    arrow : 'splide__arrow arrow',
    prev  : 'splide__arrow--prev arrow-prev',
    next  : 'splide__arrow--next arrow-next',
    page  : 'splide__pagination__page pagination',
  },
}
</script>


<template>
  <Splide
    :options="options"
    aria-label="Launch Images"
    v-if="images && images.length"
  >
    <SplideSlide
      class="targets h-72 md:h-64 lg:h-72 rounded-lg bg-contain bg-center cursor-zoom-out" 
      v-for="image in images"
      :key="image"
      data-tippy-content="Click to Zoom"
      @click="popImage(image)"
    >
      <img :src="image" clss="h-24">
    </SplideSlide>
  </Splide>


  <Transition
    enter-active-class="animate__animated animate__zoomIn animate__faster"
    leave-active-class="animate__animated animate__zoomOut animate__faster"
  >
    <div v-if="popModal" class="w-full absolute inline-block top-0 md:-top-4 lg:-top-7 xl:-top-12 left-0 z-10 pb-12">
      <div class="w-fit mx-auto max-w-full">
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