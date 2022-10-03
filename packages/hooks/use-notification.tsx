import { useCallback } from 'react'
import { Icon } from '@iconify/react'
import { showNotification, updateNotification } from '@mantine/notifications'
import { randomId } from '@mantine/hooks'

const icons = {
  success: 'tabler:check',
  error: 'tabler:exclamation-mark',
}

interface AdditionalProps {
  success?: boolean
  error?: boolean
}

export const useNotification = () => {
  const notificationId = randomId()

  const show = useCallback(
    (props: Parameters<typeof showNotification>[0], secondary?: AdditionalProps) => {
      const { success, error } = secondary || {}
      const isSuccess = success && !error
      const isError = error && !success

      const iconCode = isSuccess ? icons.success : isError ? icons.error : null
      const color = isSuccess ? 'teal' : isError ? 'red' : undefined
      const icon = iconCode ? <Icon icon={iconCode} /> : undefined

      showNotification({ ...props, id: notificationId, icon, color })

      return notificationId
    },
    [notificationId]
  )

  const update = useCallback(
    (props: Omit<Parameters<typeof updateNotification>[0], 'id'>, secondary?: AdditionalProps) => {
      const { success, error } = secondary || {}
      const isSuccess = success && !error
      const isError = error && !success

      const iconCode = isSuccess ? icons.success : isError ? icons.error : null
      const color = isSuccess ? 'teal' : isError ? 'red' : undefined
      const icon = iconCode ? <Icon icon={iconCode} /> : undefined

      updateNotification({ ...props, id: notificationId, icon, color })
      return notificationId
    },
    [notificationId]
  )

  return { show, update }
}
