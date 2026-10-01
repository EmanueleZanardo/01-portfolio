import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Cpu, Code2, CircuitBoard, MessageCircle } from "lucide-react";
import Link from "next/link";

const SERVICES = [
  {
    icon: Cpu,
    title: "Hardware Design",
    description:
      "Analog and digital circuit design, power supplies, component selection, schematic capture and design reviews — from prototype to production-ready hardware.",
  },
  {
    icon: Code2,
    title: "Firmware Development",
    description:
      "Bare-metal C and RTOS-based firmware for STM32, ESP32 and other MCUs. Drivers, communication stacks (UART, SPI, I2C, CAN, Ethernet) and bootloader development.",
  },
  {
    icon: CircuitBoard,
    title: "PCB Layout & Testing",
    description:
      "PCB layout and routing, board bring-up, debugging and hardware validation. DRC-clean designs ready for manufacturing and EMC pre-compliance checks.",
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
              <CardContent className="flex-grow">
                <p className="text-muted-foreground leading-relaxed">{service.description}</p>
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
