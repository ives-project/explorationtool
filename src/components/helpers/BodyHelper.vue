 
<template>
  
  <td class="align-middle">
    <span v-if="isPatternInBlock()">x</span>
    <!-- <span v-else>o</span> -->

  </td>
</template>
  
<script>


export default {
  name: 'BodyHelper',
  components: {   },
  props: ['pattern', 'block'],
  
  methods: {
    isPatternInBlock(){
      let isInBlock = false;
      this.pattern.pattern.forEach(singlePattern => {
        singlePattern.blocks.forEach(block => {
          if(block === this.block.uid)
            isInBlock = true;
        });
        if(isInBlock)
          return isInBlock;
      });
      return isInBlock;
    }
  },
  created () {
  },
}
</script>
 
<style lang="scss" scoped>

</style>
  