import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const path = req.query.path as string | undefined
  const secret = req.query.secret as string | undefined

  if (secret !== process.env.REVALIDATE_SECRET) {
    return res.status(401).json({ message: 'Invalid token' })
  }

  try {
    // post created or edited
    await res.revalidate('/blog')
    if (path) {
      await res.revalidate(path)
    }

    return res.json({ ok: true })
  } catch (err) {
    // If there was an error, Next.js will continue
    // to show the last successfully generated page
    return res.status(500).json({ ok: false })
  }
}
