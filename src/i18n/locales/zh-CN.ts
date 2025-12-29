/**
 * 简体中文语言包（默认）
 */

import { LocaleMessages } from '../types';

export const zhCN: LocaleMessages = {
  language: {
    name: 'Chinese (Simplified)',
    nativeName: '简体中文',
  },

  stems: {
    '甲': '甲',
    '乙': '乙',
    '丙': '丙',
    '丁': '丁',
    '戊': '戊',
    '己': '己',
    '庚': '庚',
    '辛': '辛',
    '壬': '壬',
    '癸': '癸',
  },

  branches: {
    '子': '子',
    '丑': '丑',
    '寅': '寅',
    '卯': '卯',
    '辰': '辰',
    '巳': '巳',
    '午': '午',
    '未': '未',
    '申': '申',
    '酉': '酉',
    '戌': '戌',
    '亥': '亥',
  },

  gates: {
    '休门': '休门',
    '生门': '生门',
    '伤门': '伤门',
    '杜门': '杜门',
    '景门': '景门',
    '死门': '死门',
    '惊门': '惊门',
    '开门': '开门',
  },

  stars: {
    '天蓬': '天蓬',
    '天任': '天任',
    '天冲': '天冲',
    '天辅': '天辅',
    '天英': '天英',
    '天芮': '天芮',
    '天柱': '天柱',
    '天心': '天心',
    '天禽': '天禽',
  },

  deities: {
    '值符': '值符',
    '腾蛇': '腾蛇',
    '太阴': '太阴',
    '六合': '六合',
    '白虎': '白虎',
    '玄武': '玄武',
    '九地': '九地',
    '九天': '九天',
  },

  trigrams: {
    '坎': '坎',
    '坤': '坤',
    '震': '震',
    '巽': '巽',
    '中': '中',
    '乾': '乾',
    '兑': '兑',
    '艮': '艮',
    '离': '离',
  },

  fiveElements: {
    '金': '金',
    '木': '木',
    '水': '水',
    '火': '火',
    '土': '土',
  },

  status: {
    star: {
      '旺': '旺',
      '相': '相',
      '休': '休',
      '囚': '囚',
      '废': '废',
    },
    gate: {
      '旺': '旺',
      '相': '相',
      '休': '休',
      '囚': '囚',
      '死': '死',
    },
  },

  growth: {
    '长生': '长生',
    '沐浴': '沐浴',
    '冠带': '冠带',
    '临官': '临官',
    '帝旺': '帝旺',
    '衰': '衰',
    '病': '病',
    '死': '死',
    '墓': '墓',
    '绝': '绝',
    '胎': '胎',
    '养': '养',
  },

  innerOuter: {
    '内盘': '内盘',
    '外盘': '外盘',
    '无': '无',
  },

  gatePressure: {
    '迫': '迫',
    '制': '制',
    '和': '和',
    '义': '义',
    '无': '无',
  },

  yuan: {
    '上元': '上元',
    '中元': '中元',
    '下元': '下元',
  },

  season: {
    '春': '春',
    '夏': '夏',
    '秋': '秋',
    '冬': '冬',
    '四季月': '四季月',
  },

  dunType: {
    '阳遁': '阳遁',
    '阴遁': '阴遁',
  },

  relationships: {
    '比和': '比和',
    '生我': '生我',
    '克我': '克我',
    '我生': '我生',
    '我克': '我克',
    '无': '无',
  },

  auspiciousPatterns: {
    '九遁': { name: '九遁', description: '九遁吉格' },
    '三奇': { name: '三奇', description: '三奇吉格' },
    '龙遁': { name: '龙遁', description: '龙遁吉格' },
    '虎遁': { name: '虎遁', description: '虎遁吉格' },
    '风遁': { name: '风遁', description: '风遁吉格' },
    '云遁': { name: '云遁', description: '云遁吉格' },
  },

  inauspiciousPatterns: {
    '六仪击刑': { name: '六仪击刑', description: '六仪击刑凶格' },
    '门迫': { name: '门迫', description: '门迫凶格' },
    '门受制': { name: '门受制', description: '门受制凶格' },
    '五不遇时': { name: '五不遇时', description: '五不遇时凶格' },
  },

  fields: {
    version: '版本',
    copyright: '版权信息',
    timeInfo: '时间信息',
    fourPillars: '四柱',
    ju: '局',
    yuan: '元',
    season: '季节',
    monthElement: '月令五行',
    zhiFu: '值符',
    zhiShi: '值使',
    postHorse: '驿马',
    palaces: '宫位',
    specialPatterns: '特殊格局',
    position: '宫位',
    trigram: '八卦',
    gate: '门',
    star: '星',
    deity: '神',
    heavenlyStem: '天干',
    earthlyStem: '地干',
    earthBranch: '地支',
    hiddenStem: '暗干',
    isZhiFu: '是否值符',
    isZhiShi: '是否值使',
    voidness: '空亡',
    fiveElements: '五行',
    status: '状态',
    innerOuter: '内外盘',
    gatePressure: '门迫关系',
    growthInfo: '长生状态',
    liuYiJiXing: '六仪击刑',
    tombInfo: '入墓信息',
    tenStemResponse: '天干关系',
    isPostHorse: '是否驿马',
    auspiciousPatterns: '吉格',
    inauspiciousPatterns: '凶格',
  },

  terms: {
    chart: '式盘',
    palace: '宫',
    yang: '阳',
    yin: '阴',
    dun: '遁',
    ju: '局',
  },
};

