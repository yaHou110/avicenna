'use client';

import React, { useState } from 'react';
import {
  PhoneCall,
  Globe,
  Clock,
  CalendarCheck,
  UserCheck,
  Stethoscope,
  ShieldCheck,
  Building2,
  Layers,
  Menu,
  X,
} from 'lucide-react';
import { Language, WorkspaceView } from '../lib/types';
import { HOSPITAL_INFO } from '../lib/data';

interface HeaderProps {
  lang: Language;
  onLanguageChange: (l: Language) => void;
  currentWorkspace: WorkspaceView;
  onSelectWorkspace: (w: WorkspaceView) => void;
  onOpenBooking: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  lang,
  onLanguageChange,
  currentWorkspace,
  onSelectWorkspace,
  onOpenBooking,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const isFa = lang === 'fa';

  const navLinks = [
    { href: '#centers', label: isFa ? 'مراکز تعالی' : 'Centers of Excellence' },
    { href: '#doctors', label: isFa ? 'پزشکان و اساتید' : 'Specialists' },
    { href: '#facilities', label: isFa ? 'تجهیزات پیشرفته' : 'Technology' },
    { href: '#packages', label: isFa ? 'بسته‌های چک‌آپ' : 'Checkups' },
    { href: '#articles', label: isFa ? 'دانشنامه سلامت' : 'Health Library' },
    { href: '#campus', label: isFa ? 'مسیریاب پردیس' : 'Campus Guide' },
  ];

  return (
    <header className="sticky top-0 z-40 w-full bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-xs transition-all">
      {/* 24/7 Clinical Triage & Accreditation Top Bar */}
      <div className="bg-slate-900 text-slate-200 text-xs px-4 py-1.5 border-b border-slate-800">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-4">
            <span className="inline-flex items-center gap-1.5 font-medium text-emerald-400">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              {isFa ? 'تریاژ و اورژانس ۲۴ ساعته فعال' : '24/7 Acute Triage & Trauma Active'}
            </span>
            <span className="hidden sm:inline-block text-slate-500">|</span>
            <span className="hidden sm:flex items-center gap-1 text-slate-300">
              <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
              {isFa ? 'دارنده استاندارد اعتباربخشی طلایی JCI' : 'JCI Gold Seal of Approval'}
            </span>
          </div>

          <div className="flex items-center gap-4 text-xs">
            <div className="flex items-center gap-1.5 text-slate-300">
              <Clock className="w-3.5 h-3.5 text-sky-400" />
              <span>{isFa ? 'پذیرش کلینیک‌ها: ۸ الی ۲۰' : 'Outpatient: 08:00 - 20:00'}</span>
            </div>
            <a
              href={`tel:${HOSPITAL_INFO.emergencyHotline}`}
              className="inline-flex items-center gap-1.5 bg-rose-600/90 hover:bg-rose-600 text-white px-2.5 py-0.5 rounded-full font-semibold transition-colors"
            >
              <PhoneCall className="w-3 h-3" />
              <span>{isFa ? `خط اورژانس: ${HOSPITAL_INFO.emergencyHotline}` : `Emergency: ${HOSPITAL_INFO.emergencyHotline}`}</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-2 lg:gap-4 h-20">
          {/* Hospital Logo & Brand Identity */}
          <div className="flex items-center gap-2.5 shrink-0">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-teal-600 via-teal-700 to-sky-800 flex items-center justify-center text-white shadow-md shadow-teal-700/20 shrink-0">
              <Building2 className="w-5 h-5" />
            </div>
            <div className="flex flex-col">
              <span className="font-black text-base lg:text-lg tracking-tight text-slate-900 whitespace-nowrap">
                {isFa ? 'بیمارستان بین‌المللی ابن‌سینا' : 'Avicenna Hospital'}
              </span>
              <div className="flex items-center gap-1.5">
                <span className="text-[10px] text-slate-500 font-medium whitespace-nowrap">
                  {isFa ? 'مرکز فوق‌تخصصی و پلتفرم سلامت' : 'Tertiary Medical Center'}
                </span>
                <span className="text-[9px] uppercase font-bold bg-teal-50 text-teal-700 border border-teal-200 px-1 py-0.2 rounded whitespace-nowrap">
                  JCI Accredited
                </span>
              </div>
            </div>
          </div>

          {/* Desktop Nav Links - Premium Segmented Navigation */}
          <nav className="hidden lg:flex items-center gap-1 bg-slate-100/90 border border-slate-200/80 p-1 rounded-2xl shadow-xs shrink-0">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="px-2.5 xl:px-3 py-1.5 rounded-xl text-xs xl:text-sm font-extrabold text-slate-800 hover:text-teal-900 hover:bg-white hover:shadow-xs transition-all duration-200 whitespace-nowrap shrink-0 tracking-tight"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Right Action Hub */}
          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
            {/* Language Switcher */}
            <button
              onClick={() => onLanguageChange(isFa ? 'en' : 'fa')}
              className="inline-flex items-center gap-1 text-xs font-semibold px-2 py-1.5 rounded-lg border border-slate-200 hover:border-slate-300 bg-slate-50 text-slate-700 hover:bg-slate-100 transition-colors shrink-0"
              title={isFa ? 'تغییر به زبان انگلیسی' : 'Switch to Persian'}
            >
              <Globe className="w-3.5 h-3.5 text-teal-600 shrink-0" />
              <span>{isFa ? 'EN' : 'FA'}</span>
            </button>

            {/* Quick Online Booking CTA */}
            <button
              onClick={onOpenBooking}
              className="hidden sm:inline-flex items-center gap-1.5 bg-gradient-to-r from-teal-600 to-teal-700 hover:from-teal-700 hover:to-teal-800 text-white text-xs font-bold px-3 py-2 rounded-xl shadow-xs shadow-teal-600/20 transition-all hover:scale-[1.01] shrink-0 whitespace-nowrap"
            >
              <CalendarCheck className="w-3.5 h-3.5 shrink-0" />
              <span>{isFa ? 'نوبت‌دهی آنلاین' : 'Book Appointment'}</span>
            </button>

            {/* Workspace Select Menu Button */}
            <div className="relative group shrink-0">
              <button
                className={`inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-2 rounded-xl border transition-all shrink-0 ${
                  currentWorkspace !== 'public'
                    ? 'bg-teal-50 border-teal-300 text-teal-900'
                    : 'bg-white border-slate-200 text-slate-700 hover:border-slate-300'
                }`}
              >
                <Layers className="w-3.5 h-3.5 text-teal-600 shrink-0" />
                <span className="hidden md:inline whitespace-nowrap">
                  {isFa ? 'پرتال‌ها و ماژول‌ها' : 'Portals'}
                </span>
              </button>

              {/* Dropdown Menu for Phase Demos */}
              <div
                className={`absolute ${
                  isFa ? 'left-0' : 'right-0'
                } mt-1 w-64 bg-white rounded-xl shadow-xl border border-slate-200/90 py-2 hidden group-hover:block transition-all z-50`}
              >
                <div className="px-3 py-1.5 text-[11px] font-bold text-slate-400 uppercase tracking-wider border-b border-slate-100">
                  {isFa ? 'شبیه‌ساز فازهای پلتفرم' : 'Platform Workspaces'}
                </div>

                <button
                  onClick={() => onSelectWorkspace('public')}
                  className={`w-full text-start px-3 py-2 text-xs flex items-center gap-2.5 transition-colors ${
                    currentWorkspace === 'public'
                      ? 'bg-teal-50 text-teal-800 font-semibold'
                      : 'text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <Building2 className="w-4 h-4 text-teal-600" />
                  <div>
                    <div className="font-medium">{isFa ? 'وب‌سایت عمومی بیمارستان' : 'Public Website (Phases 1-6)'}</div>
                    <div className="text-[10px] text-slate-400">{isFa ? 'صفحه اصلی، جستجوی درمان، پزشکان' : 'Discovery, Specialists, Tech'}</div>
                  </div>
                </button>

                <button
                  onClick={() => onSelectWorkspace('patient')}
                  className={`w-full text-start px-3 py-2 text-xs flex items-center gap-2.5 transition-colors ${
                    currentWorkspace === 'patient'
                      ? 'bg-teal-50 text-teal-800 font-semibold'
                      : 'text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <UserCheck className="w-4 h-4 text-sky-600" />
                  <div>
                    <div className="font-medium">{isFa ? 'پرتال یکپارچه بیمار' : 'Patient Portal (Phase 9)'}</div>
                    <div className="text-[10px] text-slate-400">{isFa ? 'سوابق نوبت، جواب آزمایش و PACS' : 'EHR, Lab Results, Invoices'}</div>
                  </div>
                </button>

                <button
                  onClick={() => onSelectWorkspace('doctor')}
                  className={`w-full text-start px-3 py-2 text-xs flex items-center gap-2.5 transition-colors ${
                    currentWorkspace === 'doctor'
                      ? 'bg-teal-50 text-teal-800 font-semibold'
                      : 'text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <Stethoscope className="w-4 h-4 text-indigo-600" />
                  <div>
                    <div className="font-medium">{isFa ? 'فضای کاری پزشک معالج' : 'Doctor Workspace (Phase 10)'}</div>
                    <div className="text-[10px] text-slate-400">{isFa ? 'صف ویزیت امروز، برنامه شیفت' : 'Queue, Visit Actions, Schedules'}</div>
                  </div>
                </button>

                <button
                  onClick={() => onSelectWorkspace('admin')}
                  className={`w-full text-start px-3 py-2 text-xs flex items-center gap-2.5 transition-colors ${
                    currentWorkspace === 'admin'
                      ? 'bg-teal-50 text-teal-800 font-semibold'
                      : 'text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <div>
                    <div className="font-medium">{isFa ? 'پنل مدیریت و CMS بالینی' : 'Admin & CMS (Phase 7)'}</div>
                    <div className="text-[10px] text-slate-400">{isFa ? 'مدیریت محتوا، لاگ امنیت OWASP' : 'Content Lifecycle & Audit Logs'}</div>
                  </div>
                </button>

                <div className="my-1 border-t border-slate-100"></div>

                <button
                  onClick={() => onSelectWorkspace('tiers')}
                  className={`w-full text-start px-3 py-2 text-xs flex items-center gap-2.5 transition-colors ${
                    currentWorkspace === 'tiers'
                      ? 'bg-amber-50 text-amber-900 font-semibold'
                      : 'text-amber-800 hover:bg-amber-50/70'
                  }`}
                >
                  <Layers className="w-4 h-4 text-amber-600" />
                  <div>
                    <div className="font-semibold">{isFa ? 'پلن‌های تجاری هیمورا' : 'Himura Commercial Tiers'}</div>
                    <div className="text-[10px] text-amber-600/80">{isFa ? 'مشخصات معماری و دموهای سازمانی' : 'Architecture & Solution Specs'}</div>
                  </div>
                </button>
              </div>
            </div>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg text-slate-600 hover:bg-slate-100 transition-colors"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-6 space-y-3">
          <nav className="flex flex-col space-y-2">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-slate-700 hover:text-teal-700 py-2 border-b border-slate-100 text-sm font-medium"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="pt-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenBooking();
              }}
              className="w-full inline-flex items-center justify-center gap-2 bg-teal-700 text-white font-semibold text-sm py-3 rounded-xl shadow-sm"
            >
              <CalendarCheck className="w-4 h-4" />
              <span>{isFa ? 'نوبت‌دهی آنلاین' : 'Book Appointment'}</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
