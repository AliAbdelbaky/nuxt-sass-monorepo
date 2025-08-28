<template>
  <UiButton @click="getUsers"> hello from buttom </UiButton>
  <UiInput placeholder="What is your name?" />
  <!-- overrided by 'app' unocss config -->
  <div class="bg-app">red bg</div>

  <!-- from 'ui' unocss config -->
  <div class="bg-ui">green bg</div>
</template>
<script setup lang="ts">
import { useNuxtApp } from '#imports';
const { $api_provider } = useNuxtApp();
type MeResponse = { id: string; email: string };

const payload = (type: 'formData' | 'json') => {
  const json = { email: 'ali.abdelbaky2000@gmail.com', password: '1234@1234@Aa' };
  if (type === 'formData') {
    const formData = new FormData();
    formData.append('email', json.email);
    formData.append('password', json.password);
    return formData;
  }
  return json;
};
async function getUsers() {
  const me = await $api_provider!<MeResponse>('/v1/auth/login', {
    method: 'POST',
    body: payload('json'),
  });
  console.log(me);
}
</script>
