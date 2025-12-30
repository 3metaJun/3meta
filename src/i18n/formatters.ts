import { i18n } from './index';
import { AuspiciousPattern, InauspiciousPattern, TenStemResponse } from '../qimen-types';

type Pattern = AuspiciousPattern | InauspiciousPattern;

/**
 * Format Auspicious/Inauspicious Pattern to localized string
 */
export const formatPattern = (pattern: Pattern): string => {
    if (pattern.id) {
        // Translate known parameters if possible
        const localizedParams = { ...pattern.params };
        if (localizedParams) {
            // Helper to try translate a value with a prefix
            const tryTranslate = (val: any, prefix: string) => {
                if (typeof val === 'string') {
                    const tr = i18n.t(`${prefix}.${val}`);
                    // If translation returns the key (meaning not found) or same value, checks might be needed
                    // Our i18n.t returns val or key. 
                    // If key was 'stems.丙', and result is 'Bing' (en) or '丙' (zh), it works.
                    // If result is 'stems.丙', it means missing.
                    return tr.startsWith(prefix + '.') ? val : tr;
                }
                return val;
            };

            if (localizedParams.gate) localizedParams.gate = tryTranslate(localizedParams.gate, 'gates');
            if (localizedParams.star) localizedParams.star = tryTranslate(localizedParams.star, 'stars');
            if (localizedParams.deity) localizedParams.deity = tryTranslate(localizedParams.deity, 'deities');
            if (localizedParams.heaven) localizedParams.heaven = tryTranslate(localizedParams.heaven, 'stems');
            if (localizedParams.earth) localizedParams.earth = tryTranslate(localizedParams.earth, 'stems');
            // 'palace' is tricky because it might include numbers e.g. '巽4宫'. 
            // We can try 'trigrams' if it matches a single trigram char 
            if (localizedParams.palace && typeof localizedParams.palace === 'string' && localizedParams.palace.length === 1) {
                localizedParams.palace = tryTranslate(localizedParams.palace, 'trigrams');
            }
        }
        return i18n.t(pattern.id, localizedParams);
    }
    return pattern.description || pattern.name || '';
};

/**
 * Format Ten Stem Response to localized string
 */
export const formatTenStem = (item: { id?: string; params?: any; description?: string } | undefined): string => {
    if (!item) return '';
    if (item.id) {
        return i18n.t(item.id, item.params);
    }
    return item.description || '无';
};

/**
 * Format Men Po (Gate Pressure) details
 */
export const formatMenPo = (item: { id?: string; params?: any; description?: string } | undefined): string => {
    if (!item) return '';
    if (item.id) {
        return i18n.t(item.id, item.params);
    }
    return item.description || '';
};

/**
 * Helper to translate simple keys if they exist, fallback to original
 */
export const t = (key: string, params?: Record<string, any>): string => {
    return i18n.t(key, params);
};
