'use client';

import React, { useState } from 'react';
import {
  MapPin,
  Building,
  Navigation,
  Clock,
  Phone,
  AlertCircle,
  Car,
  Compass,
  ArrowRight,
  ArrowLeft,
} from 'lucide-react';
import { Language } from '../lib/types';
import { HOSPITAL_INFO } from '../lib/data';

interface CampusGuideProps {
  lang: Language;
}

export const CampusGuide: React.FC<CampusGuideProps> = ({ lang }) => {
  const isFa = lang === 'fa';
  const [activeZone, setActiveZone] = useState<number>(0);

  const zones = [
    {
      title: { fa: 'ورودی ۱: اورژانس، تروما و بالگرد امداد', en: 'Gate 1: Acute Emergency & Helipad' },
      badge: { fa: 'ورودی ۲۴ ساعته اختصاصی آمبولانس', en: '24/7 Dedicated Ambulance Access' },
      description: {
        fa: 'دسترسی مستقیم از بزرگراه شهید همت، رمپ ویژه خودروهای امدادی، اتاق‌های احیای قلبی ریوی (CPR) و تریاژ فوری سطوح ۱ تا ۵.',
        en: 'Direct highway egress, emergency ambulance ramp, immediate resuscitation suites, and 5-level Manchester triage.',
      },
      contacts: 'داخلی: ۱۰۱ و ۱۰۲ (تلفن مستقیم: ۱۵۹۰)',
      parking: { fa: 'توقفگاه اضطراری جلوی درب اورژانس', en: 'Emergency Drop-off Bay' },
    },
    {
      title: { fa: 'ورودی ۲: برج کلینیک‌های تخصصی و فوق‌تخصصی', en: 'Gate 2: Outpatient Specialty Towers' },
      badge: { fa: 'پذیرش مراجعین سرپایی (۸ الی ۲۰)', en: 'Outpatient Consultations (08:00 - 20:00)' },
      description: {
        fa: 'ورودی اصلی خیابان سلامت، باجه‌های پذیرش هوشمند، کلینیک‌های قلب، مغز و اعصاب، انکولوژی، ارتوپدی و داروخانه شبانه‌روزی مرکزی.',
        en: 'Main avenue concourse, self-service check-in kiosks, heart and neuro outpatient suites, and 24-hour central pharmacy.',
      },
      contacts: 'داخلی: ۲۱۰ الی ۲۱۵',
      parking: { fa: 'ورودی پارکینگ طبقاتی P1 و P2 (ظرفیت ۸۰۰ خودرو)', en: 'Multi-Level Covered Garage P1-P2 (800 Spots)' },
    },
    {
      title: { fa: 'ورودی ۳: مرکز جامع تصویربرداری و آزمایشگاه', en: 'Gate 3: Advanced Imaging & Diagnostics' },
      badge: { fa: 'ام‌آرآی ۳T، سی‌تی اسکن و پت‌اسکن', en: 'MRI 3T, Dual-Source CT & PET-CT' },
      description: {
        fa: 'پردیس فارابی (طبقه همکف و منفی یک)، پذیرش سریع نمونه‌گیری خون و بیوشیمی، تحویل آنلاین نتایج و سیستم آرشیو ابری PACS.',
        en: 'Farabi Diagnostic Wing, automated high-throughput phlebotomy, online report portal, and real-time DICOM PACS server.',
      },
      contacts: 'داخلی: ۳۴۰ و ۳۴۱',
      parking: { fa: 'پارکینگ VIP مراجعین تصویربرداری در طبقه منفی ۱', en: 'Diagnostic VIP Valet Bay at Level B1' },
    },
    {
      title: { fa: 'ورودی ۴: بخش‌های بستری و سوئیت‌های جراحی VIP', en: 'Gate 4: Inpatient Towers & Family Suites' },
      badge: { fa: 'پذیرش بستری الکتیو و ترخیص', en: 'Elective Inpatient Admissions' },
      description: {
        fa: 'لابی هتلینگ ۵ ستاره، سالن انتظار همراهان، بخش‌های جراحی قلب، پیوند اعضا، مراقبت‌های ویژه ICU و بخش مادر و نوزاد (LDR).',
        en: '5-star inpatient lobby, family hospitality lounge, surgical recovery, transplant units, and private maternal birth suites.',
      },
      contacts: 'داخلی: ۴۰۰ الی ۴۰۵',
      parking: { fa: 'پارکینگ همراهان بیمار با امکان شارژ خودرو برقی', en: 'Dedicated Family Inpatient Parking' },
    },
  ];

  return (
    <section id="campus" className="py-16 lg:py-24 bg-white border-b border-slate-200/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-wider text-teal-800 bg-teal-100/80 px-2.5 py-1 rounded-md inline-block mb-2">
            {isFa ? 'راهنمای موقعیت مکانی و تردد' : 'Wayfinding & Campus Navigation'}
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 tracking-tight mb-3">
            {isFa ? 'مسیریاب و ورودی‌های پردیس درمانی ابن‌سینا' : 'Hospital Campus Gates & Floor Guide'}
          </h2>
          <p className="text-sm text-slate-600">
            {isFa
              ? 'تفکیک هوشمند مسیرهای ترافیکی اورژانس از کلینیک‌های سرپایی و بستری جهت تردد سریع و بدون اتلاف وقت.'
              : 'Separate dedicated traffic routes for acute emergency ambulances, outpatients, and elective hospital stays.'}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Zone Switcher */}
          <div className="lg:col-span-5 space-y-3">
            {zones.map((zone, idx) => {
              const isActive = activeZone === idx;
              return (
                <div
                  key={idx}
                  onClick={() => setActiveZone(idx)}
                  className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                    isActive
                      ? 'bg-teal-700 text-white border-teal-700 shadow-md shadow-teal-700/20'
                      : 'bg-slate-50 hover:bg-slate-100 text-slate-800 border-slate-200'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <h3 className={`text-sm font-bold ${isActive ? 'text-white' : 'text-slate-900'}`}>
                      {zone.title[lang]}
                    </h3>
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        isActive ? 'bg-teal-500 text-slate-950' : 'bg-slate-200 text-slate-700'
                      }`}
                    >
                      {idx === 0 ? '۲۴/۷' : `Gate 0${idx + 1}`}
                    </span>
                  </div>
                  <p className={`text-xs ${isActive ? 'text-teal-100' : 'text-slate-500'} line-clamp-1`}>
                    {zone.description[lang]}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Right Active Zone Interactive Display */}
          <div className="lg:col-span-7">
            <div className="bg-slate-900 text-white rounded-3xl p-7 lg:p-8 shadow-xl relative overflow-hidden border border-slate-800">
              <div className="flex items-center justify-between gap-3 mb-4">
                <span className="bg-teal-500/20 text-teal-300 border border-teal-500/30 text-xs font-semibold px-3 py-1 rounded-full">
                  {zones[activeZone].badge[lang]}
                </span>
                <span className="text-xs text-slate-400 flex items-center gap-1 font-mono">
                  <Compass className="w-4 h-4 text-teal-400" />
                  Zone 0{activeZone + 1}
                </span>
              </div>

              <h4 className="text-xl sm:text-2xl font-black text-white mb-3">
                {zones[activeZone].title[lang]}
              </h4>

              <p className="text-slate-300 text-sm leading-relaxed mb-6">
                {zones[activeZone].description[lang]}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-slate-800 text-xs">
                <div className="flex items-start gap-2.5 bg-white/5 p-3.5 rounded-xl border border-white/10">
                  <Phone className="w-4 h-4 text-teal-400 shrink-0 mt-0.5" />
                  <div>
                    <div className="font-bold text-slate-200 mb-0.5">{isFa ? 'تلفن پذیرش این بخش:' : 'Direct Extension:'}</div>
                    <div className="text-slate-400 font-mono">{zones[activeZone].contacts}</div>
                  </div>
                </div>

                <div className="flex items-start gap-2.5 bg-white/5 p-3.5 rounded-xl border border-white/10">
                  <Car className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
                  <div>
                    <div className="font-bold text-slate-200 mb-0.5">{isFa ? 'راهنمای پارکینگ مراجعین:' : 'Parking & Access:'}</div>
                    <div className="text-slate-400">{zones[activeZone].parking[lang]}</div>
                  </div>
                </div>
              </div>

              <div className="mt-6 flex items-center justify-between text-xs text-slate-400">
                <span className="flex items-center gap-1">
                  <MapPin className="w-4 h-4 text-teal-400" />
                  {HOSPITAL_INFO.address[lang]}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
