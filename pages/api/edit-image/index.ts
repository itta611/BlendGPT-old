import type { NextApiRequest, NextApiResponse } from 'next';
import { Configuration, OpenAIApi } from 'openai';
import systemPrompt from 'utils/systemPrompt';

interface Data {
  name: string;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  const { method, body } = req;
  const { message, parentMessageId } = JSON.parse(body);

  const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
  });
  const openai = new OpenAIApi(configuration);

  const completion = await openai.createChatCompletion({
    model: 'gpt-3.5-turbo',
    messages: [
      { role: 'system', content: systemPrompt },
      { role: 'user', content: message },
    ],
  });

  if (typeof completion.data.choices[0].message === 'undefined') {
    res.status(500).end();
    return;
  }

  console.log(completion.data.choices[0].message.content);
  const { code, types } = JSON.parse(completion.data.choices[0].message.content);

  if (method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${method} Not Allowed`);
    return;
  }

  res.status(200).json({ name: JSON.parse(completion.data.choices[0].message.content) });
}
