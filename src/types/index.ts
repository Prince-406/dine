export interface BookingFormData {
  name: string;
  email: string;
  phone: string;
  date: string;
  time: string;
  guests: number;
  seating: 'main' | 'terrace' | 'booth' | '';
  occasion: string;
  specialRequests: string;
  preOrderStarter: boolean;
  preOrderMain: boolean;
  preOrderDessert: boolean;
}

export interface FormErrors {
  name?: string;
  email?: string;
  phone?: string;
  date?: string;
  time?: string;
  seating?: string;
}

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: string;
  image: string;
  alt: string;
  dietary: ('vegetarian' | 'vegan' | 'gluten-free')[];
  category: string;
}

export interface EventTab {
  id: string;
  label: string;
  heading: string;
  description: string;
  image: string;
  alt: string;
}

export interface NavLink {
  label: string;
  href: string;
}