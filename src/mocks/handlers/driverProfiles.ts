import { Response } from 'miragejs';
import type { AppSchema } from '../../types/shared.types';

export const driverProfileHandlers = {
    getDriverProfile(schema: AppSchema, request: {
        params: {
            id?: string;
            driverId?: string;
            documentId?: string;
        }
    }) {
        const { id } = request.params;

        if (!id || typeof id !== 'string') {
            return new Response(400, {}, { error: 'Invalid profile ID' });
        }

        const profile = schema.find('driverProfile', id);

        if (!profile) {
            return new Response(404, {}, { error: 'Driver profile not found' });
        }

        return profile.attrs;
    }
};