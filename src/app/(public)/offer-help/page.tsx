
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { OfferList } from '@/components/offer-list';
import Link from 'next/link';

export default function OfferHelpPage() {
  return (
    <div className="container mx-auto py-8 px-4 md:px-6">
        <div className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
            <h1 className="text-2xl font-bold tracking-tight mb-6">Open Requests</h1>
            <OfferList />
        </div>

        <div>
            <Card>
            <CardHeader>
                <CardTitle>Offer Your Help</CardTitle>
                <CardDescription>
                Let the community know how you can contribute.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <form className="space-y-4">
                <div className="space-y-2">
                    <Label htmlFor="offer-type">Type of Help</Label>
                    <Select>
                    <SelectTrigger id="offer-type">
                        <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="Groceries">Groceries</SelectItem>
                        <SelectItem value="Errands">Errands</SelectItem>
                        <SelectItem value="Medical Aid">Medical Aid</SelectItem>
                        <SelectItem value="Gardening">Gardening</SelectItem>
                        <SelectItem value="Other">Other</SelectItem>
                    </SelectContent>
                    </Select>
                </div>
                <div className="space-y-2">
                    <Label htmlFor="availability">Availability</Label>
                    <Input id="availability" placeholder="e.g., Weekends, Mon-Fri evenings" />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea id="description" placeholder="Describe how you can help." />
                </div>
                 <Button asChild className="w-full">
                  <Link href="/login">
                    Login to Post Offer
                  </Link>
                </Button>
                </form>
            </CardContent>
            </Card>
        </div>
        </div>
    </div>
  );
}
