import type { NextApiRequest, NextApiResponse } from 'next'
import { connectToDatabase } from '../../lib/db'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // I'll use this to Profanity Filter the content
  const { input } = req.body

  if (!input || typeof input !== 'string') {
    res.status(400).json({ message: 'Invalid input' })
    return
  }

  const [getDb, client] = await connectToDatabase()

  try {
    const db = getDb()
    const collection = db.collection('rebukes')
    // insert unique input
    await collection.updateOne(
      { input },
      { $set: { input: input.toLowerCase() }, $inc: { count: 1 } },
      { upsert: true }
    )
    res.status(200).json({ ok: true })
  } catch (error) {
    res.status(500).json({ ok: false })
  } finally {
    await client.close()
  }
}
