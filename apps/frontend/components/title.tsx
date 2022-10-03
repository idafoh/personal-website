import { Title as MantineTitle, TitleProps } from '@mantine/core'

export const Title: React.FC<TitleProps> = (props) => {
  const { children, ...others } = props
  return (
    <MantineTitle {...others} sx={(theme) => ({ fontFamily: `Greycliff CF, ${theme.fontFamily}` })}>
      {children}
    </MantineTitle>
  )
}
