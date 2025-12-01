import { 
  ShieldAlert, 
  Globe, 
  Lock, 
  Zap, 
  Cpu, 
  HardDrive, 
  Monitor, 
  Download, 
  ShieldCheck, 
  Activity, 
  Terminal,
  Wifi,
  Database,
  Server
} from 'lucide-react';

// Map string names to Lucide components
export const IconMap: Record<string, any> = {
  'ShieldAlert': ShieldAlert,
  'Globe': Globe,
  'Lock': Lock,
  'Zap': Zap,
  'Cpu': Cpu,
  'HardDrive': HardDrive,
  'Monitor': Monitor,
  'Download': Download,
  'ShieldCheck': ShieldCheck,
  'Activity': Activity,
  'Terminal': Terminal,
  'Wifi': Wifi,
  'Database': Database,
  'Server': Server
};

export const getIconComponent = (iconName: string) => {
  return IconMap[iconName] || ShieldAlert;
};

export const availableIcons = Object.keys(IconMap);