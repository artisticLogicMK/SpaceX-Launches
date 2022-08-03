import { createStore } from 'vuex'
import moment from 'moment'
import axios from 'axios'

export default createStore({
  state: {
    //state for main app planets loader
    load: true,


    //error state
    error: false,

    //state for storing all fetched launches
    launches: [],

    //the selected year in launches date select
    selectedYear: null,

    //current launch view data
    launchView: {},

    //loading states when another launch is clicked
    launchload: false,
    spinner: false,

    //state for tabs
    activeTab: 1
  },
  
  
  getters: {
  },
  

  mutations: {
    //commit for toggling error state
    error(state, boolean) {
      state.error = boolean
    },

    pushLaunchData(state, data) {
      state.launches.push(data)

      //set default launch date year select to the most upcoming launch
      state.selectedYear = state.launches[0].year
    },

    changeDateYear(state, direction) {
      const currentyear = state.launches[0].year
      const lastyear = state.launches.length - 1

      if(direction == 'forward' && state.selectedYear !== currentyear) {
        state.selectedYear = state.selectedYear + 1
      }

      if(direction == 'backward' && state.selectedYear !== state.launches[lastyear].year) {
        state.selectedYear = state.selectedYear - 1
      }

      if(direction == 'start') {
        state.selectedYear = state.launches[0].year
      }
    },

    //commit for toggling main app loader
    toggleLoad(state) {
      state.load = !state.load
    },

    //commit for changing tabs(Launches, Rockets, About)
    changeTab(state, tab) {
      //the code below transitions into a new tab with fade in/out effect
      document.getElementById('tabdisplay').classList.remove('opacity-100')
      document.getElementById('tabdisplay').classList.add('opacity-0')
      setTimeout(() => {
        state.activeTab = 0
        setTimeout(() => {
          state.activeTab = tab
          document.getElementById('tabdisplay').classList.add('opacity-100')
        }, 200)
      }, 200)
    },

    //state commit for loaders in launch component
    setLaunchload(state, bool) {
      state.launchload = bool
    },
    setSpinner(state, bool) {
      state.spinner = bool
    }
  },
  
  
  actions: {
    async setLaunchView(ctx, data) {

      let payloadData
      let rocketData
      let next
      let latest
      
      if(data.rocket) {
        rocketData = await axios.get("https://api.spacexdata.com/v4/rockets/"+data.rocket)
      }

      if(data.payloads.length !== 0) {
        payloadData = await axios.get("https://api.spacexdata.com/v4/payloads/"+data.payloads[0])
      }

      //fetch next launch data
      next = await axios.get("https://api.spacexdata.com/v4/launches/next")

      //fetch latest launch data
      latest = await axios.get("https://api.spacexdata.com/v4/launches/latest")
      
      let launchData = {
        name:      data.name,
        id:        data.id,
        flight_no: data.flight_number,
        details:   data.details,
        date:      moment(data.date_utc).format('MMM Do, YYYY'),
        upcoming:  data.upcoming,
        success:   data.success,
        failure:   data.failures,
        images:    data.links.flickr.original.slice(0, 3),

        //rocket info
        rocket_name:  data.rocket ? rocketData.data.name : null,
        rocket_id:    data.rocket ? rocketData.data.id : null,
        rocket_thumb: data.rocket ? rocketData.data.name.replace(' ', '_') : null,

        //payload info
        payload_name:        data.payloads.length !== 0 ? payloadData.data.name : null,
        payload_id:          data.payloads.length !== 0 ? payloadData.data.id : null,
        payload_type:        data.payloads.length !== 0 ? payloadData.data.type : null,
        payload_customer:    data.payloads.length !== 0 ? payloadData.data.customers[0] : null,
        payload_nationality: data.payloads.length !== 0 ? payloadData.data.nationalities[0] : null,

        //links
        article: data.links.article,
        webcast: data.links.webcast,
        reddit:  data.links.reddit.launch,

        //latest and next launch select presets
        latest: latest.data.id,
        lyear: Number(moment(latest.data.date_utc).format('YYYY')),
        next: next.data.id,
        nyear: Number(moment(next.data.date_utc).format('YYYY'))
      }

      //set object to state
      ctx.state.launchView = launchData
    }
  },
   
  modules: {
  }
})
