'use client';

import { Button } from '@repo/ui';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { toast } from 'react-hot-toast';
import { updateProfile } from '@/actions/account';

// biome-ignore lint/suspicious/noExplicitAny: Data fetch
export default function ProfileForm({ profile }: { profile: any }) {
  const t = useTranslations('Account');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(formData: FormData) {
    setLoading(true);
    try {
      await updateProfile(formData);
      toast.success('Profile updated');
      // biome-ignore lint/suspicious/noExplicitAny: Error handling
    } catch (e: any) {
      toast.error(e.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <form action={handleSubmit} className="space-y-6 max-w-xl">
      <div className="grid gap-4">
        <div className="grid gap-2">
          <label
            htmlFor="full_name"
            className="text-sm font-medium text-slate-200"
          >
            {t('fullName')}
          </label>
          <input
            id="full_name"
            name="full_name"
            defaultValue={profile?.full_name}
            className="flex h-10 w-full rounded-md border border-white/10 bg-black/20 px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-yellow focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 text-white"
          />
        </div>
      </div>
      <Button type="submit" disabled={loading}>
        {loading ? t('saving') : t('saveChanges')}
      </Button>
    </form>
  );
}
