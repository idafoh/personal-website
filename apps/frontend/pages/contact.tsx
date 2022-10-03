import type { NextPage } from 'next'
import Head from 'next/head'
import { Container } from '@mantine/core'
import { ContactForm } from '../components/contact'
import { Breadcrumbs } from '../components/breadcrumbs'
import { Title } from '../components/title'

const ContactPage: NextPage = () => {
  return (
    <>
      <Head>
        <title>Contact</title>
        <meta name="description" content="Contact me" />
      </Head>

      <Container>
        <Breadcrumbs items={[{ title: 'Contact', current: true }]} />

        <div className="contact">
          <Title order={2} mb={30} mt="md" size="h1" weight={900} align="center">
            Contact me
          </Title>
          <ContactForm />
        </div>
      </Container>
    </>
  )
}

export default ContactPage
