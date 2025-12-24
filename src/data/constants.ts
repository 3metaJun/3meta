import { Deity, EarthlyBranch, FiveElements, Gate, HeavenlyStem, Position, Star, Trigram, XunShou } from '../qimen-types';

// 天干地支
export const TIANGAN: HeavenlyStem[] = ['甲', '乙', '丙', '丁', '戊', '己', '庚', '辛', '壬', '癸'];
export const DIZHI: EarthlyBranch[] = ['子', '丑', '寅', '卯', '辰', '巳', '午', '未', '申', '酉', '戌', '亥'];

// 六十甲子
export const JIAZI: string[] = [
  '甲子', '乙丑', '丙寅', '丁卯', '戊辰', '己巳', '庚午', '辛未', '壬申', '癸酉',
  '甲戌', '乙亥', '丙子', '丁丑', '戊寅', '己卯', '庚辰', '辛巳', '壬午', '癸未',
  '甲申', '乙酉', '丙戌', '丁亥', '戊子', '己丑', '庚寅', '辛卯', '壬辰', '癸巳',
  '甲午', '乙未', '丙申', '丁酉', '戊戌', '己亥', '庚子', '辛丑', '壬寅', '癸卯',
  '甲辰', '乙巳', '丙午', '丁未', '戊申', '己酉', '庚戌', '辛亥', '壬子', '癸丑',
  '甲寅', '乙卯', '丙辰', '丁巳', '戊午', '己未', '庚申', '辛酉', '壬戌', '癸亥',
];

// 上中下元
export const SHANGYUAN = ['甲子', '乙丑', '丙寅', '丁卯', '戊辰', '己巳', '庚午', '辛未', '壬申', '癸酉', '甲午', '乙未', '丙申', '丁酉', '戊戌', '己酉', '庚戌', '辛亥', '壬子', '癸丑'];
export const ZHONGYUAN = ['己巳', '庚午', '辛未', '壬申', '癸酉', '甲申', '乙酉', '丙戌', '丁亥', '戊子', '己亥', '庚子', '辛丑', '壬寅', '癸卯', '甲寅', '乙卯', '丙辰', '丁巳', '戊午'];
export const XIAYUAN = ['甲戌', '乙亥', '丙子', '丁丑', '戊寅', '己丑', '庚寅', '辛卯', '壬辰', '癸巳', '甲辰', '乙巳', '丙午', '丁未', '戊申', '己未', '庚申', '辛酉', '壬戌', '癸亥'];

// 节气局数表
export const YANGDUN_JIEQI: Record<string, number[]> = {
  冬至: [1, 7, 4], 惊蛰: [1, 7, 4],
  小寒: [2, 8, 5],
  大寒: [3, 9, 6], 春分: [3, 9, 6],
  芒种: [6, 3, 9],
  谷雨: [5, 2, 8], 小满: [5, 2, 8],
  立春: [8, 5, 2],
  立夏: [4, 1, 7], 清明: [4, 1, 7],
  雨水: [9, 6, 3],
};

export const YINDUN_JIEQI: Record<string, number[]> = {
  夏至: [9, 3, 6], 白露: [9, 3, 6],
  小暑: [8, 2, 5],
  秋分: [7, 1, 4], 大暑: [7, 1, 4],
  立秋: [2, 5, 8],
  霜降: [5, 8, 2], 小雪: [5, 8, 2],
  大雪: [4, 7, 1],
  处暑: [1, 4, 7],
  立冬: [6, 9, 3], 寒露: [6, 9, 3],
};

// 三奇六仪
export const SANQI_LIUYI: HeavenlyStem[] = ['戊', '己', '庚', '辛', '壬', '癸', '丁', '丙', '乙'];

// 六甲旬首对应遁干
export const LIUJIA_XUN: Record<XunShou, HeavenlyStem> = {
  甲子: '戊',
  甲戌: '己',
  甲申: '庚',
  甲午: '辛',
  甲辰: '壬',
  甲寅: '癸',
};

// 九星原生宫位
export const STAR_ORIGINAL_POSITIONS: Record<Star, Position> = {
  天蓬: 1,
  天芮: 2,
  天冲: 3,
  天辅: 4,
  天禽: 5,
  天心: 6,
  天柱: 7,
  天任: 8,
  天英: 9,
};

// 八门原生宫位
export const GATE_ORIGINAL_POSITIONS: Record<Gate, Position> = {
  休门: 1,
  生门: 8,
  伤门: 3,
  杜门: 4,
  景门: 9,
  死门: 2,
  惊门: 7,
  开门: 6,
};

// 八神顺序
export const DEITIES: Deity[] = ['值符', '腾蛇', '太阴', '六合', '白虎', '玄武', '九地', '九天'];

// 九星顺序（转盘用）
export const STAR_SEQUENCE: Star[] = ['天心', '天蓬', '天任', '天冲', '天辅', '天英', '天芮', '天柱'];

// 八门顺序
export const GATE_SEQUENCE: Gate[] = ['休门', '生门', '伤门', '杜门', '景门', '死门', '惊门', '开门'];

// 宫位几何顺时针/逆时针（从坤2开始）
export const PALACE_CLOCKWISE: Position[] = [2, 7, 6, 1, 8, 3, 4, 9];
export const PALACE_COUNTER_CLOCKWISE: Position[] = [2, 9, 4, 3, 8, 1, 6, 7];

// 九宫位置常量映射
export const PALACE_POSITIONS: Record<Trigram, Position> = {
  坎: 1,
  坤: 2,
  震: 3,
  巽: 4,
  中: 5,
  乾: 6,
  兑: 7,
  艮: 8,
  离: 9,
};

// 宫位对应地支
export const PALACE_BRANCHES: Record<Position, EarthlyBranch[]> = {
  1: ['子'],
  2: ['未', '申'],
  3: ['卯'],
  4: ['辰', '巳'],
  5: [],
  6: ['戌', '亥'],
  7: ['酉'],
  8: ['丑', '寅'],
  9: ['午'],
};

// 旬首空亡
export const XUN_SHOU_VOIDNESS: Record<XunShou, [EarthlyBranch, EarthlyBranch]> = {
  甲子: ['戌', '亥'],
  甲戌: ['申', '酉'],
  甲申: ['午', '未'],
  甲午: ['辰', '巳'],
  甲辰: ['寅', '卯'],
  甲寅: ['子', '丑'],
};

// 驿马地支
export const POST_HORSE_MAP: Record<string, EarthlyBranch> = {
  申子辰: '寅',
  亥卯未: '申',
  寅午戌: '申',
  巳酉丑: '亥',
};

// 地支相冲
export const BRANCH_CONFLICT: Record<EarthlyBranch, EarthlyBranch> = {
  子: '午', 午: '子',
  丑: '未', 未: '丑',
  寅: '申', 申: '寅',
  卯: '酉', 酉: '卯',
  辰: '戌', 戌: '辰',
  巳: '亥', 亥: '巳',
};

// 地支三合
export const BRANCH_TRIPLE_HARMONY = {
  申子辰: ['申', '子', '辰'] as const,
  寅午戌: ['寅', '午', '戌'] as const,
  巳酉丑: ['巳', '酉', '丑'] as const,
  亥卯未: ['亥', '卯', '未'] as const,
};

// 五行映射
export const STEM_FIVE_ELEMENTS: Record<HeavenlyStem, FiveElements> = {
  甲: '木', 乙: '木',
  丙: '火', 丁: '火',
  戊: '土', 己: '土',
  庚: '金', 辛: '金',
  壬: '水', 癸: '水',
};

export const BRANCH_FIVE_ELEMENTS: Record<EarthlyBranch, FiveElements> = {
  子: '水', 丑: '土', 寅: '木', 卯: '木', 辰: '土', 巳: '火', 午: '火', 未: '土', 申: '金', 酉: '金', 戌: '土', 亥: '水',
};

export const GATE_FIVE_ELEMENTS: Record<Gate, FiveElements> = {
  休门: '水',
  生门: '土',
  伤门: '木',
  杜门: '木',
  景门: '火',
  死门: '土',
  惊门: '金',
  开门: '金',
};

export const STAR_FIVE_ELEMENTS: Record<Star, FiveElements> = {
  天蓬: '水',
  天任: '土',
  天冲: '木',
  天辅: '木',
  天英: '火',
  天芮: '土',
  天柱: '金',
  天心: '金',
  天禽: '土',
};

export const PALACE_FIVE_ELEMENTS: Record<Trigram, FiveElements> = {
  坎: '水',
  坤: '土',
  震: '木',
  巽: '木',
  中: '土',
  乾: '金',
  兑: '金',
  艮: '土',
  离: '火',
};

export const GONG_NAME: Record<Position, Trigram> = { 1: '坎', 2: '坤', 3: '震', 4: '巽', 5: '中', 6: '乾', 7: '兑', 8: '艮', 9: '离' };
