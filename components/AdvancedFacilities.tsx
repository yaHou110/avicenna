'use client';

import React from 'react';
import Image from 'next/image';
import { Cpu, CheckCircle2, ShieldAlert, Building2, Layers } from 'lucide-react';
import { Language } from '../lib/types';
import { MEDICAL_EQUIPMENT } from '../lib/data';

interface AdvancedFacilitiesProps {
  lang: Language;
}

export const AdvancedFacilities: React.FC<AdvancedFacilitiesProps> = ({ lang }) => {
  const isFa = lang === 'fa';

  return (
    <section id="facilities" className="py-16 lg:py-24 bg-white border-b border-slate-200/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-wider text-sky-800 bg-sky-100/80 px-2.5 py-1 rounded-md inline-block mb-2">
            {isFa ? 'زیرساخت‌های تشخیصی و درمانی' : 'Next-Gen Diagnostic Infrastructure'}
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 tracking-tight mb-3">
            {isFa ? 'فناوری‌های پیشرفته تصویربرداری و جراحی' : 'Advanced Medical Technology & Robotics'}
          </h2>
          <p className="text-sm text-slate-600">
            {isFa
              ? 'تجهیز اتاق‌های عمل و تصویربرداری به پیشرفته‌ترین سامانه‌های تشخیصی و روباتیک دارای تاییدیه FDA و CE اروپا.'
              : 'Equipped with FDA-cleared and CE-certified robotic suites, molecular PET-CT, and high-gradient 3T MRI systems.'}
          </p>
        </div>

        {/* Equipment Cards Bento Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {MEDICAL_EQUIPMENT.map((item) => (
            <div
              key={item.id}
              className="bg-slate-50 rounded-3xl border border-slate-200/80 overflow-hidden flex flex-col justify-between hover:shadow-lg transition-all"
            >
              <div>
                {/* Photo with Overlay Manufacturer Tag */}
                <div className="relative h-52 w-full overflow-hidden">
                  <Image
                    src={item.image}
                    alt={item.name[lang]}
                    fill
                    unoptimized
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-3 end-3 bg-slate-900/80 backdrop-blur-md text-white text-[11px] font-mono font-semibold px-2.5 py-1 rounded-lg z-10">
                    {item.manufacturer}
                  </div>
                </div>

                <div className="p-6">
                  <div className="text-[11px] font-bold text-teal-700 uppercase tracking-wider mb-1 font-mono">
                    {item.model}
                  </div>
                  <h3 className="text-lg font-black text-slate-900 mb-3 leading-snug">
                    {item.name[lang]}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed mb-4">
                    {item.description[lang]}
                  </p>

                  <div className="space-y-2 border-t border-slate-200/70 pt-3">
                    <div className="text-[11px] font-bold text-slate-700">
                      {isFa ? 'مزایای بالینی ویژه:' : 'Clinical Advantages:'}
                    </div>
                    {item.capabilities[lang].map((cap, i) => (
                      <div key={i} className="flex items-start gap-2 text-xs text-slate-600">
                        <CheckCircle2 className="w-3.5 h-3.5 text-teal-600 shrink-0 mt-0.5" />
                        <span>{cap}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="p-6 pt-0">
                <div className="w-full bg-teal-50 text-teal-800 text-xs font-semibold py-2 rounded-xl text-center border border-teal-200/60">
                  {isFa ? 'فعال و تحت کالیبراسیون مداوم' : 'Active & Certified'}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
