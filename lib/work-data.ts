export interface WorkProject {
  title: string;
  description: string;
  year: string;
  role: string;
  tags: string[];
  image: string;
}

export const workProjects: WorkProject[] = [
  {
    title: "Nike Campaign",
    description:
      "Landing experience for Nike’s urban campaign, built to inspire movement and brand loyalty",
    year: "2024",
    role: "Lead Product Designer",
    tags: ["Brand", "Webflow", "Website"],
    image: "https://tfisak.vercel.app/assets/images/section/work-3.jpg",
  },
  {
    title: "Durotan",
    description:
      "Brand and website for a drone startup, blending futuristic visuals with trust-driven design",
    year: "2024",
    role: "Lead Product Designer",
    tags: ["Brand", "Webflow", "Website"],
    image: "https://tfisak.vercel.app/assets/images/section/work-2.jpg",
  },
  {
    title: "Drone",
    description:
      "Brand and website for a drone startup, blending futuristic visuals with trust-driven design",
    year: "2024",
    role: "Lead Product Designer",
    tags: ["Brand", "Webflow", "Website"],
    image: "https://tfisak.vercel.app/assets/images/section/work-1.jpg",
  },
];
