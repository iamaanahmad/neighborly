
import { AppHeader } from '@/components/app-header';

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (
     <>
        <AppHeader />
        <main className="p-4 lg:p-6">{children}</main>
    </>
  );
}
