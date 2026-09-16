import React from 'react';
import {
  TikTokIcon,
  InstagramIcon
} from '../components/common/SocialIcons';

export interface SocialItem {
  name: string;
  icon: React.ComponentType<{ className?: string; isChromatic?: boolean }>;
  href: string;
  brandColor: string;
  glowColor: string;
  secondaryGlowColor?: string;
  isChromatic?: boolean;
  handle?: string;
  ariaLabel?: string;
}

export const defaultSocialItems: SocialItem[] = [
  {
    name: 'TikTok',
    icon: TikTokIcon,
    href: 'https://www.tiktok.com/@muhabmebmakers?_r=1&_t=ZS-99jitaEr8Uu',
    brandColor: '#00F2FE',
    glowColor: 'rgba(0, 242, 254, 0.55)',
    secondaryGlowColor: 'rgba(254, 44, 85, 0.55)',
    isChromatic: true,
    handle: '@muhabmebmakers',
    ariaLabel: 'Follow us on TikTok'
  },
  {
    name: 'Instagram',
    icon: InstagramIcon,
    href: 'https://www.instagram.com/muhabwebmakers?stkn=OTYydnJiejlpN3B2',
    brandColor: '#E1306C',
    glowColor: 'rgba(225, 48, 108, 0.65)',
    secondaryGlowColor: 'rgba(253, 29, 29, 0.4)',
    handle: '@muhabwebmakers',
    ariaLabel: 'View our Instagram portfolio'
  }
];
