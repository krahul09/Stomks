"use client";

import { Shield, Lock, Eye, FileText } from "lucide-react";

export default function PrivacyPage() {
  const sections = [
    {
      title: "Information We Collect",
      icon: FileText,
      content: [
        {
          subtitle: "Personal Information",
          text: "We collect information that you provide directly to us, including your name, email address, and any other information you choose to provide when you create an account or use our services.",
        },
        {
          subtitle: "Usage Information",
          text: "We collect information about how you use our platform, including your trading activities, preferences, and interactions with our features.",
        },
        {
          subtitle: "Device Information",
          text: "We collect information about the device you use to access our services, including hardware model, operating system, and browser type.",
        },
      ],
    },
    {
      title: "How We Use Your Information",
      icon: Eye,
      content: [
        {
          subtitle: "Provide Services",
          text: "We use your information to provide, maintain, and improve our trading platform and services.",
        },
        {
          subtitle: "Communication",
          text: "We use your contact information to send you important updates, notifications, and marketing communications (with your consent).",
        },
        {
          subtitle: "Analytics",
          text: "We use your information to analyze and improve our platform's performance and user experience.",
        },
      ],
    },
    {
      title: "Data Security",
      icon: Lock,
      content: [
        {
          subtitle: "Security Measures",
          text: "We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.",
        },
        {
          subtitle: "Data Encryption",
          text: "We use industry-standard encryption to protect your data during transmission and storage.",
        },
        {
          subtitle: "Access Control",
          text: "We limit access to your personal information to authorized employees and third-party service providers who need it to perform their duties.",
        },
      ],
    },
    {
      title: "Your Rights",
      icon: Shield,
      content: [
        {
          subtitle: "Access and Control",
          text: "You have the right to access, correct, or delete your personal information. You can also control your privacy settings through your account dashboard.",
        },
        {
          subtitle: "Data Portability",
          text: "You can request a copy of your personal information in a structured, commonly used, and machine-readable format.",
        },
        {
          subtitle: "Opt-Out",
          text: "You can opt-out of marketing communications and certain data collection practices through your account settings.",
        },
      ],
    },
  ];

  return (
    <div className="container px-4 md:px-6 py-12">
      <div className="flex flex-col items-center justify-center space-y-4 text-center">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl">
            Privacy Policy
          </h1>
          <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
            Last updated: March 15, 2024
          </p>
        </div>
      </div>

      <div className="mx-auto grid max-w-5xl gap-12 py-12">
        <section className="space-y-4">
          <p className="text-muted-foreground">
            At Stomks, we take your privacy seriously. This Privacy Policy
            explains how we collect, use, disclose, and safeguard your
            information when you use our trading platform and services.
          </p>
        </section>

        {sections.map((section) => (
          <section key={section.title} className="space-y-6">
            <div className="flex items-center space-x-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                <section.icon className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h2 className="text-2xl font-bold">{section.title}</h2>
              </div>
            </div>

            <div className="grid gap-6">
              {section.content.map((item) => (
                <div
                  key={item.subtitle}
                  className="rounded-lg border bg-card p-6"
                >
                  <h3 className="text-lg font-semibold">{item.subtitle}</h3>
                  <p className="mt-2 text-muted-foreground">{item.text}</p>
                </div>
              ))}
            </div>
          </section>
        ))}

        <section className="space-y-4">
          <h2 className="text-2xl font-bold">Contact Us</h2>
          <p className="text-muted-foreground">
            If you have any questions about this Privacy Policy or our data
            practices, please contact us at{" "}
            <a
              href="mailto:privacy@stomks.com"
              className="text-primary hover:underline"
            >
              privacy@stomks.com
            </a>
            .
          </p>
        </section>
      </div>
    </div>
  );
}
