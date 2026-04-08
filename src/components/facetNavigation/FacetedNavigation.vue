<template>
  <div class="facet-bar">

    <!-- <button type="button" class="btn btn-primary deselect-btn" @click="deselectFacets()">Deselect</button> -->

    <div id="accordion">
      <div class="card ">
        <div class="card-header" id="headingOne">
          <h5 class="mb-0">
            <button class="btn btn-link" :class="{ collapsed: !accordionOpen.why }" @click="toggleAccordion('why')"
              :aria-expanded="accordionOpen.why"
              aria-controls="collapseOne">
              <span class="title">{{facets.WHYList[0].name}}</span>
              <br/>
              <span>{{facets.WHYList[0].description}}</span>
            </button>
          </h5>
        </div>

        <div id="collapseOne" class="collapse" :class="{ show: accordionOpen.why }" aria-labelledby="headingOne">
          <div class="card-body">
            <FacetCategory
          :category-items-list="facets.WHYList"
          :add-selected-facet="addSelectedFacet"
          :remove-facet="removeFacet"
          />
          </div>
        </div>
      </div>
      <div class="card">
        <div class="card-header" id="headingTwo">
          <h5 class="mb-0">
            <button class="btn btn-link" :class="{ collapsed: !accordionOpen.what }" @click="toggleAccordion('what')"
              :aria-expanded="accordionOpen.what"
              aria-controls="collapseTwo">
              <span class="title">{{facets.WHATList[0].name}}</span>
              <br/>
              <span>{{facets.WHATList[0].description}}</span>

            </button>
          </h5>
        </div>
        <div id="collapseTwo" class="collapse" :class="{ show: accordionOpen.what }" aria-labelledby="headingTwo">
          <div class="card-body">
            <FacetCategory
          :category-items-list="facets.WHATList"
          :add-selected-facet="addSelectedFacet"
          :remove-facet="removeFacet"
        />
          </div>
        </div>
      </div>
      <div class="card">
        <div class="card-header" id="headingThree">
          <h5 class="mb-0">
            <button class="btn btn-link" :class="{ collapsed: !accordionOpen.how }" @click="toggleAccordion('how')"
              :aria-expanded="accordionOpen.how"
              aria-controls="collapseThree">
              <span class="title">{{facets.HOWList[0].name}}</span>
              <br/>
              <span>{{facets.HOWList[0].description}}</span>
            </button>
          </h5>
        </div>
        <div id="collapseThree" class="collapse" :class="{ show: accordionOpen.how }" aria-labelledby="headingThree">
          <div class="card-body">
            <FacetCategory :category-items-list="facets.HOWList" :add-selected-facet="addSelectedFacet"
              :remove-facet="removeFacet" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import "../../basicVueMaterialImports";
import FacetCategory from "./FacetCategory";
import "../../style/mainStyles.scss";

export default {
  name: "FacetedNavigation",
  components: { FacetCategory },
  props: ["facets", "addSelectedFacet", "removeFacet"],
  data() {
    return {
      accordionOpen: {
        why: true,
        what: false,
        how: false
      }
    };
  },
  methods: {
    toggleAccordion(section) {
      this.accordionOpen[section] = !this.accordionOpen[section];
    },
   
    deselectFacets: function () {
      this.$props.facets.HOWList[1].forEach((group) => {
        group.elements.forEach((element) => {
          element.chosen = false;
          this.$props.removeFacet(element);
        });
      });

      this.$props.facets.WHYList[1].forEach((group) => {
              group.elements.forEach((element) => {
                element.chosen = false;
                this.$props.removeFacet(element);
              });
            });
      this.$props.facets.WHATList[1].forEach((group) => {
        group.elements.forEach((element) => {
          element.chosen = false;
          this.$props.removeFacet(element);
        });
      });
    },
  },
  computed: {
  }
};
</script>

<style lang="scss" scoped>
@use "../../style/mainStyles.scss" as ms;

.card-body {
    
    padding: 0.1rem!important;
  }
  
  .btn {
    width:100%;
    text-align:left;
  }

  .collapse {
    transition: max-height 0.8s ease, opacity 0.8s ease, visibility 0.8s ease;
    max-height: 0;
    overflow: hidden;
    opacity: 0;
    visibility: hidden;

    &.show {
      max-height: 2000px;
      opacity: 1;
      visibility: visible;
    }
  }

// .deselect-btn {
//   z-index: 4;
//   position: absolute;
//   top: 12px;
//   right: 30px;

//   &:hover {
//     box-shadow: #9f9f9f 0 10px 20px;
//   }
// }

</style>
