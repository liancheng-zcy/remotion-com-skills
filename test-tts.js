const edgeTTS = require('edge-tts');

const text = "欢迎观看本期节目，我是大橙子。今天给大家带来 OpenClaw 的完全新手指南。OpenClaw 是一款 AI 编码助手，完全开源免费，支持自托管部署。让我们开始吧！";

async function main() {
  const voice = 'zh-CN-XiaoxiaoNeural';
  
  await edgeTTS.synthesize(text, voice, './out/intro-audio.mp3');
  console.log('Audio generated: out/intro-audio.mp3');
}

main().catch(console.error);