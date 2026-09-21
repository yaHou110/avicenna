'use client';

import React, { useState } from 'react';
import {
  HeartPulse,
  ShieldPlus,
  Cpu,
  Activity,
  Dna,
  Baby,
  ArrowRight,
  ArrowLeft,
  User,
  CheckCircle,
  MapPin,
  BedDouble,
} from 'lucide-react';
import { Language, Department } from '../lib/types';
import { DEPARTMENTS } from '../lib/data';

interface CentersOfExcellenceProps {
  lang: Language;
  onOpenBooking: () => void;
}

export const CentersOfExcellence: React.FC<CentersOfExcellenceProps> = ({
  lang,
  onOpenBooking,
}) => {
  const [selectedDeptId, setSelectedDeptId] = useState<string>(DEPARTMENTS[0].id);
  const isFa = lang === 'fa';
  const ArrowIcon = isFa ? ArrowLeft : ArrowRight;

  const currentDept = DEPARTMENTS.find((d) => d.id === selectedDeptId) || DEPARTMENTS[0];

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'HeartPulse':
        return <HeartPulse className="w-5 h-5" />;
      case 'ShieldPlus':
        return <ShieldPlus className="w-5 h-5" />;
      case 'Cpu':
        return <Cpu className="w-5 h-5" />;
      case 'Activity':
        return <Activity className="w-5 h-5" />;
      case 'Dna':
        return <Dna className="w-5 h-5" />;
      case 'Baby':
        return <Baby className="w-5 h-5" />;
      default:
        return <Activity className="w-5 h-5" />;
    }
  };

  return (
    <section id="centers" className="py-16 lg:py-24 bg-white border-b border-slate-200/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-teal-700 bg-teal-50 px-2.5 py-1 rounded-md inline-block mb-2">
              {isFa ? 'قطب‌های تخصصی و درمانی' : 'Specialized Clinical Hubs'}
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 tracking-tight">
              {isFa ? 'مراکز شش‌گانه تعالی بالینی' : 'Six Centers of Clinical Excellence'}
            </h2>
          </div>
          <p className="text-sm text-slate-500 max-w-md">
            {isFa
              ? 'هر مرکز با بهره‌گیری از اتاق‌های عمل ماژولار، ریکاوری‌های تخصصی و پروتکل‌های بین‌المللی ارزیابی بالینی فعالیت می‌کند.'
              : 'Each institute operates with specialized ICUs, dedicated faculty boards, and international patient care pathways.'}
          </p>
        </div>

        {/* Tab Selector Buttons */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 mb-8">
          {DEPARTMENTS.map((dept) => {
            const isSelected = dept.id === selectedDeptId;
            return (
              <button
                key={dept.id}
                onClick={() => setSelectedDeptId(dept.id)}
                className={`flex flex-col items-center justify-center p-3.5 rounded-xl border text-center transition-all ${
                  isSelected
                    ? 'bg-teal-700 text-white border-teal-700 shadow-md shadow-teal-700/20'
                    : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200/90'
                }`}
              >
                <div
                  className={`w-11 h-11 rounded-xl flex items-center justify-center mb-2.5 transition-colors ${
                    isSelected ? 'bg-white/20 text-white' : 'bg-white text-teal-700 shadow-xs'
                  }`}
                >
                  {getIcon(dept.icon)}
                </div>
                <span className="text-xs sm:text-sm font-extrabold leading-snug line-clamp-2 px-1">{dept.name[lang]}</span>
              </button>
            );
          })}
        </div>

        {/* Active Center Deep-Dive Showcase Card */}
        <div
          id={`dept-${currentDept.id}`}
          className="bg-gradient-to-br from-slate-900 via-slate-800 to-teal-950 text-white rounded-3xl p-6 sm:p-8 lg:p-10 shadow-2xl relative overflow-hidden"
        >
          {/* Subtle background glow */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 relative z-10">
            {/* Left/Main Column: Overview & Features */}
            <div className="lg:col-span-8 space-y-6">
              <div className="flex flex-wrap items-center gap-3">
                <span className="bg-teal-500/20 text-teal-300 border border-teal-500/30 text-xs font-semibold px-3 py-1 rounded-full">
                  {currentDept.tagline[lang]}
                </span>
                <span className="text-xs text-slate-400 flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-teal-400" />
                  {currentDept.floor[lang]}
                </span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                {currentDept.name[lang]}
              </h3>

              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                {currentDept.description[lang]}
              </p>

              {/* Department Highlights */}
              <div className="space-y-2.5 pt-2">
                <h4 className="text-xs font-bold text-teal-300 uppercase tracking-wider">
                  {isFa ? 'امکانات و پروتکل‌های متمایز این مرکز:' : 'Distinct Capabilities & Protocols:'}
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {currentDept.features[lang].map((feature, idx) => (
                    <div
                      key={idx}
                      className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-200 bg-white/5 border border-white/10 rounded-xl p-3"
                    >
                      <CheckCircle className="w-4 h-4 text-teal-400 shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-2 flex flex-wrap items-center gap-4">
                <button
                  onClick={onOpenBooking}
                  className="inline-flex items-center gap-2 bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold text-sm px-6 py-3 rounded-xl transition-all shadow-md shadow-teal-500/20"
                >
                  <span>{isFa ? 'رزرو نوبت در این مرکز' : 'Book Center Appointment'}</span>
                  <ArrowIcon className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Right Column: Head of Dept & Key Statistics */}
            <div className="lg:col-span-4 flex flex-col justify-between space-y-6 lg:border-s lg:border-white/10 lg:ps-8">
              {/* Head of Department Badge */}
              <div className="bg-white/10 rounded-2xl p-4.5 border border-white/10">
                <div className="text-[11px] text-teal-300 font-bold uppercase mb-1">
                  {isFa ? 'ریاست علمی و بالینی مرکز:' : 'Department Chair:'}
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-teal-400/20 text-teal-300 flex items-center justify-center font-bold">
                    <User className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-sm font-bold text-white">{currentDept.headOfDepartment[lang]}</div>
                    <div className="text-xs text-slate-400">{isFa ? 'استاد تمام هیئت علمی دانشگاه' : 'Tenured Academic Faculty'}</div>
                  </div>
                </div>
              </div>

              {/* Live Metric Stats */}
              <div className="grid grid-cols-2 gap-3">
                {currentDept.stats.map((stat, i) => (
                  <div key={i} className="bg-white/5 border border-white/10 rounded-xl p-3 text-center">
                    <div className="text-xl font-black text-teal-300 mb-0.5">{stat.value}</div>
                    <div className="text-[11px] text-slate-300">{stat.label[lang]}</div>
                  </div>
                ))}
              </div>

              {/* Bed Capacity Indicator */}
              <div className="flex items-center justify-between text-xs text-slate-300 bg-white/5 border border-white/10 rounded-xl p-3">
                <span className="flex items-center gap-1.5">
                  <BedDouble className="w-4 h-4 text-teal-400" />
                  {isFa ? 'ظرفیت بستری اختصاصی این بخش:' : 'Dedicated Inpatient Capacity:'}
                </span>
                <span className="font-bold text-white">{currentDept.bedCapacity} {isFa ? 'تخت' : 'Beds'}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
