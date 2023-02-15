<script setup lang="ts">
  import { computed, onMounted, toRefs } from 'vue';
  import { OrderbookEntry } from '../types/Orderbook';

  const props = defineProps<{
    order: OrderbookEntry;
  }>();

  const { ra, ca, sa, pa, co } = toRefs(props.order);

  onMounted(() => {
    console.log(sa.value);
  });

  const price = computed(() => {
    return Math.round((ra.value * ca.value + Number.EPSILON) * 100) / 100;
  });
</script>

<template>
  <div class="order">
    <p class="stat">Rate: {{ ra }}</p>
    <p class="stat">Amount: {{ ca }}</p>
    <p class="stat">PLN: {{ price }}</p>
    <p class="stat">Orders: {{ co }}</p>
  </div>
</template>

<style lang="scss" scoped>
  .order {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    border-bottom: 1px solid black;

    .stat {
      width: 164px;
      text-align: left;
    }
  }
</style>