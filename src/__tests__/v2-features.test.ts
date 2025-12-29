import { QimenChart } from '../qimen/QimenChart';
import { i18n } from '../i18n';

describe('v2.0.0 新功能测试', () => {
  describe('版权信息', () => {
    it('应正确返回版权信息', () => {
      const copyright = QimenChart.getCopyright();

      expect(copyright.library).toBe('3meta');
      expect(copyright.version).toBe('2.0.0');
      expect(copyright.author).toBe('3metaJun');
      expect(copyright.license).toBe('MIT');
      expect(copyright.repository).toBe('https://github.com/3metaJun/3meta');
      expect(copyright.homepage).toBe('https://3meta.pub');
      expect(copyright.generatedAt).toBeDefined();
    });

    it('toJSON 应包含版权信息', () => {
      const chart = QimenChart.byDatetime('2023-12-25 10:00:00');
      const json = chart.toJSON();

      expect(json.copyright).toBeDefined();
      expect(json.copyright.library).toBe('3meta');
      expect(json.copyright.version).toBe('2.0.0');
    });
  });

  describe('暗干排布', () => {
    it('应正确计算暗干', () => {
      const chart = QimenChart.byDatetime('2023-12-25 10:00:00');

      expect(chart.hiddenStems).toBeInstanceOf(Map);
      expect(chart.hiddenStems.size).toBeGreaterThan(0);
    });

    it('toJSON 应包含暗干信息', () => {
      const chart = QimenChart.byDatetime('2023-12-25 10:00:00');
      const json = chart.toJSON();

      expect(json.hiddenStems).toBeDefined();
      expect(typeof json.hiddenStems).toBe('object');
    });
  });

  describe('i18n 基础框架', () => {
    it('默认语言应为 zh-CN', () => {
      expect(i18n.getLocale()).toBe('zh-CN');
    });

    it('应能获取可用语言列表', () => {
      const locales = i18n.getAvailableLocales();

      expect(locales).toContain('zh-CN');
      expect(locales).toContain('zh-TW');
      expect(locales).toContain('en-US');
    });

    it('应能翻译天干', () => {
      expect(i18n.t('stems.甲')).toBe('甲');
      expect(i18n.t('stems.乙')).toBe('乙');
    });

    it('应能翻译八门', () => {
      expect(i18n.t('gates.开门')).toBe('开门');
      expect(i18n.t('gates.休门')).toBe('休门');
    });

    it('应能翻译九星', () => {
      expect(i18n.t('stars.天蓬')).toBe('天蓬');
      expect(i18n.t('stars.天心')).toBe('天心');
    });

    it('不存在的键应返回原键', () => {
      expect(i18n.t('nonexistent.key')).toBe('nonexistent.key');
    });

    it('应能设置语言', () => {
      i18n.setLocale('zh-TW');
      expect(i18n.getLocale()).toBe('zh-TW');

      // 重置为默认
      i18n.setLocale('zh-CN');
    });
  });
});

