import React from 'react'
import { useRouter } from 'next/router'
import { NextPage } from 'next'

const Page: NextPage = () => {
  const router = useRouter()

  React.useEffect(() => {
    if (router.asPath === '/') {
      router.push('/chat')
    }
  })
}

export default Page
