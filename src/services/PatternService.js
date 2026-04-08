import { blockService } from "./BlockService";
const json = require("../assets/objects/patterns.json");
import _ from "lodash";

export class patternService {
  patterns = [];
  blockService = new blockService();

  constructor() {
    this.patterns = json.patterns;
  }

  getBlockByUid(uid) {
    return this.blockService.getByUid(uid);
  }

  getByUid(uid) {
    return this.patterns.find((pattern) => pattern.uid === uid);
  }

  getAllPatterns() {
    return this.patterns;
  }


  // isBlockIncluedInPattern(block, positionnumber) {
  //   this.$patternService.isBlockIncluedInPattern(block, positionnumber);
  //  let pattern = null;
  //  let p = this.patterns.at(positionnumber).pattern;
  //  if(p)
  //    pattern = p.pattern;
   
  //  if(pattern!=null) {
  //    pattern.forEach((p) => {
  //      p.blocks.forEach((currentblock) => {
  //        if(currentblock===block.uid) {
  //          return "activecol";
  //        }
  //      });
  //    });
  //  }
  //  return "";
  //  }

  getAllNavigationFacetsByUid(uid) {

    let navigationFacets = [];

    let pattern = this.getByUid(uid);
    pattern.facets.forEach((facetUid) => {
      let facet = this.blockService.getByUid(facetUid);
      if (facet.facet !== "interaction") {
        navigationFacets.push(facet);
      }
    });
    return navigationFacets;
  }

  getPatternsForSearch() {
    let patterns = [];
    this.patterns.forEach((pattern) => {
      patterns.push({
        uid: pattern.uid,
        name: pattern.title,
        imageName: pattern.imageName,
      });
    });
    return patterns;
  }

  getFilteredPatterns(facets) {
    let filteredPatterns = [];
    if (facets.length === 0) {
      return this.patterns;
    }
    let facetGroups = Object.entries(_.groupBy(facets, ({ facet }) => facet));
    
    this.patterns.forEach((pattern) => {      
      let patternBlocks = [];
        pattern.pattern.forEach((a) => {
          a.blocks.forEach((x) => {
            patternBlocks.push(x);
          });
        });
      let containsCount = 0;
      facetGroups.forEach((group) => {
        let groupItems = group[1];
        let containsOne = false;
        let i = 0;
        while (!containsOne && i < groupItems.length) {
          // containsOne = pattern.pattern[0].blocks[0].includes(groupItems[i].uid);
          containsOne = patternBlocks.includes(groupItems[i].uid);
          i++;
        }
        if (containsOne) {
          containsCount++;
        }
      });
      if (containsCount === facetGroups.length) {
          if(filteredPatterns.indexOf(pattern) === -1){
            filteredPatterns.push(pattern);
          }
      }
    });
    return filteredPatterns;
  }

  getFilteredPatterns2(facets, selected) {
    let filteredPatterns = [];
    if (facets.length === 0) {
      return this.patterns;
    }
    else{
      let originalFacet = facets.filter(i => !selected.find(f => f.uid === i.uid)); // Second Way
      if(this.getFilteredPatterns(originalFacet).length === 0){
        return filteredPatterns;
      }
    }


    let allPatterns = [];
    this.patterns.forEach((patternHead) => {
      let patternWithBlocks = {pattern: Object, blocks:[]};
      patternWithBlocks.pattern=patternHead;
      patternHead.pattern.forEach((a)=>{
        a.blocks.forEach((x)=>{
          if(patternWithBlocks.blocks.indexOf(x)===-1){
            patternWithBlocks.blocks.push(x);
          }
        });
      });
      allPatterns.push(patternWithBlocks);
    });

    let facetGroups = Object.entries(_.groupBy(facets, ({ facet }) => facet));
    console.log(facetGroups);
    allPatterns.forEach((asdf) => {
      let containsCount = 0;
      facetGroups.forEach((group) => {
      
        let groupItems = group[1];
        let containsOne = false;
        let i = 0;
        while (!containsOne && i < groupItems.length) {
          containsOne = asdf.blocks.includes(groupItems[i].uid);
          i++;
        }
        if (containsOne) {
          containsCount++;
        }
      });
      if (containsCount === facetGroups.length) {
        if(filteredPatterns.indexOf(asdf) === -1){
          filteredPatterns.push(asdf);
        }      
      }
    });
    return filteredPatterns;

  }


  getSimilarPatterns(mainPattern) {
    let similarPatterns = [];

    this.patterns.forEach((pattern) => {
      if (pattern.uid !== mainPattern.uid) {
        let count = 0;
        // mainPattern.facets.forEach((mainFacet) => {
        //   if (
        //     !mainFacet.includes("interaction") 
        //     &&             pattern.facets.includes(mainFacet)
        //   ) {
        //     count++;
        //   }
        // });
        if (count > 0) {
          similarPatterns.push({ pattern: pattern, facetCount: count });
        }
      }
    });

    return similarPatterns
      .sort(function (a, b) {
        if (a.facetCount < b.facetCount) {
          return 1;
        }
        if (a.facetCount > b.facetCount) {
          return -1;
        }
        return 0;
      })
      .slice(0, 10);
  }
}
