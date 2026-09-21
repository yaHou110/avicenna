'use client';

import React from 'react';
import Image from 'next/image';
import {
  X,
  Star,
  ShieldCheck,
  Calendar,
  Clock,
  MapPin,
  Award,
  BookOpen,
  CheckCircle2,
  Video,
  ArrowRight,
  ArrowLeft,
} from 'lucide-react';
import { Language, Doctor } from '../lib/types';

interface DoctorProfileModalProps {
  doctor: Doctor | null;
  onClose: () => void;
  lang: Language;
  onBook: (doctorId: string) => void;
}

export const DoctorProfileModal: React.FC<DoctorProfileModalProps> = ({
  doctor,
  onClose,
  lang,
  onBook,
}) => {
  if (!doctor) return null;
  const isFa = lang === 'fa';
  const ArrowIcon = isFa ? ArrowLeft : ArrowRight;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-xs">
      <div className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header Bar */}
        <div className="px-6 py-4 bg-slate-900 text-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-teal-400" />
            <span className="text-xs font-bold uppercase tracking-wider text-teal-300">
              {isFa ? 'پروفایل بالینی تاییدشده پزشک' : 'Verified Faculty Profile'}
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6">
          {/* Main Info */}
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5">
            <Image
              src={doctor.avatar}
              alt={doctor.name[lang]}
              width={96}
              height={96}
              unoptimized
              className="w-24 h-24 rounded-2xl object-cover border-2 border-teal-200 shadow-md shrink-0"
              referrerPolicy="no-referrer"
            />
            <div className="text-center sm:text-start flex-1">
              <h3 className="text-xl font-black text-slate-900 mb-1">
                {doctor.name[lang]}
              </h3>
              <div className="text-xs font-bold text-teal-700 mb-1">
                {doctor.specialty[lang]} {doctor.subSpecialty && `• ${doctor.subSpecialty[lang]}`}
              </div>
              <div className="text-xs text-slate-500 mb-3">
                {doctor.title[lang]} | {doctor.academicRank[lang]}
              </div>

              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 text-xs">
                <span className="bg-slate-100 text-slate-800 px-2.5 py-0.5 rounded-md font-mono font-medium">
                  {isFa ? 'نظام پزشکی:' : 'Reg:'} {doctor.medicalCouncilCode}
                </span>
                <span className="bg-amber-50 text-amber-800 px-2.5 py-0.5 rounded-md font-semibold flex items-center gap-1">
                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  <span>{doctor.rating}</span>
                  <span className="text-amber-600 font-normal">({doctor.satisfactionRate}٪ رضایت)</span>
                </span>
                <span className="bg-teal-50 text-teal-800 px-2 py-0.5 rounded-md font-medium">
                  {doctor.experienceYears} {isFa ? 'سال سابقه بالینی' : 'Years Experience'}
                </span>
              </div>
            </div>
          </div>

          {/* Biography */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold text-slate-900 uppercase">
              {isFa ? 'درباره و سوابق علمی پزشک:' : 'Academic & Clinical Background:'}
            </h4>
            <p className="text-xs text-slate-600 leading-relaxed bg-slate-50 p-3.5 rounded-xl border border-slate-100">
              {doctor.bio[lang]}
            </p>
          </div>

          {/* Languages & Consultation */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold text-slate-900 uppercase">
              {isFa ? 'زبان‌های بین‌المللی و شیوه ویزیت:' : 'Languages & Consultation Modality:'}
            </h4>
            <div className="flex flex-wrap gap-2 text-xs">
              {doctor.languages.map((langItem, i) => (
                <span key={i} className="bg-slate-100 text-slate-700 px-2.5 py-1 rounded-lg">
                  {langItem}
                </span>
              ))}
              {doctor.consultationTypes.map((ctype, i) => (
                <span key={i} className="bg-teal-50 text-teal-800 border border-teal-200 px-2.5 py-1 rounded-lg font-medium">
                  {ctype === 'in-person' ? (isFa ? 'ویزیت حضوری' : 'In-Person') : (isFa ? 'ویزیت آنلاین و تله‌مدیسین' : 'Telemedicine')}
                </span>
              ))}
            </div>
          </div>

          {/* Clinic Hours & Location */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 bg-teal-50/50 p-3.5 rounded-xl border border-teal-100 text-xs">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-teal-700" />
              <div>
                <span className="text-slate-500 block">{isFa ? 'روزهای حضور:' : 'Clinic Days:'}</span>
                <span className="font-bold text-slate-900">{doctor.availableDays[lang]}</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-teal-700" />
              <div>
                <span className="text-slate-500 block">{isFa ? 'محل ویزیت:' : 'Location:'}</span>
                <span className="font-bold text-slate-900">{doctor.roomNumber}</span>
              </div>
            </div>
          </div>

          {/* Booking CTA Button */}
          <div className="pt-2">
            <button
              onClick={() => {
                onClose();
                onBook(doctor.id);
              }}
              className="w-full py-3 bg-teal-700 hover:bg-teal-800 text-white font-bold text-xs rounded-xl transition-colors shadow-xs flex items-center justify-center gap-2"
            >
              <span>{isFa ? `دریافت نوبت ویزیت با ${doctor.name[lang]}` : `Book Appointment with ${doctor.name[lang]}`}</span>
              <ArrowIcon className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
