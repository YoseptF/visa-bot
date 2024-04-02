import { $ } from 'bun'
import chalk from 'chalk'
import supabase from '~/.server/db';
import { v5 as uuid } from 'uuid';

const MAIN_INTERVAL = 1000 * 15;
const BATCH_SIZE = 3;
const MAX_ACCOUNTS = 10;
const UUID_SALT = 'f1b4b3e4-7b7b-4b7b-8b7b-7b7b7b7b7b7b';

const createAccount = async () => {
  const accountUuid = uuid(Math.random().toString(), UUID_SALT)
  try {

    const shellResponse = await $`bun .\\app\\.server\\puppeteer\\ceac.state\\index.ts ${accountUuid}`

    const lines = shellResponse.text().split('\n').filter(Boolean)
    const lastLine = lines[lines.length - 1]

    console.info('accountCreated:', chalk.green(lastLine))
  } catch (error) {
    console.error(`${accountUuid} failed to create`)
    await supabase.from('ServerSettings').delete().eq('id', accountUuid)
  }
}

let timesMain = 1

const main = async () => {
  const { count } = await supabase
    .from('ServerSettings')
    .select('*', { count: 'exact' })

  if (count === null) throw new Error('No ServerSettings found')
  if (count < MAX_ACCOUNTS) {
    const requiredAccounts = MAX_ACCOUNTS - count
    const batches = Math.ceil(requiredAccounts / BATCH_SIZE)

    for (let i = 0; i < batches; i++) {
      const batch = Array.from({ length: BATCH_SIZE }, (_, i) => i)
      await Promise.all(batch.map(createAccount))
    }
  } else {
    console.info('No new accounts needed, current accounts:', count, 'max accounts:', MAX_ACCOUNTS, 'waiting...')
  }

  await new Promise(resolve => setTimeout(resolve, MAIN_INTERVAL))

  // get hours, minutes and seconds of uptime
  const hours = Math.floor(timesMain * MAIN_INTERVAL / 1000 / 60 / 60)
  const minutes = Math.floor(timesMain * MAIN_INTERVAL / 1000 / 60) % 60
  const seconds = Math.floor(timesMain * MAIN_INTERVAL / 1000) % 60

  timesMain++

  console.info('checking amount of ceac accounts, uptime:', chalk.green(
    `${hours}h ${minutes}m ${seconds}s`
  ))

  await main()
}


await main()