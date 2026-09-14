// QR Code Generator — Byte mode, EC Level M
// Zero-dependency implementation for Pix EMV payloads
// Supports versions 1-14 (~360 byte capacity)

/* ─── GF(256) arithmetic ─── */
const EXP = new Uint8Array(512);
const LOG = new Uint8Array(256);

(() => {
  let x = 1;
  for (let i = 0; i < 255; i++) {
    EXP[i] = x;
    LOG[x] = i;
    x <<= 1;
    if (x >= 256) x ^= 0x11d;
  }
  for (let i = 255; i < 512; i++) EXP[i] = EXP[i - 255];
})();

function gfMul(a: number, b: number): number {
  return a === 0 || b === 0 ? 0 : EXP[LOG[a] + LOG[b]];
}

/* ─── Reed-Solomon ─── */
function rsGenPoly(n: number): number[] {
  let g = [1];
  for (let i = 0; i < n; i++) {
    const next = new Array(g.length + 1).fill(0);
    for (let j = 0; j < g.length; j++) {
      next[j] ^= g[j];
      next[j + 1] ^= gfMul(g[j], EXP[i]);
    }
    g = next;
  }
  return g;
}

function rsEncode(data: number[], ecCount: number): number[] {
  const gen = rsGenPoly(ecCount);
  const fb = new Array(ecCount).fill(0);
  for (const d of data) {
    const f = d ^ fb[0];
    for (let i = 0; i < ecCount - 1; i++) fb[i] = fb[i + 1];
    fb[ecCount - 1] = 0;
    if (f !== 0) {
      for (let i = 0; i < ecCount; i++) fb[i] ^= gfMul(gen[i + 1], f);
    }
  }
  return fb;
}

/* ─── Version tables (EC Level M) ─── */
// [byteCap, ecPerBlock, g1Blocks, g1DataCW, g2Blocks, g2DataCW]
const VER: number[][] = [
  [],
  [14, 10, 1, 16, 0, 0],
  [26, 16, 1, 28, 0, 0],
  [42, 26, 1, 44, 0, 0],
  [62, 18, 2, 32, 0, 0],
  [84, 24, 2, 43, 0, 0],
  [106, 16, 4, 27, 0, 0],
  [122, 18, 4, 31, 0, 0],
  [152, 22, 2, 38, 2, 39],
  [180, 22, 3, 36, 2, 37],
  [213, 26, 4, 43, 1, 44],
  [251, 30, 1, 50, 4, 51],
  [287, 22, 6, 36, 2, 37],
  [331, 22, 8, 37, 1, 38],
  [362, 24, 4, 40, 5, 41],
];

// Alignment pattern center positions per version
const ALIGN: number[][] = [
  [], [],
  [6, 18], [6, 22], [6, 26], [6, 30], [6, 34],
  [6, 22, 38], [6, 24, 42], [6, 26, 46], [6, 28, 50],
  [6, 30, 54], [6, 32, 58], [6, 34, 62], [6, 26, 46, 66],
];

/* ─── BCH encoding ─── */
function bchFormat(data: number): number {
  let d = data << 10;
  for (let i = 14; i >= 10; i--) {
    if (d & (1 << i)) d ^= 0x537 << (i - 10);
  }
  return ((data << 10) | d) ^ 0x5412;
}

function bchVersion(ver: number): number {
  let d = ver << 12;
  for (let i = 17; i >= 12; i--) {
    if (d & (1 << i)) d ^= 0x1f25 << (i - 12);
  }
  return (ver << 12) | d;
}

/* ─── Mask patterns ─── */
type MaskFn = (r: number, c: number) => boolean;
const MASKS: MaskFn[] = [
  (r, c) => (r + c) % 2 === 0,
  (r) => r % 2 === 0,
  (_, c) => c % 3 === 0,
  (r, c) => (r + c) % 3 === 0,
  (r, c) => (((r >> 1) + Math.floor(c / 3)) & 1) === 0,
  (r, c) => ((r * c) % 2) + ((r * c) % 3) === 0,
  (r, c) => (((r * c) % 2 + (r * c) % 3) & 1) === 0,
  (r, c) => (((r + c) % 2 + (r * c) % 3) & 1) === 0,
];

/* ─── Matrix ─── */
interface QRMatrix {
  mod: boolean[][];
  fn: boolean[][];
  size: number;
}

function createMatrix(size: number): QRMatrix {
  const row = () => new Array<boolean>(size).fill(false);
  return {
    mod: Array.from({ length: size }, row),
    fn: Array.from({ length: size }, row),
    size,
  };
}

function set(m: QRMatrix, r: number, c: number, val: boolean, func: boolean) {
  if (r >= 0 && r < m.size && c >= 0 && c < m.size) {
    m.mod[r][c] = val;
    if (func) m.fn[r][c] = true;
  }
}

function placeFinder(m: QRMatrix, row: number, col: number) {
  for (let dr = -1; dr <= 7; dr++) {
    for (let dc = -1; dc <= 7; dc++) {
      const r = row + dr, c = col + dc;
      if (r < 0 || r >= m.size || c < 0 || c >= m.size) continue;
      const border = dr === -1 || dr === 7 || dc === -1 || dc === 7;
      const outer = dr === 0 || dr === 6 || dc === 0 || dc === 6;
      const inner = dr >= 2 && dr <= 4 && dc >= 2 && dc <= 4;
      set(m, r, c, outer || inner, true);
      if (border && !outer) set(m, r, c, false, true);
    }
  }
}

function placeAlignment(m: QRMatrix, row: number, col: number) {
  for (let dr = -2; dr <= 2; dr++) {
    for (let dc = -2; dc <= 2; dc++) {
      const on = Math.abs(dr) === 2 || Math.abs(dc) === 2 || (dr === 0 && dc === 0);
      set(m, row + dr, col + dc, on, true);
    }
  }
}

function placeFunctionPatterns(m: QRMatrix, version: number) {
  const s = m.size;

  placeFinder(m, 0, 0);
  placeFinder(m, 0, s - 7);
  placeFinder(m, s - 7, 0);

  for (let i = 8; i < s - 8; i++) {
    set(m, 6, i, i % 2 === 0, true);
    set(m, i, 6, i % 2 === 0, true);
  }

  const pos = ALIGN[version];
  if (pos && pos.length > 0) {
    for (const r of pos) {
      for (const c of pos) {
        if ((r < 9 && c < 9) || (r < 9 && c > s - 9) || (r > s - 9 && c < 9)) continue;
        placeAlignment(m, r, c);
      }
    }
  }

  set(m, s - 8, 8, true, true);

  for (let i = 0; i <= 8; i++) {
    set(m, 8, i, false, true);
    set(m, i, 8, false, true);
  }
  for (let i = 0; i < 8; i++) {
    set(m, 8, s - 8 + i, false, true);
    set(m, s - 7 + i, 8, false, true);
  }

  if (version >= 7) {
    for (let i = 0; i < 6; i++) {
      for (let j = 0; j < 3; j++) {
        set(m, i, s - 11 + j, false, true);
        set(m, s - 11 + j, i, false, true);
      }
    }
  }
}

function placeData(m: QRMatrix, bits: boolean[]) {
  const s = m.size;
  let idx = 0;
  let up = true;

  for (let right = s - 1; right >= 1; right -= 2) {
    if (right === 6) right = 5;
    for (let i = 0; i < s; i++) {
      const row = up ? s - 1 - i : i;
      for (let dx = 0; dx <= 1; dx++) {
        const col = right - dx;
        if (col >= 0 && !m.fn[row][col]) {
          m.mod[row][col] = idx < bits.length && bits[idx];
          idx++;
        }
      }
    }
    up = !up;
  }
}

function applyMask(mod: boolean[][], fn: boolean[][], mask: number, size: number): boolean[][] {
  const out = mod.map((r) => [...r]);
  const f = MASKS[mask];
  for (let r = 0; r < size; r++) {
    for (let c = 0; c < size; c++) {
      if (!fn[r][c] && f(r, c)) out[r][c] = !out[r][c];
    }
  }
  return out;
}

function penalty(mod: boolean[][], size: number): number {
  let score = 0;

  for (let r = 0; r < size; r++) {
    let run = 1;
    for (let c = 1; c < size; c++) {
      if (mod[r][c] === mod[r][c - 1]) {
        run++;
        if (run === 5) score += 3;
        else if (run > 5) score++;
      } else run = 1;
    }
  }
  for (let c = 0; c < size; c++) {
    let run = 1;
    for (let r = 1; r < size; r++) {
      if (mod[r][c] === mod[r - 1][c]) {
        run++;
        if (run === 5) score += 3;
        else if (run > 5) score++;
      } else run = 1;
    }
  }

  for (let r = 0; r < size - 1; r++) {
    for (let c = 0; c < size - 1; c++) {
      const v = mod[r][c];
      if (v === mod[r][c + 1] && v === mod[r + 1][c] && v === mod[r + 1][c + 1]) score += 3;
    }
  }

  const p1 = [true, false, true, true, true, false, true, false, false, false, false];
  const p2 = [false, false, false, false, true, false, true, true, true, false, true];
  for (let r = 0; r < size; r++) {
    for (let c = 0; c <= size - 11; c++) {
      let m1 = true, m2 = true;
      for (let k = 0; k < 11; k++) {
        if (mod[r][c + k] !== p1[k]) m1 = false;
        if (mod[r][c + k] !== p2[k]) m2 = false;
      }
      if (m1 || m2) score += 40;
    }
  }
  for (let c = 0; c < size; c++) {
    for (let r = 0; r <= size - 11; r++) {
      let m1 = true, m2 = true;
      for (let k = 0; k < 11; k++) {
        if (mod[r + k][c] !== p1[k]) m1 = false;
        if (mod[r + k][c] !== p2[k]) m2 = false;
      }
      if (m1 || m2) score += 40;
    }
  }

  let dark = 0;
  for (let r = 0; r < size; r++)
    for (let c = 0; c < size; c++) if (mod[r][c]) dark++;
  const pct = (dark * 100) / (size * size);
  const lo = Math.floor(pct / 5) * 5;
  score += Math.min(Math.abs(lo - 50), Math.abs(lo + 5 - 50)) * 2;

  return score;
}

function placeFormatInfo(mod: boolean[][], size: number, mask: number) {
  const fmt = bchFormat(mask);
  const hPos = [0, 1, 2, 3, 4, 5, 7, 8];
  const vPos = [7, 5, 4, 3, 2, 1, 0];

  for (let i = 0; i < 8; i++) mod[8][hPos[i]] = ((fmt >> i) & 1) === 1;
  for (let i = 0; i < 7; i++) mod[vPos[i]][8] = ((fmt >> (8 + i)) & 1) === 1;

  for (let i = 0; i < 7; i++) mod[size - 1 - i][8] = ((fmt >> i) & 1) === 1;
  for (let i = 0; i < 8; i++) mod[8][size - 8 + i] = ((fmt >> (7 + i)) & 1) === 1;
}

function placeVersionInfo(mod: boolean[][], size: number, version: number) {
  if (version < 7) return;
  const info = bchVersion(version);
  for (let i = 0; i < 18; i++) {
    const bit = ((info >> i) & 1) === 1;
    const r = Math.floor(i / 3);
    const c = i % 3;
    mod[size - 11 + c][r] = bit;
    mod[r][size - 11 + c] = bit;
  }
}

/* ─── Public API ─── */
export interface QRResult {
  matrix: boolean[][];
  size: number;
  version: number;
}

export function generateQR(text: string): QRResult {
  const bytes = new TextEncoder().encode(text);
  const len = bytes.length;

  let version = 0;
  for (let v = 1; v < VER.length; v++) {
    if (VER[v][0] >= len) { version = v; break; }
  }
  if (!version) throw new Error(`Data too long: ${len} bytes (max ${VER[VER.length - 1][0]})`);

  const [, ecPerBlock, g1n, g1dc, g2n, g2dc] = VER[version];
  const size = 17 + 4 * version;
  const ccBits = version <= 9 ? 8 : 16;
  const totalDC = g1n * g1dc + g2n * g2dc;
  const totalBits = totalDC * 8;

  // Encode data bits
  const bits: number[] = [];
  const push = (val: number, count: number) => {
    for (let i = count - 1; i >= 0; i--) bits.push((val >> i) & 1);
  };

  push(0b0100, 4);       // byte mode
  push(len, ccBits);      // character count
  for (const b of bytes) push(b, 8);

  // terminator + padding
  const termLen = Math.min(4, totalBits - bits.length);
  push(0, termLen);
  while (bits.length % 8 !== 0) bits.push(0);

  const pads = [0xec, 0x11];
  let pi = 0;
  while (bits.length < totalBits) { push(pads[pi & 1], 8); pi++; }

  // Bits → codewords
  const codewords: number[] = [];
  for (let i = 0; i < totalDC; i++) {
    let cw = 0;
    for (let j = 0; j < 8; j++) cw = (cw << 1) | (bits[i * 8 + j] || 0);
    codewords.push(cw);
  }

  // Split into blocks → RS encode → interleave
  const blocks: number[][] = [];
  const ecBlocks: number[][] = [];
  let off = 0;

  for (let g = 0; g < g1n; g++) { blocks.push(codewords.slice(off, off + g1dc)); off += g1dc; }
  for (let g = 0; g < g2n; g++) { blocks.push(codewords.slice(off, off + g2dc)); off += g2dc; }
  for (const bl of blocks) ecBlocks.push(rsEncode(bl, ecPerBlock));

  const interleaved: number[] = [];
  const maxDC = Math.max(g1dc, g2dc || 0);
  for (let i = 0; i < maxDC; i++) {
    for (const bl of blocks) if (i < bl.length) interleaved.push(bl[i]);
  }
  for (let i = 0; i < ecPerBlock; i++) {
    for (const ec of ecBlocks) interleaved.push(ec[i]);
  }

  const dataBits: boolean[] = [];
  for (const cw of interleaved) {
    for (let i = 7; i >= 0; i--) dataBits.push(((cw >> i) & 1) === 1);
  }

  // Build matrix
  const m = createMatrix(size);
  placeFunctionPatterns(m, version);
  placeData(m, dataBits);

  // Best mask
  let bestMask = 0;
  let bestPen = Infinity;
  let bestMod: boolean[][] = m.mod;

  for (let mask = 0; mask < 8; mask++) {
    const masked = applyMask(m.mod, m.fn, mask, size);
    const p = penalty(masked, size);
    if (p < bestPen) { bestPen = p; bestMask = mask; bestMod = masked; }
  }

  placeFormatInfo(bestMod, size, bestMask);
  placeVersionInfo(bestMod, size, version);

  return { matrix: bestMod, size, version };
}
