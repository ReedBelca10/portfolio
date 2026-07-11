/**
 * Configuration centralisée
 */
export declare const API_CONFIG: {
    baseUrl: any;
    timeout: number;
    retries: number;
};
export declare const CLOUDINARY_CONFIG: {
    cloudName: any;
    uploadPreset: any;
};
export declare const i18n: {
    defaultLocale: string;
    locales: string[];
    namespaces: string[];
};
export declare const SITE_CONFIG: {
    name: string;
    description: string;
    url: any;
    author: string;
    email: string;
};
/**
 * Catégories et énumérations
 */
export declare const SKILL_CATEGORIES: {
    readonly programming: "Programming";
    readonly design: "Design";
    readonly tool: "Tool";
    readonly 'soft-skill': "Soft Skill";
};
export declare const SKILL_LEVELS: {
    readonly beginner: "Beginner";
    readonly intermediate: "Intermediate";
    readonly advanced: "Advanced";
    readonly expert: "Expert";
};
/**
 * Constantes d'application
 */
export declare const CONSTANTS: {
    MAX_FILE_SIZE: number;
    ALLOWED_IMAGE_TYPES: string[];
    PAGINATION_LIMIT: number;
    CACHE_TTL: number;
};
/**
 * Design System Exports
 */
export { ColorTokens, TypographyTokens, IconsInfo, SpacingTokens, BorderRadiusTokens, ShadowTokens, ZIndexTokens, TransitionTokens, } from './design-tokens';
//# sourceMappingURL=index.d.ts.map