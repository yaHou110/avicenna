'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import {
  X,
  Calendar,
  Clock,
  User,
  Phone,
  CreditCard,
  CheckCircle2,
  AlertCircle,
  ShieldCheck,
  Stethoscope,
  ChevronRight,
  ChevronLeft,
  Copy,
  Check,
} from 'lucide-react';
import { Language, Doctor } from '../lib/types';
import { DOCTORS } from '../lib/data';
import { appointmentEngine } from '../lib/appointment-engine';

interface AppointmentBookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: Language;
  preselectedDoctorId?: string;
  onOpenPatientPortal?: () => void;
}

export const AppointmentBookingModal: React.FC<AppointmentBookingModalProps> = ({
  isOpen,
  onClose,
  lang,
  preselectedDoctorId,
  onOpenPatientPortal,
}) => {
  const isFa = lang === 'fa';
  const NextIcon = isFa ? ChevronLeft : ChevronRight;
  const PrevIcon = isFa ? ChevronRight : ChevronLeft;

  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
  const [selectedDoctorId, setSelectedDoctorId] = useState<string>(
    preselectedDoctorId || DOCTORS[0].id
  );
  const [selectedDate, setSelectedDate] = useState<string>('1403/07/20');
  const [selectedSlot, setSelectedSlot] = useState<string>('10:00');

  // Patient inputs
  const [patientName, setPatientName] = useState('');
  const [patientNationalId, setPatientNationalId] = useState('');
  const [patientPhone, setPatientPhone] = useState('');
  const [patientNotes, setPatientNotes] = useState('');

  // Booking result
  const [bookingResult, setBookingResult] = useState<{
    trackingCode: string;
    doctorName: string;
    slot: string;
    date: string;
  } | null>(null);

  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [copiedCode, setCopiedCode] = useState(false);

  if (!isOpen) return null;

  const selectedDoctor = DOCTORS.find((d) => d.id === selectedDoctorId) || DOCTORS[0];

  const availableDates = [
    { label: isFa ? 'شنبه ۲۰ مهر' : 'Sat Oct 12', val: '1403/07/20' },
    { label: isFa ? 'دوشنبه ۲۲ مهر' : 'Mon Oct 14', val: '1403/07/22' },
    { label: isFa ? 'چهارشنبه ۲۴ مهر' : 'Wed Oct 16', val: '1403/07/24' },
  ];

  const handleHoldAndProceed = () => {
    setErrorMsg(null);
    const hold = appointmentEngine.holdSlot(selectedDoctorId, selectedDate, selectedSlot, 'user-sess-1');
    if (!hold.success) {
      setErrorMsg(hold.message);
      return;
    }
    setStep(3);
  };

  const handleFinalBooking = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    if (!patientName.trim() || !patientNationalId.trim() || !patientPhone.trim()) {
      setErrorMsg(isFa ? 'لطفاً تمامی فیلدهای الزامی را پر نمایید.' : 'Please fill all mandatory fields.');
      return;
    }

    const res = appointmentEngine.bookAppointment({
      doctorId: selectedDoctorId,
      patientName,
      patientNationalId,
      patientPhone,
      date: selectedDate,
      slot: selectedSlot,
      sessionId: 'user-sess-1',
      notes: patientNotes,
    });

    if (res.success && res.appointment) {
      setBookingResult({
        trackingCode: res.appointment.trackingCode,
        doctorName: selectedDoctor.name[lang],
        slot: res.appointment.slot,
        date: res.appointment.date,
      });
      setStep(4);
    } else {
      setErrorMsg(res.error || (isFa ? 'رزرو ناموفق بود.' : 'Booking failed.'));
    }
  };

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
      <div className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[90vh]">
        {/* Modal Header */}
        <div className="px-6 py-4.5 bg-slate-900 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-teal-500 text-slate-950 flex items-center justify-center font-bold">
              <Calendar className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-black">
                {isFa ? 'سامانه نوبت‌دهی رزرواسیون درمان' : 'Clinical Scheduling System'}
              </h3>
              <p className="text-[11px] text-teal-300">
                {isFa ? 'رزرو تاییدشده برخط با ضمانت پیشگیری از تداخل (ACID)' : 'Concurrency-Safe Transactional Booking Engine'}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Multi-step Progress Bar */}
        <div className="bg-slate-100 px-6 py-2.5 border-b border-slate-200 flex items-center justify-between text-xs font-semibold text-slate-500">
          <span className={step === 1 ? 'text-teal-700 font-bold' : ''}>
            {isFa ? '۱. انتخاب پزشک' : '1. Doctor'}
          </span>
          <span>&gt;</span>
          <span className={step === 2 ? 'text-teal-700 font-bold' : ''}>
            {isFa ? '۲. زمان ویزیت' : '2. Date & Slot'}
          </span>
          <span>&gt;</span>
          <span className={step === 3 ? 'text-teal-700 font-bold' : ''}>
            {isFa ? '۳. مشخصات بیمار' : '3. Patient Details'}
          </span>
          <span>&gt;</span>
          <span className={step === 4 ? 'text-emerald-700 font-bold' : ''}>
            {isFa ? '۴. کد رهگیری' : '4. Confirmation'}
          </span>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto flex-1">
          {errorMsg && (
            <div className="mb-4 bg-rose-50 border border-rose-200 text-rose-800 p-3 rounded-xl text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* STEP 1: Doctor Choice */}
          {step === 1 && (
            <div className="space-y-4">
              <div className="text-sm font-bold text-slate-900 mb-2">
                {isFa ? 'انتخاب پزشک معالج یا استاد مشاور:' : 'Select Attending Specialist:'}
              </div>

              <div className="space-y-2.5">
                {DOCTORS.map((doc) => (
                  <div
                    key={doc.id}
                    onClick={() => setSelectedDoctorId(doc.id)}
                    className={`p-3.5 rounded-2xl border cursor-pointer transition-all flex items-center justify-between gap-3 ${
                      selectedDoctorId === doc.id
                        ? 'border-teal-600 bg-teal-50/60 ring-2 ring-teal-600/20'
                        : 'border-slate-200 hover:bg-slate-50'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Image
                        src={doc.avatar}
                        alt={doc.name[lang]}
                        width={48}
                        height={48}
                        unoptimized
                        className="w-12 h-12 rounded-xl object-cover border border-slate-200"
                        referrerPolicy="no-referrer"
                      />
                      <div>
                        <div className="text-sm font-black text-slate-900">{doc.name[lang]}</div>
                        <div className="text-xs text-teal-800 font-semibold">{doc.specialty[lang]}</div>
                        <div className="text-[11px] text-slate-500 font-mono">{doc.medicalCouncilCode}</div>
                      </div>
                    </div>
                    <div className="text-end text-xs">
                      <span className="font-bold text-slate-700 block">{doc.availableDays[lang]}</span>
                      <span className="text-[10px] text-emerald-600 font-semibold">{isFa ? 'اسلات فعال' : 'Slots Open'}</span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="pt-4 flex justify-end">
                <button
                  onClick={() => setStep(2)}
                  className="inline-flex items-center gap-2 bg-teal-700 hover:bg-teal-800 text-white text-xs font-bold px-6 py-2.5 rounded-xl transition-colors"
                >
                  <span>{isFa ? 'مرحله بعد: زمان ویزیت' : 'Next: Choose Slot'}</span>
                  <NextIcon className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 2: Slot Selection */}
          {step === 2 && (
            <div className="space-y-5">
              <div className="flex items-center gap-3 bg-slate-50 p-3 rounded-2xl border border-slate-200">
                <Image
                  src={selectedDoctor.avatar}
                  alt={selectedDoctor.name[lang]}
                  width={44}
                  height={44}
                  unoptimized
                  className="w-11 h-11 rounded-xl object-cover"
                  referrerPolicy="no-referrer"
                />
                <div>
                  <div className="text-sm font-bold text-slate-900">{selectedDoctor.name[lang]}</div>
                  <div className="text-xs text-slate-500">{selectedDoctor.specialty[lang]} | {selectedDoctor.roomNumber}</div>
                </div>
              </div>

              {/* Date Selection */}
              <div>
                <label className="text-xs font-bold text-slate-700 mb-2 block">
                  {isFa ? 'انتخاب تاریخ ویزیت:' : 'Select Consultation Date:'}
                </label>
                <div className="grid grid-cols-3 gap-2.5">
                  {availableDates.map((dateObj) => (
                    <button
                      key={dateObj.val}
                      onClick={() => setSelectedDate(dateObj.val)}
                      className={`p-3 rounded-xl border text-xs font-bold transition-all text-center ${
                        selectedDate === dateObj.val
                          ? 'bg-teal-700 text-white border-teal-700 shadow-xs'
                          : 'bg-white hover:bg-slate-50 text-slate-700 border-slate-200'
                      }`}
                    >
                      {dateObj.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Slot Selection */}
              <div>
                <label className="text-xs font-bold text-slate-700 mb-2 block">
                  {isFa ? 'ساعت‌های در دسترس (اسلات ۲۰ دقیقه‌ای):' : 'Available Time Slots:'}
                </label>
                <div className="grid grid-cols-3 sm:grid-cols-4 gap-2.5">
                  {selectedDoctor.workingSlots.map((slot) => {
                    const isAvail = appointmentEngine.isSlotAvailable(selectedDoctorId, selectedDate, slot);
                    const isSelected = selectedSlot === slot;
                    return (
                      <button
                        key={slot}
                        disabled={!isAvail}
                        onClick={() => setSelectedSlot(slot)}
                        className={`p-2.5 rounded-xl border text-xs font-bold transition-all text-center flex flex-col items-center justify-center gap-0.5 ${
                          !isAvail
                            ? 'bg-slate-100 text-slate-400 border-slate-200 cursor-not-allowed opacity-60'
                            : isSelected
                            ? 'bg-teal-700 text-white border-teal-700 shadow-xs ring-2 ring-teal-700/20'
                            : 'bg-white hover:bg-teal-50/50 text-slate-800 border-slate-200'
                        }`}
                      >
                        <span>{slot}</span>
                        <span className="text-[9px] font-normal">
                          {isAvail ? (isFa ? 'آزاد' : 'Open') : (isFa ? 'تکمیل' : 'Taken')}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="pt-3 flex items-center justify-between">
                <button
                  onClick={() => setStep(1)}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900"
                >
                  <PrevIcon className="w-4 h-4" />
                  <span>{isFa ? 'بازگشت' : 'Back'}</span>
                </button>
                <button
                  onClick={handleHoldAndProceed}
                  className="inline-flex items-center gap-2 bg-teal-700 hover:bg-teal-800 text-white text-xs font-bold px-6 py-2.5 rounded-xl transition-colors"
                >
                  <span>{isFa ? 'قفل موقت نوبت و مرحله بعد' : 'Hold Slot & Next'}</span>
                  <NextIcon className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: Patient Information Form */}
          {step === 3 && (
            <form onSubmit={handleFinalBooking} className="space-y-4">
              <div className="bg-teal-50 border border-teal-200 p-3 rounded-xl text-xs text-teal-900 flex items-center justify-between">
                <div>
                  <span className="font-bold">{selectedDoctor.name[lang]}</span>
                  <span className="mx-2 text-teal-300">|</span>
                  <span>{selectedDate} ساعت {selectedSlot}</span>
                </div>
                <span className="bg-teal-200/80 text-teal-900 font-mono text-[10px] px-2 py-0.5 rounded font-bold">
                  {isFa ? 'قفل ۵ دقیقه‌ای اسلات' : '5m Slot Lock'}
                </span>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 mb-1 block">
                  {isFa ? 'نام و نام خانوادگی بیمار (الزامی):' : 'Patient Full Name (Mandatory):'}
                </label>
                <input
                  type="text"
                  required
                  value={patientName}
                  onChange={(e) => setPatientName(e.target.value)}
                  placeholder={isFa ? 'مثال: محمد امینی' : 'e.g. John Doe'}
                  className="w-full text-xs font-medium bg-slate-50 border border-slate-200 rounded-xl p-2.5 focus:border-teal-500 focus:outline-hidden"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-slate-700 mb-1 block">
                    {isFa ? 'کد ملی (جهت پرونده سلامت الکترونیک):' : 'National ID / Passport No:'}
                  </label>
                  <input
                    type="text"
                    required
                    value={patientNationalId}
                    onChange={(e) => setPatientNationalId(e.target.value)}
                    placeholder={isFa ? '۰۰۱۹۴۸۲...' : '10-digit ID'}
                    className="w-full text-xs font-medium bg-slate-50 border border-slate-200 rounded-xl p-2.5 focus:border-teal-500 focus:outline-hidden font-mono"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 mb-1 block">
                    {isFa ? 'شماره تلفن همراه (ارسال پیامک تایید):' : 'Mobile Phone (For SMS):'}
                  </label>
                  <input
                    type="tel"
                    required
                    value={patientPhone}
                    onChange={(e) => setPatientPhone(e.target.value)}
                    placeholder={isFa ? '۰۹۱۲...' : '+98 912...'}
                    className="w-full text-xs font-medium bg-slate-50 border border-slate-200 rounded-xl p-2.5 focus:border-teal-500 focus:outline-hidden font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 mb-1 block">
                  {isFa ? 'توضیحات یا سوابق دارویی/پزشکی قبلی (اختیاری):' : 'Medical Notes / Past History (Optional):'}
                </label>
                <textarea
                  rows={2}
                  value={patientNotes}
                  onChange={(e) => setPatientNotes(e.target.value)}
                  placeholder={isFa ? 'داروهای مصرفی، علت اصلی مراجعه...' : 'Current medication, reason for visit...'}
                  className="w-full text-xs font-medium bg-slate-50 border border-slate-200 rounded-xl p-2.5 focus:border-teal-500 focus:outline-hidden"
                />
              </div>

              <div className="pt-2 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900"
                >
                  <PrevIcon className="w-4 h-4" />
                  <span>{isFa ? 'بازگشت' : 'Back'}</span>
                </button>
                <button
                  type="submit"
                  className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold px-7 py-2.5 rounded-xl transition-colors shadow-sm"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>{isFa ? 'ثبت نهایی و صدور رهگیری' : 'Confirm & Generate Code'}</span>
                </button>
              </div>
            </form>
          )}

          {/* STEP 4: Success Confirmation */}
          {step === 4 && bookingResult && (
            <div className="text-center py-4 space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-9 h-9" />
              </div>

              <div>
                <h4 className="text-lg font-black text-slate-900">
                  {isFa ? 'نوبت با موفقیت در سیستم ثبت گردید' : 'Appointment Confirmed Successfully'}
                </h4>
                <p className="text-xs text-slate-500 mt-1">
                  {isFa
                    ? 'پیامک تاییدیه به همراه دستورالعمل‌های آمادگی ارسال گردید.'
                    : 'Confirmation SMS sent with hospital campus navigation.'}
                </p>
              </div>

              {/* Tracking Code Highlight Box */}
              <div className="bg-slate-50 border border-slate-200 p-4 rounded-2xl max-w-sm mx-auto">
                <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                  {isFa ? 'شناسه یکتای رهگیری نوبت:' : 'Unique Appointment Tracking Code:'}
                </div>
                <div className="flex items-center justify-center gap-2">
                  <span className="text-lg font-black font-mono text-teal-800 tracking-wider">
                    {bookingResult.trackingCode}
                  </span>
                  <button
                    onClick={() => handleCopy(bookingResult.trackingCode)}
                    className="p-1 rounded text-slate-400 hover:text-teal-700"
                    title={isFa ? 'کپی کد' : 'Copy'}
                  >
                    {copiedCode ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Booking Summary */}
              <div className="bg-slate-50 text-xs p-3.5 rounded-xl border border-slate-100 max-w-md mx-auto text-start space-y-1.5">
                <div className="flex justify-between">
                  <span className="text-slate-500">{isFa ? 'پزشک معالج:' : 'Doctor:'}</span>
                  <span className="font-bold text-slate-900">{bookingResult.doctorName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">{isFa ? 'تاریخ و ساعت:' : 'Date & Time:'}</span>
                  <span className="font-bold text-slate-900">{bookingResult.date} - ساعت {bookingResult.slot}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">{isFa ? 'محل مراجعه:' : 'Location:'}</span>
                  <span className="font-bold text-slate-900">{selectedDoctor.roomNumber}</span>
                </div>
              </div>

              <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
                {onOpenPatientPortal && (
                  <button
                    onClick={() => {
                      onClose();
                      onOpenPatientPortal();
                    }}
                    className="inline-flex items-center gap-2 bg-teal-700 hover:bg-teal-800 text-white text-xs font-bold px-5 py-2.5 rounded-xl transition-colors"
                  >
                    <span>{isFa ? 'مشاهده در پرتال بیمار' : 'View in Patient Portal'}</span>
                  </button>
                )}
                <button
                  onClick={onClose}
                  className="inline-flex items-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold px-5 py-2.5 rounded-xl transition-colors"
                >
                  <span>{isFa ? 'بستن پنجره' : 'Close Window'}</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
