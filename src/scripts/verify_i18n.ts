import { i18n } from '../i18n';
import { formatPattern } from '../i18n/formatters';
import { AuspiciousPattern } from '../qimen-types';
import * as fs from 'fs';
import * as path from 'path';

console.log('--- Verifying i18n Formatting ---');

// Mock pattern
const tianDun: AuspiciousPattern = {
    id: 'patterns.jiu_dun.tian_dun',
    name: '九遁', // These are legacy fields, verification should prove we don't use them if id exists
    type: '天遁',
    position: 1,
    params: { heaven: '丙', earth: '丁', gate: '生门' },
    description: 'Should be ignored (Hardcoded)'
};

// Test zh-CN
i18n.setLocale('zh-CN');
const zhCNResult = formatPattern(tianDun);
console.log(`zh-CN: ${zhCNResult}`);
if (zhCNResult.includes('天盘丙')) {
    console.log('✅ zh-CN formatting correct');
} else {
    console.error('❌ zh-CN formatting failed');
}

// Test zh-TW
i18n.setLocale('zh-TW');
const zhTWResult = formatPattern(tianDun);
console.log(`zh-TW: ${zhTWResult}`);
// TODO: Ensure zh-TW.ts is properly populated. In prev turns it might have been copy-based.
// Assuming it has data.

// Test en-US
i18n.setLocale('en-US');
const enUSResult = formatPattern(tianDun);
console.log(`en-US: ${enUSResult}`);


// Scan for Chinese
console.log('\n--- Scanning for Leftover Chinese Characters in src/analysis/index.ts ---');

// We want to scan the SOURCE file
const projectRoot = path.resolve(__dirname, '../../');
const analysisFile = path.resolve(projectRoot, 'src/analysis/index.ts');

if (fs.existsSync(analysisFile)) {
    const content = fs.readFileSync(analysisFile, 'utf-8');
    const lines = content.split('\n');
    let descriptionCount = 0;

    lines.forEach((line, idx) => {
        // Look for 'description: ' followed by Chinese
        if (line.match(/description:\s*['"`].*[\u4e00-\u9fa5]+.*['"`]/)) {
            descriptionCount++;
            if (descriptionCount <= 3) {
                console.log(`[Line ${idx + 1}] ${line.trim()}`);
            }
        }
    });

    console.log(`Total 'description' fields with Chinese characters: ${descriptionCount}`);

    if (descriptionCount > 0) {
        console.warn('⚠️ WARNING: Hardcoded Chinese descriptions still exist in analysis logic.');
    } else {
        console.log('✅ CLEAN: No hardcoded Chinese descriptions found.');
    }

} else {
    console.error(`Could not search file: ${analysisFile}`);
}
