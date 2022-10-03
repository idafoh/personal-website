import { useCallback, useEffect } from 'react'
import { Card, Stack, Text, Title } from '@mantine/core'
import confetti from 'canvas-confetti'
import { NextPage } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'

const colors = ['#bb0000', '#ffffff']

const ConfirmPage: NextPage = () => {
  const router = useRouter()
  const end = Date.now() + 3000

  const handleConfetti = useCallback(() => {
    confetti({
      particleCount: 2,
      angle: 60,
      spread: 55,
      origin: { x: 0 },
      colors: colors,
    })
    confetti({
      particleCount: 2,
      angle: 120,
      spread: 55,
      origin: { x: 1 },
      colors: colors,
    })

    if (Date.now() < end) {
      requestAnimationFrame(handleConfetti)
    }
  }, [end])

  useEffect(() => {
    const params = new URLSearchParams(location.search)

    if (params.get('token')) {
      handleConfetti()
      setTimeout(() => {
        router.push('/')
      }, 2000)
    } else {
      router.push('/')
    }
  }, [router, handleConfetti])

  return (
    <>
      <Head>
        <title>Email confirmed</title>
      </Head>
      <Card className="center-old-school" shadow="md" radius="lg" style={{ maxWidth: '60%', transform: 'translate(-50%, -100%)' }} mx="auto" p="xl">
        <Title order={2} mb="lg" size="h1" sx={(theme) => ({ fontFamily: `Greycliff CF, ${theme.fontFamily}` })} weight={900} align="center">
          Email confirmed
        </Title>

        <Stack align="center">
          <Text>Thank you for confirming your email. You can now log in to your account.</Text>
          <Text>Redirecting back...</Text>
        </Stack>
      </Card>
    </>
  )
}

export default ConfirmPage
