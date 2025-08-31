<script setup lang="ts">
import { ref } from 'vue';
import { useNuxtApp } from '#imports';
import { getTestService } from '~/services/testService';
const { $crypto } = useNuxtApp();

async function getUsers() {
  const me = await getTestService();
  console.log(me);
}

const stringToEncode = ref('Hello World');
const toggleEncryrption = async () => {
  if (stringToEncode.value === 'Hello World') {
    stringToEncode.value = await $crypto!.encrypt(stringToEncode.value);
  } else {
    stringToEncode.value = await $crypto!.decrypt(stringToEncode.value);
  }
};
</script>

<template>
  <UiButton @click="getUsers"> hello from buttom </UiButton>
  <UiButton @click="toggleEncryrption">{{ stringToEncode }}</UiButton>
  <UiInput placeholder="What is your name?" />
  <!-- overrided by 'app' unocss config -->
  <div class="bg-app">red bg</div>

  <!-- from 'ui' unocss config -->
  <div class="bg-ui">green bg</div>
</template>

<style scoped></style>
