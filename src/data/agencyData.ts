import { getAssetUrl } from '../utils/assets';

export interface AgencyPageConfig {
  hero: {
    badge: string;
    headlinePart1: string;
    headlinePart2: string;
    hudTopLeft: string;
    hudTopRight: string;
    hudBottomLeft: string;
    hudBottomRight: string;
    mediaSrc: string;
    mediaAlt: string;
  };
  editorial: {
    badge: string;
    mainStatement: string[];
    leftColumnTitle: string;
    leftColumnText: string;
    rightColumnTitle: string;
    rightColumnText: string;
    metrics: { value: string; label: string }[];
  };
  emblem: {
    circularText: string;
    centerLabel: string;
    subtext: string;
  };
  team: {
    id: string;
    name: string;
    role: string;
    bio: string;
    image: string;
    skewDeg: number;
    accent: string;
  }[];
  brands: {
    id: string;
    name: string;
    category: string;
    metric: string;
  }[];
  footer: {
    badge: string;
    headline: string;
    ctaButton: string;
    copyright: string;
  };
}

export const defaultAgencyConfig: AgencyPageConfig = {
  hero: {
    badge: 'CREATIVE SYSTEMS & BESPOKE ARCHITECTURE',
    headlinePart1: 'BESPOKE DIGITAL',
    headlinePart2: 'ARCHITECTURE',
    hudTopLeft: 'SYS.STATUS // LATENCY 4.2ms • 120 FPS',
    hudTopRight: '21°32\'36"N 39°10\'22"E • JEDDAH',
    hudBottomLeft: 'SCROLL TO EXPAND GEOMETRIC MASK',
    hudBottomRight: 'MUHAB STUDIO ©2026 • SAUDI DIGITAL LEADERSHIP',
    mediaSrc: getAssetUrl('taqyeemi-showcase.jpg'),
    mediaAlt: 'Taqyeemi Luxury Hardware & Dashboard Suite',
  },
  editorial: {
    badge: 'CORE MANIFESTO',
    mainStatement: [
      'WE ENGINEER EXPERIENCES',
      'THAT TRANSCEND TEMPLATES',
      '& DEFY CONVENTION'
    ],
    leftColumnTitle: '01 / SUB-SECOND PERFORMANCE',
    leftColumnText: 'We do not compromise on physics or frame pacing. Every interaction is built on hardware-accelerated transforms, zero-bloat state architectures, and sub-millisecond edge render pipelines.',
    rightColumnTitle: '02 / ARCHITECTURAL IMMERSION',
    rightColumnText: 'From Saudi luxury hospitality to enterprise SaaS ecosystems, we craft digital instruments that command authority, stimulate curiosity, and convert attention into lasting institutional prestige.',
    metrics: [
      { value: '100', label: 'LIGHTHOUSE SPEED' },
      { value: '4.2ms', label: 'EDGE LATENCY' },
      { value: '340%', label: 'AVERAGE CRO LIFT' },
      { value: '0.0s', label: 'LAYOUT JANK' }
    ]
  },
  emblem: {
    circularText: 'MUHAB DIGITAL STUDIO • BESPOKE CRAFT • KINGDOM OF SAUDI ARABIA • ',
    centerLabel: 'EST. 2026',
    subtext: 'ARCHITECTURAL DIGITAL EXCELLENCE'
  },
  team: [
    {
      id: 'member-1',
      name: 'Muhab Al-Ghamdi',
      role: 'Founding Creative Director & Architect',
      bio: 'Pioneering sensory digital spaces, WebGL choreography, and bespoke brand ecosystems across the GCC.',
      image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80',
      skewDeg: -7,
      accent: '#a6ff2e'
    },
    {
      id: 'member-2',
      name: 'Dr. Tariq Zahid',
      role: 'Principal Systems & Edge Engineer',
      bio: 'Architect of distributed micro-frontends, ultra-low latency WebSocket rails, and national payment gateways.',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80',
      skewDeg: 5,
      accent: '#38bdf8'
    },
    {
      id: 'member-3',
      name: 'Nouf Al-Otaibi',
      role: 'Head of Interaction & Motion Physics',
      bio: 'Former Awwwards judge obsessed with spring damping curves, fluid typography kinematics, and kinetic UI.',
      image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=800&q=80',
      skewDeg: -4,
      accent: '#f43f5e'
    },
    {
      id: 'member-4',
      name: 'Rayan Mansour',
      role: 'Hardware & NFC Ecosystem Lead',
      bio: 'Leading Taqyeemi and PointPass physical device integration, embedded BLE firmware, and Apple Wallet protocols.',
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=800&q=80',
      skewDeg: 8,
      accent: '#eab308'
    }
  ],
  brands: [
    { id: 'b-1', name: 'Taqyeemi NFC', category: 'Smart Hardware', metric: '+340% Reviews' },
    { id: 'b-2', name: 'PointPass Wallet', category: 'Fintech Loyalty', metric: '78% Repeat Rate' },
    { id: 'b-3', name: 'Al-Madina Heritage', category: 'Hospitality', metric: '4.9★ Global' },
    { id: 'b-4', name: 'Neom Logistics Cloud', category: 'Enterprise Infra', metric: 'Sub-second' },
    { id: 'b-5', name: 'Saudi Fintech Rails', category: 'Apple Pay & Mada', metric: 'Zero Failure' },
    { id: 'b-6', name: 'Foodus QR POS', category: 'F&B Technology', metric: '12K Orders/Day' },
    { id: 'b-7', name: 'KSA Luxury Jets', category: 'Aviation Portal', metric: 'High-Net Concierge' },
    { id: 'b-8', name: 'Red Sea Marina Hub', category: 'Yacht Ecosystem', metric: 'Interactive 3D' }
  ],
  footer: {
    badge: 'WE ARE LISTENING // Q3/Q4 INTAKE OPEN',
    headline: 'YOUR NEXT BIG THING STARTS HERE',
    ctaButton: 'INITIATE BESPOKE PROJECT',
    copyright: '©2026 MUHAB STUDIO. ALL RIGHTS RESERVED. CRAFTED IN JEDDAH, KSA.'
  }
};
