import type { NextApiRequest, NextApiResponse } from 'next'
import { connectToDatabase } from '../../lib/db'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // I'll use this to Profanity Filter the content
  let { input } = req.body

  if (!input || typeof input !== 'string') {
    return res.status(400).json({ message: 'Invalid input' })
  }

  input = input.toLowerCase()
  const [getDb, client] = connectToDatabase()

  try {
    const db = await getDb()
    const collection = db.collection('rebukes')
    // insert unique input
    await collection.updateOne(
      { input },
      { $set: { input }, $inc: { count: 1 } },
      { upsert: true }
    )
    res.status(200).json({ ok: true })
  } catch (error) {
    res.status(500).json({ ok: false })
  } finally {
    await client.close()
  }
}
