import { Modal, Space, Stack, Text, useMantineTheme } from '@mantine/core'

export const AskVerification: React.FC = () => {
  const theme = useMantineTheme()

  return (
    <Modal
      title="Verification Required"
      opened
      onClose={() => {}}
      overlayColor={theme.colorScheme === 'dark' ? theme.colors.dark[9] : theme.colors.gray[2]}
      overlayOpacity={0.55}
      overlayBlur={3}
      withCloseButton={false}
      zIndex={100000}
    >
      <Text>Verification is required to access this site otherwise you cannot access this site.</Text>
      <Space />
      <Text>Please check your email for a verification link.</Text>

      <Stack mt="xl">
        <Text>Note: If you did not receive an email, please check your spam folder.</Text>
        <Text>Note: After successfull verification reload this page.</Text>
      </Stack>
    </Modal>
  )
}
