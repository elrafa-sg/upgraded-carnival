declare global {
    namespace NodeJS {
        interface ProcessEnv {
            DATABASE_URL: string | undefined,
            ACCESS_EXPIRES: string | undefined,
            ACCESS_SECRET: string | undefined
        }
    }
}

export { }