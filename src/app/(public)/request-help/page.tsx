import { RequestHelpForm } from '@/components/request-help-form';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function RequestHelpPage() {
  return (
    <div className="container mx-auto">
        <div className="max-w-2xl mx-auto">
            <Card>
                <CardHeader>
                <CardTitle>Create a Help Request</CardTitle>
                <CardDescription>
                    Let your neighbors know what you need. Fill out the form below, or use our AI assistant to help you write a clear request.
                </CardDescription>
                </CardHeader>
                <CardContent>
                <RequestHelpForm />
                </CardContent>
            </Card>
        </div>
    </div>
  );
}
