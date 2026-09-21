'use client';

import React, { useState, useEffect, useRef } from 'react';
import {
  Check,
  PhoneCall,
  ArrowRight,
  ArrowLeft,
  Building2,
  Cpu,
  Layers,
  ChevronDown,
  ChevronUp,
  Eye,
  X,
} from 'lucide-react';
import { Language } from '../lib/types';
import { COMMERCIAL_TIERS } from '../lib/data';

interface CommercialTiersSectionProps {
  lang: Language;
}

export const CommercialTiersSection: React.FC<CommercialTiersSectionProps> = ({
  lang,
}) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const [isSectionVisible, setIsSectionVisible] = useState<boolean>(true);
  const sectionRef = useRef<HTMLElement>(null);
  const isFa = lang === 'fa';
  const ArrowIcon = isFa ? ArrowLeft : ArrowRight;

  // Track visibility of the main section in viewport
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsSectionVisible(entry.isIntersecting);
      },
      {
        threshold: 0.1,
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  // Handle clicking the floating beacon to scroll & expand
  const handleOpenFromFloatingBeacon = () => {
    setIsExpanded(true);
    if (sectionRef.current) {
      sectionRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  return (
    <>
      <section
        ref={sectionRef}
        id="commercial-tiers-section"
        className="bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 text-white border-y-2 border-amber-500/80 shadow-xl transition-all duration-500 relative overflow-hidden"
      >
        {/* Background Subtle Grid Texture */}
        <div className="absolute inset-0 bg-[radial-gradient(#f59e0b_1px,transparent_1px)] [background-size:24px_24px] opacity-10 pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-5 relative z-10">
          {/* ================= COMPACT TEASER / DRAWER TRIGGER BAR ================= */}
          <div className="flex flex-col lg:flex-row items-center justify-between gap-4">
            {/* Left / Start Info with Blinking Beacon Light */}
            <div className="flex items-center gap-3.5 text-center sm:text-start flex-wrap sm:flex-nowrap justify-center sm:justify-start">
              {/* Pulsing / Blinking Light Beacon */}
              <div className="relative flex h-4 w-4 shrink-0 items-center justify-center">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-amber-500 shadow-md shadow-amber-400"></span>
              </div>

              <div className="space-y-0.5">
                <div className="flex items-center gap-2 justify-center sm:justify-start flex-wrap">
                  <span className="bg-amber-400 text-slate-950 text-[11px] font-black px-2.5 py-0.5 rounded-full uppercase tracking-wider flex items-center gap-1 shadow-xs">
                    <Building2 className="w-3 h-3" />
                    <span>{isFa ? 'گروه نرم‌افزاری هیمورا' : 'Himura Software Group'}</span>
                  </span>
                  <span className="text-xs font-bold text-amber-300">
                    {isFa
                      ? 'پلن‌های تجاری و معماری نرم‌افزاری پلتفرم سلامت'
                      : 'Commercial Tiers & Healthcare Architecture'}
                  </span>
                </div>
                <p className="text-[11px] text-slate-300">
                  {isFa
                    ? 'تعرفه و مشخصات فنی ۴ پلن تخصصی (پایه ۱۰۰ م • حرفه‌ای ۲۲۰ م • سازمانی ۳۵۰ م • پلتفرم سلامت ۵۸۰ م)'
                    : 'Pricing & engineering specs (Essential 100M • Pro 220M • Enterprise 350M • Platform 580M)'}
                </p>
              </div>
            </div>

            {/* Right / End Actions: Direct Call & Drawer Toggle */}
            <div className="flex items-center gap-3 shrink-0 w-full sm:w-auto justify-center sm:justify-end flex-wrap sm:flex-nowrap">
              {/* Direct Call Button - Highlighted & Prominent */}
              <a
                href="tel:09354467269"
                className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-400 via-amber-300 to-amber-400 hover:from-amber-300 hover:to-amber-200 text-slate-950 text-sm font-black px-4 py-2.5 rounded-xl shadow-lg hover:shadow-amber-400/30 transition-all transform hover:scale-[1.03] active:scale-95 font-mono tracking-wider"
                title={isFa ? 'تماس مستقیم با گروه نرم‌افزاری هیمورا' : 'Direct Call to Himura Software Group'}
              >
                <PhoneCall className="w-4 h-4 fill-slate-950 text-slate-950 shrink-0" />
                <span className="font-extrabold text-sm sm:text-base">۰۹۳۵۴۴۶۷۲۶۹</span>
              </a>

              {/* Expand / Collapse Drawer Button */}
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="inline-flex items-center gap-2 bg-slate-800 hover:bg-slate-700 text-amber-300 border border-amber-400/40 text-xs sm:text-sm font-black px-4 py-2.5 rounded-xl shadow-md transition-all transform hover:scale-[1.02]"
              >
                <Eye className="w-4 h-4 text-amber-400 shrink-0" />
                <span>
                  {isExpanded
                    ? isFa
                      ? 'بستن کشوی پلن‌ها'
                      : 'Collapse Tiers'
                    : isFa
                    ? 'مشاهده پلن‌های تجاری'
                    : 'Explore Commercial Tiers'}
                </span>
                {isExpanded ? (
                  <ChevronUp className="w-4 h-4 text-amber-400 shrink-0" />
                ) : (
                  <ChevronDown className="w-4 h-4 text-amber-400 shrink-0" />
                )}
              </button>
            </div>
          </div>

          {/* ================= EXPANDABLE DRAWER CONTENT ================= */}
          <div
            className={`transition-all duration-500 ease-in-out overflow-hidden ${
              isExpanded ? 'max-h-[3000px] opacity-100 mt-6 pt-6 border-t border-slate-800' : 'max-h-0 opacity-0'
            }`}
          >
            {/* 4 Tiers Comparison Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 pb-4 pt-2">
              {COMMERCIAL_TIERS.map((tier) => {
                const isEnterprise = tier.id === 'tier-enterprise';
                return (
                  <div
                    key={tier.id}
                    className={`rounded-3xl p-6 flex flex-col justify-between transition-all duration-300 ${
                      isEnterprise
                        ? 'bg-gradient-to-b from-slate-900 via-slate-950 to-amber-950/40 border-2 border-amber-400 shadow-2xl ring-4 ring-amber-400/20 transform lg:-translate-y-2 relative'
                        : 'bg-slate-900/90 hover:bg-slate-850 border border-slate-700 shadow-lg hover:border-slate-600'
                    }`}
                  >
                    {isEnterprise && (
                      <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 text-xs font-black px-4 py-1 rounded-full shadow-lg whitespace-nowrap uppercase tracking-wider">
                        {isFa ? '★ پلن پرچم‌دار سازمانی ★' : '★ Enterprise Flagship ★'}
                      </div>
                    )}

                    <div>
                      {/* Category / Badge */}
                      <div className="flex items-center justify-between gap-2 mb-3">
                        <span
                          className={`text-xs font-black uppercase px-2.5 py-1 rounded-lg ${
                            isEnterprise
                              ? 'bg-amber-400/20 text-amber-300 border border-amber-400/40'
                              : 'bg-slate-800 text-slate-300'
                          }`}
                        >
                          {tier.category}
                        </span>
                        {tier.badge && (
                          <span className="text-xs text-teal-400 font-extrabold">
                            {tier.badge[lang]}
                          </span>
                        )}
                      </div>

                      <h4 className="text-base font-black text-white mb-2 leading-snug">
                        {tier.name[lang]}
                      </h4>

                      {/* Price Block */}
                      <div
                        className={`py-2 px-3.5 rounded-xl my-3 inline-block font-mono ${
                          isEnterprise
                            ? 'bg-amber-400 text-slate-950 font-black text-lg shadow-md'
                            : 'bg-teal-500/20 text-teal-300 border border-teal-500/30 font-bold text-base'
                        }`}
                      >
                        {tier.price[lang]}
                      </div>

                      <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-5 min-h-[48px]">
                        {tier.description[lang]}
                      </p>

                      {/* Key Highlights */}
                      <div className="space-y-2 mb-5">
                        <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                          {isFa ? 'قابلیت‌های کلیدی:' : 'Key Capabilities:'}
                        </div>
                        {tier.highlightFeatures[lang].map((hf, idx) => (
                          <div key={idx} className="flex items-start gap-2 text-xs sm:text-sm">
                            <Check
                              className={`w-4 h-4 shrink-0 mt-0.5 ${
                                isEnterprise ? 'text-amber-400' : 'text-teal-400'
                              }`}
                            />
                            <span className="text-slate-200 leading-relaxed font-medium">{hf}</span>
                          </div>
                        ))}
                      </div>

                      {/* Architecture Specs */}
                      <div className="bg-slate-950/90 border border-slate-700/60 p-3.5 rounded-2xl text-xs space-y-1.5 mb-5">
                        <div className="font-bold text-slate-300 mb-1 flex items-center gap-1.5">
                          <Cpu className="w-4 h-4 text-amber-400" />
                          <span className="text-xs font-extrabold">{isFa ? 'مشخصات معماری:' : 'Architecture Specs:'}</span>
                        </div>
                        {tier.architectureSpecs[lang].map((spec, sIdx) => (
                          <div key={sIdx} className="text-slate-300 font-mono text-xs">
                            • {spec}
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Call to action button */}
                    <div className="pt-4 border-t border-slate-700/50">
                      <a
                        href="tel:09354467269"
                        className={`w-full py-3.5 px-4 rounded-xl font-black text-xs sm:text-sm flex items-center justify-center gap-2 transition-all shadow-md ${
                          isEnterprise
                            ? 'bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-black'
                            : 'bg-slate-800 hover:bg-slate-700 text-amber-300 border border-amber-400/40 hover:border-amber-400'
                        }`}
                      >
                        <PhoneCall className="w-4 h-4 shrink-0" />
                        <span className="font-extrabold tracking-wide">
                          {isFa ? 'تماس و سفارش: ۰۹۳۵۴۴۶۷۲۶۹' : 'Call: 09354467269'}
                        </span>
                      </a>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Close button at the bottom of the drawer */}
            <div className="pt-4 flex justify-center border-t border-slate-800">
              <button
                onClick={() => setIsExpanded(false)}
                className="inline-flex items-center gap-2 text-xs font-bold text-slate-400 hover:text-amber-300 py-2 px-5 rounded-xl hover:bg-white/5 transition-colors"
              >
                <ChevronUp className="w-4 h-4" />
                <span>{isFa ? 'بستن کشوی پلن‌های تجاری' : 'Close Tiers Drawer'}</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ================= FLOATING PERSISTENT BEACON (Visible when section is scrolled out of view) ================= */}
      {!isSectionVisible && (
        <div
          className={`fixed bottom-6 ${
            isFa ? 'left-6' : 'right-6'
          } z-50 animate-in fade-in slide-in-from-bottom-5 duration-300 flex items-center gap-2`}
        >
          <button
            onClick={handleOpenFromFloatingBeacon}
            className="group flex items-center gap-3 bg-slate-950/95 hover:bg-slate-900 text-white border-2 border-amber-400 shadow-2xl hover:shadow-amber-500/40 px-4 sm:px-5 py-3 rounded-2xl backdrop-blur-md transition-all transform hover:scale-105 active:scale-95 ring-2 ring-amber-400/30"
            title={isFa ? 'مشاهده پلن‌های تجاری هیمورا' : 'View Himura Commercial Tiers'}
          >
            {/* The Persistent Blinking Beacon Light */}
            <div className="relative flex h-4 w-4 shrink-0 items-center justify-center">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-90"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-amber-400 shadow-md shadow-amber-400"></span>
            </div>

            <div className="flex flex-col text-start">
              <div className="flex items-center gap-1.5">
                <span className="text-xs font-black text-amber-300">
                  {isFa ? 'پلن‌های تجاری هیمورا' : 'Himura Commercial Tiers'}
                </span>
                <span className="bg-amber-400 text-slate-950 text-[10px] font-black px-1.5 py-0.2 rounded-md">
                  {isFa ? 'کلیک کنید' : 'Click'}
                </span>
              </div>
              <span className="text-xs font-black text-white font-mono tracking-wider">
                {isFa ? 'تماس: ۰۹۳۵۴۴۶۷۲۶۹' : 'Tel: 09354467269'}
              </span>
            </div>

            <ChevronUp className="w-4 h-4 text-amber-400 group-hover:-translate-y-0.5 transition-transform" />
          </button>
        </div>
      )}
    </>
  );
};
