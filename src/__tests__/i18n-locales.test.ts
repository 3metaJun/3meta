
import { i18n } from '../i18n/index';
import { zhCN } from '../i18n/locales/zh-CN';
import { zhTW } from '../i18n/locales/zh-TW';
import { enUS } from '../i18n/locales/en-US';

describe('Phase 3: Locale Expansion', () => {
    describe('Locale Registry', () => {
        it('should have zh-CN, zh-TW, and en-US registered', () => {
            const locales = i18n.getAvailableLocales();
            expect(locales).toContain('zh-CN');
            expect(locales).toContain('zh-TW');
            expect(locales).toContain('en-US');
        });

        it('should switch locales correctly', () => {
            i18n.setLocale('en-US');
            expect(i18n.getLocale()).toBe('en-US');

            i18n.setLocale('zh-TW');
            expect(i18n.getLocale()).toBe('zh-TW');

            i18n.setLocale('zh-CN'); // Reset
            expect(i18n.getLocale()).toBe('zh-CN');
        });
    });

    describe('Locale Content', () => {
        it('should have corresponding keys for zh-TW', () => {
            // Basic check for existence
            expect(zhTW.language.name).toBe('Chinese (Traditional)');
            expect(zhTW.stems['甲']).toBe('甲');
            expect(zhTW.gates['休门']).toBe('休門');
        });

        it('should have corresponding keys for en-US', () => {
            expect(enUS.language.name).toBe('English');
            expect(enUS.stems['甲']).toBe('Jia');
            expect(enUS.gates['休门']).toBe('Rest Gate');
        });

        it('should handle template replacement in en-US', () => {
            i18n.setLocale('en-US');
            const patternKey = 'patterns.jiu_dun.tian_dun';
            const params = { heaven: 'Bing', earth: 'Ding', gate: 'Life Gate' };
            const text = i18n.t(patternKey, params);
            // "Heaven Dun: Heaven {heaven} + Earth {earth} + {gate}"
            expect(text).toBe('Heaven Dun: Heaven Bing + Earth Ding + Life Gate');
        });

        it('should handle template replacement in zh-TW', () => {
            i18n.setLocale('zh-TW');
            const patternKey = 'patterns.jiu_dun.tian_dun';
            const params = { heaven: '丙', earth: '丁', gate: '生門' };
            const text = i18n.t(patternKey, params);
            // "天遁：天盤{heaven} + 地盤{earth} + {gate}"
            expect(text).toBe('天遁：天盤丙 + 地盤丁 + 生門');
        });
    });
});
