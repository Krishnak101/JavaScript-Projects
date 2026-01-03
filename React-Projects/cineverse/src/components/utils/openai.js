import OpenAI from "openai";

const clientAI = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_KEY, // This is the default and can be omitted
  dangerouslyAllowBrowser: true,
});

export default clientAI;
