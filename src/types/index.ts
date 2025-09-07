export interface Slide {
  title: string;
  subtitle: string;
  image: string;
  description: string;
}

export interface Society {
  name: string;
  image: string;
}

export interface Council {
  name: string;
  image: string;
}

export interface PastEvent {
  title: string;
  date: string;
  image: string;
  participants: string;
  hostingBranchName?: string;
  hostingBranchLogo?: string;
}

export interface UpcomingEvent {
  title: string;
  date: string;
  image: string;
  description: string;
  registrations?: string;
  hostingBranchName?: string;
  hostingBranchLogo?: string;
}

export interface Achievement {
  title: string;
  year: string;
  description: string;
  image?: string;
}

export interface GalleryItem {
  id: number;
  img: string;
  url: string;
  height: number;
}

export interface Notification {
  id: number;
  title: string;
  message: string;
  time: string;
  type: string;
  unread: boolean;
}

export interface DropdownItem {
  name: string;
  action: () => void;
}

export interface NavigationItem {
  name: string;
  action: () => void;
  dropdown?: DropdownItem[];
}
