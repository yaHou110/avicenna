'use client';

import React, { useState, useMemo } from 'react';
import Image from 'next/image';
import {
  Stethoscope,
  Star,
  Calendar,
  Clock,
  ShieldCheck,
  Video,
  UserCheck,
  MapPin,
  Search,
  ArrowRight,
  ArrowLeft,
  Filter,
  X,
  Languages,
  RotateCcw,
  Check,
  Globe,
  SlidersHorizontal,
} from 'lucide-react';
import { Language, Doctor } from '../lib/types';
import { DOCTORS } from '../lib/data';

interface DoctorDirectoryProps {
  lang: Language;
  onSelectDoctor: (doctor: Doctor) => void;
  onBookDoctor: (doctorId: string) => void;
}

export const DoctorDirectory: React.FC<DoctorDirectoryProps> = ({
  lang,
  onSelectDoctor,
  onBookDoctor,
}) => {
  const isFa = lang === 'fa';
  const ArrowIcon = isFa ? ArrowLeft : ArrowRight;

  // Filter States
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedDepartment, setSelectedDepartment] = useState<string>('all');
  const [selectedDay, setSelectedDay] = useState<string>('all');
  const [selectedLanguage, setSelectedLanguage] = useState<string>('all');
  const [selectedModality, setSelectedModality] = useState<string>('all');
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState<boolean>(false);

  // Department options
  const departmentOptions = [
    { id: 'all', label: isFa ? 'تمامی تخصص‌ها' : 'All Specialties' },
    { id: 'cardiology', label: isFa ? 'قلب و عروق و جراحی قلب' : 'Cardiovascular & Surgery' },
    { id: 'oncology', label: isFa ? 'سرطان و انکولوژی بالینی' : 'Oncology & Hematology' },
    { id: 'robotic-surgery', label: isFa ? 'جراحی روباتیک و لاپاراسکوپی' : 'Robotic & Laparoscopic' },
    { id: 'neurosciences', label: isFa ? 'جراحی مغز، اعصاب و ستون فقرات' : 'Neurosurgery & Spine' },
    { id: 'women-children', label: isFa ? 'زنان، زایمان و پریناتولوژی' : 'Women & Fetal Medicine' },
    { id: 'transplant', label: isFa ? 'پیوند کبد و ارگان‌های حیاتی' : 'Organ Transplant' },
  ];

  // Day options
  const dayOptions = [
    { id: 'all', label: isFa ? 'همه روزهای هفته' : 'All Days' },
    { id: 'شنبه', label: isFa ? 'شنبه‌ها' : 'Saturdays' },
    { id: 'یکشنبه', label: isFa ? 'یک‌شنبه‌ها' : 'Sundays' },
    { id: 'دوشنبه', label: isFa ? 'دوشنبه‌ها' : 'Mondays' },
    { id: 'سه‌شنبه', label: isFa ? 'سه‌شنبه‌ها' : 'Tuesdays' },
    { id: 'چهارشنبه', label: isFa ? 'چهارشنبه‌ها' : 'Wednesdays' },
    { id: 'پنج‌شنبه', label: isFa ? 'پنج‌شنبه‌ها' : 'Thursdays' },
  ];

  // Language options
  const languageOptions = [
    { id: 'all', label: isFa ? 'همه زبان‌ها' : 'All Languages' },
    { id: 'فارسی', label: isFa ? 'فارسی' : 'Persian' },
    { id: 'English', label: isFa ? 'انگلیسی (English)' : 'English' },
    { id: 'Deutsch', label: isFa ? 'آلمانی (Deutsch)' : 'German' },
    { id: 'Français', label: isFa ? 'فرانسوی (Français)' : 'French' },
    { id: 'العربية', label: isFa ? 'عربی (العربية)' : 'Arabic' },
    { id: 'Türkçe', label: isFa ? 'ترکی (Türkçe)' : 'Turkish' },
  ];

  // Modality options
  const modalityOptions = [
    { id: 'all', label: isFa ? 'تمام شیوه‌های ویزیت' : 'All Modalities' },
    { id: 'in-person', label: isFa ? 'ویزیت حضوری' : 'In-Person Visit' },
    { id: 'telemedicine', label: isFa ? 'ویزیت آنلاین (تله‌مدیسین)' : 'Telemedicine Video' },
  ];

  // Count active filters
  const activeFiltersCount = useMemo(() => {
    let count = 0;
    if (searchQuery.trim()) count++;
    if (selectedDepartment !== 'all') count++;
    if (selectedDay !== 'all') count++;
    if (selectedLanguage !== 'all') count++;
    if (selectedModality !== 'all') count++;
    return count;
  }, [searchQuery, selectedDepartment, selectedDay, selectedLanguage, selectedModality]);

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedDepartment('all');
    setSelectedDay('all');
    setSelectedLanguage('all');
    setSelectedModality('all');
  };

  // Filtered Doctors list
  const filteredDoctors = useMemo(() => {
    return DOCTORS.filter((doc) => {
      // 1. Search Query
      const q = searchQuery.toLowerCase().trim();
      if (q) {
        const matchesNameFa = doc.name.fa.toLowerCase().includes(q);
        const matchesNameEn = doc.name.en.toLowerCase().includes(q);
        const matchesSpecFa = doc.specialty.fa.toLowerCase().includes(q);
        const matchesSpecEn = doc.specialty.en.toLowerCase().includes(q);
        const matchesCode = doc.medicalCouncilCode.toLowerCase().includes(q);
        const matchesSubFa = doc.subSpecialty?.fa.toLowerCase().includes(q) ?? false;
        if (!matchesNameFa && !matchesNameEn && !matchesSpecFa && !matchesSpecEn && !matchesCode && !matchesSubFa) {
          return false;
        }
      }

      // 2. Specialty/Department
      if (selectedDepartment !== 'all' && doc.departmentId !== selectedDepartment) {
        return false;
      }

      // 3. Day of week
      if (selectedDay !== 'all') {
        const docDaysFa = doc.availableDays.fa;
        const docDaysEn = doc.availableDays.en.toLowerCase();
        const searchDay = selectedDay.toLowerCase();
        if (!docDaysFa.includes(searchDay) && !docDaysEn.includes(searchDay)) {
          return false;
        }
      }

      // 4. Language
      if (selectedLanguage !== 'all') {
        const hasLang = doc.languages.some(
          (l) => l.toLowerCase() === selectedLanguage.toLowerCase() || (selectedLanguage === 'العربية' && l === 'Arabic')
        );
        if (!hasLang) return false;
      }

      // 5. Modality
      if (selectedModality !== 'all') {
        if (!doc.consultationTypes.includes(selectedModality as 'in-person' | 'telemedicine')) {
          return false;
        }
      }

      return true;
    });
  }, [searchQuery, selectedDepartment, selectedDay, selectedLanguage, selectedModality]);

  return (
    <section id="doctors" className="py-16 lg:py-24 bg-slate-50 border-b border-slate-200/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs font-bold uppercase tracking-wider text-teal-800 bg-teal-100/80 px-3 py-1 rounded-full inline-block mb-2">
            {isFa ? 'اعضای هیئت علمی و اطباء برجسته' : 'Distinguished Faculty & Medical Staff'}
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 tracking-tight mb-3">
            {isFa ? 'سامانه جستجو و دایرکتوری پزشکان متخصص' : 'Specialist Directory & Find a Doctor'}
          </h2>
          <p className="text-sm text-slate-600">
            {isFa
              ? 'فیلتر هوشمند بر اساس تخصص بالینی، زبان‌های پشتیبانی‌شده، نوع ویزیت و برنامه زمان‌بندی درمانگاه.'
              : 'Search and filter leading faculty by specialty, language fluency, clinic days, and consultation modality.'}
          </p>
        </div>

        {/* Mobile Filter Toggle Button */}
        <div className="lg:hidden mb-6 flex items-center justify-between gap-3">
          <button
            onClick={() => setIsMobileFiltersOpen(!isMobileFiltersOpen)}
            className="flex-1 py-3 px-4 bg-white border border-slate-200 rounded-2xl font-bold text-xs text-slate-800 shadow-xs flex items-center justify-center gap-2 hover:bg-slate-50"
          >
            <SlidersHorizontal className="w-4 h-4 text-teal-600" />
            <span>{isFa ? 'فیلترهای پیشرفته جستجو' : 'Advanced Filters'}</span>
            {activeFiltersCount > 0 && (
              <span className="bg-teal-700 text-white text-[10px] w-5 h-5 rounded-full flex items-center justify-center">
                {activeFiltersCount}
              </span>
            )}
          </button>

          {activeFiltersCount > 0 && (
            <button
              onClick={handleResetFilters}
              className="py-3 px-3 bg-slate-200/70 text-slate-700 rounded-2xl text-xs font-bold flex items-center gap-1 hover:bg-slate-300"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>{isFa ? 'حذف فیلترها' : 'Reset'}</span>
            </button>
          )}
        </div>

        {/* Main 2-Column Layout (Sidebar + Doctor Results Grid) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* ================= FILTERING SIDEBAR ================= */}
          <aside
            className={`lg:col-span-4 xl:col-span-3 bg-white rounded-3xl border border-slate-200/90 p-5 shadow-xs lg:sticky lg:top-24 space-y-6 ${
              isMobileFiltersOpen ? 'block' : 'hidden lg:block'
            }`}
          >
            {/* Sidebar Top Header */}
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <Filter className="w-4 h-4 text-teal-700" />
                <h3 className="text-sm font-black text-slate-900">
                  {isFa ? 'فیلترهای جستجو' : 'Filter Specialists'}
                </h3>
              </div>
              {activeFiltersCount > 0 && (
                <button
                  onClick={handleResetFilters}
                  className="text-[11px] text-rose-600 hover:text-rose-700 font-bold flex items-center gap-1 transition-colors"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>{isFa ? 'پاک کردن همه' : 'Clear All'}</span>
                </button>
              )}
            </div>

            {/* 1. Keyword / Name Search */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                <Search className="w-3.5 h-3.5 text-slate-400" />
                <span>{isFa ? 'جستجوی نام یا نظام پزشکی:' : 'Doctor Name or Reg ID:'}</span>
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={isFa ? 'مثال: کیهانی، انکولوژی، ۳۴۲۹۱...' : 'e.g. Keyhani, Oncology...'}
                  className={`w-full bg-slate-50 text-xs font-medium py-2.5 rounded-xl border border-slate-200 focus:border-teal-500 focus:bg-white focus:outline-hidden ${
                    isFa ? 'pr-3 pl-8' : 'pl-3 pr-8'
                  }`}
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className={`absolute top-2.5 text-slate-400 hover:text-slate-600 ${
                      isFa ? 'left-2.5' : 'right-2.5'
                    }`}
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>

            {/* 2. Specialty / Clinical Department Filter */}
            <div className="space-y-2">
              <label className="text-sm font-black text-slate-800 flex items-center gap-1.5">
                <Stethoscope className="w-4 h-4 text-teal-600" />
                <span>{isFa ? 'دپارتمان و تخصص بالینی:' : 'Clinical Specialty:'}</span>
              </label>
              <div className="space-y-1.5 max-h-56 overflow-y-auto pr-1">
                {departmentOptions.map((dep) => {
                  const isSelected = selectedDepartment === dep.id;
                  return (
                    <button
                      key={dep.id}
                      onClick={() => setSelectedDepartment(dep.id)}
                      className={`w-full text-start px-3 py-2.5 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-between transition-all ${
                        isSelected
                          ? 'bg-teal-50 text-teal-900 font-black border border-teal-200 shadow-2xs'
                          : 'text-slate-700 hover:bg-slate-50 border border-transparent'
                      }`}
                    >
                      <span className="truncate text-xs sm:text-sm font-bold">{dep.label}</span>
                      {isSelected && <Check className="w-4 h-4 text-teal-700 shrink-0" />}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 3. Availability / Day of Week Filter */}
            <div className="space-y-2 pt-2 border-t border-slate-100">
              <label className="text-sm font-black text-slate-800 flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-amber-600" />
                <span>{isFa ? 'روز حضور در کلینیک:' : 'Availability & Days:'}</span>
              </label>
              <div className="grid grid-cols-2 gap-1.5">
                {dayOptions.map((day) => {
                  const isSelected = selectedDay === day.id;
                  return (
                    <button
                      key={day.id}
                      onClick={() => setSelectedDay(day.id)}
                      className={`px-3 py-2 rounded-xl text-xs sm:text-sm font-bold text-center transition-all ${
                        isSelected
                          ? 'bg-amber-100 text-amber-950 font-black border border-amber-300'
                          : 'bg-slate-50 text-slate-700 hover:bg-slate-100 border border-slate-100'
                      }`}
                    >
                      <span>{day.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 4. Language Support Filter */}
            <div className="space-y-2 pt-2 border-t border-slate-100">
              <label className="text-sm font-black text-slate-800 flex items-center gap-1.5">
                <Globe className="w-4 h-4 text-sky-600" />
                <span>{isFa ? 'زبان‌های بین‌المللی پزشک:' : 'Language Fluency:'}</span>
              </label>
              <div className="flex flex-wrap gap-1.5">
                {languageOptions.map((langOpt) => {
                  const isSelected = selectedLanguage === langOpt.id;
                  return (
                    <button
                      key={langOpt.id}
                      onClick={() => setSelectedLanguage(langOpt.id)}
                      className={`px-3 py-1.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                        isSelected
                          ? 'bg-sky-100 text-sky-950 font-black border border-sky-300'
                          : 'bg-slate-50 text-slate-700 hover:bg-slate-100 border border-slate-100'
                      }`}
                    >
                      <span>{langOpt.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 5. Consultation Modality */}
            <div className="space-y-2 pt-2 border-t border-slate-100">
              <label className="text-sm font-black text-slate-800 flex items-center gap-1.5">
                <Video className="w-4 h-4 text-purple-600" />
                <span>{isFa ? 'شیوه ویزیت:' : 'Consultation Modality:'}</span>
              </label>
              <div className="space-y-1.5">
                {modalityOptions.map((mod) => {
                  const isSelected = selectedModality === mod.id;
                  return (
                    <button
                      key={mod.id}
                      onClick={() => setSelectedModality(mod.id)}
                      className={`w-full text-start px-3 py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-between transition-all ${
                        isSelected
                          ? 'bg-purple-50 text-purple-950 font-black border border-purple-200'
                          : 'text-slate-700 hover:bg-slate-50 border border-transparent'
                      }`}
                    >
                      <span>{mod.label}</span>
                      {isSelected && <Check className="w-4 h-4 text-purple-700 shrink-0" />}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Close button on mobile */}
            <button
              onClick={() => setIsMobileFiltersOpen(false)}
              className="w-full py-2.5 bg-teal-700 text-white rounded-xl text-xs font-bold lg:hidden"
            >
              {isFa ? 'مشاهده نتایج فیلتر' : 'Apply & View Results'}
            </button>
          </aside>

          {/* ================= RESULTS / DOCTOR CARDS GRID ================= */}
          <div className="lg:col-span-8 xl:col-span-9 space-y-6">
            {/* Results Counter & Active Filter Pills */}
            <div className="bg-white rounded-2xl border border-slate-200/80 p-4 shadow-2xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <div className="text-xs font-bold text-slate-700 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-teal-500 animate-pulse" />
                <span>
                  {isFa
                    ? `تعداد ${filteredDoctors.length} پزشک متخصص با معیارهای انتخابی یافت شد`
                    : `Found ${filteredDoctors.length} specialists matching your criteria`}
                </span>
              </div>

              {/* Active Filter Chips */}
              {activeFiltersCount > 0 && (
                <div className="flex flex-wrap items-center gap-1.5 text-[11px]">
                  {searchQuery && (
                    <span className="bg-slate-100 text-slate-700 px-2 py-0.5 rounded-md flex items-center gap-1">
                      <span>{searchQuery}</span>
                      <X className="w-3 h-3 cursor-pointer" onClick={() => setSearchQuery('')} />
                    </span>
                  )}
                  {selectedDepartment !== 'all' && (
                    <span className="bg-teal-100 text-teal-800 px-2 py-0.5 rounded-md flex items-center gap-1">
                      <span>{departmentOptions.find((d) => d.id === selectedDepartment)?.label}</span>
                      <X className="w-3 h-3 cursor-pointer" onClick={() => setSelectedDepartment('all')} />
                    </span>
                  )}
                  {selectedDay !== 'all' && (
                    <span className="bg-amber-100 text-amber-800 px-2 py-0.5 rounded-md flex items-center gap-1">
                      <span>{dayOptions.find((d) => d.id === selectedDay)?.label}</span>
                      <X className="w-3 h-3 cursor-pointer" onClick={() => setSelectedDay('all')} />
                    </span>
                  )}
                  {selectedLanguage !== 'all' && (
                    <span className="bg-sky-100 text-sky-800 px-2 py-0.5 rounded-md flex items-center gap-1">
                      <span>{languageOptions.find((l) => l.id === selectedLanguage)?.label}</span>
                      <X className="w-3 h-3 cursor-pointer" onClick={() => setSelectedLanguage('all')} />
                    </span>
                  )}
                  {selectedModality !== 'all' && (
                    <span className="bg-purple-100 text-purple-800 px-2 py-0.5 rounded-md flex items-center gap-1">
                      <span>{modalityOptions.find((m) => m.id === selectedModality)?.label}</span>
                      <X className="w-3 h-3 cursor-pointer" onClick={() => setSelectedModality('all')} />
                    </span>
                  )}
                </div>
              )}
            </div>

            {/* Doctors Cards Grid */}
            {filteredDoctors.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {filteredDoctors.map((doc) => (
                  <div
                    key={doc.id}
                    className="bg-white rounded-3xl border border-slate-200/90 shadow-2xs hover:shadow-md transition-all p-5 flex flex-col justify-between"
                  >
                    <div>
                      {/* Doctor Avatar + Header Info */}
                      <div className="flex items-start gap-4 mb-4">
                        <Image
                          src={doc.avatar}
                          alt={doc.name[lang]}
                          width={64}
                          height={64}
                          unoptimized
                          className="w-16 h-16 rounded-2xl object-cover border-2 border-teal-100 shadow-xs shrink-0"
                          referrerPolicy="no-referrer"
                        />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between gap-1 mb-1">
                            <h3 className="text-base font-black text-slate-900 truncate">
                              {doc.name[lang]}
                            </h3>
                          </div>
                          <div className="text-xs font-bold text-teal-700 mb-0.5">
                            {doc.specialty[lang]}
                          </div>
                          {doc.subSpecialty && (
                            <div className="text-[11px] font-medium text-slate-600 line-clamp-1">
                              {doc.subSpecialty[lang]}
                            </div>
                          )}
                          <div className="text-[11px] text-slate-400 mt-0.5">
                            {doc.academicRank[lang]}
                          </div>
                        </div>
                      </div>

                      {/* Badges & Rating */}
                      <div className="flex flex-wrap items-center gap-2 mb-3.5 text-[11px]">
                        <span className="inline-flex items-center gap-1 bg-slate-100 text-slate-700 px-2 py-0.5 rounded-md font-mono font-medium">
                          <ShieldCheck className="w-3 h-3 text-teal-600" />
                          <span>{doc.medicalCouncilCode}</span>
                        </span>

                        <span className="inline-flex items-center gap-1 bg-amber-50 text-amber-800 px-2 py-0.5 rounded-md font-semibold">
                          <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                          <span>{doc.rating}</span>
                          <span className="text-amber-600 font-normal">({doc.satisfactionRate}٪)</span>
                        </span>

                        {doc.consultationTypes.includes('telemedicine') && (
                          <span className="inline-flex items-center gap-1 bg-purple-50 text-purple-700 px-2 py-0.5 rounded-md font-medium border border-purple-100">
                            <Video className="w-3 h-3 text-purple-600" />
                            <span>{isFa ? 'ویزیت آنلاین' : 'Telehealth'}</span>
                          </span>
                        )}
                      </div>

                      {/* Short Biography */}
                      <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed mb-4">
                        {doc.bio[lang]}
                      </p>

                      {/* Languages supported */}
                      <div className="flex items-center gap-1.5 mb-3 text-[11px] text-slate-500">
                        <Languages className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                        <span>{isFa ? 'زبان‌ها:' : 'Languages:'}</span>
                        <div className="flex flex-wrap gap-1">
                          {doc.languages.map((l, i) => (
                            <span key={i} className="bg-slate-100 text-slate-700 px-1.5 py-0.2 rounded text-[10px]">
                              {l}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Schedule info */}
                      <div className="bg-slate-50 rounded-2xl p-3 space-y-1.5 text-xs text-slate-600 mb-4 border border-slate-100">
                        <div className="flex items-center gap-2">
                          <Calendar className="w-3.5 h-3.5 text-teal-600 shrink-0" />
                          <span className="font-semibold text-slate-800">{doc.availableDays[lang]}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                          <span className="text-slate-500">{doc.roomNumber}</span>
                        </div>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="grid grid-cols-2 gap-2 pt-3 border-t border-slate-100">
                      <button
                        onClick={() => onSelectDoctor(doc)}
                        className="w-full py-2.5 px-3 rounded-xl border border-slate-200 hover:border-teal-500 hover:bg-teal-50/50 text-teal-900 text-xs font-bold transition-all text-center"
                      >
                        {isFa ? 'سوابق و رزومه' : 'Full Bio'}
                      </button>

                      <button
                        onClick={() => onBookDoctor(doc.id)}
                        className="w-full py-2.5 px-3 rounded-xl bg-teal-700 hover:bg-teal-800 text-white text-xs font-bold transition-all flex items-center justify-center gap-1.5 shadow-xs"
                      >
                        <span>{isFa ? 'رزرو نوبت' : 'Book'}</span>
                        <ArrowIcon className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              /* Empty State */
              <div className="bg-white rounded-3xl border border-slate-200 p-12 text-center space-y-3">
                <div className="w-12 h-12 rounded-2xl bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
                  <Search className="w-6 h-6" />
                </div>
                <h4 className="text-base font-bold text-slate-900">
                  {isFa ? 'پزشکی با این مشخصات یافت نشد' : 'No doctors match your filters'}
                </h4>
                <p className="text-xs text-slate-500 max-w-sm mx-auto">
                  {isFa
                    ? 'لطفاً فیلترهای تخصص، روز حضور یا زبان را تغییر داده یا دکمه بازنشانی فیلترها را انتخاب نمایید.'
                    : 'Please adjust your specialty, day, or language criteria, or reset all active filters.'}
                </p>
                <button
                  onClick={handleResetFilters}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-teal-700 text-white rounded-xl text-xs font-bold hover:bg-teal-800"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>{isFa ? 'حذف تمامی فیلترها' : 'Reset All Filters'}</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
