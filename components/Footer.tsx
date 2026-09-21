'use client';

import React from 'react';
import {
  Building2,
  Phone,
  PhoneCall,
  Mail,
  MapPin,
  ShieldCheck,
  Award,
  HeartPulse,
  Clock,
  ArrowUp,
  Globe,
} from 'lucide-react';
import { Language } from '../lib/types';
import { HOSPITAL_INFO } from '../lib/data';

interface FooterProps {
  lang: Language;
  onOpenBooking: () => void;
  onOpenTiers: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  lang,
  onOpenBooking,
  onOpenTiers,
}) => {
  const isFa = lang === 'fa';

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-950 text-slate-300 pt-16 pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top 4-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-slate-800/80">
          {/* Col 1: Hospital Identity */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-teal-600 flex items-center justify-center text-white font-bold">
                <Building2 className="w-5 h-5" />
              </div>
              <div>
                <span className="font-black text-lg text-white block">
                  {isFa ? 'بیمارستان ابن‌سینا' : 'Avicenna Hospital'}
                </span>
                <span className="text-[11px] text-teal-400 font-semibold">
                  JCI Gold Seal of Approval
                </span>
              </div>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed">
              {isFa
                ? 'مرکز فوق‌تخصصی جراحی‌های روباتیک، کاردیولوژی تهاجمی، انکولوژی و پیوند اعضا. متعهد به بالاترین استانداردهای بالینی و ایمنی بیمار.'
                : 'Tertiary referral medical center providing advanced robotic surgery, acute cardiovascular intervention, and comprehensive oncology care.'}
            </p>

            <div className="pt-2">
              <button
                onClick={onOpenBooking}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-teal-600 hover:bg-teal-500 text-white text-xs font-bold px-4 py-2.5 rounded-xl transition-colors"
              >
                <span>{isFa ? 'سامانه نوبت‌دهی آنلاین' : 'Online Scheduling'}</span>
              </button>
            </div>
          </div>

          {/* Col 2: Clinical Hubs Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-teal-400">
              {isFa ? 'قطب‌های بالینی و درمانی' : 'Clinical Institutes'}
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <a href="#centers" className="hover:text-white transition-colors">
                  {isFa ? 'مرکز جامع قلب و عروق و کت‌لب' : 'Cardiovascular & Cath Lab'}
                </a>
              </li>
              <li>
                <a href="#centers" className="hover:text-white transition-colors">
                  {isFa ? 'انستیتو کانسر و جراحی‌های انکولوژی' : 'Comprehensive Cancer Center'}
                </a>
              </li>
              <li>
                <a href="#centers" className="hover:text-white transition-colors">
                  {isFa ? 'مرکز جراحی‌های روباتیک داوینچی' : 'Da Vinci Robotic Surgery Hub'}
                </a>
              </li>
              <li>
                <a href="#centers" className="hover:text-white transition-colors">
                  {isFa ? 'مرکز فوق‌تخصصی علوم اعصاب و سکته مغزی' : 'Neurosciences & Stroke Unit'}
                </a>
              </li>
              <li>
                <a href="#centers" className="hover:text-white transition-colors">
                  {isFa ? 'دپارتمان پیوند اعضا و سلول‌درمانی' : 'Organ Transplant Institute'}
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: Patients & Visitors Services */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-teal-400">
              {isFa ? 'خدمات مراجعین و بیماران' : 'Patient Services'}
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <a href="#packages" className="hover:text-white transition-colors">
                  {isFa ? 'بسته‌های چک‌آپ سلامت و پایش دوره‌ای' : 'Executive Health Screenings'}
                </a>
              </li>
              <li>
                <a href="#campus" className="hover:text-white transition-colors">
                  {isFa ? 'مسیریاب پردیس، پارکینگ و درب‌های ورود' : 'Campus Navigation & Parking'}
                </a>
              </li>
              <li>
                <a href="#facilities" className="hover:text-white transition-colors">
                  {isFa ? 'تجهیزات و فناوری‌های تصویربرداری ۳T' : 'Diagnostic 3T MRI & PET-CT'}
                </a>
              </li>
              <li>
                <span className="hover:text-white transition-colors cursor-pointer" onClick={onOpenTiers}>
                  {isFa ? 'معماری و پلن‌های تجاری پلتفرم' : 'Platform Architecture Tiers'}
                </span>
              </li>
            </ul>
          </div>

          {/* Col 4: Emergency & Direct Contact */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-teal-400">
              {isFa ? 'خطوط ارتباطی و اورژانس' : 'Contact & 24/7 Hotline'}
            </h4>

            <div className="space-y-2.5 text-xs text-slate-300">
              <div className="flex items-start gap-2.5 bg-rose-950/40 border border-rose-900/60 p-3 rounded-xl text-rose-300">
                <HeartPulse className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                <div>
                  <div className="font-bold">{isFa ? 'تریاژ و ترومای اورژانس شبانه‌روزی:' : 'Acute Emergency 24/7:'}</div>
                  <div className="text-white font-black text-sm font-mono mt-0.5">
                    {HOSPITAL_INFO.emergencyHotline}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 text-slate-400">
                <Phone className="w-4 h-4 text-teal-400 shrink-0" />
                <span className="font-mono">{HOSPITAL_INFO.internationalCall}</span>
              </div>

              <div className="flex items-start gap-2 text-slate-400">
                <MapPin className="w-4 h-4 text-teal-400 shrink-0 mt-0.5" />
                <span>{HOSPITAL_INFO.address[lang]}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Accreditations Bar */}
        <div className="py-6 flex flex-wrap items-center justify-between gap-4 text-xs border-b border-slate-800/80">
          <div className="flex flex-wrap items-center gap-4 text-slate-400">
            <span className="flex items-center gap-1.5 text-amber-400 font-semibold">
              <Award className="w-4 h-4" />
              <span>JCI Joint Commission International</span>
            </span>
            <span>•</span>
            <span className="flex items-center gap-1.5 text-teal-400 font-semibold">
              <ShieldCheck className="w-4 h-4" />
              <span>ISO 15189 Clinical Lab</span>
            </span>
            <span>•</span>
            <span className="flex items-center gap-1.5 text-sky-400 font-semibold">
              <ShieldCheck className="w-4 h-4" />
              <span>ISO 27001 Health InfoSec</span>
            </span>
          </div>

          <button
            onClick={scrollToTop}
            className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-white transition-colors"
          >
            <span>{isFa ? 'بازگشت به بالا' : 'Back to Top'}</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Bottom Legal & Engineering Handover */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            © {new Date().getFullYear()} {HOSPITAL_INFO.name[lang]}. {isFa ? 'کلیه حقوق این سامانه محفوظ است.' : 'All rights reserved.'}
          </div>

          <div className="flex items-center gap-2 text-xs text-slate-400">
            <span>Designed & Engineered by</span>
            <button
              onClick={onOpenTiers}
              className="inline-flex items-center gap-1.5 bg-amber-400/10 hover:bg-amber-400/20 text-amber-400 hover:text-amber-300 border border-amber-400/40 px-3 py-1 rounded-lg font-mono font-black transition-all hover:scale-105"
            >
              <PhoneCall className="w-3.5 h-3.5 shrink-0" />
              <span>Himura Software Group (09354467269)</span>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
