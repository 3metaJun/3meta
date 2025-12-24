/**
 * 奇门遁甲排盘 JSON 数据结构设计
 */
/**
 * 八门类型
 */
export type Gate = '休门' | '生门' | '伤门' | '杜门' | '景门' | '死门' | '惊门' | '开门';
/**
 * 九星类型
 */
export type Star = '天蓬' | '天任' | '天冲' | '天辅' | '天英' | '天芮' | '天柱' | '天心' | '天禽';
/**
 * 八神类型
 */
export type Deity = '值符' | '腾蛇' | '太阴' | '六合' | '白虎' | '玄武' | '九地' | '九天';
/**
 * 十天干
 */
export type HeavenlyStem = '甲' | '乙' | '丙' | '丁' | '戊' | '己' | '庚' | '辛' | '壬' | '癸';
/**
 * 十二地支
 */
export type EarthlyBranch = '子' | '丑' | '寅' | '卯' | '辰' | '巳' | '午' | '未' | '申' | '酉' | '戌' | '亥';
/**
 * 八卦
 */
export type Trigram = '坎' | '坤' | '震' | '巽' | '中' | '乾' | '兑' | '艮' | '离';
/**
 * 九宫位置
 */
export type Position = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;
/**
 * 阴阳属性
 */
export type YinYang = '阴' | '阳';
/**
 * 五行属性
 */
export type FiveElements = '金' | '木' | '水' | '火' | '土';
/**
 * 旬首类型
 */
export type XunShou = '甲子' | '甲戌' | '甲申' | '甲午' | '甲辰' | '甲寅';
/**
 * 局数类型
 */
export type JuType = {
    /** 阳遁/阴遁 */
    type: '阳遁' | '阴遁';
    /** 几局 (1-9局) */
    number: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;
};
/**
 * 十二长生状态
 * 代表天干在该宫位的生旺衰死状态
 */
export type TwelveGrowth = '长生' | '沐浴' | '冠带' | '临官' | '帝旺' | '衰' | '病' | '死' | '墓' | '绝' | '胎' | '养';
/**
 * 十二长生信息
 */
export type GrowthInfo = {
    /** 天盘天干的长生状态（可能是数组，因为可能有多个天干） */
    heavenlyStem: TwelveGrowth | TwelveGrowth[] | string;
    /** 地盘天干的长生状态（可能是数组，因为可能有多个天干） */
    earthlyStem: TwelveGrowth | TwelveGrowth[] | string;
    /** 时干的长生状态（可能是数组，因为可能有多个天干） */
    timeStem?: TwelveGrowth | TwelveGrowth[] | string;
    /** 日干的长生状态（可能是数组，因为可能有多个天干） */
    dayStem?: TwelveGrowth | TwelveGrowth[] | string;
};
/**
 * 六仪击刑类型
 * 甲子戊、甲戌己、甲申庚、甲午辛、甲辰壬、甲寅癸
 */
export type LiuYiJiXing = {
    /** 是否击刑 */
    hasJiXing: boolean;
    /** 击刑类型 */
    type?: '甲子戊' | '甲戌己' | '甲申庚' | '甲午辛' | '甲辰壬' | '甲寅癸';
    /** 击刑描述 */
    description?: string;
};
/**
 * 入墓信息
 * 天干入墓：乙癸入未、乙丙戊入戌、丁己庚入丑、辛壬入辰
 */
export type TombInfo = {
    /** 天盘天干是否入墓 (返回入墓的天干列表) */
    heavenlyStemInTomb: HeavenlyStem[];
    /** 地盘天干是否入墓 (返回入墓的天干列表) */
    earthlyStemInTomb: HeavenlyStem[];
    /** 时干是否入墓 */
    timeStemInTomb?: boolean;
    /** 日干是否入墓 */
    dayStemInTomb?: boolean;
    /** 入墓地支 */
    tombBranch?: EarthlyBranch;
};
/**
 * 五不遇时
 * 时干克日干，称为"五不遇时"，主凶
 * 甲日庚午时、乙日辛巳时、丙日壬辰时、丁日癸卯时、戊日甲寅时、 己日乙丑时、庚日丙子时、辛日丁酉时、壬日戊申时、癸日己未时
 */
export type WuBuYuShi = {
    /** 是否五不遇时 */
    isWuBuYuShi: boolean;
    /** 克制关系描述 */
    description?: string;
};
/**
 * 十干克应
 * 描述天干之间的生克制化关系
 */
export type TenStemResponse = {
    /** 天盘天干与地盘天干的关系 */
    heavenlyToEarthly: {
        /** 关系类型 */
        relation: '比和' | '生我' | '克我' | '我生' | '我克' | '无';
        /** 具体描述 */
        description: string;
        /** 是否吉利 */
        isAuspicious?: boolean;
    };
    /** 时干与日干的关系 */
    timeToDay?: {
        relation: '比和' | '生我' | '克我' | '我生' | '我克' | '无';
        description: string;
        isAuspicious?: boolean;
    };
    /** 天盘天干与日干的关系 */
    heavenlyToDay?: {
        relation: '比和' | '生我' | '克我' | '我生' | '我克' | '无';
        description: string;
        isAuspicious?: boolean;
    };
};
/**
 * 九星旺相休囚废状态
 */
export type StarStatus = '旺' | '相' | '休' | '囚' | '废';
/**
 * 八门旺相休囚死状态
 */
export type GateStatus = '旺' | '相' | '休' | '囚' | '死';
/**
 * 元类型（上中下）
 */
export type Yuan = '上元' | '中元' | '下元';
/**
 * 季节类型
 */
export type Season = '春' | '夏' | '秋' | '冬' | '四季月';
/**
 * 内外盘标记
 */
export type InnerOuter = '内盘' | '外盘';
/**
 * 门迫关系
 */
export type GatePressure = '迫' | '制' | '和' | '义';
/**
 * 吉格类型
 */
export type AuspiciousPattern = {
    /** 格局名称 */
    name: string;
    /** 格局类型 */
    type: '青龙返首' | '飞鸟跌穴' | '九遁' | '三奇得使' | '玉女守门' | '三奇贵人升殿' | '天显时格' | '三诈五假' | '三奇之灵' | '奇游禄位' | '欢怡' | '奇仪相和' | '门宫和义' | '天遁' | '地遁' | '人遁' | '风遁' | '云遁' | '龙遁' | '虎遁' | '神遁' | '鬼遁' | '真诈' | '休诈' | '重诈' | '天假' | '地假' | '人假' | '神假' | '鬼假' | '奇和' | '仪和';
    /** 所在宫位 */
    position: Position;
    /** 详细描述 */
    description: string;
};
/**
 * 凶格类型
 */
export type InauspiciousPattern = {
    /** 格局名称 */
    name: string;
    /** 格局类型 */
    type: '青龙逃走' | '白虎猖狂' | '朱雀投江' | '螣蛇夭矫' | '荧入太白' | '太白入荧' | '大格' | '小格' | '刑格' | '奇格' | '伏宫格' | '飞宫格' | '岁格' | '月格' | '日格' | '飞干格' | '伏干格' | '时格' | '六仪击刑' | '三奇入墓' | '三奇受刑' | '时干入墓' | '门迫' | '悖格' | '天网四张' | '五不遇时';
    /** 所在宫位（某些格局可能不限宫位） */
    position?: Position;
    /** 详细描述 */
    description: string;
};
/**
 * 伏吟反吟详细信息
 */
export type FuYinFanYinDetail = {
    /** 星伏吟 */
    starFuYin: boolean;
    /** 门伏吟 */
    gateFuYin: boolean;
    /** 值符伏吟（天地盘天干相同） */
    zhiFuFuYin: boolean;
    /** 星反吟 */
    starFanYin: boolean;
    /** 门反吟 */
    gateFanYin: boolean;
    /** 值符反吟（天地盘天干相冲） */
    zhiFuFanYin: boolean;
    /** 详细描述 */
    description: string[];
};
/**
 * 驿马星信息
 */
export type PostHorse = {
    /** 驿马所在地支 */
    branch: EarthlyBranch;
    /** 驿马所在宫位 */
    position: Position;
    /** 是否在当前宫 */
    isInCurrentPalace?: boolean;
};
/**
 * 单个宫位的完整信息（增强版）
 */
export type Palace = {
    /** 宫位位置 (1-9) */
    position: Position;
    /** 对应八卦 */
    trigram: Trigram;
    /** 八门 */
    gate: Gate | '无门';
    /** 九星（可能有多个，如天禽跟随天芮） */
    star: Star | [Star, Star] | '天禽' | string;
    /** 八神 */
    deity: Deity | '无神';
    /** 天盘天干（飞动的天干，随值符转动，可能有多个如天禽携带） */
    heavenlyStem: HeavenlyStem | [HeavenlyStem, HeavenlyStem] | '无';
    /** 地盘天干（固定的天干，宫位本身的天干，可能有多个如寄宫） */
    earthlyStem: HeavenlyStem | [HeavenlyStem, HeavenlyStem];
    /** 地支（地盘地支，固定不变，可能有多个） */
    earthBranch: EarthlyBranch | [EarthlyBranch, EarthlyBranch] | '无';
    /** 值符标记 */
    isZhiFu?: boolean;
    /** 值使标记 */
    isZhiShi?: boolean;
    /** 天盘奇门（六甲/三奇） */
    qiMen?: {
        name: string;
        type: '六甲' | '三奇';
    };
    /** 马星 */
    horse?: boolean;
    /** 空亡信息（详细） */
    voidness: VoidnessInfo;
    /** 宫位五行 */
    fiveElements: FiveElements;
    /** 旺相休囚死状态 */
    status?: {
        /** 九星状态 */
        star: StarStatus | '无';
        /** 八门状态 */
        gate: GateStatus | '无';
    };
    /** ========== 新增字段 ========== */
    /** 内外盘标记 */
    innerOuter: InnerOuter | '无';
    /** 门迫关系 */
    gatePressure: GatePressure | '无';
    /** 十二长生信息 */
    growthInfo: GrowthInfo;
    /** 六仪击刑 */
    liuYiJiXing: LiuYiJiXing;
    /** 入墓信息 */
    tombInfo: TombInfo;
    /** 十干克应 */
    tenStemResponse: TenStemResponse;
    /** 是否为驿马位 */
    isPostHorse?: boolean;
    /** 本宫的吉格列表 */
    auspiciousPatterns?: AuspiciousPattern[];
    /** 本宫的凶格列表 */
    inauspiciousPatterns?: InauspiciousPattern[];
    /** 是否中五宫寄宫 */
    isJiGong?: {
        /** 是否为寄宫 */
        isJi: boolean;
        /** 寄宫类型 */
        type?: '阳遁寄艮八' | '阴遁寄坤二';
        /** 额外的天盘天干（中五宫的丁或天禽携带的天干） */
        extraHeavenlyStem?: HeavenlyStem;
        /** 额外的九星（天禽星） */
        extraStar?: Star | '';
    };
};
/**
 * 时间信息
 */
export type TimeInfo = {
    /** 阳历日期 */
    solarDate: string;
    /** 农历日期 */
    lunarDate: string;
    /** 干支纪年 */
    chineseYear: string;
    /** 干支纪月 */
    chineseMonth: string;
    /** 干支纪日 */
    chineseDay: string;
    /** 干支纪时 */
    chineseTime: string;
    /** 时辰地支 */
    timeEarthlyBranch: EarthlyBranch;
    /** 时辰名称 */
    timeName: string;
    /** 节气 */
    solarTerm?: string;
    /** 时柱旬首 */
    xunShou: XunShou;
    /** 时柱空亡地支 */
    voidness: [EarthlyBranch, EarthlyBranch];
};
/**
 * 四柱信息
 */
export type FourPillars = {
    year: {
        stem: HeavenlyStem;
        branch: EarthlyBranch;
    };
    month: {
        stem: HeavenlyStem;
        branch: EarthlyBranch;
    };
    day: {
        stem: HeavenlyStem;
        branch: EarthlyBranch;
    };
    hour: {
        stem: HeavenlyStem;
        branch: EarthlyBranch;
    };
};
/**
 * 全局特殊格局标记
 */
export type SpecialPatterns = {
    /** 五不遇时 */
    wuBuYuShi?: WuBuYuShi;
    /** 伏吟反吟详细信息 */
    fuYinFanYin?: FuYinFanYinDetail;
    /** 门迫列表 */
    menPo?: Array<{
        position: Position;
        gate: Gate;
        gatePressure: GatePressure;
        description: string;
    }>;
    /** 所有吉格 */
    auspiciousPatterns?: AuspiciousPattern[];
    /** 所有凶格 */
    inauspiciousPatterns?: InauspiciousPattern[];
    /** 其他特殊标记 */
    others?: string[];
};
/**
 * 用神分析
 */
export type Interpretation = {
    userPalace?: Position;
    userType?: '求财' | '求婚' | '求官' | '求学' | '问病' | '出行' | '其他';
    pattern?: string[];
    fortune?: '吉' | '凶' | '平';
    advice?: string;
};
/**
 * 奇门遁甲完整排盘数据（增强版）
 */
export type QimenChart = {
    /** 版本信息 */
    version: string;
    /** 时间信息 */
    timeInfo: TimeInfo;
    /** 四柱信息 */
    fourPillars: FourPillars;
    /** 局数信息 */
    ju: JuType;
    /** 元信息（上中下元） */
    yuan: Yuan;
    /** 季节信息 */
    season: Season;
    /** 月令五行 */
    monthElement: FiveElements;
    /** 值符 */
    zhiFu: {
        star: Star;
        position: Position;
        /** 值符所带的天盘天干（六仪） */
        heavenlyStem: HeavenlyStem;
    };
    /** 值使 */
    zhiShi: {
        gate: Gate;
        position: Position;
    };
    /** 驿马星 */
    postHorse: PostHorse;
    /** 九宫数据 */
    palaces: Palace[];
    /** ========== 新增字段 ========== */
    /** 全局特殊格局 */
    specialPatterns: SpecialPatterns;
    /** 用神分析（可选） */
    interpretation?: Interpretation;
    /** 排盘方法 */
    method?: {
        /** 起局方法 */
        juMethod: string;
        /** 排盘类型 */
        chartType: '转盘' | '飞盘';
        /** 是否置闰 */
        leapAdjustment: boolean;
        /** 拆补法/茅山法等 */
        calculationMethod?: string;
    };
    /** 元数据 */
    metadata?: {
        createdAt: string;
        creator?: string;
        question?: string;
        notes?: string;
    };
};
/**
 * 空亡信息
 */
export type VoidnessInfo = {
    /** 时柱旬首对应的空亡地支（两个） */
    voidBranches: [EarthlyBranch, EarthlyBranch];
    /** 该宫的地支列表（可能有1-2个，或"无"） */
    palaceBranches: EarthlyBranch[] | ['无'];
    /** 该宫空亡的地支列表 */
    voidInPalace: EarthlyBranch[];
    /** 是否有地支空亡 */
    hasVoidness: boolean;
};
/**
 * 九宫位置常量映射
 */
export declare const PALACE_POSITIONS: {
    readonly 坎: 1;
    readonly 坤: 2;
    readonly 震: 3;
    readonly 巽: 4;
    readonly 中: 5;
    readonly 乾: 6;
    readonly 兑: 7;
    readonly 艮: 8;
    readonly 离: 9;
};
/**
 * 九星原生宫位
 */
export declare const STAR_ORIGINAL_POSITIONS: Record<Star, Position>;
/**
 * 八门原生宫位
 */
export declare const GATE_ORIGINAL_POSITIONS: Record<Gate, Position>;
/**
 * 宫位对应的地支（固定不变）
 * 从坎1宫的子开始，顺时针排布
 */
export declare const PALACE_BRANCHES: Record<Position, EarthlyBranch[]>;
/**
 * 旬首对应的空亡地支
 */
export declare const XUN_SHOU_VOIDNESS: Record<XunShou, [EarthlyBranch, EarthlyBranch]>;
/**
 * 六甲隐遁的天干
 */
export declare const LIU_JIA_HIDDEN: Record<XunShou, HeavenlyStem>;
/**
 * 驿马地支查询表
 */
export declare const POST_HORSE_MAP: Record<string, EarthlyBranch>;
/**
 * 地支相冲表
 */
export declare const BRANCH_CONFLICT: Record<EarthlyBranch, EarthlyBranch>;
/**
 * 地支三合表（用于判断驿马等）
 */
export declare const BRANCH_TRIPLE_HARMONY: {
    readonly 申子辰: readonly ["申", "子", "辰"];
    readonly 寅午戌: readonly ["寅", "午", "戌"];
    readonly 巳酉丑: readonly ["巳", "酉", "丑"];
    readonly 亥卯未: readonly ["亥", "卯", "未"];
};
/**
 * 天干五行属性
 */
export declare const STEM_FIVE_ELEMENTS: Record<HeavenlyStem, FiveElements>;
/**
 * 地支五行属性
 */
export declare const BRANCH_FIVE_ELEMENTS: Record<EarthlyBranch, FiveElements>;
/**
 * 八门五行属性
 */
export declare const GATE_FIVE_ELEMENTS: Record<Gate, FiveElements>;
/**
 * 九星五行属性
 */
export declare const STAR_FIVE_ELEMENTS: Record<Star, FiveElements>;
/**
 * 宫位五行属性
 */
export declare const PALACE_FIVE_ELEMENTS: Record<Trigram, FiveElements>;
