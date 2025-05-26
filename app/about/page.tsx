"use client";

import { Building2, Users, Target, Award } from "lucide-react";

export default function AboutPage() {
  const stats = [
    {
      title: "Active Traders",
      value: "10,000+",
      description: "Traders using our platform",
    },
    {
      title: "Success Rate",
      value: "85%",
      description: "Of traders improve their skills",
    },
    {
      title: "Countries",
      value: "50+",
      description: "Global presence",
    },
    {
      title: "Support",
      value: "24/7",
      description: "Customer assistance",
    },
  ];

  const team = [
    {
      name: "Peter Griffin",
      role: "CEO & Founder",
      bio: "Former brewery worker turned trading genius. Known for his 'Freakin' Sweet' investment strategies and ability to lose money in the most creative ways possible.",
      image:
        "https://assets.foxdcg.com/dpp-uploaded/images/credits/270765094675/family_guy_seth_macfarlane_2x.jpg?fit=inside%7C*:278",
    },
    {
      name: "Stewie Griffin",
      role: "CTO",
      bio: "Infant prodigy with a PhD in quantum physics. Built our trading platform using only a baby monitor and a time machine. Occasionally threatens to destroy the market.",
      image:
        "https://oyster.ignimgs.com/mediawiki/apis.ign.com/family-guy/7/7e/Laser.jpg",
    },
    {
      name: "Brian Griffin",
      role: "Head of Trading",
      bio: "Failed novelist turned successful trader. Uses his existential crisis to predict market trends. Currently writing a screenplay about his trading journey.",
      image:
        "https://i.cbc.ca/1.2439270.1385396617!/fileImage/httpImage/image.jpg_gen/derivatives/16x9_940/family-guy-brian-from-fox.jpg",
    },
    {
      name: "Glenn Quagmire",
      role: "Head of Education",
      bio: "Giggity! Former airline pilot who discovered his true passion in teaching trading. Known for his 'quick entry and exit' strategies and ability to make any trading session last longer than expected. Always ready to 'giggity' the market!",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ6UILTHR4fNFYkiu4DyIhR3BzU_GT63vboSQ&s",
    },
  ];

  return (
    <div className="container px-4 md:px-6 py-12">
      <div className="flex flex-col items-center justify-center space-y-4 text-center">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl">
            About Stomks
          </h1>
          <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
            Empowering traders to master the markets through education and
            practice
          </p>
        </div>
      </div>

      <div className="mx-auto grid max-w-5xl gap-8 py-12">
        <section className="space-y-4">
          <h2 className="text-2xl font-bold">Our Mission</h2>
          <p className="text-muted-foreground">
            At Stomks, we believe that everyone should have access to the tools
            and knowledge needed to become a successful trader. Our mission is
            to democratize trading education and provide a safe environment for
            traders to practice and perfect their strategies without risking
            real money.
          </p>
        </section>

        <section className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <div
              key={stat.title}
              className="flex flex-col items-center space-y-2 rounded-lg border bg-card p-6 text-center"
            >
              <h3 className="text-2xl font-bold">{stat.value}</h3>
              <p className="text-sm font-medium">{stat.title}</p>
              <p className="text-sm text-muted-foreground">
                {stat.description}
              </p>
            </div>
          ))}
        </section>

        <section className="space-y-8">
          <h2 className="text-2xl font-bold">Our Values</h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="flex items-start space-x-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                <Target className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="text-lg font-semibold">Education First</h3>
                <p className="text-muted-foreground">
                  We prioritize comprehensive education and continuous learning
                  in everything we do.
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                <Users className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="text-lg font-semibold">Community Driven</h3>
                <p className="text-muted-foreground">
                  We foster a supportive community where traders can learn and
                  grow together.
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                <Award className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="text-lg font-semibold">Excellence</h3>
                <p className="text-muted-foreground">
                  We strive for excellence in our platform, education, and
                  customer service.
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                <Building2 className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="text-lg font-semibold">Innovation</h3>
                <p className="text-muted-foreground">
                  We continuously innovate to provide the best trading
                  experience possible.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="space-y-8">
          <h2 className="text-2xl font-bold">Our Team</h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
            {team.map((member) => (
              <div
                key={member.name}
                className="flex flex-col items-center space-y-4 rounded-lg border bg-card p-6 text-center"
              >
                <div className="h-24 w-24 overflow-hidden rounded-full">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div>
                  <h3 className="text-lg font-semibold">{member.name}</h3>
                  <p className="text-sm font-medium text-primary">
                    {member.role}
                  </p>
                  <p className="mt-2 text-sm text-muted-foreground">
                    {member.bio}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
