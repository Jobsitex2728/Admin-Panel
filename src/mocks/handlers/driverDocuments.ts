/* eslint-disable @typescript-eslint/no-explicit-any */
import { Response } from 'miragejs';
import type { AppSchema } from '../../types/shared.types';

export const driverDocumentHandlers = {
  getDriverDocuments(schema: AppSchema, request: { params: {
            id?: string;
            driverId?: string;
            documentId?: string;
        } }) {
    const { id } = request.params;
    
    if (!id || typeof id !== 'string') {
      return new Response(400, {}, { error: 'Invalid document ID' });
    }
    
    const documents = schema.find('driverDocument', id);
    
    if (!documents) {
      return new Response(404, {}, { error: 'Driver documents not found' });
    }
    
    return documents.attrs;
  },

  updateDocumentStatus(schema: AppSchema, request: { params: {
            id?: string;
            driverId?: string;
            documentId?: string;
        }; requestBody: string }) {
    const { driverId, documentId } = request.params;
    
    if (!driverId || typeof driverId !== 'string' || !documentId || typeof documentId !== 'string') {
      return new Response(400, {}, { error: 'Invalid parameters' });
    }
    
    let updates;
    try {
      updates = JSON.parse(request.requestBody);
    } catch {
      return new Response(400, {}, { error: 'Invalid request body' });
    }
    
    const driverDocs = schema.find('driverDocument', driverId);
    if (!driverDocs) {
      return new Response(404, {}, { error: 'Driver documents not found' });
    }
    
    const currentDocs:any = driverDocs.attrs;
    const updatedDocuments = (currentDocs.documents || []).map((doc: any) => 
      doc.id === documentId ? { ...doc, ...updates } : doc
    );
    
    driverDocs.update({ documents: updatedDocuments });
    return driverDocs.attrs;
  }
};