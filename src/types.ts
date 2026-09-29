export type ViewState = 'home' | 'projects';

export interface Project {
  id: string;
  title: string;
  category: string;
  description: string;
  color: string;
  image: string;
}

export interface QuoteFormData {
  goal: string;
  budget: string;
  timeline: string;
  email: string;
}

export interface BookingFormData {
  date: string;
  time: string;
  name: string;
  email: string;
  topic: string;
}
