import { type LucideIcon } from "lucide-react";
import type { StatItem } from "../../types/dashboard.types";



export default function StatsCard({ label, value, subValue, trend, trendType, Icon, children }: StatItem & { label: string, subValue?: number, Icon: LucideIcon, children?: React.ReactNode }) {
    return (
        <div className="bg-white rounded-lg p-6 shadow-sm flex items-start justify-between">
            <div>
                <p className="text-base text-gray-600 mb-2">{label}</p>
                {value && <p className="text-2xl font-bold text-gray-900">{value}</p>}
                {subValue && <p className="text-sm text-gray-600 mt-1">{subValue}</p>}
                {trend && (
                    <p className="text-xs text-blue-600 mt-2 rounded-full bg-blue-100 inline-block px-2 py-1">
                        +{trend}% {trendType}
                    </p>
                )}
                {children}
            </div>

            <div className="bg-green-100 rounded-xl p-3">
                <Icon size={22} className="text-green-500" />
            </div>
        </div>
    );
}