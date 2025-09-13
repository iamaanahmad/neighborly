
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { HeartHandshake, Bot, Users } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="container mx-auto py-12 px-4 md:px-6">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">About Neighborly</h1>
          <p className="mt-4 text-lg text-muted-foreground">
            Building stronger communities, one connection at a time.
          </p>
        </div>

        <div className="space-y-10">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-2xl">
                <HeartHandshake className="text-primary" />
                Our Mission
              </CardTitle>
            </CardHeader>
            <CardContent className="text-muted-foreground space-y-4">
              <p>
                In a world that's more connected digitally yet often more disconnected locally, Neighborly was born from a simple idea: what if we could use technology to bring back the spirit of neighborly support? Our mission is to bridge the gap between those who need help and those who are eager to offer it, creating a hyper-local network of trust and mutual assistance.
              </p>
              <p>
                We believe that everyone has something to offer and that everyone needs a little help sometimes. By making it easy and safe to ask for and provide assistance, we aim to foster resilient, empathetic, and tightly-knit communities.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-2xl">
                <Bot className="text-primary" />
                The Role of AI
              </CardTitle>
            </CardHeader>
            <CardContent className="text-muted-foreground space-y-4">
              <p>
                At Neighborly, we leverage the power of Google's Gemini AI not just as a feature, but as a core part of our commitment to accessibility and safety. Our AI assistant helps users draft clear and effective help requests, suggests polite replies for volunteers, and moderates content to ensure a respectful environment for everyone.
              </p>
              <p>
                This "responsible AI" approach ensures that communication is simple, effective, and safe, allowing our users to focus on what truly matters: connecting with each other.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-2xl">
                <Users className="text-primary" />
                Our Community
              </CardTitle>
            </CardHeader>
            <CardContent className="text-muted-foreground space-y-4">
              <p>
                This project was built to demonstrate the power of combining a modern web stack (Next.js, Firebase) with cutting-edge AI (Google Gemini & Genkit) to solve a genuine community problem. It is a showcase of a full-stack, scalable, and user-friendly application designed with both functionality and social impact in mind.
              </p>
              <p>
                Whether you are a developer, a designer, a community organizer, or just someone who believes in the power of local connection, we thank you for checking out Neighborly.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
