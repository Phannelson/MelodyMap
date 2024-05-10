// src/types/ngeohash.d.ts
declare module 'ngeohash' {
    export function encode(latitude: number, longitude: number, precision?: number): string;
    export function decode(geohash: string): [number, number];
}