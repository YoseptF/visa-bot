import { executeQuery } from "~/.server/queryClient";

interface CapsolverResponse {
  "errorId": number,
  "errorCode": string,
  "errorDescription": string,
  "status": string,
  "solution": {
    "text": string
  },
  "taskId": string
}

export const createTask = async (base64Image: string) => executeQuery({
  mutationFn: async (body: string) => {
    const task = await fetch('https://api.capsolver.com/createTask', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        clientKey: process.env.CAPSOLVER_CLIENT_KEY,
        task: {
          type: 'ImageToTextTask',
          websiteURL: 'https://ceac.state.gov/genniv/',
          body,
          case: false
        }
      }),
    });

    const taskData = await task.json() as CapsolverResponse;
    const { solution: { text } } = taskData;
    return text;

  },
}, base64Image);