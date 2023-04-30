import type { NextApiRequest, NextApiResponse } from 'next';
import { ChatCompletionRequestMessage, Configuration, OpenAIApi } from 'openai';
import systemPrompt from 'utils/systemPrompt';
import { getSession } from 'utils/get-session';

interface Data {
  name: string;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  const { method, body } = req;
  const { message, continueConversation } = JSON.parse(body);
  const session = await getSession(req, res);
  let conversation: ChatCompletionRequestMessage[] = [];
  let JSONData;

  if (continueConversation) {
    conversation.push(...session.conversation);
  } else {
    conversation = [{ role: 'system', content: systemPrompt }];
  }
  conversation.push({ role: 'user', content: message });
  console.log(conversation);

  const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
  });
  const openai = new OpenAIApi(configuration);

  const completion = await openai.createChatCompletion({
    model: 'gpt-3.5-turbo',
    messages: conversation,
  });

  const responseMessage = completion.data.choices[0].message;

  if (typeof responseMessage === 'undefined') {
    res.status(500).end();
    return;
  }

  conversation.push({ role: 'system', content: responseMessage.content });
  session.conversation = conversation;

  const responseData = responseMessage.content;
  responseData.replace(/[\u0000-\u0019]+/g, '');

  try {
    JSONData = JSON.parse(responseData);
    JSONData.success = true;
  } catch {
    JSONData = { success: false, message: responseData };
  }

  if (method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${method} Not Allowed`);
    return;
  }

  res.status(200).json(JSONData);
}
