<template>



  <div class="container-fluid" id="base">
    
      <div  id="header" class="row align-items-center justify-content-center">
        <div id="logo" class="col-sm">
          <a href="#">
            <img alt="Vue logo" src="./assets/resources/Logo-02.png" >
          </a>
        </div>
        <div class="col-sm">
           <nav class="nav">
            <a class="nav-link" href="#">Browse</a>
            <a class="nav-link" href="#/heatmapsystem">Heatmap</a>
            <!-- <a class="nav-link" href="#/heatmappattern">Pattern</a> -->

            <a class="nav-link" href="#/analyze">Analyze</a>
            <a class="nav-link" href="#/about">About</a>
          </nav>
        </div>
        <div class="col-sm">
          <div class="input-group mb-3">
            <!-- <SearchView /> -->

          </div>
         
        </div>
      </div>
    


    <div class="main">
       <component :is="currentView" />
    </div>
   </div>

   <div id="footer" class="d-flex align-items-center justify-content-center">
      <!-- Copyright -->
      <div class="text-center p-3" style="color:white;">
        © 2026 IVES Project Team
      </div>
      <!-- Copyright -->

      <div class="row">
        <div class="col"><a href="#/terms"> Terms & Conditions</a></div>
      </div>
   </div>

   
</template>



<script>
import BaseView from './components/BaseView.vue'
import AnalyzePage from './components/AnalyzePage.vue'
import HeatmapVueSystem from './components/HeatmapVue.vue'

import AboutPage from './components/AboutPage.vue'
import NotFound from './components/NotFound.vue'
import SearchView from './components/helpers/SearchView.vue'
import TermsAndConditions from './components/TermsAndConditions.vue'

const routes = {
  '/': BaseView,
  '/analyze': AnalyzePage,
  '/heatmapsystem': HeatmapVueSystem,
  '/about': AboutPage,
  '/terms' : TermsAndConditions
}

export default {
  name: 'App',
  components: {
    BaseView, AnalyzePage, AboutPage, NotFound, TermsAndConditions, SearchView, HeatmapVueSystem
  },
   data() {
    return {
      currentPath: window.location.hash
    }
  },
  computed: {
    currentView() {
      return routes[this.currentPath.slice(1) || '/'] || NotFound
    }
  },
  mounted() {
    document.title = "IVES Project";
    window.addEventListener('hashchange', () => { this.currentPath = window.location.hash })
  }
}
</script>

<style>
@import url("https://cdn.jsdelivr.net/npm/bootstrap-icons@1.9.1/font/bootstrap-icons.css");

</style>

<style lang="scss" src="./style/mainStyles.scss"></style>
<style lang="scss" src="./assets/resources/font/fonts.scss"></style><!--font lokal einbinden-->

<style>
.container-fluid {
  max-width: 1275px;
}
html {
  overflow: auto;
}
* {
  font-family: 'Outfit', sans-serif; 
}
#logo img {
   height:9vh;
}
#header {
  height:15vh;
}
#footer {
  margin-top:2vh;
  height: 9rem;
  background-color: black;
  background-image: linear-gradient(to right, #434343 0%, black 100%);
 
}
#footer .row div {
  color:white;
}
#base {
  display: flex;
  min-height: 84vh;
  flex-direction: column;
  justify-content: start;
}
nav a:active, nav a:focus, nav a:hover {
    border-bottom: 2px solid black;
}
nav a {
  font-size: 1.2rem;
  font-weight: 500;
}
nav a:focus, nav a.router-link-active, nav a.router-link-exact-active {
    cursor: pointer;
    color: black!important;
}

#nav-menu {
  font-weight:600;
}
#nav-menu a:hover,
#nav-menu a:active
 {
border-bottom: 2px solid #20c997;
}
#nav-menu a:focus {
  border-bottom: 2px solid #20c997;

}
#nav-menu a:focus,
 nav a.router-link-active,
 nav a.router-link-exact-active {
   cursor: pointer;
   color: #20c997!important;

 }

#nav-menu a {
  color: black;
  text-decoration: none;
  font-size: 1.2em;
  text-transform: uppercase;
  font-weight: 500;
  -webkit-transition: all 0.2s ease-in-out;
  transition: all 0.2s ease-in-out;
}



#nav-menu .dot {
  width: 6px;
  height: 6px;
  background: #fddb3a;
  border-radius: 50%;
  opacity: 0;
  -webkit-transform: translateX(30px);
  transform: translateX(30px);
  -webkit-transition: all 0.2s ease-in-out;
  transition: all 0.2s ease-in-out;
}

#nav-menu a:nth-child(1):hover ~ .dot {
  -webkit-transform: translateX(30px);
  transform: translateX(30px);
  -webkit-transition: all 0.2s ease-in-out;
  transition: all 0.2s ease-in-out;
  opacity: 1;
}

#nav-menu a:nth-child(2):hover ~ .dot {
  -webkit-transform: translateX(110px);
  transform: translateX(110px);
  -webkit-transition: all 0.2s ease-in-out;
  transition: all 0.2s ease-in-out;
  opacity: 1;
}

</style>


