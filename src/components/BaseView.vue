<template>
  <div class="row">
    <div class="blocks col-sm-5">
      <FacetedSelection :facets="facets" :remove-facet="removeFacet" />
      <FacetedNavigation :facets="facets" :add-selected-facet="addSelectedFacet" :remove-facet="removeFacet" />
    </div>
    <div class="col-sm-7">    
      <DetailContainer :patterns="patterns" />      
    </div>
  </div>

</template>


<script>
import DetailContainer from "../components/detailView/DetailContainer";
import _ from "lodash";
import FacetedNavigation from "../components/facetNavigation/FacetedNavigation";
import FacetedSelection from "../components/facetNavigation/FacetedSelection";

export default {
  name: "BaseView",
  components: { FacetedNavigation, FacetedSelection, DetailContainer  },
  data() {
    let facetsConf = {
      selected: [],
      HOWList: [
        {
          name: "HOW",
          color: "color-HOW",
          description: "describes how the interfaces looks and behaves"
        },
        [
          {
            header: "Visualization Technique",
            color: "color-visualizationTechnique",
            elements: this.$blockService.convertListForNavigation(
              this.$blockService.getAllFacetOfGroup("visualizationTechnique")
            ),
          },
          {
            header: "Visual Channel",
            color: "color-visualChannel",
            elements: this.$blockService.convertListForNavigation(
              this.$blockService.getAllFacetOfGroup("visualChannel")
            ),
          },
          {
            header: "Visual Element",
            color: "color-visualElement",
            elements: this.$blockService.convertListForNavigation(
              this.$blockService.getAllFacetOfGroup("visualElement")
            ),
          },
          {
            header: "View",
            color: "color-view",
            elements: this.$blockService.convertListForNavigation(
              this.$blockService.getAllFacetOfGroup("view")
            ),
          },
          {
            header: "Interaction",
            color: "color-interaction",
            elements: this.$blockService.convertListForNavigation(
              this.$blockService.getAllFacetOfGroup("interaction")
            ),
          }
        ],
      ],
      WHYList: [
        {
          name: "WHY",
          color: "color-WHY",
          description: "describes a challenge that should be solved in an recommender system interface"

        },
        [
          {
            header: "Recommender System Issue",
            color: "color-recommenderSystemIssue",
            elements: this.$blockService.convertListForNavigation(
              this.$blockService.getAllFacetOfGroup("recommenderSystemIssue")
            ),
          },
          
          {
            header: "System or User Intent",
            color: "color-systemOrUserIntent",
            elements: this.$blockService.convertListForNavigation(
              this.$blockService.getAllFacetOfGroup("systemOrUserIntent")
            ),
          },
        ],
      ],
      WHATList: [
        {
          name: "WHAT",
          color: "color-WHAT",
          description: "describes the underlying data domain and context"

        },
        [
          {
            header: "Context Information",
            color: "color-contextInformation",
            elements: this.$blockService.convertListForNavigation(
              this.$blockService.getAllFacetOfGroup("contextInformation")
            ),
          },
          {
            header: "Data Domain",
            color: "color-dataDomain",
            elements: this.$blockService.convertListForNavigation(
              this.$blockService.getAllFacetOfGroup("dataDomain")
            ),
          },
        ],
      ],
    };
    return {
      facets: facetsConf,
      patterns: this.$patternService.getFilteredPatterns(
        facetsConf.selected
      ),
    };
  },
  methods: {
    addSelectedFacet(facet) {
      this.facets.selected.push(facet);
      this.patterns = this.$patternService.getFilteredPatterns(
        this.facets.selected
      );
      this.calculatePossibleNumbers();
    },
    removeFacet(facet) {
      _.remove(this.facets.selected, (fa) => fa.uid === facet.uid);
      this.patterns = this.$patternService.getFilteredPatterns(
        this.facets.selected
      );
      this.calculatePossibleNumbers();
    },
    calculatePossibleNumbers() {

      this.facets.HOWList[1].forEach((group) => {
        group.elements.forEach((element) => {
          let previewSelected = this.facets.selected.concat([element]);
          element.possibleNumberPatterns =
            this.$patternService.getFilteredPatterns2(
              previewSelected,this.facets.selected
            ).length;
        });
      });

      this.facets.WHATList[1].forEach((group) => {
        group.elements.forEach((element) => {
          let previewSelected = this.facets.selected.concat([element]);
          element.possibleNumberPatterns =
            this.$patternService.getFilteredPatterns2(
              previewSelected,this.facets.selected
            ).length;
        });
      });
      this.facets.WHYList[1].forEach((group) => {
        group.elements.forEach((element) => {
          let previewSelected = this.facets.selected.concat([element]);
          element.possibleNumberPatterns =
            this.$patternService.getFilteredPatterns2(
              previewSelected, this.facets.selected
            ).length;
        });
        
      });
    },
  },
  beforeMount() {
    this.calculatePossibleNumbers();
  },
};
</script>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
