import type { AssetId } from './index.js';
export interface SpriteRect { readonly x: number; readonly y: number; readonly width: 128; readonly height: 128 }
export declare const spriteUrl: string;
export declare const sprite2xUrl: string;
export declare const spriteWidth: 1664;
export declare const spriteHeight: 2048;
export declare const tileSize: 128;
export declare const sprites: Readonly<Record<AssetId, SpriteRect>>;
