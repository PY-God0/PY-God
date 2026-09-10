export interface DarkErgExpRow {
  level: number;
  exp: number;
}

export interface DarkErgWeaponEffect {
  weapon: string;
  effect: string;
}

export interface DarkErgCrystalSource {
  label: string;
  value: string;
}

export const darkErgMaxLevel = 50;

export const darkErgTotalExp = 14998;

// level 代表該段的起始等級，例如 level 1 表示 1 → 2 所需經驗
export const darkErgExpTable: DarkErgExpRow[] = [
  { level: 1, exp: 110 },
  { level: 2, exp: 110 },
  { level: 3, exp: 110 },
  { level: 4, exp: 110 },
  { level: 5, exp: 130 },
  { level: 6, exp: 140 },
  { level: 7, exp: 150 },
  { level: 8, exp: 150 },
  { level: 9, exp: 150 },
  { level: 10, exp: 150 },
  { level: 11, exp: 159 },
  { level: 12, exp: 167 },
  { level: 13, exp: 176 },
  { level: 14, exp: 185 },
  { level: 15, exp: 193 },
  { level: 16, exp: 202 },
  { level: 17, exp: 211 },
  { level: 18, exp: 219 },
  { level: 19, exp: 228 },
  { level: 20, exp: 236 },
  { level: 21, exp: 245 },
  { level: 22, exp: 254 },
  { level: 23, exp: 262 },
  { level: 24, exp: 271 },
  { level: 25, exp: 280 },
  { level: 26, exp: 288 },
  { level: 27, exp: 297 },
  { level: 28, exp: 306 },
  { level: 29, exp: 314 },
  { level: 30, exp: 323 },
  { level: 31, exp: 332 },
  { level: 32, exp: 340 },
  { level: 33, exp: 349 },
  { level: 34, exp: 358 },
  { level: 35, exp: 366 },
  { level: 36, exp: 375 },
  { level: 37, exp: 383 },
  { level: 38, exp: 392 },
  { level: 39, exp: 401 },
  { level: 40, exp: 409 },
  { level: 41, exp: 418 },
  { level: 42, exp: 427 },
  { level: 43, exp: 435 },
  { level: 44, exp: 444 },
  { level: 45, exp: 466 },
  { level: 46, exp: 533 },
  { level: 47, exp: 644 },
  { level: 48, exp: 800 },
  { level: 49, exp: 1000 },
];

export const darkErgWeaponEffects: DarkErgWeaponEffect[] = [
  { weapon: '單手劍', effect: '猛擊傷害 +75%' },
  { weapon: '雙手劍', effect: '重擊傷害 +150%' },
  { weapon: '單手斧', effect: '風車傷害 +100%' },
  { weapon: '雙手斧', effect: '重擊傷害 +150%' },
  { weapon: '單手鈍器', effect: '猛擊傷害 +75%' },
  { weapon: '雙手鈍器', effect: '重擊傷害 +150%' },
  { weapon: '騎槍', effect: '騎槍衝擊傷害 +50%' },
  { weapon: '擲矛器', effect: '每接近最大射程 1m，冷卻時間減少 5%（最低 1 秒）' },
  { weapon: '拳套', effect: '武鬥術技能傷害 +7.5%' },
  { weapon: '弓', effect: '穿心箭傷害 +150%' },
  { weapon: '弩', effect: '穿心箭傷害 +150%' },
  { weapon: '單手魔杖', effect: '魔法技能傷害 +7%（與秘法連結等級獎勵合算）' },
  { weapon: '集魔杖', effect: '魔法技能傷害 +7%（與秘法連結等級獎勵合算）' },
  { weapon: '鋼瓶', effect: '鍊金技能傷害 +6%' },
  { weapon: '手把', effect: '第 7 幕：狂亂疾走傷害 +350%' },
  { weapon: '雙槍', effect: '彈雨單發傷害倍率 +30%' },
  { weapon: '手裏劍', effect: '手裏劍爆破術傷害 +100%' },
  { weapon: '鎖鏈鏈刃', effect: '鎖鏈技能傷害 +5%' },
  { weapon: '鐮刀', effect: '星界突破傷害 +300%' },
  { weapon: '治療魔杖', effect: '治療效率 +25%' },
];

export const darkErgCrystalSources: DarkErgCrystalSource[] = [
  { label: '副本固定獎勵', value: '100 顆' },
  { label: '團隊 Roll 箱', value: '300 / 500 顆' },
  { label: '保底商店', value: '7 保底點數 → 100 顆' },
];