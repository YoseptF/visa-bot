import { MutationOptions, QueryClient } from '@tanstack/query-core'

export const queryClient = new QueryClient()

export const executeQuery = async <T, K>(
  options: MutationOptions<T, string, K, string>,
  variables?: K
) => await queryClient
    .getMutationCache()
    .build<T, string, K, string>(queryClient, options)
    .execute(variables as K)
