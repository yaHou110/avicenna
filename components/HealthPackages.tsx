'use client';

import React from 'react';
import { ShieldCheck, Check, Clock, ArrowRight, ArrowLeft } from 'lucide-react';
import { Language, CheckupPackage } from '../lib/types';
import { CHECKUP_PACKAGES } from '../lib/data';

interface HealthPackagesProps {
  lang: Language;
  onBookPackage: (pkg: CheckupPackage) => void;
}

export const HealthPackages: React.FC<HealthPackagesProps> = ({
  lang,
  onBookPackage,
}) => {
  const isFa = lang === 'fa';
  const ArrowIcon = isFa ? ArrowLeft : ArrowRight;

  return (
    <section id="packages" className="py-16 lg:py-24 bg-slate-50 border-b border-slate-200/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-wider text-teal-800 bg-teal-100/80 px-2.5 py-1 rounded-md inline-block mb-2">
            {isFa ? 'طب پیشگیری و غربالگری دقیق' : 'Preventive Medicine & Longevity'}
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 tracking-tight mb-3">
            {isFa ? 'بسته‌های پایش سلامت و چک‌آپ دوره‌ای' : 'Executive Health Check-up Packages'}
          </h2>
          <p className="text-sm text-slate-600">
            {isFa
              ? 'غربالگری‌های متمرکز و یک‌روزه در سوئیت‌های اختصاصی، با حداقل زمان انتظار و تفسیر جامع توسط اساتید بالینی.'
              : 'One-day comprehensive profiling in private suites with minimal turnaround time and multidisciplinary review.'}
          </p>
        </div>

        {/* Packages Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {CHECKUP_PACKAGES.map((pkg, idx) => {
            const isFeatured = idx === 1; // Executive VIP package highlighted
            return (
              <div
                key={pkg.id}
                className={`rounded-3xl p-6 sm:p-7 flex flex-col justify-between transition-all relative ${
                  isFeatured
                    ? 'bg-gradient-to-b from-slate-900 to-teal-950 text-white shadow-xl ring-2 ring-teal-500/50'
                    : 'bg-white text-slate-900 border border-slate-200/90 shadow-xs hover:shadow-md'
                }`}
              >
                {/* Badge if present */}
                {pkg.badge && (
                  <div
                    className={`inline-block self-start text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full mb-3 ${
                      isFeatured
                        ? 'bg-teal-400 text-slate-950'
                        : 'bg-teal-50 text-teal-800 border border-teal-200'
                    }`}
                  >
                    {pkg.badge[lang]}
                  </div>
                )}

                <div>
                  <h3
                    className={`text-xl font-black mb-1 ${
                      isFeatured ? 'text-white' : 'text-slate-900'
                    }`}
                  >
                    {pkg.name[lang]}
                  </h3>

                  <div
                    className={`text-xs mb-3 font-semibold ${
                      isFeatured ? 'text-teal-300' : 'text-teal-700'
                    }`}
                  >
                    {pkg.targetAudience[lang]}
                  </div>

                  <p
                    className={`text-xs leading-relaxed mb-5 ${
                      isFeatured ? 'text-slate-300' : 'text-slate-600'
                    }`}
                  >
                    {pkg.description[lang]}
                  </p>

                  {/* Summary Bar */}
                  <div
                    className={`flex items-center justify-between text-xs p-3 rounded-xl mb-5 font-semibold ${
                      isFeatured ? 'bg-white/10 text-slate-200' : 'bg-slate-50 text-slate-700'
                    }`}
                  >
                    <span>{pkg.testsCount} {isFa ? 'پارامتر تشخیصی' : 'Screening Markers'}</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      {pkg.durationHours} {isFa ? 'ساعت' : 'Hours'}
                    </span>
                  </div>

                  {/* Itemized Tests List */}
                  <div className="space-y-2.5 mb-6">
                    {pkg.features[lang].map((f, i) => (
                      <div key={i} className="flex items-start gap-2 text-xs">
                        <Check
                          className={`w-4 h-4 shrink-0 mt-0.5 ${
                            isFeatured ? 'text-teal-400' : 'text-teal-600'
                          }`}
                        />
                        <span className={isFeatured ? 'text-slate-200' : 'text-slate-700'}>{f}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Price & Action */}
                <div
                  className={`pt-4 border-t ${
                    isFeatured ? 'border-white/10' : 'border-slate-100'
                  }`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className={`text-xs ${isFeatured ? 'text-slate-400' : 'text-slate-500'}`}>
                      {isFa ? 'تعرفه مصوب:' : 'Package Price:'}
                    </span>
                    <span
                      className={`text-base font-black ${
                        isFeatured ? 'text-teal-300' : 'text-teal-800'
                      }`}
                    >
                      {pkg.price[lang]}
                    </span>
                  </div>

                  <button
                    onClick={() => onBookPackage(pkg)}
                    className={`w-full py-3 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition-all ${
                      isFeatured
                        ? 'bg-teal-400 hover:bg-teal-300 text-slate-950 shadow-md shadow-teal-400/20'
                        : 'bg-teal-700 hover:bg-teal-800 text-white shadow-xs'
                    }`}
                  >
                    <span>{isFa ? 'رزرو این پکیج غربالگری' : 'Book Check-up'}</span>
                    <ArrowIcon className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
