import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const experiences = [
  {
    title: "After-Sales Engineer",
    company: "CENTIEL",
    period: "January 2026 - Present",
    description: "Centiel is a leading Swiss manufacturer of energy-efficient UPS systems for critical infrastructure. As an After-Sales Technician based in Cadro, I ensure the maximum reliability and availability of these systems for clients worldwide. My role requires hands-on field expertise to perform remote troubleshooting, on-site maintenance, and complex field testing and commissioning in high-tech environments, including CyrusOne datacenters. Additionally, I drive customer engagement by building strong relationships, independently managing factory witness tests, and delivering specialized technical training. To ensure continuous improvement, I collaborate closely with R&D and engineering teams, analyzing field data and recurring issues to propose actionable product enhancements.",
    tags: ["After-Sales", "UPS Systems", "Field Engineering", "Troubleshooting"]
  },
  {
    title: "Test & Certification Engineer",
    company: "FZSONICK S.A. (HORIEN Group)",
    period: "February 2022 - December 2025",
    description: "World leader in the design and production of molten salt storage systems for backup, sustainable mobility, and energy storage. My work mainly consists of product certification, test writing, and verification, proposing FW or HW patches to improve the product. I follow certification projects for UL 1973, UL1741, IEC 61508, and ABS regulations.",
    tags: ["Product Certification", "Testing", "Storage Systems"]
  },
  {
    title: "Project Engineer",
    company: "Elektro Solar System Sagl",
    period: "October 2021 - January 2022",
    description: "A small company in the center of Chiasso specializing in feasibility analysis, design, construction, and maintenance of photovoltaic, micro-wind, and electrical systems. I created and presented initial proposals to clients with the sizing and selected products for a high-efficiency photovoltaic system.",
    tags: ["Engineering", "Photovoltaics", "Design"]
  },
  {
    title: "Food Deliverer",
    company: "Italian Hamburgeria",
    period: "March 2019 - October 2019",
    description: "Managed deliveries and warehouse orders in a small business in the center of Varese.",
    tags: ["Logistics", "Order Management"]
  }
];

export function Projects() {
  return (
    <section id="projects" aria-labelledby="projects-heading" tabIndex={-1} className="py-20 lg:py-32 scroll-mt-16 focus:outline-none">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 id="projects-heading" className="font-headline text-4xl md:text-5xl text-primary">Professional Experiences</h2>
          <p className="mt-2 text-lg text-muted-foreground max-w-2xl mx-auto">
            A selection of my work experiences that showcase my skills.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {experiences.map((exp, index) => (
            <Card key={index} className="group overflow-hidden flex flex-col transition-all hover:border-primary hover:shadow-lg hover:shadow-primary/10">
              <CardHeader className="p-6">
                <CardTitle className="font-headline text-2xl tracking-wide mb-1">{exp.title}</CardTitle>
                <p className="text-sm text-muted-foreground font-semibold">{exp.company}</p>
                <p className="text-xs text-muted-foreground">{exp.period}</p>
              </CardHeader>
              <CardContent className="flex-grow p-6 pt-0">
                <CardDescription>{exp.description}</CardDescription>
              </CardContent>
              <CardFooter className="p-6 pt-0">
                <div className="flex flex-wrap gap-2">
                  {exp.tags.map(tag => <Badge key={tag} variant="secondary">{tag}</Badge>)}
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
