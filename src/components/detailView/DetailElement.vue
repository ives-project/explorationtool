<template>

  <div id="accordion-element">
    <div class="card">
      
      <div class="card-header" :id="'collapse_' + pattern.uid+pattern.nr" >
          <button class="btn btn-link header-box" :aria-controls="pattern.uid" 
              v-bind:href="'#collapse'" 
              v-on:click="toggleItem(pattern)"
              data-toggle="collapse" 
              :data-target="'#' + pattern.uid+pattern.nr" 
              aria-expanded="true">
              

              <span class="title" 
                :class="{ active: isActive(pattern) }">
                <img         
                  :src="getImgSrc( pattern.imageName)"
                  :alt="pattern.title"
                  :title="pattern.title"
                  class="vorschau-img"
                  />

                {{ pattern.nr }} 
                {{ pattern.title }}
              </span>
              <i 
                  :class="[isActive(pattern) ? 'bi-chevron-up': 'bi-chevron-down' ]"
                  class="bi"></i>
          </button>
      </div>

      <div :id="pattern.uid+pattern.nr" class="collapse" :aria-labelledby="'collapse_' + pattern.uid+pattern.nr" data-parent="#accordion-element">
        <div class="card-body">

          <!--IMG-->
          <!-- <div class="col-12 img-element">
          
            <img         
              :src="getImgSrc( pattern.imageName)"
              :alt="pattern.title"
              :title="pattern.title"
              :class="pattern.imageBlur"/>
          </div>

          <br/> -->

    
          <!--DESCRIPTION-->
          <div v-for="(item, index) in pattern.details" :key="item.id">

            <div v-if="index === 'description'" :item="item">
              <div class="title-small">Description</div>
              {{ item }}
            </div>
          </div>

          
          <!--DETAILS-->
          <div v-for="(item, index) in pattern.details" :key="item.id">
            <div v-if="index !== 'description' && item !== ''" :item="item">
              <hr />
              <div v-if="index=='userstudy'" class="title-small">User Study</div>
              <div v-else class="title-small">{{ index }}</div>
              {{ item }}
            </div>
          </div>

          <!--PATTERNS-->
          <div v-for="(item, index) in pattern.pattern" :key="item.id">
            <div v-if="index === 0">
              <hr />
              <span class="title-small">Patterns</span>
            </div>

            <div class="card bg-light " style="max-width: 100%">
              <div class="card-header">{{ item.title }}</div>
              <div class="card-body">
                <div class="row">
                  <div class="img-element col-8">
                    <img 
                      :src="getImgSrc(item.image)"
                      :alt="pattern.title"
                      :title="pattern.title"
                      />
                      <!-- :class="pattern.imageBlur" -->
                    </div>
                    <div class="col-4 legend">
                      {{ item.description }}
                    </div>
                  <!--blocks-->
                  <div class="col-auto">
                      <div class="row">
                        <ul class="why-group">
                          
                          <li>
                            <span v-for="currentBlock in getBlocksPerItems(item)" :key="currentBlock">
                              <span v-if="currentBlock" class="block-list">
                                  <span v-if=" (currentBlock.facet==`recommenderSystemIssue` || currentBlock.facet==`systemOrUserIntent`)">
                                    <FacetItem 
                                        :block="currentBlock"
                                        :description="currentBlock.description"
                                        detailElement=true
                                        /> 
                                  </span>
                                </span>
                              </span>
                          </li>
                        </ul>

                        <ul class="what-group">

                          <li >

                            <span v-for="currentBlock in getBlocksPerItems(item)" :key="currentBlock">
                              <span v-if="currentBlock" class="block-list">
                                  <span v-if="(currentBlock.facet==`dataDomain` || currentBlock.facet == `contextInformation`)">
                                    <FacetItem 
                                        :block="currentBlock"
                                        :description="currentBlock.description"
                                        detailElement=true
                                        /> 
                                  </span>
                                </span>
                              </span>
                          </li>
                        </ul>
                        <ul class="how-group">
                          <li>
                            <span v-for="currentBlock in getBlocksPerItems(item)" :key="currentBlock">
                              <span v-if="currentBlock" class="block-list">
                                  
                                    <span v-if="(currentBlock.facet==`visualizationTechnique` || currentBlock.facet==`visualElement` || currentBlock.facet==`view` || currentBlock.facet==`visualChannel` || currentBlock.facet==`interaction`)" >

                                    <FacetItem 
                                        :block="currentBlock"
                                        :description="currentBlock.description"
                                        detailElement=true
                                        /> 
                                  </span>
                                </span>
                              </span>
                          </li>

                         
                        </ul>

                       

                    </div>
                  </div>
                </div>
              </div>
            </div>
            <br/>
          </div>

           <!--LITERATURE-->
           <div v-for="(item, index) in pattern.literature" :key="item.id" :citication="item.citication">
            <span v-if="index === 'citication'" :item="item">
              
              {{ item }}
            </span>
          </div>  
        
          <!--RESOURCES-->
          <span v-for="(resource, index)  in pattern.resources" :key="resource">
            <div v-if="resource && index === 0" class="title-small"><hr />Resources</div>
            <span v-if="resource.type === 'Paper'" class="ressource">
              <a target="_blank" class="btn btn-primary" :href="resource.url" :alt="resource.title" :title="resource.title">
                <i class="bi bi-file-earmark"></i>
              </a>
            </span>
            <span  v-else-if="resource.type === 'Youtube'" class="ressource">
              <a target="_blank" class="btn btn-primary" :href="resource.url" :alt="resource.title" :title="resource.title">
                <i class="bi bi-youtube"></i>
              </a>
            </span>
            <span v-else class="ressource">
              <a target="_blank" class="btn btn-primary" :href="resource.url" :alt="resource.title" :title="resource.title">
                <i class="bi bi-box-arrow-up-right"></i>
              </a>
            </span>
          </span>
        </div>
      </div>
    </div>
  </div>


</template>

<script>
import FacetItem from "./../facetNavigation/FacetItem";

export default {
  data: () => ({
        toggled: [],
        currentblock: null
    }),
    
  name: "DetailElement",
  components: { FacetItem },
  props: ["pattern", "description", "userstudy"],
 
  methods: {
    getBlocksPerItems(item){
      let blockArray = [];
      item.blocks.forEach((block) => {
        blockArray.push(this.$patternService.getBlockByUid(block))
      });
      return blockArray;
    },
    getBlockByUid(uid) {
      let block = this.$patternService.getBlockByUid(uid);
      this.currentblock=block;
      return block;
    },
    isActive (item) {
        return this.toggled.indexOf(item) >= 0
    },
    toggleItem (item) {
      const index = this.toggled.indexOf(item);
      console.log(index);
      if (index >= 0) {
        this.toggled.splice(index, 1)
        return
      }
      this.toggled.push(item);
    },
    getImgSrc(src){
      try{ 
        return require(`@/assets/resources/patterns/${src}`)
      }catch(_){
        console.error('Img at path '+src+' was not found');
        
        return require('@/assets/resources/patterns/dummy.png');
      }
    },
  }
};
</script>

<style lang="scss" scoped>
@use "../../style/mainStyles.scss" as ms;

.vorschau-img {
  width: 50px; 
  height: 50px; 
  object-fit: cover;
  margin-right:14px;
}
.pattern-block {
  width:85px;
}
.my-card-pattern {
  border:none;
 }
 button.btn.btn-link.header-box {
    text-align: inherit;
}
.header-box
  {
    width:100%;
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    
    i {
      transition: .3s transform ease-in-out;
      align-self: center;
    }
  }
.meta-box {
    width:100%;
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
}
.img-element img {
  max-width: 100%;
  max-height: 100%;
}

.ressource  {
  margin-right:3px;
  > a > i {
    color:#fff;
    width: 20px;
  }
}
.active { //active accordeon tab
  color:ms.$active!important;
  color: WHITE;
  border-radius: 100%;
    

  * i {
    color:#fff !important;;
  }
}
.literature {
  font-size:10px;
}
.block-list {
  float: left;
  margin:0;
  padding:0;
}
.why-group::before {
  content: "WHY";
}
.what-group::before {
  content: "WHAT";
}
.how-group::before {
  content: "HOW";
}

ul {
  list-style: none;
}
</style>
