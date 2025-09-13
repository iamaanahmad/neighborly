
import { ResourceDirectory } from '@/components/resource-directory';

export default function ResourcesPage() {
  return (
    <div className="container mx-auto py-8 px-4 md:px-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold tracking-tight">Resource Directory</h1>
        <p className="text-muted-foreground">
          Find local organizations and services that can help.
        </p>
      </div>
      <ResourceDirectory />
    </div>
  );
}
