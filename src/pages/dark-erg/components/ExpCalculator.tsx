import { useMemo } from 'react';
import { darkErgMaxLevel } from '@/mocks/dark-erg';
import { expBetween, expForLevel } from '@/pages/dark-erg/utils';

interface ExpCalculatorProps {
  currentLevel: number;
  targetLevel: number;
  currentExp: number;
  crystalPerExp: number;
  onChangeCurrent: (value: number) => void;
  onChangeTarget: (value: number) => void;
  onChangeCurrentExp: (value: number) => void;
  onChangeCrystalPerExp: (value: number) => void;
}

interface LevelControlProps {
  label: string;
  value: number;
  min: number;
  max: number;
  accent: 'primary' | 'accent';
  onChange: (value: number) => void;
}

function LevelControl({ label, value, min, max, accent, onChange }: LevelControlProps) {
  const stepBtn =
    accent === 'primary'
      ? 'bg-primary-500 text-white hover:bg-primary-600'
      : 'bg-accent-500 text-white hover:bg-accent-600';
  const rangeAccent = accent === 'primary' ? 'accent-primary-500' : 'accent-accent-500';
  const valueColor = accent === 'primary' ? 'text-primary-400' : 'text-accent-400';

  return (
    <div className="bg-background-200/60 rounded-xl p-4">
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs font-medium text-foreground-500">{label}</span>
        <span className="text-[11px] text-foreground-400">
          LV.{min} ~ LV.{max}
        </span>
      </div>
      <div className="flex items-center justify-center gap-3">
        <button
          type="button"
          onClick={() => onChange(Math.max(min, value - 1))}
          className={`w-8 h-8 rounded-lg flex items-center justify-center transition ${stepBtn}`}
          aria-label={`${label} 減一`}
        >
          <i className="ri-subtract-line text-sm"></i>
        </button>
        <span className={`w-14 text-center text-3xl font-bold tabular-nums ${valueColor}`}>
          {value}
        </span>
        <button
          type="button"
          onClick={() => onChange(Math.min(max, value + 1))}
          className={`w-8 h-8 rounded-lg flex items-center justify-center transition ${stepBtn}`}
          aria-label={`${label} 加一`}
        >
          <i className="ri-add-line text-sm"></i>
        </button>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className={`mt-3 w-full cursor-pointer ${rangeAccent}`}
      />
    </div>
  );
}

export default function ExpCalculator({
  currentLevel,
  targetLevel,
  currentExp,
  crystalPerExp,
  onChangeCurrent,
  onChangeTarget,
  onChangeCurrentExp,
  onChangeCrystalPerExp,
}: ExpCalculatorProps) {
  const currentLevelExp = expForLevel(currentLevel);
  const effCurrentExp = Math.min(Math.max(currentExp, 0), currentLevelExp);
  const needExp = useMemo(
    () => Math.max(0, expBetween(currentLevel, targetLevel) - effCurrentExp),
    [currentLevel, targetLevel, effCurrentExp],
  );
  const valid = targetLevel > currentLevel;
  const crystals = crystalPerExp > 0 ? Math.ceil(needExp / crystalPerExp) : 0;
  const stageCount = Math.max(0, targetLevel - currentLevel);
  const pos = (level: number) => ((level - 1) / (darkErgMaxLevel - 1)) * 100;

  return (
    <section className="bg-background-100 rounded-xl border border-background-200 p-4 md:p-5">
      <div className="flex items-center justify-between gap-3 mb-4 flex-wrap">
        <h2 className="text-sm font-semibold text-foreground-950 flex items-center gap-2">
          <i className="ri-calculator-line text-primary-400"></i>
          升級試算
        </h2>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => {
              onChangeCurrent(1);
              onChangeTarget(darkErgMaxLevel);
              onChangeCurrentExp(0);
            }}
            className="text-[11px] px-2.5 py-1 rounded-full bg-background-200 text-foreground-600 hover:bg-background-300 transition whitespace-nowrap"
          >
            1 → 50 全滿
          </button>
          <button
            type="button"
            onClick={() => onChangeTarget(darkErgMaxLevel)}
            className="text-[11px] px-2.5 py-1 rounded-full bg-background-200 text-foreground-600 hover:bg-background-300 transition whitespace-nowrap"
          >
            升到 50 級
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-3 md:gap-4 items-center">
        <LevelControl
          label="目前等級"
          value={currentLevel}
          min={1}
          max={darkErgMaxLevel}
          accent="primary"
          onChange={onChangeCurrent}
        />
        <div className="flex items-center justify-center">
          <i className="ri-arrow-right-line text-xl text-foreground-400 hidden md:block"></i>
          <i className="ri-arrow-down-line text-xl text-foreground-400 md:hidden"></i>
        </div>
        <LevelControl
          label="目標等級"
          value={targetLevel}
          min={1}
          max={darkErgMaxLevel}
          accent="accent"
          onChange={onChangeTarget}
        />
      </div>

      {/* 目前經驗值 */}
      <div className="mt-3 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 bg-background-200/50 rounded-lg px-3 py-2.5">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-xs font-medium text-foreground-600">目前經驗值</span>
          <span className="text-[10px] text-foreground-400">
            LV.{currentLevel} 升滿需 {currentLevelExp.toLocaleString()} 經驗
          </span>
        </div>
        <div className="flex items-center gap-1.5">
          <input
            type="number"
            min={0}
            max={currentLevelExp}
            value={currentExp}
            onChange={(e) => {
              const v = Number(e.target.value) || 0;
              onChangeCurrentExp(Math.min(Math.max(v, 0), currentLevelExp));
            }}
            className="w-20 bg-background-300 border border-background-400 rounded-md px-2 py-1 text-xs text-right text-foreground-950 outline-none focus:border-primary-500 transition"
          />
          <span className="text-[11px] text-foreground-500">經驗</span>
        </div>
      </div>

      {/* 區間視覺化 */}
      <div className="mt-5">
        <div className="relative h-2 rounded-full bg-background-300">
          <div
            className="absolute h-full rounded-full bg-gradient-to-r from-primary-500 to-accent-500"
            style={{
              left: `${pos(currentLevel)}%`,
              width: `${Math.max(0, pos(targetLevel) - pos(currentLevel))}%`,
            }}
          ></div>
        </div>
        <div className="flex justify-between text-[10px] text-foreground-400 mt-1.5">
          <span>LV.1</span>
          <span>LV.{darkErgMaxLevel}</span>
        </div>
      </div>

      {/* 結果 */}
      <div className="mt-4 bg-primary-500/10 border border-primary-500/30 rounded-xl p-4">
        {valid ? (
          <>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <div className="text-xs text-foreground-500 mb-1">仍需要經驗值</div>
                <div className="text-2xl md:text-3xl font-bold text-primary-400 tabular-nums">
                  {needExp.toLocaleString()}
                </div>
              </div>
              <div className="text-right">
                <div className="text-xs text-foreground-500 mb-1">約需黑暗聚能結晶</div>
                <div className="flex items-center justify-end gap-2">
                  <span className="w-9 h-9 flex items-center justify-center shrink-0">
                    <img
                      src="https://mabires.pril.cc/invimage/cn/5100439/5100439.png"
                      alt="黑暗聚能結晶"
                      title="黑暗聚能結晶"
                      className="w-full h-full object-contain"
                    />
                  </span>
                  <div className="text-2xl md:text-3xl font-bold text-foreground-950 tabular-nums">
                    {crystals.toLocaleString()}
                    <span className="text-sm font-medium ml-0.5">顆</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="text-[11px] text-foreground-500 mt-2.5">
              從 LV.{currentLevel} 升到 LV.{targetLevel}，共 {stageCount} 個階段
            </div>
          </>
        ) : (
          <div className="flex items-center gap-2 text-sm text-foreground-600 py-1">
            <i className="ri-information-line text-accent-400"></i>
            目標等級需高於目前等級，才能計算所需經驗。
          </div>
        )}

        <div className="mt-3 flex items-center justify-between bg-background-200/50 rounded-lg px-3 py-2">
          <span className="text-[11px] text-foreground-500">每顆黑暗聚能結晶提供經驗</span>
          <div className="flex items-center gap-1.5">
            <input
              type="number"
              min={1}
              value={crystalPerExp}
              onChange={(e) => onChangeCrystalPerExp(Math.max(1, Number(e.target.value) || 1))}
              className="w-16 bg-background-300 border border-background-400 rounded-md px-2 py-1 text-xs text-right text-foreground-950 outline-none focus:border-primary-500 transition"
            />
            <span className="text-[11px] text-foreground-500">經驗</span>
          </div>
        </div>
      </div>
    </section>
  );
}