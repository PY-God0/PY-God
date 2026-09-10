import { useMemo } from 'react';
import { darkErgExpTable, darkErgTotalExp } from '@/mocks/dark-erg';

interface ExpTableProps {
  currentLevel: number;
  targetLevel: number;
}

export default function ExpTable({ currentLevel, targetLevel }: ExpTableProps) {
  const rows = useMemo(() => {
    let cumulative = 0;
    return darkErgExpTable.map((row) => {
      cumulative += row.exp;
      return { ...row, cumulative };
    });
  }, []);

  return (
    <section className="bg-background-100 rounded-xl border border-background-200 overflow-hidden">
      <div className="px-4 py-3 border-b border-background-200 flex items-center justify-between gap-3 flex-wrap">
        <h2 className="text-sm font-semibold text-foreground-950 flex items-center gap-2">
          <i className="ri-table-line text-accent-400"></i>
          等級經驗一覽表
        </h2>
        <span className="text-[11px] text-foreground-500">共 {rows.length} 個階段</span>
      </div>

      <div className="max-h-[460px] overflow-y-auto no-scrollbar">
        <table className="w-full text-sm">
          <thead className="sticky top-0 z-10 bg-background-200 text-foreground-500">
            <tr>
              <th className="text-left font-medium text-xs px-4 py-2.5">階段</th>
              <th className="text-right font-medium text-xs px-4 py-2.5">單級經驗</th>
              <th className="text-right font-medium text-xs px-4 py-2.5">累計經驗</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => {
              const active = row.level >= currentLevel && row.level < targetLevel;
              const done = row.level < currentLevel;
              return (
                <tr
                  key={row.level}
                  className={`border-b border-background-200/60 transition-colors ${
                    active ? 'bg-primary-500/10' : 'hover:bg-background-200/40'
                  }`}
                >
                  <td className="px-4 py-2">
                    <span className="flex items-center gap-2">
                      {active && (
                        <span className="w-1.5 h-1.5 rounded-full bg-primary-500 shrink-0"></span>
                      )}
                      <span
                        className={`tabular-nums ${
                          done ? 'text-foreground-400' : 'text-foreground-800'
                        }`}
                      >
                        LV.{row.level} → {row.level + 1}
                      </span>
                    </span>
                  </td>
                  <td
                    className={`px-4 py-2 text-right tabular-nums ${
                      active ? 'text-primary-400 font-semibold' : done ? 'text-foreground-400' : 'text-foreground-700'
                    }`}
                  >
                    {row.exp.toLocaleString()}
                  </td>
                  <td
                    className={`px-4 py-2 text-right tabular-nums ${
                      done ? 'text-foreground-400' : 'text-foreground-500'
                    }`}
                  >
                    {row.cumulative.toLocaleString()}
                  </td>
                </tr>
              );
            })}
          </tbody>
          <tfoot>
            <tr className="bg-background-200/70 sticky bottom-0">
              <td className="px-4 py-2.5 font-semibold text-foreground-950">合計（LV.1 → 50）</td>
              <td className="px-4 py-2.5 text-right font-semibold text-foreground-950 tabular-nums">
                {darkErgTotalExp.toLocaleString()}
              </td>
              <td className="px-4 py-2.5 text-right font-semibold text-foreground-950 tabular-nums">
                {darkErgTotalExp.toLocaleString()}
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    </section>
  );
}