import { AppointmentRecord, AppointmentStatus } from './types';
import { INITIAL_APPOINTMENTS, DOCTORS } from './data';

// In-memory scheduling storage representing an ACID transactional scheduling engine
class AppointmentEngine {
  private appointments: AppointmentRecord[] = [...INITIAL_APPOINTMENTS];
  private heldSlots: Map<string, { expiresAt: number; sessionId: string }> = new Map();

  // Concurrency lock key generator: doctorId + date + slot
  private getSlotKey(doctorId: string, date: string, slot: string): string {
    return `${doctorId}_${date}_${slot}`;
  }

  // Purge expired temporary slot holds
  private cleanExpiredHolds() {
    const now = Date.now();
    for (const [key, hold] of this.heldSlots.entries()) {
      if (hold.expiresAt < now) {
        this.heldSlots.delete(key);
      }
    }
  }

  // Check if a specific slot is genuinely bookable
  public isSlotAvailable(doctorId: string, date: string, slot: string, currentSessionId?: string): boolean {
    this.cleanExpiredHolds();
    const slotKey = this.getSlotKey(doctorId, date, slot);

    // 1. Check existing confirmed or requested appointments
    const existing = this.appointments.find(
      (a) =>
        a.doctorId === doctorId &&
        a.date === date &&
        a.slot === slot &&
        (a.status === 'CONFIRMED' || a.status === 'REQUESTED' || a.status === 'HELD')
    );

    if (existing) return false;

    // 2. Check active slot holds by other users
    const activeHold = this.heldSlots.get(slotKey);
    if (activeHold && activeHold.sessionId !== currentSessionId) {
      return false;
    }

    return true;
  }

  // Acquire a temporary hold (e.g. 5 minutes while user fills out their information)
  public holdSlot(doctorId: string, date: string, slot: string, sessionId: string): { success: boolean; message: string } {
    this.cleanExpiredHolds();
    const slotKey = this.getSlotKey(doctorId, date, slot);

    if (!this.isSlotAvailable(doctorId, date, slot, sessionId)) {
      return {
        success: false,
        message: 'اسلات زمانی مورد نظر هم‌اکنون توسط بیمار دیگری در حال رزرو است یا پر شده است.',
      };
    }

    // Set hold for 5 minutes (300,000 ms)
    this.heldSlots.set(slotKey, {
      expiresAt: Date.now() + 300000,
      sessionId,
    });

    return { success: true, message: 'اسلات با موفقیت برای شما قفل موقت شد.' };
  }

  // Commit booking transaction with double-booking concurrency guarantee
  public bookAppointment(params: {
    doctorId: string;
    patientName: string;
    patientNationalId: string;
    patientPhone: string;
    date: string;
    slot: string;
    sessionId?: string;
    notes?: string;
  }): { success: boolean; appointment?: AppointmentRecord; error?: string } {
    this.cleanExpiredHolds();
    const slotKey = this.getSlotKey(params.doctorId, params.date, params.slot);

    // Strict validation before commit
    if (!this.isSlotAvailable(params.doctorId, params.date, params.slot, params.sessionId)) {
      return {
        success: false,
        error: 'خطای همزمانی: این نوبت در همین لحظه نهایی شد و دیگر در دسترس نیست.',
      };
    }

    const doctor = DOCTORS.find((d) => d.id === params.doctorId);
    if (!doctor) {
      return { success: false, error: 'پزشک مورد نظر یافت نشد.' };
    }

    // Release temporary hold
    this.heldSlots.delete(slotKey);

    const yearSuffix = new Date().getFullYear();
    const randomPart = Math.floor(1000 + Math.random() * 9000);
    const trackingCode = `AVI-${yearSuffix}-${randomPart}`;

    const newAppointment: AppointmentRecord = {
      id: `apt-${Date.now()}`,
      trackingCode,
      doctorId: params.doctorId,
      patientName: params.patientName,
      patientNationalId: params.patientNationalId,
      patientPhone: params.patientPhone,
      date: params.date,
      slot: params.slot,
      status: 'CONFIRMED',
      departmentName: {
        fa: doctor.specialty.fa,
        en: doctor.specialty.en,
      },
      serviceName: {
        fa: `ویزیت تخصصی ${doctor.name.fa}`,
        en: `Consultation with ${doctor.name.en}`,
      },
      createdAt: new Date().toISOString(),
      paymentStatus: 'PAID',
      notes: params.notes,
    };

    this.appointments.unshift(newAppointment);

    return {
      success: true,
      appointment: newAppointment,
    };
  }

  // Cancel an existing appointment with state machine transition
  public cancelAppointment(id: string, reason?: string): { success: boolean; error?: string } {
    const apt = this.appointments.find((a) => a.id === id);
    if (!apt) {
      return { success: false, error: 'نوبت مورد نظر یافت نشد.' };
    }

    if (apt.status === 'COMPLETED') {
      return { success: false, error: 'نوبت تکمیل‌شده ویزیت‌شده قابل لغو نیست.' };
    }

    apt.status = 'CANCELLED';
    if (reason) {
      apt.notes = apt.notes ? `${apt.notes} | علت لغو: ${reason}` : `علت لغو: ${reason}`;
    }

    return { success: true };
  }

  // Reschedule an appointment to a new slot
  public rescheduleAppointment(
    id: string,
    newDate: string,
    newSlot: string
  ): { success: boolean; error?: string } {
    const apt = this.appointments.find((a) => a.id === id);
    if (!apt) {
      return { success: false, error: 'نوبت مورد نظر یافت نشد.' };
    }

    if (apt.status === 'CANCELLED' || apt.status === 'COMPLETED') {
      return { success: false, error: 'نوبت لغو شده یا انجام شده قابل جابجایی نیست.' };
    }

    if (!this.isSlotAvailable(apt.doctorId, newDate, newSlot)) {
      return { success: false, error: 'زمان جدید انتخاب‌شده در دسترس نیست.' };
    }

    apt.date = newDate;
    apt.slot = newSlot;
    apt.status = 'RESCHEDULED';

    return { success: true };
  }

  // Read all appointments (with optional nationalId filter for Patient Portal)
  public getAppointments(patientNationalId?: string): AppointmentRecord[] {
    if (patientNationalId) {
      return this.appointments.filter((a) => a.patientNationalId === patientNationalId);
    }
    return [...this.appointments];
  }

  // Get appointments for a specific doctor (for Doctor Workspace)
  public getDoctorAppointments(doctorId: string): AppointmentRecord[] {
    return this.appointments.filter((a) => a.doctorId === doctorId && a.status !== 'CANCELLED');
  }
}

// Export singleton instance
export const appointmentEngine = new AppointmentEngine();
