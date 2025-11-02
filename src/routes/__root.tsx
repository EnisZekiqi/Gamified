import { Outlet, createRootRoute } from '@tanstack/react-router'
import { TanStackRouterDevtoolsPanel } from '@tanstack/react-router-devtools'
import { TanStackDevtools } from '@tanstack/react-devtools'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import Footer from '@/components/Footer'

const queryClient = new QueryClient()

export const Route = createRootRoute({
  component: () => (
    <>
      <QueryClientProvider client={queryClient}>
        <Outlet />
      </QueryClientProvider>
      <Footer />
      <TanStackDevtools
        config={{
          position: 'bottom-right',
        }}
        plugins={[
          {
            name: 'Tanstack Router',
            render: <TanStackRouterDevtoolsPanel />,
          },
        ]}
      />
    </>
  ),

  // 👇 Add this:
  notFoundComponent: () => (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-2xl font-semibold text-red-600">404 - Not Found</h1>
      <p className="text-gray-600">The page you’re looking for doesn’t exist.</p>
    </div>
  ),
})
