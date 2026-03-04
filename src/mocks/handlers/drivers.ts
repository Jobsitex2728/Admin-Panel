/* eslint-disable @typescript-eslint/no-explicit-any */
import { Response } from 'miragejs';
import type { AppSchema } from '../../types/shared.types';
import type { GetDriversParams } from '../../types/driver.types';

export const driverHandlers = {
    getDrivers(schema: AppSchema, request: { queryParams: GetDriversParams }) {
        const {
            page = '1',
            limit = '10',
            search = '',
            status,
            availability
        } = request.queryParams;

        const allDrivers = schema.all('driver').models || [];
        let drivers = allDrivers.map(model => model.attrs) as any[];

        if (search && typeof search === 'string') {
            const searchLower = search.toLowerCase();
            drivers = drivers.filter(driver =>
                (driver.name?.toLowerCase() || '').includes(searchLower) ||
                (driver.driverId?.toLowerCase() || '').includes(searchLower) ||
                (driver.phoneNumber || '').includes(searchLower)
            );
        }

        if (status && typeof status === 'string') {
            drivers = drivers.filter(driver => driver.status === status);
        }

        if (availability && typeof availability === 'string') {
            drivers = drivers.filter(driver => driver.availability === availability);
        }

        const pageNum = parseInt(page as string) || 1;
        const limitNum = parseInt(limit as string) || 10;
        const start = (pageNum - 1) * limitNum;
        const end = start + limitNum;
        const paginatedDrivers = drivers.slice(start, end);
        const totalPages = Math.ceil(drivers.length / limitNum);

        return {
            data: paginatedDrivers,
            pagination: {
                total: drivers.length,
                page: pageNum,
                limit: limitNum,
                pages: totalPages,
                hasNext: pageNum < totalPages,
                hasPrevious: pageNum > 1
            }
        };
    },

    getDriverById(schema: AppSchema, request: {
        params: {
            id?: string;
            driverId?: string;
            documentId?: string;
        }
    }) {
        const { id } = request.params;

        if (!id || typeof id !== 'string') {
            return new Response(400, {}, { error: 'Invalid driver ID' });
        }

        const driver = schema.find('driver', id);

        if (!driver) {
            return new Response(404, {}, { error: 'Driver not found' });
        }

        return driver.attrs;
    },

    updateDriver(schema: AppSchema, request: {
        params: {
            id?: string;
            driverId?: string;
            documentId?: string;
        }; requestBody: string
    }) {
        const { id } = request.params;

        if (!id || typeof id !== 'string') {
            return new Response(400, {}, { error: 'Invalid driver ID' });
        }

        let updates;
        try {
            updates = JSON.parse(request.requestBody);
        } catch {
            return new Response(400, {}, { error: 'Invalid request body' });
        }

        const driver = schema.find('driver', id);

        if (!driver) {
            return new Response(404, {}, { error: 'Driver not found' });
        }

        driver.update(updates);
        return driver.attrs;
    },

    exportDrivers(schema: AppSchema) {
        const drivers = schema.all('driver').models.map(m => m.attrs);

        const headers = ['Name', 'Driver ID', 'Status', 'Availability', 'Phone'];
        const rows = drivers.map((d:any) => [
            d.name || '',
            d.driverId || '',
            d.status || '',
            d.availability || '',
            d.phoneNumber || ''
        ]);

        const csvContent = [
            headers.join(','),
            ...rows.map(row => row.join(','))
        ].join('\n');

        return new Response(200,
            {
                'Content-Type': 'text/csv',
                'Content-Disposition': 'attachment; filename=drivers-export.csv'
            },
            csvContent
        );
    }
};