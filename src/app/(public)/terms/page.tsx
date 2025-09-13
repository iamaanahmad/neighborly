
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function TermsPage() {
  return (
    <div className="container mx-auto py-12 px-4 md:px-6">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">Terms of Service</h1>
          <p className="mt-4 text-lg text-muted-foreground">
            Last Updated: {new Date().toLocaleDateString()}
          </p>
        </div>

        <div className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>1. Introduction</CardTitle>
            </CardHeader>
            <CardContent className="text-muted-foreground space-y-4">
              <p>
                Welcome to Neighborly. By using our application, you agree to these Terms of Service. This is a demo application for a hackathon, and as such, it should not be used for real-world emergencies or transactions. All data is for demonstration purposes only.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>2. User Conduct</CardTitle>
            </CardHeader>
            <CardContent className="text-muted-foreground space-y-4">
              <p>
                You agree to use Neighborly in a respectful and lawful manner. You will not post content that is hateful, discriminatory, unsafe, or inappropriate. We use AI to moderate content, and we reserve the right to remove any content or user that violates our community guidelines.
              </p>
            </CardContent>
          </Card>

           <Card>
            <CardHeader>
              <CardTitle>3. Privacy Policy</CardTitle>
            </CardHeader>
            <CardContent className="text-muted-foreground space-y-4">
              <p>
                Our Privacy Policy explains how we handle your data. For this demo, we collect your name and email for authentication purposes. All user data, including chat messages and requests, is stored in Firebase and is not shared with third parties. Please do not use real personal information while testing this demo.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>4. Disclaimer of Warranties</CardTitle>
            </CardHeader>
            <CardContent className="text-muted-foreground space-y-4">
              <p>
                Neighborly is provided "as is," without any warranties of any kind. We do not guarantee the accuracy of AI-generated content or the safety of interactions between users. Use this application at your own risk.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
