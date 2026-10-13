import type { ImageMetadata } from 'astro';
import robotField from '../../assets/manipulator-field-test.png';
import robotOutdoor from '../../assets/manipulator-outdoor-test.png';
import stuChat from '../../assets/stu-demo-chat-desktop.png';
import stuNavigation from '../../assets/stu-demo-navigation-desktop.png';
import stuMobile from '../../assets/stu-demo-navigation-mobile.png';
import stuDashboard from '../../assets/stu-demo-admin-dashboard.png';
import stuKnowledge from '../../assets/stu-demo-admin-knowledge.png';

export interface GalleryImage { image: ImageMetadata; alt: string; caption: string; }

export const galleries: Record<string, GalleryImage[]> = {
  'ai-robotics-manipulator': [
    { image: robotField, alt: 'Purple robotic manipulator on a work surface during an outdoor field test', caption: 'Outdoor field test.' },
    { image: robotOutdoor, alt: 'Robotic arm set up outside for a physical test', caption: 'Outdoor test, second view.' },
  ],
  'stu-genai-chatbot': [
    { image: stuChat, alt: 'Actual STU Vue chat UI showing a synthetic student orientation conversation, marked as demo', caption: 'Student support · Demo.' },
    { image: stuNavigation, alt: 'Actual STU chat UI with fictional campus directions and a simulated navigation card, marked as demo', caption: 'Campus navigation · Demo.' },
    { image: stuMobile, alt: 'Actual STU chat UI on mobile with fictional campus directions and a simulated navigation card, marked as demo', caption: 'Mobile navigation · Demo.' },
    { image: stuDashboard, alt: 'Actual STU admin dashboard with synthetic feedback statistics and a predefined test answer, marked as demo', caption: 'Admin dashboard · Demo.' },
    { image: stuKnowledge, alt: 'Actual STU admin knowledge base with fictional document names and processing states, marked as demo', caption: 'Knowledge base · Demo.' },
  ],
};
