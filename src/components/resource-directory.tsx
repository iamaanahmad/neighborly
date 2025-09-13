'use client';

import { useState } from 'react';
import { resources as allResources } from '@/lib/data';
import type { Resource } from '@/lib/types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { Phone, MapPin } from 'lucide-react';

export function ResourceDirectory() {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredResources = allResources.filter(resource =>
    resource.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    resource.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <Input
        placeholder="Search for resources..."
        value={searchTerm}
        onChange={e => setSearchTerm(e.target.value)}
        className="max-w-sm"
      />
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredResources.map(resource => (
          <Card key={resource.id}>
            <CardHeader>
              <div className="flex justify-between items-start">
                <CardTitle>{resource.name}</CardTitle>
                <Badge variant="outline">{resource.category}</Badge>
              </div>
              <CardDescription>{resource.description}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Phone className="size-4" />
                <span>{resource.contact}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="size-4" />
                <span>{resource.location}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
