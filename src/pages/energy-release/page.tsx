import { useState, useMemo } from 'react';
import {
  weaponTypes,
  type WeaponData,
  type RankData,
  type StageData,
} from '@/mocks/energy-release';
import { getItemImageUrl } from '@/mocks/energy-release-images';
import Header from '@/components/feature/Header';

export default function EnergyRelease() {
  const [selectedWeapon, setSelectedWeapon] = useState<string>(weaponTypes[0].id);
  const [selectedRank, setSelectedRank] = useState<'S' | 'A' | 'B'>('S');
  const [expandedStages, setExpandedStages] = useState<Set<number>>(
    new Set([1, 2, 3, 4, 5, 6, 7, 8, 9]),
  );

  const currentWeapon = useMemo<WeaponData | undefined>(
    () => weaponTypes.find((w) => w.id === selectedWeapon),
    [selectedWeapon],
  );

  const currentRank = useMemo<RankData | undefined>(
    () => currentWeapon?.ranks.find((r) => r.rank === selectedRank),
    [currentWeapon, selectedRank],
  );

  const toggleStage = (stage: number) => {
    setExpandedStages((prev) => {
      const next = new Set(prev);
      if (next.has(stage)) {
        next.delete(stage);
      } else {
        next.add(stage);
      }
      return next;
    });
  };

  const expandAll = () =>
    setExpandedStages(new Set([1, 2, 3, 4, 5, 6, 7, 8, 9]));
  const collapseAll = () => setExpandedStages(new Set());

  const rankLabel = (rank: 'S' | 'A' | 'B') => {
    if (rank === 'S') return 'S級';
    if (rank === 'A') return 'A級';
    return 'B級';
  };

  const rankColor = (rank: 'S' | 'A' | 'B') => {
    if (rank === 'S') return 'text-amber-500';
    if (rank === 'A') return 'text-accent-500';
    return 'text-secondary-500';
  };

  const rankBg = (rank: 'S' | 'A' | 'B') => {
    if (rank === 'S') return 'bg-amber-500';
    if (rank === 'A') return 'bg-accent-500';
    return 'bg-secondary-500';
  };

  const allExpanded = expandedStages.size === 9;

  return (
    <div className="min-h-screen bg-background-50">
      <Header />

      <div className="max-w-5xl mx-auto px-4 md:px-6 pt-8 pb-4">
        <h1 className="text-2xl md:text-3xl font-bold text-foreground-950 mb-2">
          聚能開放
        </h1>
        <p className="text-sm text-foreground-500">
          各武器類型階段開放材料一覽
        </p>
      </div>

      <main className="max-w-5xl mx-auto px-4 md:px-6 pb-10 space-y-5">
        {/* Weapon selector */}
        <div className="bg-background-100 rounded-xl border border-background-200 p-4">
          <div className="text-xs font-medium text-foreground-500 mb-3 uppercase tracking-wide">
            武器類型
          </div>
          <div className="flex flex-wrap gap-2">
            {weaponTypes.map((w) => (
              <button
                key={w.id}
                type="button"
                onClick={() => setSelectedWeapon(w.id)}
                className={`px-3 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition ${
                  selectedWeapon === w.id
                    ? 'bg-primary-500 text-white'
                    : 'bg-background-200 text-foreground-600 hover:bg-background-300 hover:text-foreground-950'
                }`}
              >
                {w.name}
              </button>
            ))}
          </div>
        </div>

        {/* Rank selector */}
        <div className="bg-background-100 rounded-xl border border-background-200 p-4">
          <div className="text-xs font-medium text-foreground-500 mb-3 uppercase tracking-wide">
            開放階級
          </div>
          <div className="flex gap-2">
            {(['S', 'A', 'B'] as const).map((rank) => (
              <button
                key={rank}
                type="button"
                onClick={() => setSelectedRank(rank)}
                className={`px-4 py-2 rounded-full text-sm font-bold whitespace-nowrap transition ${
                  selectedRank === rank
                    ? `${rankBg(rank)} text-white`
                    : 'bg-background-200 text-foreground-600 hover:bg-background-300 hover:text-foreground-950'
                }`}
              >
                {rankLabel(rank)}
              </button>
            ))}
          </div>
        </div>

        {/* Current selection header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <h2 className="text-xl font-bold text-foreground-950">
              {currentWeapon?.name}
              <span className={`ml-2 text-lg ${rankColor(selectedRank)}`}>
                {rankLabel(selectedRank)}
              </span>
            </h2>
            <span className="text-xs text-foreground-400 bg-background-200 px-2 py-1 rounded-full">
              共 {currentRank?.stages.length ?? 0} 階段
            </span>
          </div>
          <button
            type="button"
            onClick={allExpanded ? collapseAll : expandAll}
            className="text-xs text-foreground-500 hover:text-foreground-300 underline underline-offset-2 transition"
          >
            {allExpanded ? '全部收合' : '全部展開'}
          </button>
        </div>

        {/* Stages */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {currentRank?.stages.map((stage) => (
            <StageCard
              key={stage.stage}
              stage={stage}
              rank={selectedRank}
              expanded={expandedStages.has(stage.stage)}
              onToggle={() => toggleStage(stage.stage)}
            />
          ))}
        </div>
      </main>

      <footer className="max-w-5xl mx-auto px-4 md:px-6 pb-6 text-center text-xs text-foreground-500 space-y-0.5">
        <p>© 2026 PY之神 - 聚能開放</p>
        <p>製作者 - 貓科絕對時間</p>
      </footer>
    </div>
  );
}

function StageCard({
  stage,
  rank,
  expanded,
  onToggle,
}: {
  stage: StageData;
  rank: 'S' | 'A' | 'B';
  expanded: boolean;
  onToggle: () => void;
}) {
  const rankBadgeColor = () => {
    if (rank === 'S') return 'bg-amber-500/10 text-amber-600 border-amber-500/30';
    if (rank === 'A') return 'bg-accent-500/10 text-accent-600 border-accent-500/30';
    return 'bg-secondary-500/10 text-secondary-600 border-secondary-500/30';
  };

  return (
    <div
      className={`rounded-xl overflow-hidden transition-colors ${
        expanded
          ? 'bg-background-100 border border-background-200'
          : 'bg-transparent border border-background-100/30'
      }`}
    >
      <button
        type="button"
        onClick={onToggle}
        className={`w-full flex items-center justify-between px-4 py-3 transition ${
          expanded ? '' : 'hover:bg-background-100/50'
        }`}
      >
        <div className="flex items-center gap-2.5">
          <span
            className={`text-xs font-bold px-2 py-0.5 rounded border ${rankBadgeColor()}`}
          >
            {rank}級
          </span>
          <span className="font-bold text-foreground-950">
            階段 {stage.stage}
          </span>
          <span className="text-xs text-foreground-400">
            ( LV. {stage.stage * 5} → LV. {stage.stage * 5 + 1} )
          </span>
        </div>
        <i
          className={`ri-arrow-down-s-line text-foreground-400 transition-transform ${
            expanded ? 'rotate-180' : ''
          }`}
        ></i>
      </button>

      {expanded && (
        <div className="px-4 pb-4 space-y-2">
          {stage.materials.map((mat, idx) => {
            const imgUrl = getItemImageUrl(mat);
            const isConsumable = idx < 3; // M1~M3 失敗會消耗
            return (
              <div
                key={idx}
                className={`flex items-center gap-2 text-xs bg-background-200/80 rounded-lg px-3 py-2.5 ${
                  isConsumable
                    ? 'text-foreground-800'
                    : 'text-foreground-800 border border-emerald-400/70 bg-emerald-400/10'
                }`}
              >
                <span className="text-foreground-500 font-mono text-xs shrink-0 w-5">
                  M{idx + 1}
                </span>
                {imgUrl && (
                  <img
                    src={imgUrl}
                    alt=""
                    className="w-6 h-6 object-contain shrink-0"
                    loading="lazy"
                  />
                )}
                <span className="leading-relaxed font-medium">{mat}</span>
                {isConsumable && (
                  <span
                    className="ml-auto shrink-0 w-5 h-5 flex items-center justify-center rounded-full bg-red-500 text-white text-xs font-bold shadow-sm"
                    title="開放失敗會消耗"
                  >
                    !
                  </span>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}