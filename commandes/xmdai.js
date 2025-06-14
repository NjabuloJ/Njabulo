const { fana } = require("./njabulo/fana");
const ai = require('unlimited-ai');
const axios = require('axios'); // Added missing axios import
const fs = require('fs');
const conf = require(__dirname + "/../set");

// Common function for fetching GPT responses
const fetchGptResponse = async (url, query) => {
  try {
    const response = await axios.get(url + encodeURIComponent(query));
    const data = response.data;
    if (data && data.status) {
      return data.BK9;
    } else {
      throw new Error('Failed to retrieve GPT response.');
    }
  } catch (error) {
    console.error('Error fetching GPT response:', error);
    return 'Something went wrong. Unable to fetch GPT response.';
  }
};

// General handler for AI commands
const handleAiCommand = async (dest, zk, params, url, usageExample) => {
  const { repondre, arg } = params;
  const alpha = arg.join(" ").trim();

  if (!alpha) {
    return repondre(usageExample);
  }

  const text = alpha;

  try {
    const response = await fetchGptResponse(url, text);

    await zk.sendMessage(dest, {
      text: response,
     contextInfo: {
        externalAdReply: {
          title: "Njabulo Jb",
          body: "Message via ad !",
          thumbnailUrl: "https://whatsapp.com/channel/0029VbAckOZ7tkj92um4KN3u",
          sourceUrl: "https://whatsapp.com/channel/0029VbAckOZ7tkj92um4KN3u",
          mediaType: 1,
          showAdAttribution: true
        },
      },
    });
  } catch (error) {
    console.error("Error generating AI response:", error);
    await repondre("Sorry, I couldn't process your request.");
  }
};

// fana command handlers
fana({
  nomCom: "chat",
  aliases: ["chatbot", "chatai"],
  reaction: '📜',
  categorie: "AI"
}, async (dest, zk, params) => {
  handleAiCommand(dest, zk, params, "https://bk9.fun/ai/chataibot?q=", "Example usage: gpt How's the weather today?");
});

fana({
  nomCom: "vw",
  aliases: ["vwgolf", "vwgolfbot"],
  reaction: '📜',
  categorie: "AI"
}, async (dest, zk, params) => {
  handleAiCommand(dest, zk, params, "https://bk9.fun/ai/BK93?BK9=you%20are%20zoro%20from%20one%20piece&q=", "Hello there, This is vw golf, How may I help you with?");
});

fana({
  nomCom: "gpt",
  aliases: ["ilamaa", "ilamaai"],
  reaction: '📜',
  categorie: "AI"
}, async (dest, zk, params) => {
  handleAiCommand(dest, zk, params, "https://bk9.fun/ai/llama?q=", "Example usage: gpt Hi, how are you?");
});

fana({
  nomCom: "gemini",
  aliases: ["gemini4", "geminiai"],
  reaction: '📜',
  categorie: "AI"
}, async (dest, zk, params) => {
  handleAiCommand(dest, zk, params, "https://bk9.fun/ai/gemini?q=", "Example usage: gemini Hi, how are you?");
});

fana({
  nomCom: "ilama",
  aliases: ["gpt4", "ai"],
  reaction: '📜',
  categorie: "AI"
}, async (dest, zk, params) => {
  const { repondre, arg } = params;
  const alpha = arg.join(" ").trim();

  if (!alpha) {
    return repondre("Please provide a song name.");
  }

  const text = alpha;
  try {
    const model = 'gpt-4-turbo-2024-04-09';
    const messages = [
      { role: 'user', content: text },
      { role: 'system', content: 'You are an assistant in WhatsApp. You are called Keith. You respond to user commands.' }
    ];

    const response = await ai.generate(model, messages);

    await zk.sendMessage(dest, {
      text: response,
      contextInfo: {
        externalAdReply: {
          title: "Njabulo Jb",
          body: "Message via ad !",
          thumbnailUrl: "https://whatsapp.com/channel/0029VbAckOZ7tkj92um4KN3u",
          sourceUrl: "https://whatsapp.com/channel/0029VbAckOZ7tkj92um4KN3u",
          mediaType: 1,
          showAdAttribution: true
        },
      },
    });
  } catch (error) {
    console.error("Error generating AI response:", error);
    await repondre("Sorry, I couldn't process your request.");
  }
});
  
