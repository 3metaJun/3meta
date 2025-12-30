/**
 * i18n 国际化类型定义
 */

import { HeavenlyStem, EarthlyBranch, Gate, Star, Deity, Trigram, StarStatus, GateStatus, TwelveGrowth, FiveElements, InnerOuter, GatePressure, Yuan, Season } from '../qimen-types';

/**
 * 支持的语言
 */
export type Locale = 'zh-CN' | 'zh-TW' | 'en-US';

/**
 * 语言包消息结构
 */
export interface LocaleMessages {
  /** 语言名称 */
  language: {
    name: string;
    nativeName: string;
  };

  /** 天干翻译 */
  stems: Record<HeavenlyStem, string>;

  /** 地支翻译 */
  branches: Record<EarthlyBranch, string>;

  /** 八门翻译 */
  gates: Record<Gate, string>;

  /** 九星翻译 */
  stars: Record<Star, string>;

  /** 八神翻译 */
  deities: Record<Deity, string>;

  /** 八卦翻译 */
  trigrams: Record<Trigram, string>;

  /** 五行翻译 */
  fiveElements: Record<FiveElements, string>;

  /** 旺衰状态翻译 */
  status: {
    star: Record<StarStatus, string>;
    gate: Record<GateStatus, string>;
  };

  /** 十二长生翻译 */
  growth: Record<TwelveGrowth, string>;

  /** 内外盘翻译 */
  innerOuter: Record<InnerOuter | '无', string>;

  /** 门迫关系翻译 */
  gatePressure: Record<GatePressure | '无', string>;

  /** 元翻译 */
  yuan: Record<Yuan, string>;

  /** 季节翻译 */
  season: Record<Season, string>;

  /** 遁局类型 */
  dunType: {
    '阳遁': string;
    '阴遁': string;
  };

  /** 关系描述 */
  relationships: {
    '比和': string;
    '生我': string;
    '克我': string;
    '我生': string;
    '我克': string;
    '无': string;
  };

  /** 吉格翻译 */
  auspiciousPatterns: Record<string, {
    name: string;
    description?: string;
  }>;

  /** 凶格翻译 */
  inauspiciousPatterns: Record<string, {
    name: string;
    description?: string;
  }>;

  /** 格局模版 */
  patterns: Record<string, Record<string, string>>;

  /** 字段标签 */
  fields: {
    version: string;
    copyright: string;
    timeInfo: string;
    fourPillars: string;
    ju: string;
    yuan: string;
    season: string;
    monthElement: string;
    zhiFu: string;
    zhiShi: string;
    postHorse: string;
    palaces: string;
    specialPatterns: string;
    position: string;
    trigram: string;
    gate: string;
    star: string;
    deity: string;
    heavenlyStem: string;
    earthlyStem: string;
    earthBranch: string;
    hiddenStem: string;
    isZhiFu: string;
    isZhiShi: string;
    voidness: string;
    fiveElements: string;
    status: string;
    innerOuter: string;
    gatePressure: string;
    growthInfo: string;
    liuYiJiXing: string;
    tombInfo: string;
    tenStemResponse: string;
    isPostHorse: string;
    auspiciousPatterns: string;
    inauspiciousPatterns: string;
  };

  /** 术语 */
  terms: {
    chart: string;
    palace: string;
    yang: string;
    yin: string;
    dun: string;
    ju: string;
  };
}

/**
 * 辅助类型：获取嵌套对象的键路径
 */
export type NestedKeyOf<ObjectType extends object> = {
  [Key in keyof ObjectType & (string | number)]: ObjectType[Key] extends object
  ? `${Key}` | `${Key}.${NestedKeyOf<ObjectType[Key]>}`
  : `${Key}`;
}[keyof ObjectType & (string | number)];
