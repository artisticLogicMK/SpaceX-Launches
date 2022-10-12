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

          <div class="planets w-[9.5rem] h-[9.5rem]" style="animation-duration: 2.5s;">
            <div class="in -top-6">
              Mecury
              <div class="h-1.5 w-1.5"></div>
            </div>
          </div>

          <div class="planets w-[12.8rem] h-[12.8rem]" style="animation-duration: 8s;">
            <div class="in -top-7">
              Venus
              <div class="h-3 w-3"></div>
            </div>
          </div>

          <div class="planets w-[16.5rem] h-[16.5rem]" style="animation-duration: 10s;">
            <div class="in -top-7">
              Earth
              <div class="h-[0.78rem] w-[0.78rem]"></div>
            </div>
          </div>

          <div class="planets w-[20.1rem] h-[20.1rem]" style="animation-duration: 14s;">
            <div class="in -top-[1.48rem]">
              Mars
              <div class="h-2 w-2"></div>
            </div>
          </div>

          <div class="planets w-[28rem] h-[28rem]" style="animation-duration: 35s;">
            <div class="in -top-14">
              Jupiter
              <div class="h-[4.5rem] w-[4.5rem]"></div>
            </div>
          </div>

          <div class="planets w-[39rem] h-[39rem]" style="animation-duration: 60s;">
            <div class="in -top-12">
              Saturn
              <div class="h-[3.5rem] w-[3.5rem]"></div>
            </div>
          </div>

          <div class="planets w-[47.1rem] h-[47.1rem]" style="animation-duration: 90s;">
            <div class="in -top-9">
              Uranus
              <div class="h-[2rem] w-[2rem]"></div>
            </div>
          </div>

          <div class="planets w-[53rem] h-[53rem]" style="animation-duration: 130s;">
            <div class="in -top-9">
              Neptune
              <div class="h-[1.6rem] w-[1.6rem]"></div>
            </div>
          </div>

        </div>
      </div>

    </div>
  </div>
</template>

<style>
.planets { @apply rounded-full border flex items-center justify-center absolute animate-spin }
.planets .in { @apply absolute text-white text-sm flex flex-col items-center }
.planets .in div { @apply rounded-full bg-white }
</style>