import express from 'express'
import cors from 'cors'

import { apiRouter } from './api/index.js'
import { createDb } from './shared/db.js'
import { errorHandler, notFound } from './shared/middleware.js'

export function createApp(config) {
    const db = createDb(config.databaseFile, config.bcryptRounds)

    const app = express()

    app.use(cors({ origin: config.corsOrigin }))
    app.use(express.json())

    app.use(apiRouter({ db, config }))

    app.use(notFound)
    app.use(errorHandler)

    return app
}
