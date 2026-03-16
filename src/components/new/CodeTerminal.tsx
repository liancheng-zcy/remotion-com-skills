// CodeTerminal - 终端风格代码展示组件
// Apple 风格终端，支持逐行打印动画

import React from 'react';
import { useCurrentFrame, useVideoConfig, spring } from 'remotion';
import { COLORS, FONTS, SIZES, DURATIONS } from '../../design-system/tokens';
import { SPRING_PRESETS, entranceAnimations } from '../../design-system/animations';

interface CodeTerminalProps {
  code: string;
  language?: 'bash' | 'json' | 'javascript' | 'typescript';
  filename?: string;
  typingSpeed?: number;  // 每帧打几个字，默认 1
  lineDelay?: number;    // 行间延迟（帧）
  showLineNumbers?: boolean;
}

// 语法高亮规则
const syntaxRules: Record<string, Array<{ pattern: RegExp; color: string }>> = {
  bash: [
    { pattern: /(#.*)$/gm, color: '#6a9955' },                    // 注释
    { pattern: /(".*?")/g, color: '#ce9178' },                   // 字符串
    { pattern: /('.*?')/g, color: '#ce9178' },                   // 单引号字符串
    { pattern: /\b(curl|sudo|apt|apt-get|git|chmod|mv|touch|cat|echo|source|npm|pnpm|bun|npx|node|cd|ls|mkdir|rm|cp|tar|gzip|wget|ssh|scp)\b/g, color: '#569cd6' }, // 命令
    { pattern: /\b(https?:\/\/[^\s]+)/g, color: '#9cdcfe' },    // URL
    { pattern: /\b(\d+\.\d+\.\d+)\b/g, color: '#b5cea8' },       // 版本号
  ],
  json: [
    { pattern: /(".*?")(?=\s*:)/g, color: '#9cdcfe' },           // 键
    { pattern: /: (".*?")/g, color: '#ce9178' },                 // 字符串值
    { pattern: /\b(true|false|null)\b/g, color: '#569cd6' },    // 布尔/空值
    { pattern: /\b(\d+)\b/g, color: '#b5cea8' },                // 数字
  ],
  javascript: [
    { pattern: /(\/\/.*)$/gm, color: '#6a9955' },                // 注释
    { pattern: /(".*?"|'.*?'|`.*?`)/g, color: '#ce9178' },      // 字符串
    { pattern: /\b(const|let|var|function|return|if|else|for|while|import|export|from|async|await|class|new|try|catch)\b/g, color: '#c586c0' }, // 关键字
    { pattern: /\b(console|window|document|Math|JSON|Promise|Array|Object|String|Number)\b/g, color: '#4ec9b0' }, // 内置对象
  ],
  typescript: [
    { pattern: /(\/\/.*)$/gm, color: '#6a9955' },
    { pattern: /(".*?"|'.*?'|`.*?`)/g, color: '#ce9178' },
    { pattern: /\b(const|let|var|function|return|if|else|for|while|import|export|from|async|await|class|new|try|catch|interface|type|extends|implements)\b/g, color: '#c586c0' },
    { pattern: /\b(string|number|boolean|any|void|unknown|never|undefined|null)\b/g, color: '#4ec9b0' }, // 类型
  ],
};

// Token 类型
interface Token {
  text: string;
  color?: string;
}

// 应用语法高亮 - 返回 token 数组而不是 HTML 字符串
const tokenizeLine = (line: string, language: string): Token[] => {
  const rules = syntaxRules[language] || syntaxRules.bash;
  const tokens: Token[] = [];

  // 找出所有匹配的位置
  const matches: Array<{ start: number; end: number; text: string; color: string }> = [];

  rules.forEach(({ pattern, color }) => {
    // 复制正则以便能重置
    const globalPattern = new RegExp(pattern.source, 'g');
    let match;
    while ((match = globalPattern.exec(line)) !== null) {
      matches.push({
        start: match.index,
        end: match.index + match[0].length,
        text: match[0],
        color,
      });
    }
  });

  // 按起始位置排序
  matches.sort((a, b) => a.start - b.start);

  // 合并重叠的匹配（优先保留第一个）
  const filteredMatches: typeof matches = [];
  let currentEnd = -1;
  for (const match of matches) {
    if (match.start >= currentEnd) {
      filteredMatches.push(match);
      currentEnd = match.end;
    }
  }

  // 构建 token 数组
  let pos = 0;
  for (const match of filteredMatches) {
    if (match.start > pos) {
      tokens.push({ text: line.slice(pos, match.start) });
    }
    tokens.push({ text: match.text, color: match.color });
    pos = match.end;
  }
  if (pos < line.length) {
    tokens.push({ text: line.slice(pos) });
  }

  return tokens.length > 0 ? tokens : [{ text: line }];
};

export const CodeTerminal: React.FC<CodeTerminalProps> = ({
  code,
  language = 'bash',
  filename = 'Terminal',
  typingSpeed = 1,
  lineDelay = 3,
  showLineNumbers = true,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const lines = code.trim().split('\n');
  const maxLineNumWidth = String(lines.length).length;

  // 容器入场动画
  const containerOpacity = entranceAnimations.fade(frame, DURATIONS.normal);
  const containerScale = spring({
    frame,
    fps,
    config: SPRING_PRESETS.bouncy,
  });

  // 计算每行应该显示的字符数
  const getVisibleChars = (lineIndex: number, lineLength: number) => {
    const lineStartFrame = lineIndex * lineDelay;
    const chars = Math.min(
      Math.floor((frame - lineStartFrame) / typingSpeed),
      lineLength
    );
    return Math.max(0, chars);
  };

  return (
    <div
      style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: COLORS.background,
        padding: SIZES.spacing.xxl,
      }}
    >
      <div
        style={{
          backgroundColor: COLORS.backgroundElevated,
          borderRadius: SIZES.radius.lg,
          padding: SIZES.spacing.lg,
          maxWidth: 1200,
          width: '100%',
          boxShadow: '0 25px 80px rgba(0,0,0,0.6)',
          opacity: containerOpacity,
          transform: `scale(${0.95 + containerScale * 0.05})`,
          border: `1px solid ${COLORS.backgroundSecondary}`,
        }}
      >
        {/* 终端标题栏 */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            marginBottom: SIZES.spacing.md,
            paddingBottom: SIZES.spacing.md,
            borderBottom: `1px solid ${COLORS.backgroundSecondary}`,
          }}
        >
          {/* 红绿灯 */}
          <div style={{ display: 'flex', gap: 8 }}>
            <div
              style={{
                width: 12,
                height: 12,
                borderRadius: '50%',
                backgroundColor: '#ff5f57',
              }}
            />
            <div
              style={{
                width: 12,
                height: 12,
                borderRadius: '50%',
                backgroundColor: '#febc2e',
              }}
            />
            <div
              style={{
                width: 12,
                height: 12,
                borderRadius: '50%',
                backgroundColor: '#28c840',
              }}
            />
          </div>

          {/* 文件名 */}
          <div
            style={{
              flex: 1,
              textAlign: 'center',
              color: COLORS.textSecondary,
              fontSize: SIZES.caption,
              fontFamily: FONTS.text,
              fontWeight: 500,
            }}
          >
            {filename}
          </div>

          {/* 占位保持居中 */}
          <div style={{ width: 52 }} />
        </div>

        {/* 代码内容 */}
        <pre
          style={{
            fontSize: 20,
            fontFamily: FONTS.mono,
            color: COLORS.text,
            lineHeight: 1.8,
            whiteSpace: 'pre-wrap',
            wordBreak: 'break-all',
            margin: 0,
            overflow: 'hidden',
          }}
        >
          {lines.map((line, lineIndex) => {
            const visibleChars = getVisibleChars(lineIndex, line.length);
            const visibleLine = line.slice(0, visibleChars);
            const lineOpacity = entranceAnimations.fade(
              frame - lineIndex * lineDelay,
              8
            );

            // 只有当整行都显示完整时才应用语法高亮
            const isLineComplete = visibleChars >= line.length;
            const tokens = isLineComplete
              ? tokenizeLine(line, language)
              : null;

            return (
              <div
                key={lineIndex}
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  opacity: lineOpacity,
                }}
              >
                {/* 行号 */}
                {showLineNumbers && (
                  <span
                    style={{
                      color: COLORS.textTertiary,
                      minWidth: `${maxLineNumWidth + 2}ch`,
                      textAlign: 'right',
                      marginRight: SIZES.spacing.md,
                      userSelect: 'none',
                    }}
                  >
                    {lineIndex + 1}
                  </span>
                )}

                {/* 代码行 - 打字过程中显示纯文本，完成后显示高亮 */}
                {isLineComplete && tokens ? (
                  <span>
                    {tokens.map((token, tokenIndex) => (
                      <span
                        key={tokenIndex}
                        style={token.color ? { color: token.color } : undefined}
                      >
                        {token.text}
                      </span>
                    ))}
                  </span>
                ) : (
                  <span>{visibleLine || '\u00A0'}</span>
                )}

                {/* 当前行光标 */}
                {visibleChars < line.length &&
                  frame > lineIndex * lineDelay &&
                  Math.floor(frame / 8) % 2 === 0 && (
                    <span
                      style={{
                        display: 'inline-block',
                        width: 8,
                        height: 20,
                        backgroundColor: COLORS.primary,
                        marginLeft: 2,
                        verticalAlign: 'middle',
                      }}
                    />
                  )}
              </div>
            );
          })}
        </pre>
      </div>
    </div>
  );
};
