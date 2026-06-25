import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/ucapan')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/keyla-birthday"!</div>
}
