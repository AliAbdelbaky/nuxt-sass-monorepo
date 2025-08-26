<template>
  <UiButton> hello from buttom </UiButton>
  <UiInput placeholder="What is your name?" />
  <!-- overrided by 'app' unocss config -->
  <div class="bg-app">red bg</div>

  <!-- from 'ui' unocss config -->
  <div class="bg-ui">green bg</div>
</template>
<script setup lang="ts"></script>
