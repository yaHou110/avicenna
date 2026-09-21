'use client';

import React, { useState } from 'react';
import {
  X,
  UserCheck,
  Calendar,
  FileText,
  CreditCard,
  Bell,
  Download,
  Clock,
  ShieldCheck,
  AlertCircle,
  CheckCircle2,
  Trash2,
  RefreshCw,
} from 'lucide-react';
import { Language, AppointmentRecord } from '../lib/types';
import { MOCK_LAB_RESULTS } from '../lib/data';
import { appointmentEngine } from '../lib/appointment-engine';

interface PatientPortalModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: Language;
}

export const PatientPortalModal: React.FC<PatientPortalModalProps> = ({
  isOpen,
  onClose,
  lang,
}) => {
  const isFa = lang === 'fa';
  const [activeTab, setActiveTab] = useState<'appointments' | 'lab' | 'invoices' | 'ehr'>('appointments');
  const [appointments, setAppointments] = useState<AppointmentRecord[]>(
    appointmentEngine.getAppointments()
  );
  const [actionSuccessMsg, setActionSuccessMsg] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleCancelApt = (id: string) => {
    const res = appointmentEngine.cancelAppointment(id, 'درخواست لغو از طریق پرتال بیمار');
    if (res.success) {
      setAppointments(appointmentEngine.getAppointments());
      setActionSuccessMsg(isFa ? 'نوبت با موفقیت لغو شد.' : 'Appointment cancelled successfully.');
      setTimeout(() => setActionSuccessMsg(null), 3000);
    }
  };

  const handleRescheduleApt = (id: string) => {
    // Switch to alternate slot for demo
    const res = appointmentEngine.rescheduleAppointment(id, '1403/07/28', '11:00');
    if (res.success) {
      setAppointments(appointmentEngine.getAppointments());
      setActionSuccessMsg(isFa ? 'نوبت به تاریخ ۱۴۰۳/۰۷/۲۸ ساعت ۱۱:۰۰ منتقل شد.' : 'Appointment rescheduled to Oct 19 at 11:00.');
      setTimeout(() => setActionSuccessMsg(null), 3000);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-xs">
      <div className="bg-white w-full max-w-4xl rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="px-6 py-4.5 bg-gradient-to-r from-sky-900 to-slate-900 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-sky-500 text-slate-950 flex items-center justify-center font-bold">
              <UserCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-black">
                  {isFa ? 'پرتال یکپارچه بیمار (Patient Portal)' : 'Avicenna Patient Portal'}
                </h3>
                <span className="text-[10px] bg-sky-400/20 text-sky-200 border border-sky-400/30 px-1.5 py-0.5 rounded font-mono">
                  OWASP ASVS Verified
                </span>
              </div>
              <p className="text-xs text-sky-300">
                {isFa ? 'بیمار: علی‌رضا مرادی (کد ملی: ۰۰۱۹۴۸۲۰۱۱)' : 'Patient: Alireza Moradi (ID: 0019482011)'}
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

        {/* Tab Navigation */}
        <div className="bg-slate-50 px-6 py-2 border-b border-slate-200 flex items-center gap-2 overflow-x-auto text-xs font-bold">
          <button
            onClick={() => setActiveTab('appointments')}
            className={`px-3.5 py-2 rounded-xl flex items-center gap-1.5 transition-all whitespace-nowrap ${
              activeTab === 'appointments'
                ? 'bg-white text-sky-800 shadow-xs border border-slate-200'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Calendar className="w-4 h-4 text-sky-600" />
            <span>{isFa ? 'نوبت‌های من و پیگیری' : 'My Appointments'}</span>
            <span className="bg-sky-100 text-sky-800 text-[10px] px-1.5 py-0.2 rounded-full">
              {appointments.filter((a) => a.status !== 'CANCELLED').length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('lab')}
            className={`px-3.5 py-2 rounded-xl flex items-center gap-1.5 transition-all whitespace-nowrap ${
              activeTab === 'lab'
                ? 'bg-white text-sky-800 shadow-xs border border-slate-200'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <FileText className="w-4 h-4 text-sky-600" />
            <span>{isFa ? 'جواب آزمایش و تصاویر PACS' : 'Diagnostic Reports & PACS'}</span>
            <span className="bg-emerald-100 text-emerald-800 text-[10px] px-1.5 py-0.2 rounded-full">
              ۲ آماده
            </span>
          </button>

          <button
            onClick={() => setActiveTab('invoices')}
            className={`px-3.5 py-2 rounded-xl flex items-center gap-1.5 transition-all whitespace-nowrap ${
              activeTab === 'invoices'
                ? 'bg-white text-sky-800 shadow-xs border border-slate-200'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <CreditCard className="w-4 h-4 text-sky-600" />
            <span>{isFa ? 'صورت‌حساب‌ها و پرداخت‌ها' : 'Invoices & Copay'}</span>
          </button>

          <button
            onClick={() => setActiveTab('ehr')}
            className={`px-3.5 py-2 rounded-xl flex items-center gap-1.5 transition-all whitespace-nowrap ${
              activeTab === 'ehr'
                ? 'bg-white text-sky-800 shadow-xs border border-slate-200'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <ShieldCheck className="w-4 h-4 text-sky-600" />
            <span>{isFa ? 'خلاصه پرونده الکترونیک (EHR)' : 'EHR Health Summary'}</span>
          </button>
        </div>

        {/* Content Area */}
        <div className="p-6 overflow-y-auto flex-1 space-y-4">
          {actionSuccessMsg && (
            <div className="bg-emerald-50 border border-emerald-200 text-emerald-900 p-3 rounded-xl text-xs flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>{actionSuccessMsg}</span>
            </div>
          )}

          {/* TAB 1: Appointments */}
          {activeTab === 'appointments' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-bold text-slate-900">
                  {isFa ? 'فهرست نوبت‌های ثبت‌شده در بیمارستان ابن‌سینا:' : 'Registered Outpatient & Clinic Bookings:'}
                </h4>
                <span className="text-[11px] text-slate-500 font-mono">
                  {isFa ? 'اتصال مستقیم به ماشین حالت نوبت‌دهی (Phase 8)' : 'Direct Phase 8 State Machine'}
                </span>
              </div>

              <div className="space-y-3">
                {appointments.map((apt) => (
                  <div
                    key={apt.id}
                    className="p-4 rounded-2xl border border-slate-200 bg-white hover:border-slate-300 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-2xs"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-sm text-slate-900">{apt.serviceName[lang]}</span>
                        <span
                          className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                            apt.status === 'CONFIRMED'
                              ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                              : apt.status === 'RESCHEDULED'
                              ? 'bg-amber-50 text-amber-800 border border-amber-200'
                              : 'bg-slate-100 text-slate-600'
                          }`}
                        >
                          {apt.status}
                        </span>
                      </div>

                      <div className="text-xs text-slate-600 flex flex-wrap items-center gap-3">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3.5 h-3.5 text-teal-600" />
                          <span>{apt.date} - ساعت {apt.slot}</span>
                        </span>
                        <span>|</span>
                        <span className="font-mono text-slate-500">
                          {isFa ? 'کد رهگیری:' : 'Ref:'} {apt.trackingCode}
                        </span>
                      </div>

                      {apt.notes && (
                        <div className="text-[11px] text-slate-500 bg-slate-50 p-2 rounded-lg mt-1">
                          {apt.notes}
                        </div>
                      )}
                    </div>

                    {/* Action Buttons */}
                    {apt.status !== 'CANCELLED' && apt.status !== 'COMPLETED' && (
                      <div className="flex items-center gap-2 self-end sm:self-center shrink-0">
                        <button
                          onClick={() => handleRescheduleApt(apt.id)}
                          className="inline-flex items-center gap-1 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold px-3 py-1.5 rounded-xl transition-colors"
                          title={isFa ? 'انتقال به نوبت خالی بعدی' : 'Reschedule to next available slot'}
                        >
                          <RefreshCw className="w-3 h-3" />
                          <span>{isFa ? 'جابه‌جایی نوبت' : 'Reschedule'}</span>
                        </button>
                        <button
                          onClick={() => handleCancelApt(apt.id)}
                          className="inline-flex items-center gap-1 bg-rose-50 hover:bg-rose-100 text-rose-700 text-xs font-semibold px-3 py-1.5 rounded-xl transition-colors"
                          title={isFa ? 'لغو قطعی نوبت' : 'Cancel Appointment'}
                        >
                          <Trash2 className="w-3 h-3" />
                          <span>{isFa ? 'لغو' : 'Cancel'}</span>
                        </button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 2: Diagnostic Reports */}
          {activeTab === 'lab' && (
            <div className="space-y-4">
              <div className="bg-sky-50 border border-sky-200 text-sky-900 p-3 rounded-xl text-xs flex items-center justify-between">
                <span>
                  {isFa
                    ? 'گزارش‌های تشخیصی دارای امضای الکترونیک پزشک و کد امنیتی QR هستند.'
                    : 'Reports carry digital cryptographic signatures and verified QR verification.'}
                </span>
                <span className="text-[10px] font-mono bg-sky-200/80 px-2 py-0.5 rounded">
                  ISO 15189 Lab
                </span>
              </div>

              <div className="space-y-3">
                {MOCK_LAB_RESULTS.map((res) => (
                  <div
                    key={res.id}
                    className="p-4 rounded-2xl border border-slate-200 bg-white flex items-center justify-between gap-4"
                  >
                    <div>
                      <div className="text-sm font-bold text-slate-900 mb-1">
                        {res.testName[lang]}
                      </div>
                      <div className="text-xs text-slate-500 space-x-2">
                        <span>{res.laboratorySection[lang]}</span>
                        <span>•</span>
                        <span>{res.doctorName[lang]}</span>
                        <span>•</span>
                        <span>{res.date}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      {res.status === 'READY' ? (
                        <button
                          onClick={() =>
                            alert(
                              isFa
                                ? `دانلود امن پرونده با توکن اختصاصی: ${res.downloadToken} (OWASP ASVS 8.3)`
                                : `Downloading encrypted file with token: ${res.downloadToken}`
                            )
                          }
                          className="inline-flex items-center gap-1.5 bg-teal-700 hover:bg-teal-800 text-white text-xs font-semibold px-3.5 py-2 rounded-xl transition-colors"
                        >
                          <Download className="w-3.5 h-3.5" />
                          <span>{isFa ? 'دریافت PDF' : 'Download'}</span>
                          <span className="text-[10px] opacity-75">({res.fileSize})</span>
                        </button>
                      ) : (
                        <span className="text-xs font-semibold text-amber-700 bg-amber-50 border border-amber-200 px-3 py-1.5 rounded-xl">
                          {isFa ? 'در حال پاتولوژی / آنالیز' : 'Analyzing'}
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: Invoices */}
          {activeTab === 'invoices' && (
            <div className="space-y-3">
              <div className="border border-slate-200 rounded-2xl p-4 bg-slate-50 flex items-center justify-between">
                <div>
                  <div className="text-xs font-bold text-slate-500">{isFa ? 'صورت‌حساب ویزیت و اکوکاردیوگرافی' : 'Visit & Echocardiography Invoice'}</div>
                  <div className="text-sm font-black text-slate-900 font-mono">INV-2024-88190</div>
                  <div className="text-xs text-slate-500">تاریخ: ۱۴۰۳/۰۶/۲۵ - بیمه تکمیلی SOS</div>
                </div>
                <div className="text-end">
                  <div className="text-sm font-black text-teal-800 font-mono">۱,۴۵۰,۰۰۰ تومان</div>
                  <span className="inline-block text-[10px] font-bold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-md mt-1">
                    {isFa ? 'تسویه شده آنلاین' : 'Settled Online'}
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: EHR Summary */}
          {activeTab === 'ehr' && (
            <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-4">
              <h5 className="text-xs font-bold text-slate-900 uppercase">
                {isFa ? 'مشخصات بالینی ثبت‌شده در پایگاه داده سلامت ابن‌سینا:' : 'Electronic Health Record Overview:'}
              </h5>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                <div className="bg-white p-3 rounded-xl border border-slate-200">
                  <div className="text-slate-400 mb-1">{isFa ? 'گروه خونی:' : 'Blood Group:'}</div>
                  <div className="font-bold text-slate-900 font-mono text-sm">A + (Positive)</div>
                </div>
                <div className="bg-white p-3 rounded-xl border border-slate-200">
                  <div className="text-slate-400 mb-1">{isFa ? 'حساسیت دارویی:' : 'Drug Allergy:'}</div>
                  <div className="font-bold text-rose-700">{isFa ? 'پنی‌سیلین (تاییدشده)' : 'Penicillin (Confirmed)'}</div>
                </div>
                <div className="bg-white p-3 rounded-xl border border-slate-200">
                  <div className="text-slate-400 mb-1">{isFa ? 'پزشک خانواده:' : 'Family Physician:'}</div>
                  <div className="font-bold text-slate-900">{isFa ? 'دکتر شیوا رادمنش' : 'Dr. Radmanesh'}</div>
                </div>
                <div className="bg-white p-3 rounded-xl border border-slate-200">
                  <div className="text-slate-400 mb-1">{isFa ? 'تماس اضطراری:' : 'Emergency ICE:'}</div>
                  <div className="font-bold text-slate-900 font-mono">۰۹۱۲۳۴۵۶۷۸۸</div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
