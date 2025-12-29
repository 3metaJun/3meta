/**
 * i18n 国际化主入口
 */

import { Locale, LocaleMessages } from './types';
import { zhCN } from './locales/zh-CN';

class I18n {
  private locale: Locale = 'zh-CN';
  private messages: Record<Locale, LocaleMessages> = {
    'zh-CN': zhCN,
    'zh-TW': zhCN, // TODO: 繁体中文，暂时使用简体
    'en-US': zhCN, // TODO: 英文，暂时使用简体
  };

  constructor() {}

  /**
   * 设置当前语言
   */
  setLocale(locale: Locale): void {
    if (this.messages[locale]) {
      this.locale = locale;
    } else {
      console.warn(`[i18n] Locale "${locale}" not found, using default "zh-CN"`);
      this.locale = 'zh-CN';
    }
  }

  /**
   * 获取当前语言
   */
  getLocale(): Locale {
    return this.locale;
  }

  /**
   * 获取所有可用语言
   */
  getAvailableLocales(): Locale[] {
    return Object.keys(this.messages) as Locale[];
  }

  /**
   * 翻译单个键
   * @param key 支持嵌套路径，如 'stems.甲', 'gates.开门', 'fields.position'
   * @param params 模板参数（可选）
   */
  t(key: string, params?: Record<string, any>): string {
    const keys = key.split('.');
    let value: any = this.messages[this.locale];

    for (const k of keys) {
      value = value?.[k];
      if (value === undefined) break;
    }

    // 如果是对象，尝试获取 name 字段
    if (typeof value === 'object' && value !== null && 'name' in value) {
      value = value.name;
    }

    // 模板替换
    if (typeof value === 'string' && params) {
      return value.replace(/\{(\w+)\}/g, (_, k) => params[k] || '');
    }

    return typeof value === 'string' ? value : key;
  }

  /**
   * 注册自定义语言包
   */
  registerLocale(locale: Locale, messages: LocaleMessages): void {
    this.messages[locale] = messages;
  }

  /**
   * 获取当前语言包
   */
  getCurrentMessages(): LocaleMessages {
    return this.messages[this.locale];
  }
}

/**
 * 全局 i18n 实例
 */
export const i18n = new I18n();

/**
 * 导出类型
 */
export * from './types';
export { zhCN } from './locales/zh-CN';

