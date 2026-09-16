import express, { Request, Response } from 'express';
import path from 'path';
import dotenv from 'dotenv';
import { GoogleGenAI, Modality, Type } from '@google/genai';
import { createServer as createViteServer } from 'vite';

dotenv.config();

// Lazy Gemini client helper
let aiClient: GoogleGenAI | null = null;
function getAi(): GoogleGenAI {
  if (!aiClient) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      console.warn('GEMINI_API_KEY environment variable is not set. API calls will fail.');
    }
    aiClient = new GoogleGenAI({
      apiKey: apiKey || '',
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });
  }
  return aiClient;
}

/**
 * Encodes 16-bit mono 24kHz raw PCM into a standard WAV Buffer
 */
function pcmToWav(pcmBuffer: Buffer, sampleRate = 24000, numChannels = 1, bitDepth = 16): Buffer {
  const header = Buffer.alloc(44);
  const byteRate = sampleRate * numChannels * (bitDepth / 8);
  const blockAlign = numChannels * (bitDepth / 8);
  const dataSize = pcmBuffer.length;
  const chunkSize = 36 + dataSize;

  header.write('RIFF', 0);
  header.writeUInt32LE(chunkSize, 4);
  header.write('WAVE', 8);
  header.write('fmt ', 12);
  header.writeUInt32LE(16, 16); // Subchunk size (16 for standard PCM)
  header.writeUInt16LE(1, 20); // PCM audio format
  header.writeUInt16LE(numChannels, 22);
  header.writeUInt32LE(sampleRate, 24);
  header.writeUInt32LE(byteRate, 28);
  header.writeUInt16LE(blockAlign, 32);
  header.writeUInt16LE(bitDepth, 34);
  header.write('data', 36);
  header.writeUInt32LE(dataSize, 40);

  return Buffer.concat([header, pcmBuffer]);
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json({ limit: '30mb' }));

  // Health check endpoint
  app.get('/api/health', (req: Request, res: Response) => {
    res.json({
      status: 'ok',
      hasApiKey: Boolean(process.env.GEMINI_API_KEY),
      timestamp: new Date().toISOString(),
    });
  });

  /**
   * 1. Text to Speech (TTS) using gemini-3.1-flash-tts-preview
   */
  app.post('/api/tts', async (req: Request, res: Response) => {
    try {
      const { text, voice = 'Kore', emotion = 'cheerfully and warmly' } = req.body;
      if (!text || typeof text !== 'string') {
        res.status(400).json({ error: 'Text string is required for TTS' });
        return;
      }

      const ai = getAi();
      // gemini-3.1-flash-tts-preview responds to natural directorial cues like "Say warmly to a child:"
      const directedPrompt = `Read aloud warmly and expressively for a young child's bedtime story: ${text.trim()}`;

      const response = await ai.models.generateContent({
        model: 'gemini-3.1-flash-tts-preview',
        contents: [
          {
            parts: [{ text: directedPrompt }],
          },
        ],
        config: {
          responseModalities: [Modality.AUDIO],
          speechConfig: {
            voiceConfig: {
              prebuiltVoiceConfig: {
                // Prebuilt voices: 'Kore', 'Puck', 'Fenrir', 'Zephyr', 'Charon'
                voiceName: voice,
              },
            },
          },
        },
      });

      const audioPart = response.candidates?.[0]?.content?.parts?.[0];
      const rawBase64 = audioPart?.inlineData?.data;

      if (!rawBase64) {
        throw new Error('No audio data received from Gemini TTS');
      }

      // Convert raw 24kHz 16-bit PCM into a standard WAV
      const pcmBuffer = Buffer.from(rawBase64, 'base64');
      const wavBuffer = pcmToWav(pcmBuffer, 24000, 1, 16);
      const audioUrl = `data:audio/wav;base64,${wavBuffer.toString('base64')}`;

      res.json({
        success: true,
        audioUrl,
        rawBase64,
        voice,
        model: 'gemini-3.1-flash-tts-preview',
      });
    } catch (err: any) {
      console.error('TTS generation error:', err);
      res.status(500).json({
        error: err?.message || 'Failed to synthesize speech',
        fallbackAvailable: true,
      });
    }
  });

  /**
   * 2. High-Quality Image Generation using gemini-3-pro-image-preview
   * Affordance for user to specify imageSize ('1K', '2K', '4K') and aspectRatio
   */
  app.post('/api/generate-illustration', async (req: Request, res: Response) => {
    try {
      const {
        prompt,
        imageSize = '1K',
        aspectRatio = '4:3',
        artStyle = 'Whimsical Storybook Watercolor',
      } = req.body;

      if (!prompt || typeof prompt !== 'string') {
        res.status(400).json({ error: 'Prompt string is required' });
        return;
      }

      // Validate imageSize as required: '1K', '2K', '4K'
      const validSizes: Array<'1K' | '2K' | '4K'> = ['1K', '2K', '4K'];
      const finalSize = validSizes.includes(imageSize) ? imageSize : '1K';

      // Validate aspect ratio
      const validAspectRatios = ['1:1', '4:3', '16:9', '3:4'];
      const finalRatio = validAspectRatios.includes(aspectRatio) ? aspectRatio : '4:3';

      const enrichedPrompt = `Children's storybook illustration in high resolution. Art style: ${artStyle}. ${prompt.trim()}. Warm, magical, vibrant colors, gentle and inviting for young children, detailed artistic textures, no distorted faces or harsh elements.`;

      const ai = getAi();
      let imageUrl: string | null = null;
      let modelUsed = 'gemini-3-pro-image-preview';

      try {
        const response = await ai.models.generateContent({
          model: 'gemini-3-pro-image-preview',
          contents: {
            parts: [{ text: enrichedPrompt }],
          },
          config: {
            imageConfig: {
              aspectRatio: finalRatio as any,
              imageSize: finalSize,
            },
          },
        });

        const parts = response.candidates?.[0]?.content?.parts || [];
        for (const part of parts) {
          if (part.inlineData?.data) {
            const mime = part.inlineData.mimeType || 'image/png';
            imageUrl = `data:${mime};base64,${part.inlineData.data}`;
            break;
          }
        }
      } catch (proError: any) {
        console.warn('gemini-3-pro-image-preview attempt error:', proError?.message);
        // If pro model is unavailable or rate limited, fall back to high quality flash image model
        modelUsed = 'gemini-3.1-flash-image';
        const fallbackResponse = await ai.models.generateContent({
          model: 'gemini-3.1-flash-image',
          contents: {
            parts: [{ text: enrichedPrompt }],
          },
          config: {
            imageConfig: {
              aspectRatio: finalRatio as any,
              imageSize: finalSize,
            },
          },
        });

        const fallbackParts = fallbackResponse.candidates?.[0]?.content?.parts || [];
        for (const part of fallbackParts) {
          if (part.inlineData?.data) {
            const mime = part.inlineData.mimeType || 'image/png';
            imageUrl = `data:${mime};base64,${part.inlineData.data}`;
            break;
          }
        }
      }

      if (!imageUrl) {
        throw new Error('No image was returned from the generator.');
      }

      res.json({
        success: true,
        imageUrl,
        imageSize: finalSize,
        aspectRatio: finalRatio,
        modelUsed,
      });
    } catch (err: any) {
      console.error('Illustration generation error:', err);
      res.status(500).json({
        error: err?.message || 'Failed to generate page illustration',
      });
    }
  });

  /**
   * 3. Multi-turn Chatbot Interface with Model Selection:
   * - gemini-3.1-pro-preview for complex tasks (deep lore, moral dilemmas, character acting)
   * - gemini-3.5-flash for general tasks (reading comprehension, story guides, companion)
   * - gemini-3.1-flash-lite for fast tasks (quick word definitions, rhymes, instant trivia)
   */
  app.post('/api/chat', async (req: Request, res: Response) => {
    try {
      const {
        messages = [],
        taskComplexity = 'general', // 'fast' | 'general' | 'complex'
        characterRole,
        storyContext,
      } = req.body;

      if (!Array.isArray(messages) || messages.length === 0) {
        res.status(400).json({ error: 'Messages array is required' });
        return;
      }

      // Map task complexity to the strictly required models
      let targetModel = 'gemini-3.5-flash';
      if (taskComplexity === 'complex') {
        targetModel = 'gemini-3.1-pro-preview';
      } else if (taskComplexity === 'fast') {
        targetModel = 'gemini-3.1-flash-lite';
      }

      const ai = getAi();

      // Assemble system instruction with character role and story context
      let systemInstruction = characterRole?.systemInstruction ||
        'You are a friendly, encouraging storybook companion who helps kids understand stories, learn new words, and explore their creativity.';

      if (storyContext) {
        systemInstruction += `\n\nCURRENT STORY CONTEXT:\nTitle: "${storyContext.title || 'Untitled'}"\nTarget Age: ${storyContext.targetAge || 'all ages'}\nCurrent Page Number: ${storyContext.currentPageNumber || 1} of ${storyContext.totalPages || 1}\nCurrent Page Text: "${storyContext.currentPageText || ''}"\nPlease weave in details from this page when responding to the child!`;
      }

      // Format multi-turn conversation history for @google/genai
      const formattedContents = messages.map((m: any) => ({
        role: m.role === 'model' ? 'model' : 'user',
        parts: [{ text: m.text || '' }],
      }));

      const response = await ai.models.generateContent({
        model: targetModel,
        contents: formattedContents,
        config: {
          systemInstruction,
          temperature: 0.8,
        },
      });

      const reply = response.text || "I'm thinking! Let's explore the next magical page together!";

      res.json({
        success: true,
        reply,
        modelUsed: targetModel,
        taskComplexity,
      });
    } catch (err: any) {
      console.error('Chat error:', err);
      res.status(500).json({
        error: err?.message || 'Failed to generate chat response',
      });
    }
  });

  /**
   * 4. Custom Kid Story Generator using gemini-3.5-flash
   * Generates a 4 to 5 page story with tailored illustration prompts
   */
  app.post('/api/generate-story', async (req: Request, res: Response) => {
    try {
      const {
        childName = 'Alex',
        topic = 'a friendly flying dragon who delivers letters',
        category = 'Adventure',
        targetAge = '3-5 yrs',
        artStyle = 'Whimsical Storybook Watercolor',
        lesson = 'Kindness and helping others',
      } = req.body;

      const ai = getAi();

      const prompt = `Write a charming, wholesome children's story titled for young readers (${targetAge}).
Hero / Child's Name: "${childName}".
Topic / Idea: "${topic}".
Genre / Category: "${category}".
Core Lesson / Vibe: "${lesson}".
Art style to inspire illustrations: "${artStyle}".

Create a structured story in JSON with exactly 4 to 5 sequential pages.
Each page MUST include:
- pageNumber (integer from 1 to 5)
- text (2-3 engaging, age-appropriate sentences with pleasant rhythm and vivid sensory words)
- illustrationPrompt (a vivid, descriptive visual prompt specifically crafted for an AI image generator to paint that exact moment, including character appearance, setting, lighting, and style)

Return valid JSON conforming to this schema.`;

      const response = await ai.models.generateContent({
        model: 'gemini-3.5-flash',
        contents: prompt,
        config: {
          responseMimeType: 'application/json',
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              title: { type: Type.STRING, description: 'Catchy, magical title of the story' },
              description: { type: Type.STRING, description: 'One-sentence summary of the tale' },
              pages: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    pageNumber: { type: Type.INTEGER },
                    text: { type: Type.STRING },
                    illustrationPrompt: { type: Type.STRING },
                  },
                  required: ['pageNumber', 'text', 'illustrationPrompt'],
                },
              },
            },
            required: ['title', 'description', 'pages'],
          },
        },
      });

      const parsed = JSON.parse(response.text || '{}');

      res.json({
        success: true,
        story: parsed,
      });
    } catch (err: any) {
      console.error('Story generation error:', err);
      res.status(500).json({
        error: err?.message || 'Failed to generate story',
      });
    }
  });

  // Vite integration
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req: Request, res: Response) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Farabi Alamin Portfolio server running on http://0.0.0.0:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('Failed to start server:', err);
});
