'use client';

import React, { useState } from 'react';
import { BookOpen, User, CheckCircle2, Clock, ArrowRight, ArrowLeft } from 'lucide-react';
import { Language, HealthArticle } from '../lib/types';
import { HEALTH_ARTICLES } from '../lib/data';

interface HealthArticlesSectionProps {
  lang: Language;
}

export const HealthArticlesSection: React.FC<HealthArticlesSectionProps> = ({ lang }) => {
  const isFa = lang === 'fa';
  const ArrowIcon = isFa ? ArrowLeft : ArrowRight;
  const [selectedArticle, setSelectedArticle] = useState<HealthArticle | null>(null);

  return (
    <section id="articles" className="py-16 lg:py-24 bg-white border-b border-slate-200/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-wider text-teal-800 bg-teal-100/80 px-2.5 py-1 rounded-md inline-block mb-2">
            {isFa ? 'آموزش به بیمار و ارتقای سلامت' : 'Patient Education & Wellness'}
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 tracking-tight mb-3">
            {isFa ? 'دانشنامه و مقالات بالینی تاییدشده' : 'Verified Health Library'}
          </h2>
          <p className="text-sm text-slate-600">
            {isFa
              ? 'محتوای علمی نگارش‌شده توسط تیم درمان و داوری‌شده توسط اساتید بالینی منطبق با پروتکل‌های به‌روز پزشکی.'
              : 'Medical guides authored by clinical practitioners and peer-reviewed by departmental faculty.'}
          </p>
        </div>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {HEALTH_ARTICLES.filter((a) => a.status === 'PUBLISHED').map((art) => (
            <div
              key={art.id}
              className="bg-slate-50 rounded-3xl border border-slate-200/80 overflow-hidden flex flex-col justify-between hover:shadow-md transition-all p-6"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="text-[11px] font-bold text-teal-800 bg-teal-100/70 px-2.5 py-0.5 rounded-md">
                    {art.category[lang]}
                  </span>
                  <span className="text-[11px] text-slate-400 flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{art.readTimeMin} {isFa ? 'دقیقه مطالعه' : 'min read'}</span>
                  </span>
                </div>

                <h3 className="text-base font-black text-slate-900 mb-2.5 leading-snug">
                  {art.title[lang]}
                </h3>

                <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed mb-4">
                  {art.excerpt[lang]}
                </p>

                <div className="pt-3 border-t border-slate-200/60 text-[11px] text-slate-500 space-y-1">
                  <div className="flex items-center gap-1.5">
                    <User className="w-3 h-3 text-slate-400" />
                    <span>{isFa ? 'نویسنده:' : 'Author:'} {art.author[lang]}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-teal-700 font-medium">
                    <CheckCircle2 className="w-3 h-3" />
                    <span>{art.reviewer[lang]}</span>
                  </div>
                </div>
              </div>

              <div className="pt-4 mt-2">
                <button
                  onClick={() => setSelectedArticle(art)}
                  className="w-full py-2.5 bg-white hover:bg-teal-50 text-teal-800 border border-slate-200 hover:border-teal-300 text-xs font-bold rounded-xl transition-colors flex items-center justify-center gap-1.5"
                >
                  <span>{isFa ? 'مطالعه کامل راهنما' : 'Read Full Guide'}</span>
                  <ArrowIcon className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Article Detail Modal */}
      {selectedArticle && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[85vh]">
            <div className="px-6 py-4 bg-slate-900 text-white flex items-center justify-between">
              <span className="text-xs font-bold text-teal-300">
                {selectedArticle.category[lang]}
              </span>
              <button
                onClick={() => setSelectedArticle(null)}
                className="text-slate-400 hover:text-white"
              >
                ✕
              </button>
            </div>
            <div className="p-6 overflow-y-auto space-y-4">
              <h3 className="text-xl font-black text-slate-900">
                {selectedArticle.title[lang]}
              </h3>
              <div className="text-xs text-teal-800 bg-teal-50 p-2.5 rounded-xl border border-teal-200 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0" />
                <span>{selectedArticle.reviewer[lang]}</span>
              </div>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed whitespace-pre-line">
                {selectedArticle.excerpt[lang]}
              </p>
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 text-xs text-slate-600 leading-relaxed">
                {isFa
                  ? 'توجه بالینی: اطلاعات مندرج در این دانشنامه جنبه آگاهی‌بخشی دارد و جایگزین ویزیت مستقیم و معاینه پزشک معالج در درمانگاه‌های تخصصی نیست. در صورت بروز هرگونه علامت حاد با خط اورژانس ۱۵۹۰ تماس حاصل فرمایید.'
                  : 'Clinical Notice: This article is for informational purposes and does not substitute direct consultation with an attending specialist.'}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
