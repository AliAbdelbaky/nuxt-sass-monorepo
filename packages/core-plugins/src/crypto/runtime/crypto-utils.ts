// crypto/runtime/crypto-utils.ts
export type WordArray = Uint8Array;

export interface CryptoService {
  encrypt(plainText: string): Promise<string>;
  decrypt(payload: string): Promise<string>;
}

const VERSION = 'v1';
const enc = new TextEncoder();
const dec = new TextDecoder();

export async function getSubtle(): Promise<SubtleCrypto> {
  if (globalThis.crypto?.subtle) return globalThis.crypto.subtle;
  const { webcrypto } = await import('node:crypto');
  return webcrypto.subtle;
}

function toB64(data: WordArray): string {
  return btoa(String.fromCharCode(...data));
}
function fromB64(b64: string): WordArray {
  const bin = atob(b64);
  const out = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++) out[i] = bin.charCodeAt(i);
  return out;
}

async function deriveKey(
  subtle: SubtleCrypto,
  passphrase: string,
  salt: WordArray,
  iterations: number
): Promise<CryptoKey> {
  const keyMaterial = await subtle.importKey(
    'raw',
    enc.encode(passphrase),
    { name: 'PBKDF2' },
    false,
    ['deriveKey']
  );
  return subtle.deriveKey(
    { name: 'PBKDF2', salt, iterations, hash: 'SHA-256' },
    keyMaterial,
    { name: 'AES-GCM', length: 256 },
    false,
    ['encrypt', 'decrypt']
  );
}

function getRandomBytes(len: number): WordArray {
  const buf = new Uint8Array(len);
  crypto.getRandomValues(buf);
  return buf;
}

export function createCryptoService(
  subtle: SubtleCrypto,
  passphrase: string,
  iterations: number
): CryptoService {
  return {
    async encrypt(plainText: string): Promise<string> {
      if (!passphrase) throw new Error('Encryption passphrase is not set.');
      const salt = getRandomBytes(16);
      const iv = getRandomBytes(12);
      const key = await deriveKey(subtle, passphrase, salt, iterations);
      const cipherBuf = await subtle.encrypt({ name: 'AES-GCM', iv }, key, enc.encode(plainText));
      const cipher = new Uint8Array(cipherBuf);
      return [VERSION, toB64(salt), toB64(iv), toB64(cipher)].join('.');
    },

    async decrypt(payload: string): Promise<string> {
      if (!passphrase) throw new Error('Encryption passphrase is not set.');

      const parts = payload.split('.');
      if (parts.length !== 4) throw new Error('Invalid payload format.');

      const [version, saltB64, ivB64, dataB64] = parts;
      if (version !== VERSION) throw new Error(`Unsupported crypto version: ${version}`);

      const salt = fromB64(saltB64);
      const iv = fromB64(ivB64);
      const data = fromB64(dataB64);

      const key = await deriveKey(subtle, passphrase, salt, iterations);
      const plainBuf = await subtle.decrypt({ name: 'AES-GCM', iv }, key, data);
      return dec.decode(plainBuf);
    },
  };
}
