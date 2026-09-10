import { darkErgWeaponEffects } from '@/mocks/dark-erg';

export default function WeaponEffectTable() {
  return (
    <section className="bg-background-100 rounded-xl border border-background-200 overflow-hidden">
      <div className="px-4 py-3 border-b border-background-200">
        <h2 className="text-sm font-semibold text-foreground-950 flex items-center gap-2">
          <i className="ri-sword-line text-accent-400"></i>
          各武器強化效果（滿級 50）
        </h2>
      </div>
      <div className="divide-y divide-background-200/60">
        {darkErgWeaponEffects.map((item) => (
          <div key={item.weapon} className="flex items-start gap-3 px-4 py-2.5">
            <span className="w-20 md:w-24 shrink-0 text-sm font-medium text-foreground-800">
              {item.weapon}
            </span>
            <span className="text-sm text-foreground-600 leading-relaxed">{item.effect}</span>
          </div>
        ))}
      </div>
    </section>
  );
}