import { sanitizeForAI } from "@/lib/ai/sanitize-response";

type QueryParams = Record<string, string | number | boolean | undefined>;

class LightApiClient {
  private baseUrl: string;
  private apiKey: string;

  constructor() {
    this.baseUrl = process.env.LIGHT_API_BASE_URL || "https://api.light.inc";
    this.apiKey = process.env.LIGHT_API_KEY || "";
  }

  async get<T>(endpoint: string, params?: QueryParams): Promise<T> {
    const url = new URL(`${this.baseUrl}${endpoint}`);

    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined) {
          url.searchParams.append(key, String(value));
        }
      });
    }

    const response = await fetch(url.toString(), {
      method: "GET",
      headers: {
        Authorization: `Basic ${this.apiKey}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
        `Light API error: ${response.status} ${response.statusText} - ${errorText}`
      );
    }

    const data = await response.json();
    return sanitizeForAI(data);
  }
}

export const lightApi = new LightApiClient();
