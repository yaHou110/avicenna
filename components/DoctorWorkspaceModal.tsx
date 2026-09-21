'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import {
  X,
  Stethoscope,
  Calendar,
  Clock,
  UserCheck,
  CheckCircle,
  AlertTriangle,
  PlayCircle,
  CheckCircle2,
  FileCheck,
  ShieldCheck,
  Building,
} from 'lucide-react';
import { Language, AppointmentRecord } from '../lib/types';
import { DOCTORS } from '../lib/data';
import { appointmentEngine } from '../lib/appointment-engine';

interface DoctorWorkspaceModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: Language;
}

export const DoctorWorkspaceModal: React.FC<DoctorWorkspaceModalProps> = ({
  isOpen,
  onClose,
  lang,
}) => {
  const isFa = lang === 'fa';
  const currentDoctor = DOCTORS[0]; // Prof. Keyhani

  const [doctorAppointments, setDoctorAppointments] = useState<AppointmentRecord[]>(
    appointmentEngine.getDoctorAppointments(currentDoctor.id)
  );

  const [activePatientContext, setActivePatientContext] = useState<AppointmentRecord | null>(null);
  const [statusMsg, setStatusMsg] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleUpdateStatus = (id: string, newStatus: AppointmentRecord['status']) => {
    const target = doctorAppointments.find((a) => a.id === id);
    if (target) {
      target.status = newStatus;
      setDoctorAppointments([...doctorAppointments]);
      setStatusMsg(
        isFa
          ? `وضعیت نوبت به ${newStatus} به‌روزرسانی و در پرونده ثبت شد.`
          : `Status updated to ${newStatus} with audit signature.`
      );
      setTimeout(() => setStatusMsg(null), 3000);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-xs">
      <div className="bg-white w-full max-w-4xl rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="px-6 py-4.5 bg-gradient-to-r from-indigo-950 via-slate-900 to-teal-950 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Image
              src={currentDoctor.avatar}
              alt={currentDoctor.name[lang]}
              width={44}
              height={44}
              unoptimized
              className="w-11 h-11 rounded-xl object-cover border-2 border-indigo-400"
              referrerPolicy="no-referrer"
            />
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-black">
                  {currentDoctor.name[lang]}
                </h3>
                <span className="text-[10px] bg-indigo-400/20 text-indigo-200 border border-indigo-400/30 px-2 py-0.5 rounded font-mono">
                  {currentDoctor.medicalCouncilCode}
                </span>
              </div>
              <p className="text-xs text-indigo-300">
                {currentDoctor.specialty[lang]} | {currentDoctor.roomNumber}
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

        {/* Workspace Body */}
        <div className="p-6 overflow-y-auto flex-1 space-y-5">
          {statusMsg && (
            <div className="bg-emerald-50 border border-emerald-200 text-emerald-900 p-3 rounded-xl text-xs flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>{statusMsg}</span>
            </div>
          )}

          {/* Queue Overview Banner */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="bg-slate-50 border border-slate-200 p-3.5 rounded-2xl text-center">
              <div className="text-xs text-slate-500 mb-0.5">{isFa ? 'نوبت‌های امروز' : "Today's Total"}</div>
              <div className="text-xl font-black text-slate-900 font-mono">{doctorAppointments.length}</div>
            </div>
            <div className="bg-emerald-50 border border-emerald-200 p-3.5 rounded-2xl text-center">
              <div className="text-xs text-emerald-700 mb-0.5">{isFa ? 'در انتظار ویزیت' : 'Waiting Queue'}</div>
              <div className="text-xl font-black text-emerald-800 font-mono">
                {doctorAppointments.filter((a) => a.status === 'CONFIRMED').length}
              </div>
            </div>
            <div className="bg-sky-50 border border-sky-200 p-3.5 rounded-2xl text-center">
              <div className="text-xs text-sky-700 mb-0.5">{isFa ? 'ویزیت تکمیل‌شده' : 'Completed'}</div>
              <div className="text-xl font-black text-sky-800 font-mono">
                {doctorAppointments.filter((a) => a.status === 'COMPLETED').length}
              </div>
            </div>
            <div className="bg-amber-50 border border-amber-200 p-3.5 rounded-2xl text-center">
              <div className="text-xs text-amber-700 mb-0.5">{isFa ? 'ساعات کاری شیفت' : 'Shift Duration'}</div>
              <div className="text-sm font-black text-amber-800 font-mono">۰۹:۰۰ الی ۱۳:۰۰</div>
            </div>
          </div>

          {/* Today's Live Clinical Queue */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <Clock className="w-4 h-4 text-indigo-600" />
              <span>{isFa ? 'صف ویزیت بیماران امروز (بر اساس زمان اسلات):' : "Today's Patient Consultation Queue:"}</span>
            </h4>

            <div className="space-y-2.5">
              {doctorAppointments.map((apt) => (
                <div
                  key={apt.id}
                  className={`p-4 rounded-2xl border transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                    activePatientContext?.id === apt.id
                      ? 'border-indigo-600 bg-indigo-50/40 ring-2 ring-indigo-500/20'
                      : 'border-slate-200 bg-white hover:border-slate-300'
                  }`}
                >
                  <div>
                    <div className="flex items-center gap-2.5 mb-1">
                      <span className="font-mono text-xs font-black bg-slate-100 text-slate-800 px-2 py-0.5 rounded">
                        {apt.slot}
                      </span>
                      <span className="font-bold text-sm text-slate-900">{apt.patientName}</span>
                      <span className="text-xs text-slate-400 font-mono">({apt.patientNationalId})</span>
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                          apt.status === 'COMPLETED'
                            ? 'bg-emerald-100 text-emerald-800'
                            : apt.status === 'CONFIRMED'
                            ? 'bg-sky-100 text-sky-800'
                            : 'bg-slate-100 text-slate-600'
                        }`}
                      >
                        {apt.status}
                      </span>
                    </div>
                    <div className="text-xs text-slate-500">
                      <span>{apt.serviceName[lang]}</span>
                      {apt.notes && <span className="ms-2 text-indigo-600 font-medium">• {apt.notes}</span>}
                    </div>
                  </div>

                  {/* Actions for this patient visit */}
                  <div className="flex items-center gap-2 self-end sm:self-center shrink-0">
                    <button
                      onClick={() => setActivePatientContext(apt)}
                      className="text-xs font-semibold px-3 py-1.5 rounded-xl border border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-700 transition-colors"
                    >
                      {isFa ? 'پرونده بیمار' : 'Patient Context'}
                    </button>

                    {apt.status !== 'COMPLETED' && (
                      <button
                        onClick={() => handleUpdateStatus(apt.id, 'COMPLETED')}
                        className="inline-flex items-center gap-1 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold px-3.5 py-1.5 rounded-xl transition-colors shadow-xs"
                      >
                        <CheckCircle className="w-3.5 h-3.5" />
                        <span>{isFa ? 'پایان ویزیت' : 'Complete Visit'}</span>
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Relationship-Aware Patient Context Drawer */}
          {activePatientContext && (
            <div className="bg-slate-900 text-white p-5 rounded-2xl border border-slate-800 space-y-3 mt-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <FileCheck className="w-4 h-4 text-teal-400" />
                  <span className="text-xs font-bold text-teal-300 uppercase">
                    {isFa ? 'بافت بالینی مجاز بیمار (OWASP Zero-Trust Policy):' : 'Authorized Patient Clinical Context:'}
                  </span>
                </div>
                <button
                  onClick={() => setActivePatientContext(null)}
                  className="text-xs text-slate-400 hover:text-white"
                >
                  {isFa ? 'بستن پرونده' : 'Close Context'}
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                <div className="bg-white/5 p-3 rounded-xl border border-white/10">
                  <div className="text-slate-400 mb-0.5">{isFa ? 'شناسه پرونده:' : 'Patient File ID:'}</div>
                  <div className="font-bold text-white font-mono">EHR-2024-{activePatientContext.patientNationalId}</div>
                </div>
                <div className="bg-white/5 p-3 rounded-xl border border-white/10">
                  <div className="text-slate-400 mb-0.5">{isFa ? 'شماره تماس ثبت‌شده:' : 'Verified Contact:'}</div>
                  <div className="font-bold text-white font-mono">{activePatientContext.patientPhone}</div>
                </div>
                <div className="bg-white/5 p-3 rounded-xl border border-white/10">
                  <div className="text-slate-400 mb-0.5">{isFa ? 'سطح مجوز پزشک معالج:' : 'Practitioner Clearance:'}</div>
                  <div className="font-bold text-emerald-400">Attending_Specialist_Active</div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
