<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from "vue";
import OrderList from "./components/OrderList.vue";
import { OrderbookEntry, OrderbookLimitedResponse } from "./types/Orderbook";

let intervalId: number;

const productData = ref<OrderbookLimitedResponse>();

const currencyPair = ref("BTC-PLN");

const buy = computed<OrderbookEntry[]>(() => {
  return productData.value?.buy || [];
});
const sell = computed<OrderbookEntry[]>(() => {
  return productData.value?.sell || [];
});


onMounted(() => {
  fetchData();
  intervalId = setInterval(() => {
    fetchData();
  }, 5000);
});

onBeforeUnmount(() => {
  clearInterval(intervalId);
});

const fetchData = async () => {
  const url = `https://api.zonda.exchange/rest/trading/orderbook-limited/${currencyPair.value}/10`
  const response = await fetch(url , {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json;charset=UTF-8",
    },
  });

  if (response.status != 200) {
    throw response.status;
  }

  productData.value = await response.json();
};
</script>

<template>
  <div>{{currencyPair}}</div>
  <div class="lists">
    <OrderList header="buy" :orders="buy" />
    <OrderList header="sell" :orders="sell" />
  </div>
</template>

<style lang="scss" scoped>
  .lists {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
    margin: auto;
  }
</style>
