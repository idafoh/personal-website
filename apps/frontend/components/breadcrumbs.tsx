import { ActionIcon, Anchor, Breadcrumbs as MantineBreadcrumbs, Text } from '@mantine/core'
import Link from 'next/link'
import { Icon } from '@iconify/react'

interface Props {
  items: {
    title: string
    href?: string
    current?: boolean
  }[]
}

export const Breadcrumbs: React.FC<Props> = ({ items }) => {
  return (
    <MantineBreadcrumbs className="blue-links" mt="xl">
      <ActionIcon className="hover-onpoint">
        <Anchor component={Link} href="/">
          <Icon icon="tabler:home" fontSize={20} />
        </Anchor>
      </ActionIcon>

      {items.map(({ title, href, current }) =>
        current ? (
          <Text key={title}>{title}</Text>
        ) : (
          <Link key={title} href={href!}>
            {title}
          </Link>
        )
      )}
    </MantineBreadcrumbs>
  )
}
