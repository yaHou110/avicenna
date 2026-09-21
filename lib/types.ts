export type Language = 'fa' | 'en';

export type WorkspaceView = 'public' | 'patient' | 'doctor' | 'admin' | 'tiers';

export type AppointmentStatus =
  | 'REQUESTED'
  | 'HELD'
  | 'CONFIRMED'
  | 'RESCHEDULED'
  | 'COMPLETED'
  | 'CANCELLED'
  | 'NO_SHOW'
  | 'EXPIRED';

export type ContentStatus = 'DRAFT' | 'UNDER_REVIEW' | 'APPROVED' | 'PUBLISHED' | 'ARCHIVED';

export interface Doctor {
  id: string;
  name: { fa: string; en: string };
  title: { fa: string; en: string };
  medicalCouncilCode: string;
  departmentId: string;
  specialty: { fa: string; en: string };
  subSpecialty?: { fa: string; en: string };
  experienceYears: number;
  academicRank: { fa: string; en: string };
  avatar: string;
  bio: { fa: string; en: string };
  languages: string[];
  consultationTypes: ('in-person' | 'telemedicine')[];
  rating: number;
  satisfactionRate: number;
  availableDays: { fa: string; en: string };
  workingSlots: string[];
  roomNumber: string;
}

export interface Department {
  id: string;
  name: { fa: string; en: string };
  tagline: { fa: string; en: string };
  description: { fa: string; en: string };
  icon: string;
  headOfDepartment: { fa: string; en: string };
  bedCapacity: number;
  floor: { fa: string; en: string };
  features: { fa: string[]; en: string[] };
  stats: { label: { fa: string; en: string }; value: string }[];
}

export interface MedicalService {
  id: string;
  departmentId: string;
  name: { fa: string; en: string };
  description: { fa: string; en: string };
  durationMin: number;
  preparationNotes?: { fa: string; en: string };
  category: 'diagnostic' | 'surgical' | 'therapeutic' | 'preventive';
  accreditedLab?: boolean;
}

export interface CheckupPackage {
  id: string;
  name: { fa: string; en: string };
  targetAudience: { fa: string; en: string };
  description: { fa: string; en: string };
  testsCount: number;
  features: { fa: string[]; en: string[] };
  durationHours: number;
  badge?: { fa: string; en: string };
  price: { fa: string; en: string };
}

export interface MedicalEquipment {
  id: string;
  name: { fa: string; en: string };
  model: string;
  manufacturer: string;
  description: { fa: string; en: string };
  capabilities: { fa: string[]; en: string[] };
  departmentId: string;
  image: string;
}

export interface HealthArticle {
  id: string;
  title: { fa: string; en: string };
  category: { fa: string; en: string };
  excerpt: { fa: string; en: string };
  author: { fa: string; en: string };
  reviewer: { fa: string; en: string };
  readTimeMin: number;
  publishDate: string;
  image: string;
  status: ContentStatus;
}

export interface AppointmentRecord {
  id: string;
  trackingCode: string;
  doctorId: string;
  patientName: string;
  patientNationalId: string;
  patientPhone: string;
  date: string;
  slot: string;
  status: AppointmentStatus;
  departmentName: { fa: string; en: string };
  serviceName: { fa: string; en: string };
  createdAt: string;
  paymentStatus: 'PAID' | 'PENDING' | 'WAIVED_AT_DESK';
  notes?: string;
}

export interface LabResult {
  id: string;
  testName: { fa: string; en: string };
  doctorName: { fa: string; en: string };
  date: string;
  status: 'READY' | 'PROCESSING';
  laboratorySection: { fa: string; en: string };
  fileSize: string;
  downloadToken: string;
}

export interface AuditLogItem {
  id: string;
  timestamp: string;
  actor: string;
  role: string;
  action: string;
  resource: string;
  status: 'SUCCESS' | 'DENIED' | 'SECURITY_FLAG';
  ipHash: string;
  details: string;
}

export interface CommercialTier {
  id: string;
  name: { fa: string; en: string };
  category: string;
  price: { fa: string; en: string };
  badge?: { fa: string; en: string };
  description: { fa: string; en: string };
  highlightFeatures: { fa: string[]; en: string[] };
  architectureSpecs: { fa: string[]; en: string[] };
  targetMarket: { fa: string; en: string };
}
