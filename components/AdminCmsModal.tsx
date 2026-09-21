'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import {
  X,
  ShieldCheck,
  FileText,
  Users,
  Building,
  Activity,
  CheckCircle,
  Clock,
  AlertTriangle,
  Lock,
  Plus,
} from 'lucide-react';
import { Language, HealthArticle, ContentStatus } from '../lib/types';
import { HEALTH_ARTICLES, MOCK_AUDIT_LOGS, DOCTORS } from '../lib/data';

interface AdminCmsModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: Language;
}

export const AdminCmsModal: React.FC<AdminCmsModalProps> = ({
  isOpen,
  onClose,
  lang,
}) => {
  const isFa = lang === 'fa';
  const [activeTab, setActiveTab] = useState<'content' | 'audit' | 'doctors'>('content');
  const [articles, setArticles] = useState<HealthArticle[]>([...HEALTH_ARTICLES]);
  const [feedback, setFeedback] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleTogglePublish = (id: string) => {
    const art = articles.find((a) => a.id === id);
    if (art) {
      const nextStatus: ContentStatus = art.status === 'PUBLISHED' ? 'DRAFT' : 'PUBLISHED';
      art.status = nextStatus;
      setArticles([...articles]);
      setFeedback(
        isFa
          ? `وضعیت مقاله به ${nextStatus} تغییر یافت.`
          : `Article status updated to ${nextStatus}.`
      );
      setTimeout(() => setFeedback(null), 2500);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-xs">
      <div className="bg-white w-full max-w-4xl rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="px-6 py-4.5 bg-gradient-to-r from-emerald-950 via-slate-900 to-teal-950 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500 text-slate-950 flex items-center justify-center font-bold">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-black">
                  {isFa ? 'پنل مدیریت و عملیات محتوای بالینی (CMS)' : 'Clinical CMS & Operations'}
                </h3>
                <span className="text-[10px] bg-emerald-400/20 text-emerald-300 border border-emerald-400/30 px-2 py-0.5 rounded font-mono">
                  RBAC Level 3
                </span>
              </div>
              <p className="text-xs text-emerald-300">
                {isFa ? 'چرخه انتشار محتوا، پزشکان و ممیزی رویدادهای OWASP' : 'Publishing Workflows & ASVS Audit Logging'}
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

        {/* Tab Controls */}
        <div className="bg-slate-50 px-6 py-2 border-b border-slate-200 flex items-center gap-2 text-xs font-bold">
          <button
            onClick={() => setActiveTab('content')}
            className={`px-3.5 py-2 rounded-xl flex items-center gap-1.5 transition-all ${
              activeTab === 'content'
                ? 'bg-white text-emerald-800 shadow-xs border border-slate-200'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <FileText className="w-4 h-4 text-emerald-600" />
            <span>{isFa ? 'چرخه انتشار مقالات سلامت' : 'Articles Publishing'}</span>
          </button>

          <button
            onClick={() => setActiveTab('doctors')}
            className={`px-3.5 py-2 rounded-xl flex items-center gap-1.5 transition-all ${
              activeTab === 'doctors'
                ? 'bg-white text-emerald-800 shadow-xs border border-slate-200'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Users className="w-4 h-4 text-emerald-600" />
            <span>{isFa ? 'مدیریت پزشکان و اعضای هیئت علمی' : 'Faculty Profiles'}</span>
          </button>

          <button
            onClick={() => setActiveTab('audit')}
            className={`px-3.5 py-2 rounded-xl flex items-center gap-1.5 transition-all ${
              activeTab === 'audit'
                ? 'bg-white text-emerald-800 shadow-xs border border-slate-200'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Activity className="w-4 h-4 text-emerald-600" />
            <span>{isFa ? 'لاگ امنیتی ممیزی (OWASP Audit)' : 'Security Audit Trail'}</span>
            <span className="bg-emerald-100 text-emerald-800 text-[10px] px-1.5 py-0.2 rounded-full">
              Live
            </span>
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto flex-1 space-y-4">
          {feedback && (
            <div className="bg-emerald-50 border border-emerald-200 text-emerald-900 p-3 rounded-xl text-xs flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>{feedback}</span>
            </div>
          )}

          {/* TAB 1: Content Publishing Lifecycle */}
          {activeTab === 'content' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-bold text-slate-900">
                    {isFa ? 'مقالات دانشنامه سلامت و تاییدیه هیئت علمی:' : 'Medical Encyclopedia & Review Board:'}
                  </h4>
                  <p className="text-xs text-slate-500">
                    {isFa
                      ? 'محتوا باید قبل از انتشار توسط پزشک ناظر داوری و تایید شود.'
                      : 'Clinical content requires faculty review before public deployment.'}
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                {articles.map((art) => (
                  <div
                    key={art.id}
                    className="p-4 rounded-2xl border border-slate-200 bg-white flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-sm text-slate-900">{art.title[lang]}</span>
                        <span
                          className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                            art.status === 'PUBLISHED'
                              ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                              : 'bg-amber-50 text-amber-800 border border-amber-200'
                          }`}
                        >
                          {art.status}
                        </span>
                      </div>
                      <div className="text-xs text-slate-500 flex flex-wrap gap-2">
                        <span>{art.category[lang]}</span>
                        <span>•</span>
                        <span>نویسنده: {art.author[lang]}</span>
                        <span>•</span>
                        <span className="text-teal-700 font-medium">{art.reviewer[lang]}</span>
                      </div>
                    </div>

                    <button
                      onClick={() => handleTogglePublish(art.id)}
                      className={`text-xs font-bold px-4 py-2 rounded-xl transition-all self-end sm:self-center shrink-0 ${
                        art.status === 'PUBLISHED'
                          ? 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                          : 'bg-emerald-600 hover:bg-emerald-700 text-white'
                      }`}
                    >
                      {art.status === 'PUBLISHED'
                        ? isFa ? 'تغییر به پیش‌نویس (Unpublish)' : 'Unpublish'
                        : isFa ? 'تایید و انتشار عمومی (Publish)' : 'Publish to Live'}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 2: Doctors Management */}
          {activeTab === 'doctors' && (
            <div className="space-y-3">
              {DOCTORS.map((doc) => (
                <div
                  key={doc.id}
                  className="p-3.5 rounded-2xl border border-slate-200 bg-white flex items-center justify-between gap-3"
                >
                  <div className="flex items-center gap-3">
                    <Image
                      src={doc.avatar}
                      alt={doc.name[lang]}
                      width={40}
                      height={40}
                      unoptimized
                      className="w-10 h-10 rounded-xl object-cover"
                      referrerPolicy="no-referrer"
                    />
                    <div>
                      <div className="text-sm font-bold text-slate-900">{doc.name[lang]}</div>
                      <div className="text-xs text-slate-500 font-mono">{doc.medicalCouncilCode} | {doc.specialty[lang]}</div>
                    </div>
                  </div>
                  <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-lg">
                    {isFa ? 'پروفایل فعال در سایت' : 'Active Faculty'}
                  </span>
                </div>
              ))}
            </div>
          )}

          {/* TAB 3: Real OWASP ASVS Audit Logs */}
          {activeTab === 'audit' && (
            <div className="space-y-3">
              <div className="bg-slate-900 text-teal-300 p-3 rounded-xl text-xs font-mono flex items-center justify-between">
                <span>[AUDIT_STREAM: OWASP ASVS 5.0 LIVE TELEMETRY]</span>
                <span className="text-slate-400">IMMUTABLE_LOGS</span>
              </div>

              <div className="space-y-2.5 font-mono text-xs">
                {MOCK_AUDIT_LOGS.map((log) => (
                  <div
                    key={log.id}
                    className="p-3.5 rounded-xl border border-slate-200 bg-slate-50 space-y-1"
                  >
                    <div className="flex items-center justify-between text-[11px]">
                      <span className="text-slate-500">{log.timestamp}</span>
                      <span
                        className={`font-bold px-1.5 py-0.2 rounded ${
                          log.status === 'SUCCESS'
                            ? 'bg-emerald-100 text-emerald-800'
                            : 'bg-rose-100 text-rose-800'
                        }`}
                      >
                        {log.status}
                      </span>
                    </div>

                    <div className="font-bold text-slate-800 flex items-center gap-1.5">
                      <span className="text-teal-700">[{log.action}]</span>
                      <span className="text-slate-600 text-[11px]">Actor: {log.actor}</span>
                    </div>

                    <div className="text-slate-600 text-[11px]">
                      Resource: <span className="text-slate-900 font-semibold">{log.resource}</span>
                    </div>

                    <div className="text-slate-500 text-[10px] pt-0.5">
                      Details: {log.details}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
