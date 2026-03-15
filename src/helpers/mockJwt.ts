/**
 * JWT helper for development — HS256 signing.
 * Uses pure-JS SHA-256 + HMAC-SHA256 for React Native compatibility.
 * The HOST_JWT_SECRET must match the Token Factory server's config.
 */

const HOST_JWT_SECRET = 'host-jwt-secret-dev-only';

// ── Pure-JS SHA-256 ─────────────────────────────────────────────────────────
// Standard implementation of SHA-256 for environments without Node.js crypto.

const K: number[] = [
  0x428a2f98, 0x71374491, 0xb5c0fbcf, 0xe9b5dba5, 0x3956c25b, 0x59f111f1, 0x923f82a4, 0xab1c5ed5,
  0xd807aa98, 0x12835b01, 0x243185be, 0x550c7dc3, 0x72be5d74, 0x80deb1fe, 0x9bdc06a7, 0xc19bf174,
  0xe49b69c1, 0xefbe4786, 0x0fc19dc6, 0x240ca1cc, 0x2de92c6f, 0x4a7484aa, 0x5cb0a9dc, 0x76f988da,
  0x983e5152, 0xa831c66d, 0xb00327c8, 0xbf597fc7, 0xc6e00bf3, 0xd5a79147, 0x06ca6351, 0x14292967,
  0x27b70a85, 0x2e1b2138, 0x4d2c6dfc, 0x53380d13, 0x650a7354, 0x766a0abb, 0x81c2c92e, 0x92722c85,
  0xa2bfe8a1, 0xa81a664b, 0xc24b8b70, 0xc76c51a3, 0xd192e819, 0xd6990624, 0xf40e3585, 0x106aa070,
  0x19a4c116, 0x1e376c08, 0x2748774c, 0x34b0bcb5, 0x391c0cb3, 0x4ed8aa4a, 0x5b9cca4f, 0x682e6ff3,
  0x748f82ee, 0x78a5636f, 0x84c87814, 0x8cc70208, 0x90befffa, 0xa4506ceb, 0xbef9a3f7, 0xc67178f2,
];

function rotr(n: number, x: number): number {
  return (x >>> n) | (x << (32 - n));
}

function sha256(message: number[]): number[] {
  // Pre-processing: pad message
  const msgLen = message.length;
  const bitLen = msgLen * 8;
  message.push(0x80);
  while ((message.length % 64) !== 56) {
    message.push(0);
  }
  // Append bit length as 64-bit big-endian
  for (let i = 56; i >= 0; i -= 8) {
    message.push((bitLen / Math.pow(2, i)) & 0xff);
  }

  // Initial hash values
  let h0 = 0x6a09e667, h1 = 0xbb67ae85, h2 = 0x3c6ef372, h3 = 0xa54ff53a;
  let h4 = 0x510e527f, h5 = 0x9b05688c, h6 = 0x1f83d9ab, h7 = 0x5be0cd19;

  // Process each 64-byte block
  for (let offset = 0; offset < message.length; offset += 64) {
    const w: number[] = new Array(64);

    // Copy block into first 16 words
    for (let i = 0; i < 16; i++) {
      w[i] = (message[offset + i * 4] << 24)
        | (message[offset + i * 4 + 1] << 16)
        | (message[offset + i * 4 + 2] << 8)
        | message[offset + i * 4 + 3];
    }

    // Extend to 64 words
    for (let i = 16; i < 64; i++) {
      const s0 = rotr(7, w[i - 15]) ^ rotr(18, w[i - 15]) ^ (w[i - 15] >>> 3);
      const s1 = rotr(17, w[i - 2]) ^ rotr(19, w[i - 2]) ^ (w[i - 2] >>> 10);
      w[i] = (w[i - 16] + s0 + w[i - 7] + s1) | 0;
    }

    // Compression
    let a = h0, b = h1, c = h2, d = h3, e = h4, f = h5, g = h6, h = h7;

    for (let i = 0; i < 64; i++) {
      const S1 = rotr(6, e) ^ rotr(11, e) ^ rotr(25, e);
      const ch = (e & f) ^ (~e & g);
      const temp1 = (h + S1 + ch + K[i] + w[i]) | 0;
      const S0 = rotr(2, a) ^ rotr(13, a) ^ rotr(22, a);
      const maj = (a & b) ^ (a & c) ^ (b & c);
      const temp2 = (S0 + maj) | 0;

      h = g; g = f; f = e; e = (d + temp1) | 0;
      d = c; c = b; b = a; a = (temp1 + temp2) | 0;
    }

    h0 = (h0 + a) | 0; h1 = (h1 + b) | 0; h2 = (h2 + c) | 0; h3 = (h3 + d) | 0;
    h4 = (h4 + e) | 0; h5 = (h5 + f) | 0; h6 = (h6 + g) | 0; h7 = (h7 + h) | 0;
  }

  // Produce 32-byte digest
  const hash: number[] = [];
  for (const val of [h0, h1, h2, h3, h4, h5, h6, h7]) {
    hash.push((val >>> 24) & 0xff, (val >>> 16) & 0xff, (val >>> 8) & 0xff, val & 0xff);
  }
  return hash;
}

// ── HMAC-SHA256 ─────────────────────────────────────────────────────────────

function hmacSha256(key: number[], message: number[]): number[] {
  const blockSize = 64;

  // If key > blockSize, hash it
  let k = key.length > blockSize ? sha256([...key]) : [...key];
  // Pad key to blockSize
  while (k.length < blockSize) {
    k.push(0);
  }

  const ipad = k.map((b, i) => b ^ 0x36);
  const opad = k.map((b, i) => b ^ 0x5c);

  const innerHash = sha256([...ipad, ...message]);
  return sha256([...opad, ...innerHash]);
}

// ── Base64url ───────────────────────────────────────────────────────────────

const B64_CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';

function bytesToBase64url(bytes: number[]): string {
  let result = '';
  for (let i = 0; i < bytes.length; i += 3) {
    const b1 = bytes[i];
    const b2 = bytes[i + 1] ?? 0;
    const b3 = bytes[i + 2] ?? 0;
    result += B64_CHARS[b1 >> 2];
    result += B64_CHARS[((b1 & 3) << 4) | (b2 >> 4)];
    result += i + 1 < bytes.length ? B64_CHARS[((b2 & 15) << 2) | (b3 >> 6)] : '=';
    result += i + 2 < bytes.length ? B64_CHARS[b3 & 63] : '=';
  }
  return result.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

function stringToBase64url(str: string): string {
  const bytes = Array.from(str).map(c => c.charCodeAt(0));
  return bytesToBase64url(bytes);
}

function stringToBytes(str: string): number[] {
  return Array.from(str).map(c => c.charCodeAt(0));
}

// ── JWT ─────────────────────────────────────────────────────────────────────

export function createMockJwt(claims: {
  sub: string;
  tenantId: string;
  roles: string[];
  msisdn?: string;
  plan?: string;
}): string {
  const header = {alg: 'HS256', typ: 'JWT'};
  const payload = {
    ...claims,
    planId: claims.plan,
    serviceNumber: claims.msisdn,
    iat: Math.floor(Date.now() / 1000),
    exp: Math.floor(Date.now() / 1000) + 3600,
    iss: 'weconnect-dev',
    aud: 'enterprise-module-sdk',
  };

  const headerB64 = stringToBase64url(JSON.stringify(header));
  const payloadB64 = stringToBase64url(JSON.stringify(payload));
  const signingInput = `${headerB64}.${payloadB64}`;

  // HMAC-SHA256 signature
  const keyBytes = stringToBytes(HOST_JWT_SECRET);
  const messageBytes = stringToBytes(signingInput);
  const signatureBytes = hmacSha256(keyBytes, messageBytes);
  const signatureB64 = bytesToBase64url(signatureBytes);

  return `${signingInput}.${signatureB64}`;
}
