import { darkErgExpTable } from '@/mocks/dark-erg';

// 計算從 fromLevel 升到 toLevel 所需的總經驗值
export function expBetween(fromLevel: number, toLevel: number): number {
  if (toLevel <= fromLevel) return 0;
  return darkErgExpTable
    .filter((row) => row.level >= fromLevel && row.level < toLevel)
    .reduce((sum, row) => sum + row.exp, 0);
}

// 取得單一等級升到下一級所需的經驗值
export function expForLevel(level: number): number {
  const row = darkErgExpTable.find((r) => r.level === level);
  return row ? row.exp : 0;
}