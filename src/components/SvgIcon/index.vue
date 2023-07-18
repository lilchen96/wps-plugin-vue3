<template>
  <div
    v-if="isExternal"
    :style="styleExternalIcon"
    class="svg-external-icon svg-icon"
    v-bind="$attrs" />
  <svg
    v-else
    :class="svgClass"
    aria-hidden="true"
    v-bind="$attrs">
    <use :xlink:href="iconName" />
  </svg>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({
  name: 'SvgIcon'
});
</script>

<script lang="ts" setup>
import { computed } from 'vue';
const props = withDefaults(
  defineProps<{
    iconClass: string;
    className?: string;
  }>(),
  {
    iconClass: '',
    className: ''
  }
);

const isExternal = computed(() => /^(https?:)/.test(props.iconClass));
const iconName = computed(() => `#icon-${props.iconClass}`);
const svgClass = computed(() => (props.className ? `svg-icon ${props.className}` : 'svg-icon'));
const styleExternalIcon = computed(() => ({
  mask: `url(${props.iconClass}) no-repeat 50% 50%`,
  '-webkit-mask': `url(${props.iconClass}) no-repeat 50% 50%`
}));
</script>

<style lang="scss" scoped>
.svg-icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}

.svg-external-icon {
  background-color: currentColor;
  mask-size: cover !important;
  display: inline-block;
}
</style>
