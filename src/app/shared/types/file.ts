import { DBEntity } from "./entities";

export enum MimeType {
    // Imagens
    JPEG = 'image/jpeg',
    PNG = 'image/png',
    GIF = 'image/gif',
    WEBP = 'image/webp',
    BMP = 'image/bmp',
    TIFF = 'image/tiff',

    // Documentos
    PDF = 'application/pdf',
    DOC = 'application/msword',
    DOCX = 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    XLS = 'application/vnd.ms-excel',
    XLSX = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    PPT = 'application/vnd.ms-powerpoint',
    PPTX = 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
    TXT = 'text/plain',

    // Áudio
    MP3 = 'audio/mpeg',
    WAV = 'audio/wav',
    OGG = 'audio/ogg',
    AAC = 'audio/aac',

    // Vídeo
    MP4 = 'video/mp4',
    WEBM = 'video/webm',
    AVI = 'video/x-msvideo',
    MPEG = 'video/mpeg',
    WMV = 'video/x-ms-wmv',

    // Arquivos compactados
    ZIP = 'application/zip',
    RAR = 'application/x-rar-compressed',
    TAR = 'application/x-tar',
    GZ = 'application/gzip',

    // Outros
    CSV = 'text/csv',
    JSON = 'application/json',
    XML = 'application/xml',
}

// Tipo union com todos os mime types possíveis
export type FileMimeType =
    | MimeType
    | `${'image' | 'video' | 'audio' | 'text' | 'application'}/${string}`;


export interface IFiles extends DBEntity {
    name: string;
    originalName: string;
    path: string;
    model?: string;
    modelId?: string;
    key?: string;
}