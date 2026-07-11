export declare const ColorTokens: {
    readonly background: {
        readonly primary: "#1F2937";
        readonly secondary: "#111827";
    };
    readonly brand: {
        readonly primary: "#00D9FF";
        readonly secondary: "#A0F0FF";
    };
    readonly neutral: {
        readonly grey: "#374151";
        readonly white: "#FFFFFF";
    };
    readonly tech: {
        readonly html: "#FF6B35";
        readonly css: "#0052CC";
        readonly javascript: "#F7B801";
        readonly react: "#0EA5E9";
    };
};
export declare const TypographyTokens: {
    readonly fonts: {
        readonly primary: "\"Ubuntu\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", sans-serif";
        readonly monospace: "\"IBM Plex Mono\", \"Courier New\", monospace";
    };
    readonly sizes: {
        readonly h1: {
            readonly size: "117px";
            readonly lineHeight: "134px";
            readonly weight: "regular";
            readonly name: "BG Text-U";
        };
        readonly h2: {
            readonly size: "64px";
            readonly lineHeight: "72px";
            readonly weight: "regular";
            readonly name: "H1-U";
        };
        readonly h3: {
            readonly size: "32px";
            readonly lineHeight: "36px";
            readonly weight: "regular";
            readonly name: "H2-U";
        };
        readonly h4: {
            readonly size: "20px";
            readonly lineHeight: "24px";
            readonly weight: "regular";
            readonly name: "Button-U";
        };
        readonly body: {
            readonly size: "16px";
            readonly lineHeight: "32px";
            readonly weight: "light";
            readonly name: "Article-U";
        };
        readonly bodySmall: {
            readonly size: "14px";
            readonly lineHeight: "32px";
            readonly weight: "light";
            readonly name: "Label-U/L";
        };
        readonly label: {
            readonly size: "14px";
            readonly lineHeight: "16px";
            readonly weight: "medium";
            readonly name: "Label-U/M";
        };
    };
    readonly monospace: {
        readonly number: {
            readonly size: "48px";
            readonly lineHeight: "52px";
            readonly weight: "medium";
            readonly name: "Number-M";
        };
        readonly h2: {
            readonly size: "32px";
            readonly lineHeight: "42px";
            readonly weight: "medium";
            readonly name: "H2-M";
        };
        readonly logo: {
            readonly size: "32px";
            readonly lineHeight: "42px";
            readonly weight: "medium";
            readonly name: "Logo-M";
        };
        readonly menu: {
            readonly size: "24px";
            readonly lineHeight: "32px";
            readonly weight: "regular";
            readonly name: "Menu-M";
        };
        readonly media: {
            readonly size: "16px";
            readonly lineHeight: "29px";
            readonly weight: "regular";
            readonly name: "Media-M";
        };
        readonly paragraph: {
            readonly size: "16px";
            readonly lineHeight: "29px";
            readonly weight: "regular";
            readonly name: "Paragraph-M";
        };
        readonly code: {
            readonly size: "14px";
            readonly lineHeight: "18px";
            readonly weight: "regular";
            readonly name: "Code-M";
        };
    };
};
export declare const IconsInfo: {
    readonly total: 200;
    readonly category: "Feather";
    readonly sizes: readonly ["16px", "24px", "32px"];
    readonly usage: {
        readonly navigation: "Primary UI navigation icons";
        readonly technology: "Tech stack visual indicators";
        readonly interactive: "CTA and button icons";
        readonly status: "Status and alert icons";
    };
};
export declare const SpacingTokens: {
    readonly 0: "0px";
    readonly 1: "4px";
    readonly 2: "8px";
    readonly 3: "12px";
    readonly 4: "16px";
    readonly 6: "24px";
    readonly 8: "32px";
    readonly 12: "48px";
    readonly 16: "64px";
    readonly 20: "80px";
    readonly 24: "96px";
};
export declare const BorderRadiusTokens: {
    readonly none: "0px";
    readonly xs: "4px";
    readonly sm: "8px";
    readonly md: "12px";
    readonly lg: "16px";
    readonly xl: "20px";
    readonly full: "9999px";
};
export declare const ShadowTokens: {
    readonly none: "none";
    readonly xs: "0 1px 2px 0 rgba(0, 0, 0, 0.05)";
    readonly sm: "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)";
    readonly md: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)";
    readonly lg: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)";
    readonly xl: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)";
};
export declare const ZIndexTokens: {
    readonly hide: -1;
    readonly auto: "auto";
    readonly base: 0;
    readonly docked: 10;
    readonly fixed: 20;
    readonly overlay: 30;
    readonly dropdown: 40;
    readonly sticky: 50;
    readonly popover: 60;
    readonly modal: 70;
    readonly tooltip: 80;
    readonly notification: 90;
    readonly max: 999;
};
export declare const TransitionTokens: {
    readonly fast: "150ms";
    readonly base: "200ms";
    readonly slow: "300ms";
    readonly verySlow: "500ms";
    readonly timing: {
        readonly linear: "linear";
        readonly easeIn: "cubic-bezier(0.4, 0, 1, 1)";
        readonly easeOut: "cubic-bezier(0, 0, 0.2, 1)";
        readonly easeInOut: "cubic-bezier(0.4, 0, 0.2, 1)";
    };
};
//# sourceMappingURL=design-tokens.d.ts.map