'use client';

import React, { useState, useEffect } from 'react';
import { Language, WorkspaceView, Doctor, CheckupPackage } from '../lib/types';
import { Header } from '../components/Header';
import { HeroSearch } from '../components/HeroSearch';
import { CommercialTiersSection } from '../components/CommercialTiersSection';
import { CentersOfExcellence } from '../components/CentersOfExcellence';
import { DoctorDirectory } from '../components/DoctorDirectory';
import { AdvancedFacilities } from '../components/AdvancedFacilities';
import { HealthPackages } from '../components/HealthPackages';
import { HealthArticlesSection } from '../components/HealthArticlesSection';
import { CampusGuide } from '../components/CampusGuide';
import { Footer } from '../components/Footer';

// Interactive Workspaces & Booking Engines
import { AppointmentBookingModal } from '../components/AppointmentBookingModal';
import { PatientPortalModal } from '../components/PatientPortalModal';
import { DoctorWorkspaceModal } from '../components/DoctorWorkspaceModal';
import { AdminCmsModal } from '../components/AdminCmsModal';
import { CommercialTiersModal } from '../components/CommercialTiersModal';
import { DoctorProfileModal } from '../components/DoctorProfileModal';

export default function HomePage() {
  const [lang, setLang] = useState<Language>('fa');
  const [currentWorkspace, setCurrentWorkspace] = useState<WorkspaceView>('public');

  // Booking Modal state
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [preselectedDoctorId, setPreselectedDoctorId] = useState<string | undefined>(undefined);

  // Doctor Detail Profile Modal
  const [selectedDoctorForProfile, setSelectedDoctorForProfile] = useState<Doctor | null>(null);

  // Sync document direction and lang attribute whenever language toggles
  useEffect(() => {
    document.documentElement.dir = lang === 'fa' ? 'rtl' : 'ltr';
    document.documentElement.lang = lang;
  }, [lang]);

  const handleOpenBooking = (doctorId?: string) => {
    setPreselectedDoctorId(doctorId);
    setIsBookingOpen(true);
  };

  const handleSelectDoctorForProfile = (doc: Doctor) => {
    setSelectedDoctorForProfile(doc);
  };

  const handleBookPackage = (pkg: CheckupPackage) => {
    // Open booking modal
    setIsBookingOpen(true);
  };

  return (
    <div className={`min-h-screen bg-white text-slate-900 ${lang === 'fa' ? 'font-sans' : ''}`}>
      {/* Universal Institutional App Shell Header */}
      <Header
        lang={lang}
        onLanguageChange={(newLang) => setLang(newLang)}
        currentWorkspace={currentWorkspace}
        onSelectWorkspace={(w) => setCurrentWorkspace(w)}
        onOpenBooking={() => handleOpenBooking()}
      />

      {/* Main Public Website Sections */}
      <main>
        {/* Section 1: Hero & Clinical Search Console */}
        <HeroSearch
          lang={lang}
          onSelectDoctor={(doc) => {
            setSelectedDoctorForProfile(doc);
          }}
          onOpenBooking={(docId) => handleOpenBooking(docId)}
        />

        {/* Section 2: Prominent Himura Commercial Tiers & Architecture Showcase */}
        <CommercialTiersSection lang={lang} />

        {/* Section 3: Six Centers of Excellence */}
        <CentersOfExcellence
          lang={lang}
          onOpenBooking={() => handleOpenBooking()}
        />

        {/* Section 3: Specialist Directory & Academic Faculty */}
        <DoctorDirectory
          lang={lang}
          onSelectDoctor={(doc) => handleSelectDoctorForProfile(doc)}
          onBookDoctor={(docId) => handleOpenBooking(docId)}
        />

        {/* Section 4: Advanced Medical Infrastructure & Robotics */}
        <AdvancedFacilities lang={lang} />

        {/* Section 5: Executive Health Check-up Packages */}
        <HealthPackages
          lang={lang}
          onBookPackage={handleBookPackage}
        />

        {/* Section 6: Verified Clinical Health Library */}
        <HealthArticlesSection lang={lang} />

        {/* Section 7: Campus Wayfinding & Navigation */}
        <CampusGuide lang={lang} />
      </main>

      {/* Institutional Footer */}
      <Footer
        lang={lang}
        onOpenBooking={() => handleOpenBooking()}
        onOpenTiers={() => setCurrentWorkspace('tiers')}
      />

      {/* Modals & Workspaces */}
      {/* 1. Transactional Appointment Engine Modal */}
      <AppointmentBookingModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        lang={lang}
        preselectedDoctorId={preselectedDoctorId}
        onOpenPatientPortal={() => setCurrentWorkspace('patient')}
      />

      {/* 2. Patient Portal Modal */}
      <PatientPortalModal
        isOpen={currentWorkspace === 'patient'}
        onClose={() => setCurrentWorkspace('public')}
        lang={lang}
      />

      {/* 3. Doctor Workspace Modal */}
      <DoctorWorkspaceModal
        isOpen={currentWorkspace === 'doctor'}
        onClose={() => setCurrentWorkspace('public')}
        lang={lang}
      />

      {/* 4. Admin & Clinical CMS Modal */}
      <AdminCmsModal
        isOpen={currentWorkspace === 'admin'}
        onClose={() => setCurrentWorkspace('public')}
        lang={lang}
      />

      {/* 5. Himura Commercial Tiers Showcase */}
      <CommercialTiersModal
        isOpen={currentWorkspace === 'tiers'}
        onClose={() => setCurrentWorkspace('public')}
        lang={lang}
      />

      {/* 6. Doctor Profile Details Modal */}
      <DoctorProfileModal
        doctor={selectedDoctorForProfile}
        onClose={() => setSelectedDoctorForProfile(null)}
        lang={lang}
        onBook={(docId) => handleOpenBooking(docId)}
      />
    </div>
  );
}
