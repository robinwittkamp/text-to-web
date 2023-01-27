import { Configuration, OpenAIApi } from 'openai';

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

const handler = async (req, res) => {
  // Return an error if OpenAI API key is not set
  if (!process.env.OPENAI_API_KEY) {
    res.status(401).json({
      error:
        'OPENAI_API_KEY not set. Please set the key in your environment and redeploy the app to use this endpoint',
    });
    return;
  }

  // Return an error if POST method is not used
  if (!(req.method === 'POST')) {
    res.status(405).json({
      error: 'Only POST method allowed',
    });
    return;
  }

  // Return an error if the request body is empty
  if (!Object.prototype.hasOwnProperty.call(req.body, 'prompt')) {
    res.status(400).json({
      error: 'Request body does not have required key',
    });
    return;
  }

  try {
    const input = req.body.prompt;

    const response = await openai.createCompletion({
      model: 'text-davinci-002',
      prompt: input,
      temperature: 0,
      max_tokens: 1024,
      stop: ['[Instruction]:', '[Code]:'],
      top_p: 1,
      // frequency_penalty: 0,
      // presence_penalty: 0,
      // best_of: 1,
      // n: 1,
      // echo: true,
    });

    const result = await response.data;
    console.log(result);
    const completion = `${result.choices[0].text}`;
    const cleanedCompletion = completion.trim();
    res.status(200).json({ completion: `${cleanedCompletion}` });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to load data' });
  }
};

export default handler;
