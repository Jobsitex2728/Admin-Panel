/* eslint-disable @typescript-eslint/no-explicit-any */
import { createServer, Model } from 'miragejs';
import { db } from './db';
import { handlers } from './handlers';

export function makeServer({ environment = 'development' } = {}) {
  return createServer({
    environment,

    models: {
      driver: Model,
      driverProfile: Model,
      driverDocument: Model,
      job: Model, // Add job model
    },

    seeds(server) {
      // Load drivers
      if (db.drivers?.list) {
        db.drivers.list.forEach((driver: any) => {
          server.create('driver', driver);
        });
      }

      // Load driver profiles
      if (db.driverProfiles) {
        Object.entries(db.driverProfiles).forEach(([id, profile]) => {
          server.create('driverProfile', { ...(profile as any), id });
        });
      }

      // Load driver documents
      if (db.driverDocuments) {
        Object.entries(db.driverDocuments).forEach(([id, documents]) => {
          server.create('driverDocument', { ...(documents as any), id });
        });
      }

      // Load jobs if they exist
      if (db.jobs) {
        db.jobs.forEach((job: any) => {
          server.create('job', job);
        });
      }
    },

    routes() {
      this.namespace = '/api';
      this.timing = 300;

      // ============ DRIVERS ROUTES ============
      this.get('/drivers', handlers.getDrivers.bind(this));
      this.get('/drivers/:id', handlers.getDriverById.bind(this));
      this.patch('/drivers/:id', handlers.updateDriver.bind(this));
      this.post('/drivers/export', handlers.exportDrivers.bind(this));

      // ============ DRIVER PROFILES ROUTES ============
      this.get('/driver-profiles/:id', handlers.getDriverProfile.bind(this));

      // ============ DRIVER DOCUMENTS ROUTES ============
      this.get('/driver-documents/:id', handlers.getDriverDocuments.bind(this));
      this.patch('/driver-documents/:driverId/documents/:documentId', handlers.updateDocumentStatus.bind(this));

      // ============ DASHBOARD ROUTES ============
      this.get('/dashboard', handlers.getDashboard.bind(this));

      this.passthrough();
    },
  });
}