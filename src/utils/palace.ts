import { EarthlyBranch, Position } from '../qimen-types';
import { PALACE_BRANCHES, PALACE_CLOCKWISE, PALACE_COUNTER_CLOCKWISE } from '../data/constants';

export const getClockwisePalaces = (startPos: Position): Position[] => {
  const idx = PALACE_CLOCKWISE.indexOf(startPos);
  if (idx === -1) return [...PALACE_CLOCKWISE];
  return [...PALACE_CLOCKWISE.slice(idx), ...PALACE_CLOCKWISE.slice(0, idx)];
};

export const getCounterClockwisePalaces = (startPos: Position): Position[] => {
  const idx = PALACE_COUNTER_CLOCKWISE.indexOf(startPos);
  if (idx === -1) return [...PALACE_COUNTER_CLOCKWISE];
  return [...PALACE_COUNTER_CLOCKWISE.slice(idx), ...PALACE_COUNTER_CLOCKWISE.slice(0, idx)];
};

export const getBranchIndex = (branch: EarthlyBranch): number => {
  const branches: EarthlyBranch[] = ['子', '丑', '寅', '卯', '辰', '巳', '午', '未', '申', '酉', '戌', '亥'];
  return branches.indexOf(branch);
};

export const findPalaceByBranch = (branch: EarthlyBranch): Position | undefined => {
  return (Object.keys(PALACE_BRANCHES) as unknown as Position[]).find((p) => PALACE_BRANCHES[p].includes(branch));
};

export const fixIndex = (index: number, max: number = 12): number => {
  let result = index % max;
  if (result < 0) result += max;
  return result;
};

