export default function ComparisonTable() {
  return (
    <div className="mt-12 bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
      <div className="bg-slate-50 px-6 py-4 border-b border-slate-100">
        <h3 className="font-bold text-slate-700 text-center">So sánh cách học</h3>
      </div>
      <div className="p-4">
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="space-y-4">
            <h4 className="font-bold text-slate-500 text-center uppercase text-xs tracking-wider mb-2">Gia Sư (Cách Cũ)</h4>
            <div className="bg-red-50 p-3 rounded-lg text-red-700 text-center">
              Tốn thời gian, chi phí cao
            </div>
            <div className="bg-red-50 p-3 rounded-lg text-red-700 text-center">
              Phụ thuộc lịch hẹn
            </div>
            <div className="bg-red-50 p-3 rounded-lg text-red-700 text-center">
              Đôi khi khó hiểu
            </div>
          </div>
          
          <div className="space-y-4">
            <h4 className="font-bold text-blue-500 text-center uppercase text-xs tracking-wider mb-2">Trợ Lý AI (Cách Mới)</h4>
            <div className="bg-green-50 p-3 rounded-lg text-green-700 text-center font-medium shadow-sm">
              Nhanh chóng, miễn phí
            </div>
            <div className="bg-green-50 p-3 rounded-lg text-green-700 text-center font-medium shadow-sm">
              Học 24/7 mọi lúc
            </div>
            <div className="bg-green-50 p-3 rounded-lg text-green-700 text-center font-medium shadow-sm">
              Giải thích trực quan
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
