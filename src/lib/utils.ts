import { useQuery } from '@tanstack/vue-query'
import { OPEN_LIBRARY_SEARCH_URL } from './constants'

export async function searchOpenLibraryBooks(searchString: string) {
  // eslint-disable-next-line no-useless-catch
  try {
    const formattedSearchString = searchString?.trim().replace(/ /g, '+')

    const encodedURI = encodeURI(OPEN_LIBRARY_SEARCH_URL + `?q=${formattedSearchString}`)

    console.log('encodedURI: ', encodedURI)

    const res = await fetch(encodedURI).catch((e) => {
      throw e
    })

    const data = await res.json()

    console.log('data: ', data)

    return data
  } catch (e) {
    console.log('e: ', e)

    throw e
  }
}

export function useBookSearch(fetchEnabled: boolean, searchString: string) {
  console.log('searchString: ', searchString)

  return useQuery({
    queryKey: ['bookSearch', ...[searchString ?? []]],
    queryFn: () => searchOpenLibraryBooks(searchString),
    enabled: fetchEnabled
  })
}
