<template>

  <!-- <span v-bind:class="categoryItemsList[0].color">{{ categoryItemsList[0].name }}</span> -->

  <div class="item-category clearfix" md-expand v-for="itemList in categoryItemsList[1]" :key="itemList.header">
    <div :class="getFontColor(itemList.color)" class="text-center category-header" >{{ itemList.header }}</div>
    <div class="block-list" v-for="item in itemList.elements" 
      :key="item.description">
      <FacetItem class="try" 
        :item="item" 
        :description=item.description
        :color="[itemList.color]" 
        :add-selected-facet="addSelectedFacet"
        :remove-facet="removeFacet" />
    </div>
  </div>

</template>

<script>
import FacetItem from "./FacetItem";

export default {
  name: "FacetCategory",
  components: { FacetItem },
  props: ["categoryItemsList", "addSelectedFacet", "removeFacet"],
  methods: {
  
    getFontColor(color)
    {
      return "font-"+color
    }
  },
  
};
</script>

<style lang="scss">
@use "../../style/mainStyles.scss" as ms;

.block-list {
  float: left;
  margin-top:1vh;
  margin-bottom:1vh;
}

.category-header {
  margin-top:1vh;
}


</style>
