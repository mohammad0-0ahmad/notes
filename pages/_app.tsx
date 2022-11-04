import { ErrorFallbackProps, ErrorComponent, ErrorBoundary, AppProps } from "@blitzjs/next"
import { AuthenticationError, AuthorizationError } from "blitz"
import React from "react"
import { withBlitz } from "app/blitz-client"
import Head from "app/core/components/Head"
import { EmotionCache } from "@emotion/react"
import createEmotionCache from "app/core/utilities/cache"
import Providers from "app/core/providers/Providers"
const clientSideEmotionCache = createEmotionCache()

function RootErrorFallback({ error }: ErrorFallbackProps) {
  if (error instanceof AuthenticationError) {
    return <div>Error: You are not authenticated</div>
  } else if (error instanceof AuthorizationError) {
    return (
      <ErrorComponent
        statusCode={error.statusCode}
        title="Sorry, you are not authorized to access this"
      />
    )
  } else {
    return (
      <ErrorComponent
        statusCode={(error as any)?.statusCode || 400}
        title={error.message || error.name}
      />
    )
  }
}

interface MyAppProps extends AppProps {
  emotionCache: EmotionCache
}

function MyApp({ Component, emotionCache = clientSideEmotionCache, pageProps }: MyAppProps) {
  return (
    <ErrorBoundary FallbackComponent={RootErrorFallback}>
      <Providers themeCache={emotionCache}>
        <Head />
        <Component {...pageProps} />
      </Providers>
    </ErrorBoundary>
  )
}

export default withBlitz(MyApp)
