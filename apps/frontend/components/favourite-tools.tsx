import { Icon } from '@iconify/react'
import { ActionIcon, Code, Container, Paper, Stack, Title } from '@mantine/core'

const tools = [
  { group: 'lang', name: 'TypeScript', icon: 'logos:typescript-icon' },
  { group: 'lang', name: 'Python', icon: 'logos:python' },
  { group: 'framework', name: 'Vue', icon: 'logos:vue' },
  { group: 'framework', name: 'React', icon: 'logos:react' },
  { group: 'backend', name: 'Node.js', icon: 'logos:nodejs' },
  { group: 'backend', name: 'Docker', icon: 'logos:docker-icon' },
  { group: 'tool', name: 'Git', icon: 'logos:git-icon' },
]

const groups = [
  { name: 'lang', title: 'Languages' },
  { name: 'framework', title: 'Frameworks' },
  { name: 'backend', title: 'Backend' },
  { name: 'tool', title: 'Tools' },
]

export const MyFavouriteTools: React.FC = () => {
  return (
    <Container p={0} mt={45} mb="xl">
      <Title sx={(theme) => ({ fontFamily: `Greycliff CF, ${theme.fontFamily}` })} order={3} mb="lg">
        My favourite tools
      </Title>
      <div className="my-tools-container">
        {groups.map((group) => (
          <Paper key={group.name}>
            <Code>{group.title}</Code>
            <div style={{ display: 'flex' }}>
              {tools
                .filter((tool) => tool.group === group.name)
                .map((tool) => (
                  <ActionIcon key={tool.name} color="gray" sx={{ width: 60, height: 60 }}>
                    <Icon icon={tool.icon} width={30} height={30} />
                  </ActionIcon>
                ))}
            </div>
          </Paper>
        ))}
      </div>
    </Container>
  )
}
