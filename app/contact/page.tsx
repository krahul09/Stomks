"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, MapPin, Phone } from "lucide-react";

export default function ContactPage() {
  const contactInfo = [
    {
      title: "Email",
      description: "Get in touch with our support team",
      value: "support@stomks.com",
      icon: Mail,
    },
    {
      title: "Phone",
      description: "Call us during business hours",
      value: "+1 (555) 123-4567",
      icon: Phone,
    },
    {
      title: "Office",
      description: "Visit our headquarters",
      value: "123 Trading Street, New York, NY 10001",
      icon: MapPin,
    },
  ];

  return (
    <div className="container px-4 md:px-6 py-12">
      <div className="flex flex-col items-center justify-center space-y-4 text-center">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl">
            Contact Us
          </h1>
          <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
            Have questions? We're here to help
          </p>
        </div>
      </div>

      <div className="mx-auto grid max-w-5xl gap-12 py-12 md:grid-cols-2">
        <section className="space-y-8">
          <div className="space-y-4">
            <h2 className="text-2xl font-bold">Send us a message</h2>
            <p className="text-muted-foreground">
              Fill out the form below and we'll get back to you as soon as
              possible.
            </p>
          </div>

          <form className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <label
                  htmlFor="first-name"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  First Name
                </label>
                <Input id="first-name" placeholder="John" />
              </div>
              <div className="space-y-2">
                <label
                  htmlFor="last-name"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Last Name
                </label>
                <Input id="last-name" placeholder="Doe" />
              </div>
            </div>
            <div className="space-y-2">
              <label
                htmlFor="email"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Email
              </label>
              <Input id="email" type="email" placeholder="john@example.com" />
            </div>
            <div className="space-y-2">
              <label
                htmlFor="subject"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Subject
              </label>
              <Input id="subject" placeholder="How can we help you?" />
            </div>
            <div className="space-y-2">
              <label
                htmlFor="message"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Message
              </label>
              <Textarea
                id="message"
                placeholder="Tell us more about your inquiry..."
                className="min-h-[150px]"
              />
            </div>
            <Button className="w-full">Send Message</Button>
          </form>
        </section>

        <section className="space-y-8">
          <div className="space-y-4">
            <h2 className="text-2xl font-bold">Contact Information</h2>
            <p className="text-muted-foreground">
              Choose the most convenient way to reach us
            </p>
          </div>

          <div className="grid gap-6">
            {contactInfo.map((info) => (
              <div
                key={info.title}
                className="flex items-start space-x-4 rounded-lg border bg-card p-6"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                  <info.icon className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold">{info.title}</h3>
                  <p className="text-sm text-muted-foreground">
                    {info.description}
                  </p>
                  <p className="mt-1 text-sm font-medium">{info.value}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="rounded-lg border bg-card p-6">
            <h3 className="text-lg font-semibold">Business Hours</h3>
            <div className="mt-4 space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Monday - Friday</span>
                <span>9:00 AM - 6:00 PM EST</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Saturday</span>
                <span>10:00 AM - 4:00 PM EST</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Sunday</span>
                <span>Closed</span>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
