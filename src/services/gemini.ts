import { GoogleGenAI } from "@google/genai";

export type AIModel = 'gemini-3-flash-preview' | 'gemini-3-pro-preview' | 'gemini-2.5-flash';

const FALLBACK_CHAIN: AIModel[] = [
  'gemini-3-flash-preview',
  'gemini-3-pro-preview',
  'gemini-2.5-flash'
];

export interface SolutionStep {
  title: string;
  content: string;
}

export interface SolutionResponse {
  title: string;
  steps: SolutionStep[];
  final_answer: string;
  explanation_for_speech: string;
}

export async function analyzeImage(base64Image: string): Promise<SolutionResponse> {
  const apiKey = localStorage.getItem('gemini_api_key');
  if (!apiKey) {
    throw new Error('API_KEY_MISSING');
  }

  const preferredModel = (localStorage.getItem('gemini_ai_model') as AIModel) || 'gemini-3-flash-preview';

  // Reorder fallback chain to start with preferred model
  const modelsToTry = [
    preferredModel,
    ...FALLBACK_CHAIN.filter(m => m !== preferredModel)
  ];

  const ai = new GoogleGenAI({ apiKey });

  const prompt = `
  Bạn là một gia sư AI thân thiện và thông minh. Hãy giải bài tập trong hình ảnh này từng bước một bằng tiếng Việt.
  
  Yêu cầu:
  1. Xác định rõ ràng các bước giải.
  2. Giải thích chi tiết nhưng dễ hiểu.
  3. Trả về kết quả dưới dạng JSON.

  Cấu trúc JSON mong muốn:
  {
    "title": "Tên bài toán hoặc chủ đề chính",
    "steps": [
      { "title": "Bước 1: [Tên bước]", "content": "[Nội dung chi tiết]" },
      { "title": "Bước 2: [Tên bước]", "content": "[Nội dung chi tiết]" }
      ...
    ],
    "final_answer": "Kết quả cuối cùng ngắn gọn",
    "explanation_for_speech": "Một đoạn văn ngắn tóm tắt lời giải để đọc cho học sinh nghe, giọng văn thân thiện, khích lệ."
  }
  `;

  // Strip base64 prefix if present
  const base64Data = base64Image.replace(/^data:image\/\w+;base64,/, "");

  let lastError: any = null;

  for (const model of modelsToTry) {
    try {
      console.log(`[AI fallback chain] Trying model: ${model}...`);
      const response = await ai.models.generateContent({
        model: model,
        contents: {
          parts: [
            { inlineData: { mimeType: "image/jpeg", data: base64Data } },
            { text: prompt }
          ]
        },
        config: {
          responseMimeType: "application/json"
        }
      });

      const text = response.text;
      if (!text) throw new Error("No response from AI");

      console.log(`[AI fallback chain] Success with model: ${model}`);
      return JSON.parse(text) as SolutionResponse;
    } catch (error: any) {
      console.error(`[AI fallback chain] Model ${model} failed:`, error);
      lastError = error;

      // Check if it's an API Key error (invalid or quota exceeded)
      const errorMessage = error?.message || '';
      if (errorMessage.includes('API key not valid') || errorMessage.includes('403')) {
        throw new Error('API_KEY_INVALID');
      }
      if (errorMessage.includes('429') || errorMessage.includes('Resource has been exhausted') || errorMessage.includes('quota')) {
        throw new Error('API_KEY_QUOTA_EXCEEDED');
      }
      // If it's a general block (e.g. content blocking), we might not want to retry, but for robustness we continue the fallback.
    }
  }

  // If all models failed
  console.error("All AI models in the fallback chain failed.", lastError);
  throw lastError || new Error("Không thể phân tích ảnh bằng bất kỳ phiên bản AI nào. Vui lòng thử lại sau.");
}
