import type { DBEntity } from "./entity";

export interface IRoles extends DBEntity {
    name: string;
    isDefault?: boolean;
    permissions: string[];
  }