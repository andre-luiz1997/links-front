import { IFiles } from "@shared/types/file";
import type { DBEntity } from "../entity";
import type { IUsers } from "../user";

export const LinkConfigurationThemes = ['default', 'nature', 'ocean', 'sunset', 'retro', 'professional', 'bubblegum', 'custom'];
export type LinkConfigurationTheme = typeof LinkConfigurationThemes[number];

export const LinkSocialCompanies = {
  facebook: { name: 'facebook', icon: 'faBrandFacebook' },
  instagram: { name: 'instagram', icon: 'faBrandInstagram' },
  twitter: { name: 'twitter', icon: 'faBrandXTwitter' },
  tiktok: { name: 'tiktok', icon: 'faBrandTiktok' },
  youtube: { name: 'youtube', icon: 'faBrandYoutube' },
} as const;

export type LinkSocialCompanyName = typeof LinkSocialCompanies[keyof typeof LinkSocialCompanies]['name'];
export type LinkSocialCompanyIcon = typeof LinkSocialCompanies[keyof typeof LinkSocialCompanies]['icon'];

export interface ILinkConfiguration {
  theme: LinkConfigurationTheme;
  main_color?: string
  secondary_color?: string;
  font_color?: string;
}

export interface ILinkProfile {
  show: boolean;
  title?: string;
  subtitle?: string;
  phone?: string;
  phone2?: string;
  email?: string;
  image?: IFiles;
}

export interface ILinkItem {
  title: string;
  url: string;
  status: boolean;
}

export interface ILinkSocial {
  company: LinkSocialCompanyName;
  icon: LinkSocialCompanyIcon;
  url: string;
  status: boolean;
}

export interface ILinks extends DBEntity {
  user: IUsers;
  status: boolean;
  profile: ILinkProfile;
  socialLinks?: ILinkSocial[];
  title?: string;
  items?: ILinkItem[];
  configuration: ILinkConfiguration;
}