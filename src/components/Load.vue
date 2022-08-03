<template>
      <div class="h-full w-full top-0 left-0 bg-blck fixed z-10">
    <div class="table h-full mx-auto">

      <div
        id="solar"
        class="h-fit table-cell align-middle mx-auto"
        :class="$store.state.load ? 'animate-spin' : ''" style="animation-duration: 7s"
      >
        <div
          class="relative w-full h-96 sm:w-96 flex items-center justify-center scale-[0.42] xsm:scale-[0.60] sm:scale-[0.75] opacity-90 duration-[5s]"
          :class="$store.state.load ? 'in' : ''"
        >

          <div class="rounded-full bg-white w-28 h-28 flex items-center justify-center absolute">
            <div class="absolute -top-4 text-white text-sm flex flex-col items-center">Sun</div>
            <div class="rounded-full bg-white w-20 h-20 animate-ping"></div>
          </div>

          <div class="rounded-full border border-white/50 w-[9.5rem] h-[9.5rem] flex items-center justify-center absolute animate-spin" style="animation-duration: 2.5s;">
            <div class="absolute -top-6 text-white text-sm flex flex-col items-center">
              Mecury
              <div class="rounded-full h-1.5 w-1.5 bg-white"></div>
            </div>
          </div>

          <div class="rounded-full border w-[12.8rem] h-[12.8rem] flex items-center justify-center absolute animate-spin" style="animation-duration: 8s;">
            <div class="absolute -top-7 text-white text-sm flex flex-col items-center">
              Venus
              <div class="rounded-full h-3 w-3 bg-white"></div>
            </div>
          </div>

          <div class="rounded-full border w-[16.5rem] h-[16.5rem] flex items-center justify-center absolute animate-spin" style="animation-duration: 10s;">
            <div class="absolute -top-7 text-white text-sm flex flex-col items-center">
              Earth
              <div class="rounded-full h-[0.78rem] w-[0.78rem] bg-white"></div>
            </div>
          </div>

          <div class="rounded-full border w-[20.1rem] h-[20.1rem] flex items-center justify-center absolute animate-spin" style="animation-duration: 14s;">
            <div class="absolute -top-[1.48rem] text-white text-sm flex flex-col items-center">
              Mars
              <div class="rounded-full h-2 w-2 bg-white"></div>
            </div>
          </div>

          <div class="rounded-full border w-[28rem] h-[28rem] flex items-center justify-center absolute animate-spin" style="animation-duration: 35s;">
            <div class="absolute -top-14 text-white text-sm flex flex-col items-center">
              Jupiter
              <div class="rounded-full h-[4.5rem] w-[4.5rem] bg-white"></div>
            </div>
          </div>

          <div class="rounded-full border w-[39rem] h-[39rem] flex items-center justify-center absolute animate-spin" style="animation-duration: 60s;">
            <div class="absolute -top-12 text-white text-sm flex flex-col items-center">
              Saturn
              <div class="rounded-full h-[3.5rem] w-[3.5rem] bg-white"></div>
            </div>
          </div>

          <div class="rounded-full border w-[47.1rem] h-[47.1rem] flex items-center justify-center absolute animate-spin" style="animation-duration: 90s;">
            <div class="absolute -top-9 text-white text-sm flex flex-col items-center">
              Uranus
              <div class="rounded-full h-[2rem] w-[2rem] bg-white"></div>
            </div>
          </div>

          <div class="rounded-full border w-[53rem] h-[53rem] flex items-center justify-center absolute animate-spin" style="animation-duration: 130s;">
            <div class="absolute -top-9 text-white text-sm flex flex-col items-center">
              Neptune
              <div class="rounded-full h-[1.6rem] w-[1.6rem] bg-white"></div>
            </div>
          </div>

        </div>
      </div>

    </div>
  </div>
</template>