import { useState } from 'react';
import Header from '@/components/feature/Header';
import ExpCalculator from '@/pages/dark-erg/components/ExpCalculator';
import ExpTable from '@/pages/dark-erg/components/ExpTable';
import WeaponEffectTable from '@/pages/dark-erg/components/WeaponEffectTable';
import {
  darkErgMaxLevel,
  darkErgTotalExp,
  darkErgCrystalSources,
} from '@/mocks/dark-erg';

export default function DarkErg() {
  const [currentLevel, setCurrentLevel] = useState(1);
  const [targetLevel, setTargetLevel] = useState(50);
  const [crystalPerExp, setCrystalPerExp] = useState(100);
  const [currentExp, setCurrentExp] = useState(0);

  return (
    <div className="min-h-screen bg-background-50">
      <Header />

      <div className="max-w-5xl mx-auto px-4 md:px-6 pt-8 pb-4">
        <h1 className="text-2xl md:text-3xl font-bold text-foreground-950 mb-2">
          黑暗聚能
        </h1>
        <p className="text-sm text-foreground-500">
          黑暗聚能強化 — 等級經驗一覽與結晶需求試算
        </p>
      </div>

      <main className="max-w-5xl mx-auto px-4 md:px-6 pb-10 space-y-5">
        {/* 說明 */}
        <div className="bg-background-100 rounded-xl border border-background-200 p-4 flex items-start gap-3">
          <div className="w-9 h-9 rounded-lg bg-accent-500/15 text-accent-400 flex items-center justify-center shrink-0">
            <i className="ri-moon-clear-line"></i>
          </div>
          <p className="text-sm text-foreground-600 leading-relaxed">
            黑暗聚能是完成 <strong className="text-foreground-950">S50 聚能強化</strong> 後，
            可在武器上追加的強化系統，最高 <strong className="text-foreground-950">50 級</strong>。
            強化需消耗「黑暗聚能結晶」，強化後該裝備會變為
            <strong className="text-foreground-950">專用裝備</strong>。
            下方試算器可快速算出還需要多少經驗，一覽表則列出每一級的需求。
          </p>
        </div>

        {/* 重點數據 */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="bg-background-100 rounded-xl border border-background-200 p-4">
            <div className="w-8 h-8 rounded-lg bg-primary-500/15 text-primary-400 flex items-center justify-center mb-2">
              <i className="ri-trophy-line text-sm"></i>
            </div>
            <div className="text-xl font-bold text-foreground-950">
              {darkErgMaxLevel} 級
            </div>
            <div className="text-xs text-foreground-500 mt-0.5">最高強化等級</div>
          </div>
          <div className="bg-background-100 rounded-xl border border-background-200 p-4">
            <div className="w-8 h-8 rounded-lg bg-accent-500/15 text-accent-400 flex items-center justify-center mb-2">
              <i className="ri-database-2-line text-sm"></i>
            </div>
            <div className="text-xl font-bold text-foreground-950 tabular-nums">
              {darkErgTotalExp.toLocaleString()}
            </div>
            <div className="text-xs text-foreground-500 mt-0.5">全滿所需總經驗</div>
          </div>
          <div className="bg-background-100 rounded-xl border border-background-200 p-4">
            <div className="w-8 h-8 rounded-lg bg-secondary-500/15 text-secondary-500 flex items-center justify-center mb-2">
              <i className="ri-lock-line text-sm"></i>
            </div>
            <div className="text-xl font-bold text-foreground-950">專用裝備</div>
            <div className="text-xs text-foreground-500 mt-0.5">強化後狀態</div>
          </div>
        </div>

        {/* 計算機 */}
        <ExpCalculator
          currentLevel={currentLevel}
          targetLevel={targetLevel}
          currentExp={currentExp}
          crystalPerExp={crystalPerExp}
          onChangeCurrent={setCurrentLevel}
          onChangeTarget={setTargetLevel}
          onChangeCurrentExp={setCurrentExp}
          onChangeCrystalPerExp={setCrystalPerExp}
        />

        {/* 經驗一覽表 */}
        <ExpTable currentLevel={currentLevel} targetLevel={targetLevel} />

        {/* 武器效果 + 取得途徑 */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          <div className="lg:col-span-2">
            <WeaponEffectTable />
          </div>
          <div className="bg-background-100 rounded-xl border border-background-200 overflow-hidden h-fit">
            <div className="px-4 py-3 border-b border-background-200">
              <h2 className="text-sm font-semibold text-foreground-950 flex items-center gap-2">
                <i className="ri-gift-line text-primary-400"></i>
                黑暗聚能結晶取得
              </h2>
            </div>
            <div className="divide-y divide-background-200/60">
              {darkErgCrystalSources.map((source) => (
                <div key={source.label} className="px-4 py-3">
                  <div className="text-xs text-foreground-500 mb-1">{source.label}</div>
                  <div className="text-sm font-semibold text-foreground-800">{source.value}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

      <footer className="max-w-5xl mx-auto px-4 md:px-6 pb-6 text-center text-xs text-foreground-500 space-y-0.5">
        <p>© 2026 PY之神 - 黑暗聚能</p>
        <p>製作者 - 貓科絕對時間</p>
      </footer>
    </div>
  );
}