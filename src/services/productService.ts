/**
 * productService.ts — Stub for product API calls.
 * TODO: connect to backend /api/products endpoints
 */

export const productService = {
  list: async (shopId: string) => {
    console.log('[productService] list stub called', { shopId });
    return [];
  },

  create: async (data: Record<string, unknown>) => {
    console.log('[productService] create stub called', data);
    return null;
  },

  update: async (id: string, data: Record<string, unknown>) => {
    console.log('[productService] update stub called', { id, data });
    return null;
  },

  delete: async (id: string) => {
    console.log('[productService] delete stub called', { id });
  },
};
