import { driverHandlers } from './drivers';
import { driverProfileHandlers } from './driverProfiles';
import { driverDocumentHandlers } from './driverDocuments';
import { dashboardHandlers } from './dashboard';

// Combine all handlers
export const handlers = {
  ...driverHandlers,
  ...driverProfileHandlers,
  ...driverDocumentHandlers,
  ...dashboardHandlers,
};