import { UniversalCommunicate } from 'edge-tts-universal';
import fs from 'fs';

const text = "欢迎观看本期节目，我是大橙子。今天给大家带来 OpenClaw 的完全新手指南。OpenClaw 是一款 AI 编码助手，完全开源免费，支持自托管部署。让我们开始吧！";

async function main() {
  const communicate = new UniversalCommunicate(text, "zh-CN-YunyangNeural");
  
  const chunks = [];
  for await (const chunk of communicate.stream()) {
    if (chunk.type === "audio" && chunk.data) {
      chunks.push(chunk.data);
    }
  }
  
  const audioBuffer = Buffer.concat(chunks);
  fs.writeFileSync("./out/intro-audio-yunyang.mp3", audioBuffer);
  
  console.log('Audio generated: out/intro-audio-yunyang.mp3');
  console.log('Audio size:', audioBuffer.length, 'bytes');
}

main().catch(console.error);