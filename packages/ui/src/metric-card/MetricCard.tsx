import { cn } from '@repo/utils';
import { ArrowDown, ArrowRight, ArrowUp } from 'lucide-react';
import type React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../card/Card';

interface MetricCardProps {
  /** Title of the metric (e.g., "Total Revenue") */
  title: string;
  /** The main value to display (e.g., "$50,000") */
  value: string | number;
  /** Optional icon to display in the top-right corner */
  icon?: React.ReactNode;
  /** Description text displayed below the value */
  description?: string;
  /**
   * Trend indicator configuration.
   * Displays an arrow and percentage change.
   */
  trend?: {
    /** The percentage value (e.g. 12 for 12%) */
    value: number;
    /** Label context for the trend (e.g. "from last month") */
    label: string;
    /** Direction of the trend: 'up' (green), 'down' (red), or 'neutral' (gray) */
    direction: 'up' | 'down' | 'neutral';
  };
  className?: string;
}

/**
 * A specialized Card component for displaying dashboard metrics.
 * Includes support for icons, values, descriptions, and trend indicators.
 *
 * @example
 * <MetricCard
 *   title="Active Users"
 *   value="1,234"
 *   icon={<UsersIcon />}
 *   trend={{ value: 12, label: "vs last month", direction: "up" }}
 * />
 */
export function MetricCard({
  title,
  value,
  icon,
  description,
  trend,
  className,
}: MetricCardProps) {
  return (
    <Card className={cn('overflow-hidden', className)}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-slate-500">
          {title}
        </CardTitle>
        {icon && <div className="text-brand-pink">{icon}</div>}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold text-slate-900">{value}</div>
        {(description || trend) && (
          <div className="mt-1 flex items-center text-xs text-slate-500">
            {trend && (
              <span
                className={cn(
                  'mr-2 flex items-center font-medium',
                  trend.direction === 'up' && 'text-green-600',
                  trend.direction === 'down' && 'text-red-600',
                  trend.direction === 'neutral' && 'text-slate-600',
                )}
              >
                {trend.direction === 'up' && (
                  <ArrowUp className="mr-1 h-3 w-3" />
                )}
                {trend.direction === 'down' && (
                  <ArrowDown className="mr-1 h-3 w-3" />
                )}
                {trend.direction === 'neutral' && (
                  <ArrowRight className="mr-1 h-3 w-3" />
                )}
                {trend.value}%
              </span>
            )}
            {trend?.label || description}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
