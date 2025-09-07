import { type Metadata } from "next";
import { Heading, Typography } from "@hive/ui";

export const metadata: Metadata = {
  title: "Terms of Service | HIVE",
  description: "Terms of Service for HIVE platform",
};

export default function TermsOfServicePage() {
  return (
    <div className="container mx-auto max-w-4xl py-12 px-4">
      <Heading level={1} className="mb-8">
        Terms of Service
      </Heading>
      <div className="space-y-6">
        <Typography variant="lead">
          Welcome to HIVE! These terms and conditions outline the rules and regulations for the use of HIVE's Website, located at hive.so.
        </Typography>
        <Typography>
          By accessing this website we assume you accept these terms and conditions. Do not continue to use HIVE if you do not agree to take all of the terms and conditions stated on this page.
        </Typography>
        <Heading level={2} className="pt-4">
          Cookies
        </Heading>
        <Typography>
          We employ the use of cookies. By accessing HIVE, you agreed to use cookies in agreement with the HIVE's Privacy Policy.
        </Typography>
        <Heading level={2} className="pt-4">
          License
        </Heading>
        <Typography>
          Unless otherwise stated, HIVE and/or its licensors own the intellectual property rights for all material on HIVE. All intellectual property rights are reserved. You may access this from HIVE for your own personal use subjected to restrictions set in these terms and conditions.
        </Typography>
      </div>
    </div>
  );
}
