import { useCallback, useState } from 'react'


export enum httpMethodTypes {
   GET = 'GET',
   // POST = 'POST',
   // PATCH = 'PATCH',
   // DELETE = 'DELETE',
   // PUT = 'PUT'
}

interface IRequestProps {
   url: string,
   method?: httpMethodTypes,
   body?: Object | null,
   headers?: Object
}

const useHttp = () => {
   const [loading, setLoading] = useState(false)
   const [error, setError] = useState<null | string>(null)

   const request = useCallback(async (
      { url, method = httpMethodTypes.GET, body = null, headers }: IRequestProps
   ) => {
      setLoading(true)

      try {
         console.log(method, url, body, headers)
          // TODO axios request
      } catch (e: any) {
         setError(e.message)
      }

      setLoading(false)
   }, [])

   return { request, loading, error }
}

export default useHttp