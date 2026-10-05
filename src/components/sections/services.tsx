import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Cpu, Code2, CircuitBoard, MessageCircle, CheckCircle } from "lucide-react";
import Link from "next/link";

const SERVICES = [
  {
    icon: Cpu,
    title: "Hardware Design",
    description:
      "Analog and digital circuit design from requirements to production-ready documentation — power supplies, sensor interfaces and control electronics sized for real operating conditions.",
    deliverables: [
      "Schematic capture with full component selection and BOM",
      "Design calculations and worst-case / derating analysis",
      "Design review documentation and manufacturing notes",
    ],
    engagement:
      "Typical engagement: fixed-scope design package — schematic, BOM and review notes in 2–6 weeks.",
  },
  {
    icon: Code2,
    title: "Firmware Development",
    description:
      "Bare-metal C and RTOS-based firmware for STM32, ESP32 and other MCUs — written for reliability, validated against real hardware.",
    deliverables: [
      "Peripheral drivers and communication stacks (UART, SPI, I2C, CAN, Ethernet)",
      "Bootloader and firmware update mechanism",
      "Hardware-in-the-loop validation and test report",
    ],
    engagement:
      "Typical engagement: milestone-based — board bring-up first, then feature delivery, hardening and documentation.",
  },
  {
    icon: CircuitBoard,
    title: "PCB Layout & Testing",
    description:
      "PCB layout, board bring-up and validation — DRC-clean designs ready for manufacturing, debugged on the bench, not just on screen.",
    deliverables: [
      "Multi-layer PCB layout, routing and Gerber + assembly files",
      "Board bring-up, functional testing and debug",
      "EMC pre-compliance checks and validation test report",
    ],
    engagement:
      "Typical engagement: layout from your schematic, or the full loop from schematic to tested prototype.",
  },
];

const WHATSAPP_URL =
  "https://wa.me/393451114337?text=" +
  encodeURIComponent(
    "Hi Emanuele, I'm interested in your electronics engineering services. I'd like a quote for a project."
  ).replace(/'/g, "%27");

export function Services() {
  return (
    <section id="services" aria-labelledby="services-heading" tabIndex={-1} className="py-20 lg:py-32 bg-card scroll-mt-16 focus:outline-none">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 id="services-heading" className="font-headline text-4xl md:text-5xl text-primary">
            Engineering Services
          </h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            Freelance electronics engineering for your next project — hardware
            design, firmware development and PCB layout &amp; testing, from
            schematic to tested board.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {SERVICES.map((service) => (
            <Card key={service.title} className="flex flex-col">
              <CardHeader>
                <div className="inline-flex p-3 bg-primary/10 rounded-full mb-2 w-fit">
                  <service.icon aria-hidden="true" className="h-6 w-6 text-primary" />
                </div>
                <CardTitle className="font-headline text-2xl">{service.title}</CardTitle>
              </CardHeader>
              <CardContent className="flex-grow flex flex-col">
                <p className="text-muted-foreground leading-relaxed">{service.description}</p>
                <ul className="mt-5 space-y-2.5">
                  {service.deliverables.map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <CheckCircle aria-hidden="true" className="mt-0.5 h-5 w-5 shrink-0 text-accent" />
                      <span className="text-sm md:text-base">{item}</span>
                    </li>
                  ))}
                </ul>
                <p className="mt-5 pt-4 border-t border-border text-sm text-muted-foreground">
                  {service.engagement}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-lg text-muted-foreground">
            Indicative rate: <span className="font-semibold text-foreground">50 €/hour</span> — final
            quote depends on project scope.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-4">
            <Button asChild size="lg" className="bg-[#0e7a3f] text-white hover:bg-[#0c6535]">
              <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" aria-label="Chat on WhatsApp (opens in new tab)">
                <MessageCircle aria-hidden="true" className="mr-2 h-5 w-5" />
                Chat on WhatsApp
              </a>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href="#contact">
                Request a Quote
              </Link>
            </Button>
          </div>
          <p className="mt-4 text-sm text-muted-foreground">
            Fastest reply via WhatsApp: +39 345 111 4337
          </p>
        </div>
      </div>
    </section>
  );
}
