'use client';

import React, { useState, useMemo } from 'react';
import {
  Search,
  Stethoscope,
  ShieldCheck,
  Calendar,
  Building,
  ArrowRight,
  ArrowLeft,
  Award,
  CheckCircle2,
  Users,
} from 'lucide-react';
import { Language, Doctor, Department, MedicalService } from '../lib/types';
import { DOCTORS, DEPARTMENTS, MEDICAL_SERVICES, CHECKUP_PACKAGES } from '../lib/data';

interface HeroSearchProps {
  lang: Language;
  onSelectDoctor: (doctor: Doctor) => void;
  onOpenBooking: (preferredDoctorId?: string) => void;
}

export const HeroSearch: React.FC<HeroSearchProps> = ({
  lang,
  onSelectDoctor,
  onOpenBooking,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<'all' | 'doctors' | 'departments' | 'services'>('all');
  const isFa = lang === 'fa';

  const ArrowIcon = isFa ? ArrowLeft : ArrowRight;

  // Real-time search matching across doctors, departments, and services
  const searchResults = useMemo(() => {
    if (!searchQuery.trim()) return [];
    const q = searchQuery.toLowerCase().trim();

    const matchedDoctors = DOCTORS.filter(
      (d) =>
        d.name.fa.toLowerCase().includes(q) ||
        d.name.en.toLowerCase().includes(q) ||
        d.specialty.fa.toLowerCase().includes(q) ||
        d.specialty.en.toLowerCase().includes(q) ||
        (d.subSpecialty &&
          (d.subSpecialty.fa.toLowerCase().includes(q) || d.subSpecialty.en.toLowerCase().includes(q)))
    ).map((item) => ({ type: 'doctor' as const, data: item }));

    const matchedDepts = DEPARTMENTS.filter(
      (d) =>
        d.name.fa.toLowerCase().includes(q) ||
        d.name.en.toLowerCase().includes(q) ||
        d.description.fa.toLowerCase().includes(q) ||
        d.description.en.toLowerCase().includes(q)
    ).map((item) => ({ type: 'department' as const, data: item }));

    const matchedServices = MEDICAL_SERVICES.filter(
      (s) =>
        s.name.fa.toLowerCase().includes(q) ||
        s.name.en.toLowerCase().includes(q) ||
        s.description.fa.toLowerCase().includes(q) ||
        s.description.en.toLowerCase().includes(q)
    ).map((item) => ({ type: 'service' as const, data: item }));

    return [...matchedDoctors, ...matchedDepts, ...matchedServices];
  }, [searchQuery]);

  const quickPills = [
    { label: isFa ? 'جراحی قلب و آنژیوگرافی' : 'Cardiovascular & Angio', query: isFa ? 'قلب' : 'cardio' },
    { label: isFa ? 'جراحی روباتیک داوینچی' : 'Da Vinci Robotic Surgery', query: isFa ? 'روباتیک' : 'robotic' },
    { label: isFa ? 'انکولوژی و توموربورد' : 'Cancer Tumor Board', query: isFa ? 'انکولوژی' : 'oncology' },
    { label: isFa ? 'تصویربرداری PET-CT' : 'PET-CT Imaging', query: 'PET-CT' },
    { label: isFa ? 'بسته‌های چک‌آپ طلایی' : 'Executive Check-ups', query: isFa ? 'چک‌آپ' : 'checkup' },
  ];

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-slate-50 via-teal-50/20 to-white pt-10 pb-16 lg:pt-14 lg:pb-24 border-b border-slate-200/70">
      {/* Decorative subtle background accents */}
      <div className="absolute -top-40 right-1/4 w-96 h-96 bg-teal-100/40 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 -left-20 w-80 h-80 bg-sky-100/40 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto space-y-4">
          {/* Institutional Accreditation Pill */}
          <div className="inline-flex items-center gap-2 bg-white/90 border border-teal-200/80 shadow-xs px-3.5 py-1.5 rounded-full text-xs font-semibold text-teal-900">
            <Award className="w-4 h-4 text-teal-600" />
            <span>{isFa ? 'مرکز برتر پزشکی بالینی و جراحی‌های پیشرفته خاورمیانه' : 'Premier Clinical & Advanced Surgical Center in the Region'}</span>
            <span className="w-1.5 h-1.5 rounded-full bg-teal-500"></span>
            <span className="text-teal-700 font-bold">JCI Accredited</span>
          </div>

          {/* Master Headline */}
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-slate-900 leading-tight">
            {isFa ? (
              <>
                استاندارد جهانی مراقبت سلامت در{' '}
                <span className="bg-gradient-to-r from-teal-700 to-sky-700 bg-clip-text text-transparent">
                  بیمارستان ابن‌سینا
                </span>
              </>
            ) : (
              <>
                World-Class Medical Excellence at{' '}
                <span className="bg-gradient-to-r from-teal-700 to-sky-700 bg-clip-text text-transparent">
                  Avicenna Hospital
                </span>
              </>
            )}
          </h1>

          {/* Subheading */}
          <p className="text-base sm:text-lg text-slate-600 font-normal leading-relaxed">
            {isFa
              ? 'تلفیق پیشرفته‌ترین فناوری‌های جراحی روباتیک، اساتید برجسته هیئت علمی و سیستم یکپارچه نوبت‌دهی و پرونده سلامت الکترونیک.'
              : 'Combining sub-millimeter robotic surgery, distinguished academic faculty, and real-time appointment scheduling.'}
          </p>
        </div>

        {/* Unified Clinical Search Console */}
        <div className="mt-8 max-w-3xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl shadow-slate-200/60 border border-slate-200/90 p-3 sm:p-4">
            <div className="relative">
              <Search className={`w-5 h-5 text-slate-400 absolute top-3.5 ${isFa ? 'right-4' : 'left-4'}`} />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={
                  isFa
                    ? 'جستجوی نام پزشک، تخصص درمانی (مثلاً جراحی قلب، پروستات، سرطان)، خدمت یا پکیج چک‌آپ...'
                    : 'Search by doctor name, specialty, clinical service, or diagnostic package...'
                }
                className={`w-full bg-slate-50 hover:bg-slate-100/70 focus:bg-white text-slate-900 text-sm font-medium py-3 rounded-xl border border-slate-200 focus:border-teal-500 focus:outline-hidden focus:ring-3 focus:ring-teal-500/10 transition-all ${
                  isFa ? 'pr-12 pl-4' : 'pl-12 pr-4'
                }`}
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className={`absolute top-3 text-xs font-semibold text-slate-400 hover:text-slate-600 bg-slate-200/60 px-2 py-1 rounded-md ${
                    isFa ? 'left-3' : 'right-3'
                  }`}
                >
                  {isFa ? 'پاک کردن' : 'Clear'}
                </button>
              )}
            </div>

            {/* Live Autocomplete Results Dropdown */}
            {searchQuery.trim() && (
              <div className="mt-3 border-t border-slate-100 pt-3 max-h-80 overflow-y-auto divide-y divide-slate-100">
                {searchResults.length === 0 ? (
                  <div className="py-6 text-center text-sm text-slate-500">
                    {isFa ? 'موردی متناسب با عبارت جستجو شده یافت نشد.' : 'No matching medical services or doctors found.'}
                  </div>
                ) : (
                  searchResults.slice(0, 8).map((result, idx) => {
                    if (result.type === 'doctor') {
                      const doc = result.data as Doctor;
                      return (
                        <div
                          key={`res-doc-${doc.id}-${idx}`}
                          onClick={() => {
                            onSelectDoctor(doc);
                            setSearchQuery('');
                          }}
                          className="py-2.5 px-3 hover:bg-teal-50/70 rounded-xl cursor-pointer flex items-center justify-between gap-3 transition-colors"
                        >
                          <div className="flex items-center gap-3">
                            <div className="w-9 h-9 rounded-full bg-teal-100 text-teal-800 flex items-center justify-center font-bold text-xs shrink-0">
                              <Stethoscope className="w-4 h-4 text-teal-700" />
                            </div>
                            <div>
                              <div className="text-sm font-bold text-slate-900">{doc.name[lang]}</div>
                              <div className="text-xs text-slate-500">{doc.specialty[lang]} - {doc.academicRank[lang]}</div>
                            </div>
                          </div>
                          <span className="text-xs font-semibold text-teal-700 bg-teal-100/60 px-2 py-0.5 rounded-full shrink-0">
                            {isFa ? 'مشاهده پروفایل و نوبت' : 'View Profile & Book'}
                          </span>
                        </div>
                      );
                    } else if (result.type === 'department') {
                      const dept = result.data as Department;
                      return (
                        <a
                          key={`res-dept-${dept.id}-${idx}`}
                          href={`#dept-${dept.id}`}
                          onClick={() => setSearchQuery('')}
                          className="py-2.5 px-3 hover:bg-sky-50/70 rounded-xl cursor-pointer flex items-center justify-between gap-3 transition-colors"
                        >
                          <div className="flex items-center gap-3">
                            <div className="w-9 h-9 rounded-full bg-sky-100 text-sky-800 flex items-center justify-center font-bold text-xs shrink-0">
                              <Building className="w-4 h-4 text-sky-700" />
                            </div>
                            <div>
                              <div className="text-sm font-bold text-slate-900">{dept.name[lang]}</div>
                              <div className="text-xs text-slate-500">{dept.tagline[lang]}</div>
                            </div>
                          </div>
                          <span className="text-xs font-semibold text-sky-700 bg-sky-100/60 px-2 py-0.5 rounded-full shrink-0">
                            {isFa ? 'بخش درمانی' : 'Department'}
                          </span>
                        </a>
                      );
                    } else {
                      const srv = result.data as MedicalService;
                      return (
                        <div
                          key={`res-srv-${srv.id}-${idx}`}
                          onClick={() => {
                            setSearchQuery('');
                            onOpenBooking();
                          }}
                          className="py-2.5 px-3 hover:bg-amber-50/70 rounded-xl cursor-pointer flex items-center justify-between gap-3 transition-colors"
                        >
                          <div className="flex items-center gap-3">
                            <div className="w-9 h-9 rounded-full bg-amber-100 text-amber-800 flex items-center justify-center font-bold text-xs shrink-0">
                              <ShieldCheck className="w-4 h-4 text-amber-700" />
                            </div>
                            <div>
                              <div className="text-sm font-bold text-slate-900">{srv.name[lang]}</div>
                              <div className="text-xs text-slate-500 line-clamp-1">{srv.description[lang]}</div>
                            </div>
                          </div>
                          <span className="text-xs font-semibold text-amber-700 bg-amber-100/60 px-2 py-0.5 rounded-full shrink-0">
                            {isFa ? 'رزرو خدمت' : 'Schedule'}
                          </span>
                        </div>
                      );
                    }
                  })
                )}
              </div>
            )}

            {/* Quick Access Keyword Pills */}
            <div className="mt-3.5 flex flex-wrap items-center gap-2">
              <span className="text-xs font-bold text-slate-400">
                {isFa ? 'جستجوهای پرتکرار مراجعین:' : 'Frequent Searches:'}
              </span>
              {quickPills.map((pill, i) => (
                <button
                  key={i}
                  onClick={() => setSearchQuery(pill.query)}
                  className="text-xs font-medium bg-slate-100 hover:bg-teal-50 text-slate-600 hover:text-teal-800 px-2.5 py-1 rounded-lg border border-slate-200/60 transition-colors"
                >
                  {pill.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Institutional Trust Highlights Bento Grid */}
        <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-5xl mx-auto">
          <div className="bg-white/80 backdrop-blur-xs border border-slate-200/80 rounded-2xl p-4.5 shadow-xs text-center">
            <div className="text-2xl sm:text-3xl font-black text-teal-700 mb-1">۴۵۰ تخت</div>
            <div className="text-xs font-semibold text-slate-600">{isFa ? 'ظرفیت بستری و ۶۴ تخت ICU/CCU' : 'Inpatient Beds & 64 ICU/CCU'}</div>
          </div>

          <div className="bg-white/80 backdrop-blur-xs border border-slate-200/80 rounded-2xl p-4.5 shadow-xs text-center">
            <div className="text-2xl sm:text-3xl font-black text-teal-700 mb-1">۱۲۰ پزشک</div>
            <div className="text-xs font-semibold text-slate-600">{isFa ? 'اعضای هیئت علمی و جراحان برجسته' : 'Academic Faculty & Surgeons'}</div>
          </div>

          <div className="bg-white/80 backdrop-blur-xs border border-slate-200/80 rounded-2xl p-4.5 shadow-xs text-center">
            <div className="text-2xl sm:text-3xl font-black text-teal-700 mb-1">۹۹.۴٪</div>
            <div className="text-xs font-semibold text-slate-600">{isFa ? 'شاخص ایمنی و موفقیت جراحی‌ها' : 'Surgical Safety & Efficacy Rate'}</div>
          </div>

          <div className="bg-white/80 backdrop-blur-xs border border-slate-200/80 rounded-2xl p-4.5 shadow-xs text-center">
            <div className="text-2xl sm:text-3xl font-black text-teal-700 mb-1">۲۴/۷</div>
            <div className="text-xs font-semibold text-slate-600">{isFa ? 'خدمات شبانه‌روزی سکته مغزی و قلبی' : 'Continuous Stroke & Cath Lab'}</div>
          </div>
        </div>
      </div>
    </section>
  );
};
