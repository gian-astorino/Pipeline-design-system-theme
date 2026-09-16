import Link from "next/link"
import { ArrowRight } from "@phosphor-icons/react/ssr"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"

export default function Home() {
  return (
    <div className="mx-auto flex w-full max-w-3xl flex-col gap-8 px-6 py-10">
      <header className="flex flex-col gap-1">
        <Badge variant="outline" className="w-fit">
          Preset b1aIcFPlK
        </Badge>
        <h1 className="text-2xl font-semibold tracking-tight">
          Pipeline design system — theme
        </h1>
        <p className="text-muted-foreground text-sm">
          base=base · style=luma · theme=blue · baseColor=neutral ·
          font=inter · icons=phosphor
        </p>
        <div className="mt-3 flex flex-wrap gap-3">
          <Button render={<Link href="/tokens" />}>
            Esplora i token
            <ArrowRight className="size-4" />
          </Button>
          <Button render={<Link href="/components/button/" />} variant="outline">
            Libreria componenti
          </Button>
          <Button render={<Link href="/dependencies" />} variant="outline">
            Dipendenze esterne
          </Button>
        </div>
      </header>

      <Card>
        <CardHeader>
          <CardTitle>Bottoni</CardTitle>
          <CardDescription>Le varianti principali di Button.</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-wrap gap-2">
          <Button>Default</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="destructive">Destructive</Button>
          <Button variant="link">Link</Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Form</CardTitle>
          <CardDescription>
            Input, checkbox e switch con lo stile luma.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <Label htmlFor="demo-name">Nome pipeline</Label>
            <Input id="demo-name" placeholder="es. deploy-produzione" />
          </div>
          <div className="flex items-center gap-2">
            <Checkbox id="demo-notify" defaultChecked />
            <Label htmlFor="demo-notify">Notifica al termine del run</Label>
          </div>
          <div className="flex items-center gap-2">
            <Switch id="demo-retry" defaultChecked />
            <Label htmlFor="demo-retry">Auto-retry</Label>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
