import { useState } from 'react'
import { NextPage } from 'next'
import { Icon } from '@iconify/react'
import { Alert, Button, Center, Stack, Text, TextInput } from '@mantine/core'

const alertContents = {
  a: {
    title: 'Diskleymer',
    text: "Qáne bar ǵazebińdi tómendegi bos orınǵa sógislerińdi kiritip shıǵarsań boladı. Imkandı qoldan jazdırma dostım.<br /><br />P.S. Maǵlıwmatlarıńnıń maǵan bir tıyınǵa qızıǵı joq isenbeseń bul sayttıń kodı github'ta turıptı óz kóziń menen kóriwiń múmkin",
  },
  b: {
    title: 'Raxmet',
    text: `Bileseńbe, meni sókkeniń maǵan ulıwma qızıq emes? Eger bul menen az-maz jeńil tartqan bolsań, qutlıqlayman.<br /><br />Mánzilime usı sózlerdi aytıw ushın usı jerge kelgeniń ushın raxmet (yaq, tuwra mánide heshqanday ironyasız) óytkeni bul arqalı sen óziń bilmegen
    jaǵdayda jaqsı is islep qoydıń, kiritken sózleriń <strong>"profanity filter"</strong> esabında paydalanıladı (ne ekenin túsinbeseń google'dan izle)`,
  },
}

const Page: NextPage = () => {
  const [value, setValue] = useState('')
  const [alert, setAlert] = useState<keyof typeof alertContents>('a')
  const [showAlert, setShowAlert] = useState(true)
  const [loading, setLoading] = useState(false)

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    setLoading(true)

    fetch('/api/rebuke', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ input: value }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.ok) {
          setShowAlert(true)
          setAlert('b')
        }
      })
      .finally(() => setLoading(false))
  }

  return (
    <Center sx={{ minHeight: '60vh', position: 'relative' }}>
      {showAlert && (
        <Alert
          sx={{
            position: 'absolute',
            top: 50,
            zIndex: 100,
          }}
          icon={<Icon icon="tabler:alert-circle" />}
          title={alertContents[alert].title}
          variant="outline"
          withCloseButton
          closeButtonLabel="Jabıw"
          onClose={() => setShowAlert(false)}
        >
          <Text
            sx={(theme) => ({
              [theme.fn.smallerThan('md')]: {
                maxWidth: 200,
              },
              [theme.fn.largerThan('md')]: { maxWidth: 500 },
            })}
            dangerouslySetInnerHTML={{ __html: alertContents[alert].text }}
          />
        </Alert>
      )}
      <form onSubmit={onSubmit}>
        <Stack>
          <TextInput placeholder="Ne jazıwdı óziń bileseńǵo" value={value} onChange={(e) => setValue(e.target.value)} required withAsterisk />

          <Button variant="default" type="submit" loading={loading}>
            Má, saǵan
          </Button>
        </Stack>
      </form>
    </Center>
  )
}

export default Page
