// crypto/runtime/plugin.ts
import { defineNuxtPlugin } from '#app';
import cfg from '#build/crypto-config.mjs';
import { getSubtle, createCryptoService, type CryptoService } from './crypto-utils';

type CryptoConfig = {
  passphrase: string;
  iterations: number;
  provideName: string;
};

export default defineNuxtPlugin(async () => {
  const { passphrase, iterations, provideName } = cfg as CryptoConfig;

  if (!passphrase && import.meta.dev) {
    // eslint-disable-next-line no-console
    console.warn('[nuxt-crypto] Missing passphrase; $' + provideName + ' will throw when used.');
  }

  const subtle = await getSubtle();
  const service: CryptoService = createCryptoService(subtle, String(passphrase).trim(), iterations);

  // dynamic key, strongly typed via the generated d.ts
  return {
    provide: {
      [provideName]: service as unknown as CryptoService,
    },
  };
});
