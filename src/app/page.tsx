import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Code2, Compass, Layers, Zap, ArrowRight, Github } from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col min-h-[calc(100vh-4rem)]">
      {/* Hero Section */}
      <section className="flex-1 flex flex-col items-center justify-center text-center px-4 py-24 bg-gradient-to-b from-background to-background/50 relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:60px_60px]" />
        <div className="absolute left-1/2 top-1/2 -ml-[40rem] -mt-[25rem] h-[50rem] w-[80rem] bg-primary/20 opacity-20 blur-[120px] rounded-full point-events-none" />
        
        <div className="relative z-10 max-w-4xl mx-auto space-y-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            <Zap className="h-4 w-4" />
            <span>OpenUI v1.0 is now live</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight">
            Build faster with <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-indigo-400">OpenUI</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            A community-driven React component library. Browse, preview, copy, and submit reusable beautiful components tailored for modern web apps.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Button asChild size="lg" className="h-12 px-8 text-base">
              <Link href="/components">
                Browse Components <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="h-12 px-8 text-base bg-background/50 backdrop-blur-sm">
              <Link href="/submit">
                Submit a Component
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-24 px-4 bg-muted/30 border-t border-border/50">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight mb-4">Everything you need</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Our community curates high-quality React and Tailwind CSS components that you can just copy and paste.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <Card className="bg-background/50 backdrop-blur-sm border-border/50 group hover:border-primary/50 transition-colors">
              <CardHeader>
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Compass className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Browse freely</CardTitle>
                <CardDescription>
                  Explore hundreds of UI elements categorized for your convenience. From buttons to complex data tables.
                </CardDescription>
              </CardHeader>
            </Card>
            
            <Card className="bg-background/50 backdrop-blur-sm border-border/50 group hover:border-primary/50 transition-colors">
              <CardHeader>
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Code2 className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Copy & Paste</CardTitle>
                <CardDescription>
                  No npm installs necessary. Just copy the code, paste it right into your React project, and customize it.
                </CardDescription>
              </CardHeader>
            </Card>
            
            <Card className="bg-background/50 backdrop-blur-sm border-border/50 group hover:border-primary/50 transition-colors">
              <CardHeader>
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Layers className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Submit yours</CardTitle>
                <CardDescription>
                  Have a component you're proud of? Submit it to OpenUI, get reviewed by admins, and share it with the world.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-4 border-t border-border/50 bg-background relative overflow-hidden">
        <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/3 h-[40rem] w-[40rem] bg-primary/10 blur-[100px] rounded-full point-events-none" />
        <div className="container mx-auto">
          <Card className="max-w-4xl mx-auto bg-primary/5 border-primary/20">
            <CardContent className="flex flex-col md:flex-row items-center justify-between p-8 md:p-12 gap-8">
              <div className="space-y-4 flex-1">
                <h2 className="text-3xl font-bold tracking-tight text-foreground">Ready to contribute?</h2>
                <p className="text-muted-foreground text-lg">
                  Join our growing community of developers and help build the most comprehensive React UI library.
                </p>
              </div>
              <div className="flex-shrink-0">
                <Button asChild size="lg" className="h-12 px-8">
                  <Link href="/signup">Create an Account</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
      
      {/* Simple Footer */}
      <footer className="border-t border-border/50 py-8 px-4 text-center text-muted-foreground flex flex-col md:flex-row items-center justify-center gap-4">
        <span>© {new Date().getFullYear()} OpenUI. All rights reserved.</span>
        <div className="flex gap-4 items-center">
            <Link href="https://github.com" target="_blank" className="hover:text-foreground">
                <Github className="h-5 w-5" />
            </Link>
        </div>
      </footer>
    </div>
  );
}
