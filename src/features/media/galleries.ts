import type { ImageMetadata } from 'astro';
import robotField from '../../assets/manipulator-field-test.png';
import robotOutdoor from '../../assets/manipulator-outdoor-test.png';
import stuDesktop from '../../assets/stu-sign-in-desktop.png';
import stuMobile from '../../assets/stu-sign-in-mobile.png';

export interface GalleryImage { image: ImageMetadata; alt: string; caption: string; }

export const galleries: Record<string, GalleryImage[]> = {
  'ai-robotics-manipulator': [
    { image: robotField, alt: 'Purple robotic manipulator on a work surface during an outdoor field test', caption: 'Outdoor field test.' },
    { image: robotOutdoor, alt: 'Robotic arm set up outside for a physical test', caption: 'Outdoor test, second view.' },
  ],
  'stu-genai-chatbot': [
    { image: stuDesktop, alt: 'STU chatbot sign-in page on desktop, with empty username and password fields', caption: 'Desktop sign-in.' },
    { image: stuMobile, alt: 'STU chatbot sign-in page on mobile, with empty username and password fields', caption: 'Mobile sign-in.' },
  ],
};
