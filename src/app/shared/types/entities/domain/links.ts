import { IFiles } from "@shared/types/file";
import type { DBEntity } from "../entity";
import type { IUsers } from "../user";

export const LinkConfigurationThemes = ['default', 'nature', 'ocean', 'sunset','retro','professional','bubblegum', 'custom'];
export type LinkConfigurationTheme = typeof LinkConfigurationThemes[number];

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

export interface ILinks extends DBEntity {
  user: IUsers;
  status: boolean;
  profile: ILinkProfile;
  title?: string;
  items?: ILinkItem[];
  configuration: ILinkConfiguration;
}