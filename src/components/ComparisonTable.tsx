import { X as XIcon, Check } from 'lucide-react';

export default function ComparisonTable() {
  return (
    <div className="clay-card overflow-hidden">
      <div className="bg-slate-50 px-5 py-3 border-b-2 border-slate-100">
        <h3 className="font-extrabold text-slate-700 text-center text-sm">So sánh cách học</h3>
      </div>
      <div className="p-4">
        <div className="grid grid-cols-2 gap-3 text-sm">

          {/* Old Way */}
          <div className="space-y-2">
            <h4 className="font-bold text-slate-500 text-center text-[11px] uppercase tracking-wider mb-2">Gia Sư 👨‍🏫</h4>
            {['Tốn thời gian', 'Chi phí cao', 'Phụ thuộc lịch'].map((item) => (
              <div key={item} className="flex items-center gap-2 bg-red-50 p-2.5 rounded-xl border-2 border-red-100 text-red-600"
                style={{ boxShadow: '3px 3px 6px rgba(239,68,68,0.06)' }}>
                <XIcon size={14} strokeWidth={3} className="text-red-400 flex-shrink-0" />
                <span className="text-xs font-bold">{item}</span>
              </div>
            ))}
          </div>

          {/* New Way */}
          <div className="space-y-2">
            <h4 className="font-bold text-blue-500 text-center text-[11px] uppercase tracking-wider mb-2">AI Trợ Lý 🤖</h4>
            {['Nhanh chóng', 'Miễn phí 100%', 'Học 24/7'].map((item) => (
              <div key={item} className="flex items-center gap-2 bg-emerald-50 p-2.5 rounded-xl border-2 border-emerald-100 text-emerald-600"
                style={{ boxShadow: '3px 3px 6px rgba(16,185,129,0.06)' }}>
                <Check size={14} strokeWidth={3} className="text-emerald-400 flex-shrink-0" />
                <span className="text-xs font-bold">{item}</span>
              </div>
            ))}
          </div>

        </div>
      </div>
    </div>
  );
}
