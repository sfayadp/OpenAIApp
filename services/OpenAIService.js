import axios from 'axios';

const API_KEY = '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';
const API_ENDPOINT = 'https://api.openai.com/v1/engines/davinci/completions';

export const getChatGPTResponse = async (prompt) => {
    try {
        const response = await axios.post(API_ENDPOINT, {
        prompt: prompt,
        max_tokens: 100,
        },
        {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${API_KEY}`,
        },
        });
        return response.data.choices[0].text;
    } catch (error) {
        console.error(error);
    }
}