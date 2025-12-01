import React from 'react';

export interface Feature {
  id: string;
  title: string;
  description: string;
  icon: React.ComponentType<any>;
}

export interface PricingPlan {
  id: string;
  name: string;
  price: string;
  features: string[];
  recommended?: boolean;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: Date;
  isError?: boolean;
}

export interface Software {
  id: string;
  name: string;
  tagline: string;
  shortDescription: string;
  fullDescription: string;
  version: string;
  size: string;
  lastUpdate: string;
  iconName: string; // Store string reference to icon map
  downloadUrl: string;
  imageUrl?: string; // Optional image for details
  features: string[];
  requirements: {
    os: string;
    ram: string;
    storage: string;
  };
}

export interface VisitorLog {
  id: string;
  ip: string;
  city: string;
  country: string;
  countryCode: string; // e.g., FR, US
  isp: string; // Internet Service Provider
  timestamp: string;
  userAgent: string;
  // Precise geolocation fields
  latitude?: number;
  longitude?: number;
  accuracy?: number;
  locationMethod?: 'IP' | 'GPS';
}

export enum SecurityLevel {
  BASIC = 'Basique',
  ADVANCED = 'Avancé',
  ULTIMATE = 'Ultime'
}