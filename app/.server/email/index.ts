import { executeQuery } from '../queryClient'

const baseUrl = 'https://api.improvmx.com/v3'
const API_KEY = process.env.IMPROV_API_KEY

interface ImprovLog {
  created: string,
  created_raw: string,
  events: {
    code: number,
    created: string,
    id: string,
    local: string,
    message: string,
    server: string,
    status: string
  }[],
  forward: {
    email: string,
    name: string
  },
  hostname: string,
  id: string,
  messageId: string,
  recipient: {
    email: string,
    name: string
  },
  sender: {
    email: string,
    name: string
  },
  subject: string,
  transport: string
}

export const getAliasLogs = async (alias: string) => await executeQuery({
  mutationFn: async (aliasString) => {
    const test = await fetch(`${baseUrl}/domains/yosept.me/logs/${aliasString}`, {
      headers: {
        Authorization: `Basic api:${API_KEY}`
      }
    })
    const data = await test.json() as { logs: ImprovLog[], success: boolean }
    return data.logs
  },
}, alias)

export const getLatestAliasLog = async (alias: string) => {
  const [latestLog] = await getAliasLogs(alias)
  return latestLog
}