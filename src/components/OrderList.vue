<script setup lang="ts">
  import { OrderbookEntry } from '../types/Orderbook';
  import Order from './Order.vue';

  const props = defineProps<{
    header: string;
    orders: OrderbookEntry[];
  }>();
</script>

<template>
  <div class="order-list" :class="header">
    <h2>{{ header }}</h2>
    <div class="order-list__orders">
      <Order v-for="(order, index) in orders" :key="index" :order="order" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .order-list {
    border: 1px solid black;
    padding: 10px;
    margin: 10px;
    border-radius: 5px;
  }

  .buy {
    background-color: #e6ffe6;
  }

  .sell {
    background-color: #ffe6e6;
  }
</style>