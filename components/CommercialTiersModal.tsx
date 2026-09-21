'use client';

import React from 'react';
import {
  X,
  Layers,
  Check,
  PhoneCall,
  ShieldCheck,
  ArrowRight,
  ArrowLeft,
  Building2,
  Database,
  Lock,
  MessageSquare,
} from 'lucide-react';
import { Language } from '../lib/types';
import { COMMERCIAL_TIERS } from '../lib/data';

interface CommercialTiersModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: Language;
}

export const CommercialTiersModal: React.FC<CommercialTiersModalProps> = ({
  isOpen,
  onClose,
  lang,
}) => {
  const isFa = lang === 'fa';
  const ArrowIcon = isFa ? ArrowLeft : ArrowRight;

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-xs">
      <div className="bg-white w-full max-w-6xl rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="px-6 py-4.5 bg-gradient-to-r from-amber-950 via-slate-900 to-teal-950 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500 text-slate-950 flex items-center justify-center font-bold">
              <Layers className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-black">
                  {isFa ? 'کنسول پلن‌های تجاری و معماری نرم‌افزاری' : 'Commercial Solution Tiers & Engineering Specs'}
                </h3>
                <span className="text-[10px] bg-amber-400/20 text-amber-300 border border-amber-400/30 px-2 py-0.5 rounded font-mono font-bold">
                  Himura Software Group
                </span>
              </div>
              <p className="text-xs sm:text-sm text-amber-200">
                {isFa ? (
                  <>
                    طراحی و توسعه اختصاصی توسط گروه نرم‌افزاری هیمورا | تماس مستقیم:{' '}
                    <strong className="text-amber-300 font-mono font-black text-sm bg-black/40 px-2 py-0.5 rounded border border-amber-400/40">
                      ۰۹۳۵۴۴۶۷۲۶۹
                    </strong>
                  </>
                ) : (
                  <>
                    Architected by Himura Software Group | Contact:{' '}
                    <strong className="text-amber-300 font-mono font-black text-sm bg-black/40 px-2 py-0.5 rounded border border-amber-400/40">
                      09354467269
                    </strong>
                  </>
                )}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6">
          {/* Top Info Banner */}
          <div className="bg-gradient-to-r from-amber-50 via-white to-teal-50 border-2 border-amber-300 p-5 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm">
            <div className="space-y-1 text-center sm:text-start">
              <div className="flex items-center gap-2 justify-center sm:justify-start flex-wrap">
                <h4 className="text-sm sm:text-base font-black text-slate-900">
                  {isFa ? 'سفارش و توسعه اختصاصی سامانه‌های دیجیتال بیمارستانی' : 'Hospital Digital Platform Engineering & Rollout'}
                </h4>
                <span className="bg-amber-500 text-slate-950 text-[10px] font-black px-2.5 py-0.5 rounded-full">
                  گروه نرم‌افزاری هیمورا
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-700">
                {isFa ? (
                  <>
                    جهت مشاوره تخصصی، بررسی نیازمندی‌های بیمارستان و سفارش پروژه مستقیماً با شماره{' '}
                    <strong className="text-slate-900 font-mono font-black text-sm sm:text-base px-1.5 py-0.5 bg-amber-200/80 rounded border border-amber-400">
                      ۰۹۳۵۴۴۶۷۲۶۹
                    </strong>{' '}
                    تماس بگیرید.
                  </>
                ) : (
                  <>
                    For tailored hospital deployment and enterprise licensing, direct consultation is available via{' '}
                    <strong className="text-slate-900 font-mono font-black text-sm sm:text-base px-1.5 py-0.5 bg-amber-200/80 rounded border border-amber-400">
                      09354467269
                    </strong>
                    .
                  </>
                )}
              </p>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <a
                href="tel:09354467269"
                className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 hover:from-amber-400 hover:to-amber-300 text-slate-950 text-sm font-black px-5 py-2.5 rounded-xl shadow-md transition-all font-mono tracking-wider transform hover:scale-105"
              >
                <PhoneCall className="w-4 h-4 fill-slate-950 shrink-0" />
                <span>{isFa ? 'تماس: ۰۹۳۵۴۴۶۷۲۶۹' : 'Call: 09354467269'}</span>
              </a>
            </div>
          </div>

          {/* 4 Tiers Comparison Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {COMMERCIAL_TIERS.map((tier) => {
              const isEnterprise = tier.id === 'tier-enterprise';
              return (
                <div
                  key={tier.id}
                  className={`p-5 rounded-2xl border flex flex-col justify-between transition-all ${
                    isEnterprise
                      ? 'bg-gradient-to-b from-slate-950 via-teal-950 to-slate-900 text-white border-amber-400 shadow-xl ring-2 ring-amber-400/40 relative'
                      : 'bg-white text-slate-900 border-slate-200 shadow-2xs hover:border-slate-300'
                  }`}
                >
                  {isEnterprise && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-amber-400 text-slate-950 text-[10px] font-black px-3 py-0.5 rounded-full shadow-md whitespace-nowrap">
                      {isFa ? 'پلن پرچم‌دار سازمانی' : 'Enterprise Flagship'}
                    </div>
                  )}

                  <div>
                    {tier.badge && (
                      <span
                        className={`text-[9px] font-black uppercase px-2 py-0.5 rounded-md inline-block mb-2.5 ${
                          isEnterprise
                            ? 'bg-amber-400 text-slate-950'
                            : 'bg-slate-100 text-slate-700'
                        }`}
                      >
                        {tier.badge[lang]}
                      </span>
                    )}

                    <h5
                      className={`text-sm font-black mb-1.5 ${
                        isEnterprise ? 'text-white' : 'text-slate-900'
                      }`}
                    >
                      {tier.name[lang]}
                    </h5>

                    {/* Price Tag */}
                    <div
                      className={`text-base font-black font-mono py-1.5 px-2.5 rounded-xl my-2 inline-block ${
                        isEnterprise
                          ? 'bg-amber-400/20 text-amber-300 border border-amber-400/40'
                          : 'bg-teal-50 text-teal-900 border border-teal-200'
                      }`}
                    >
                      {tier.price[lang]}
                    </div>

                    <p
                      className={`text-[11px] leading-relaxed mb-4 ${
                        isEnterprise ? 'text-slate-300' : 'text-slate-600'
                      }`}
                    >
                      {tier.description[lang]}
                    </p>

                    {/* Features list */}
                    <div className="space-y-1.5 mb-4">
                      <div
                        className={`text-[10px] font-bold uppercase tracking-wider ${
                          isEnterprise ? 'text-amber-300' : 'text-teal-800'
                        }`}
                      >
                        {isFa ? 'قابلیت‌های کلیدی:' : 'Core Highlights:'}
                      </div>
                      {tier.highlightFeatures[lang].map((hf, i) => (
                        <div key={i} className="flex items-start gap-1.5 text-[11px]">
                          <Check
                            className={`w-3.5 h-3.5 shrink-0 mt-0.5 ${
                              isEnterprise ? 'text-amber-400' : 'text-teal-600'
                            }`}
                          />
                          <span className={isEnterprise ? 'text-slate-200' : 'text-slate-700'}>
                            {hf}
                          </span>
                        </div>
                      ))}
                    </div>

                    {/* Architecture specs */}
                    <div
                      className={`p-2.5 rounded-xl text-[10px] space-y-1 mb-4 ${
                        isEnterprise ? 'bg-white/10 text-slate-300' : 'bg-slate-50 text-slate-600'
                      }`}
                    >
                      <div className="font-bold">{isFa ? 'مشخصات معماری:' : 'Architecture Specs:'}</div>
                      {tier.architectureSpecs[lang].map((spec, sIdx) => (
                        <div key={sIdx}>• {spec}</div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-3 border-t border-slate-200/40 text-xs">
                    <a
                      href="tel:09354467269"
                      className={`w-full py-2.5 px-3 rounded-xl font-black text-center block transition-all shadow-sm ${
                        isEnterprise
                          ? 'bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-black'
                          : 'bg-slate-900 hover:bg-slate-800 text-amber-300 border border-amber-400/30'
                      }`}
                    >
                      {isFa ? 'سفارش و مشاوره: ۰۹۳۵۴۴۶۷۲۶۹' : 'Inquire: 09354467269'}
                    </a>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Contact Bar */}
          <div className="bg-slate-950 text-slate-200 p-5 rounded-2xl text-xs sm:text-sm flex flex-col sm:flex-row items-center justify-between gap-4 border-2 border-amber-400/50 shadow-lg">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-amber-400/20 border border-amber-400/40 flex items-center justify-center shrink-0">
                <PhoneCall className="w-5 h-5 text-amber-400" />
              </div>
              <span className="font-bold text-slate-200">
                {isFa
                  ? 'جهت مشاوره و راه‌اندازی این پلتفرم با گروه نرم‌افزاری هیمورا تماس حاصل فرمایید:'
                  : 'For platform deployment and consultation, reach Himura Software Group:'}
              </span>
            </div>
            <a
              href="tel:09354467269"
              className="bg-amber-400 hover:bg-amber-300 text-slate-950 px-5 py-2.5 rounded-xl font-mono font-black text-base sm:text-lg tracking-wider flex items-center gap-2 shadow-md hover:shadow-amber-400/30 transition-all transform hover:scale-105 shrink-0"
            >
              <PhoneCall className="w-4 h-4 fill-slate-950 shrink-0" />
              <span>۰۹۳۵۴۴۶۷۲۶۹</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
