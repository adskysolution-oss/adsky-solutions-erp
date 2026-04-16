/**
 * AdSky 25X Draft Engine
 * Manages LocalStorage persistence for offline-first farmer onboarding.
 */

const DRAFT_KEY = 'adsky_field_drafts';

export const DraftService = {
  /**
   * Save a form draft locally
   */
  saveDraft: (data) => {
    if (typeof window === 'undefined') return;
    
    const drafts = DraftService.getDrafts();
    const newDraft = {
      id: `DRAFT-${Date.now()}`,
      data,
      timestamp: new Date().toISOString(),
      synced: false
    };
    
    localStorage.setItem(DRAFT_KEY, JSON.stringify([...drafts, newDraft]));
    return newDraft;
  },

  /**
   * Get all active drafts
   */
  getDrafts: () => {
    if (typeof window === 'undefined') return [];
    const drafts = localStorage.getItem(DRAFT_KEY);
    return drafts ? JSON.parse(drafts) : [];
  },

  /**
   * Remove a draft after successful sync
   */
  clearDraft: (id) => {
    if (typeof window === 'undefined') return;
    const drafts = DraftService.getDrafts();
    const updated = drafts.filter(d => d.id !== id);
    localStorage.setItem(DRAFT_KEY, JSON.stringify(updated));
  },

  /**
   * Clear all drafts
   */
  flush: () => {
    if (typeof window === 'undefined') return;
    localStorage.removeItem(DRAFT_KEY);
  }
};
