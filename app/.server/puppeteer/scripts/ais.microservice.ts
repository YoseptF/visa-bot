import { $ } from "bun"

const MAIN_INTERVAL = 1000 * 15;

const main = async () => {
  await $`bun ./app/.server/puppeteer/ais.usvisa/index.ts 3`

  await new Promise(resolve => setTimeout(resolve, MAIN_INTERVAL))

  await main()

}

await main()