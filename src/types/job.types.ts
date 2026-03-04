export const TruckType = {
    DryVan: 'Dry Van',
    BoxTruck: 'Box Truck',
    MultiStop: 'Multi-stop',
    SingleLoad: 'Single Load',
} as const;

export type TruckType = typeof TruckType[keyof typeof TruckType];

export interface Job {
    id: string;
    jobId: string;
    customer: {
        name: string;
        email: string;
    };
    truckType: TruckType;
    loadType: 'Single Load' | 'Multi-stop';
    date: string;
    status: 'Delivered' | 'Pending' | 'In Transit' | 'Dispatching' | 'Paused';
    blocked: boolean;
}

export interface JobsQueryParams {
    page?: number;
    limit?: number;
    search?: string;
    truckType?: string;
}