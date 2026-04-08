<script>
import { defineComponent, ref, computed } from 'vue'
import { createPopper } from '@popperjs/core'

export default defineComponent({
  name: 'TooltipComponent',
  props: {
    placement: String,
    blockname: String,
    description: String,
    color: String,
    disabled: Boolean
  },
  setup(props) {
    const button = ref(null)
    const tooltip = ref(null)

    const popperInstance = computed(() => {
      return createPopper(button.value, tooltip.value, {
        placement:props.placement,
        blockname: props.blockname,
        description: props.description,
        color: props.color,
        disabled: props.disabled,
        modifiers: [
          {
            name: 'offset',
            options: {
              offset: [0, 10],
            },
          },
        ],
        strategy: 'absolute'
      })
    });

    const insertElement = (btn, tip) => {
      button.value = btn
      tooltip.value = tip
    }

    const handleShow = (e) => {
      if (button.value === null && tooltip.value === null) {
        insertElement(e.target, e.target.parentElement.querySelector('.tooltipText'))
      }
      tooltip.value.setAttribute('data-show', '')
      popperInstance.value.update()
    }

    const handleHide = (e) => {
      if (button.value === null && tooltip.value === null) {
        insertElement(e.target, e.target.parentElement.querySelector('.tooltipText'))
      }
      tooltip.value.removeAttribute('data-show')
    }

    return {
      handleShow,
      handleHide
    }
  }
})
</script>
  
<template>
  <div class="tooltip">

    <span :class="[!disabled ? color : '']" class="badge badge-dark" type="button" aria-describedby="tooltip"
      @mouseenter="handleShow($event)" @mouseleave="handleHide($event)" @focus="handleShow($event)"
      @blur="handleHide($event)">
      {{ blockname }}
    </span>

    <div v-if="description != ''" class="tooltipText" role="tooltip">
      {{ description }}
      <div class="tooltipArrow" data-popper-arrow></div>
    </div>

  </div>
</template>
  
<style lang="scss" scoped>
.badge {
  z-index: 5;
}

.tooltip {
  z-index: 100;
  opacity: 10;
  position: relative;
  .tooltipText {
    width:10rem!important;

    z-index: 110;
    background-color: #333;
    color: white;
    padding: 5px 6px;
    border-radius: 4px;
    font-size: 8px;
    display: none;
    opacity: 100;
  }
  .tooltipText[data-show] {
    display: block;
  }

  .tooltipArrow,
  .tooltipArrow::before {
    position: absolute;
    width: 8px;
    height: 8px;
    background: inherit;
  }

  .tooltipArrow {
    visibility: hidden;
  }

  .tooltipArrow::before {
    visibility: visible;
    content: '';
    transform: rotate(45deg);
  }

  .tooltipText[data-popper-placement^='top']>.tooltipArrow {
    bottom: -4px;
  }

  .tooltipText[data-popper-placement^='bottom']>.tooltipArrow {
    top: -4px;
  }

  .tooltipText[data-popper-placement^='left']>.tooltipArrow {
    right: -4px;
  }

  .tooltipText[data-popper-placement^='right']>.tooltipArrow {
    left: -4px;
  }
}
</style>
  