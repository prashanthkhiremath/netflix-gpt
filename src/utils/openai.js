import Groq from "groq-sdk";
import { OPENAI_KEY } from '../utils/constants'

const client = new Groq({ 
    apiKey: OPENAI_KEY,
    dangerouslyAllowBrowser: true
});

export default client;