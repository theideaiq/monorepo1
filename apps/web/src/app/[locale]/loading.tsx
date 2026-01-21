import { BrandLoader } from '@/components/ui/BrandLoader';

export default function Loading() {
  return (
    <div className="min-h-screen bg-slate-50 pt-20 flex flex-col">
      <div className="flex-1">
        <BrandLoader />
      </div>
    </div>
  );
}
