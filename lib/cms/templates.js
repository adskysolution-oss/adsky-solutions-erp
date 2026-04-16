/**
 * AdSky 25X Section Blueprint Registry
 * Defines the schema & default props for all CMS sections.
 */

export const SECTION_TEMPLATES = {
  hero_v1: {
    type: 'hero_v1',
    name: 'Hero Command',
    category: 'Marketing',
    props: {
      headline: 'Accelerate Your Mission with AdSky 25X',
      subheadline: 'The enterprise-grade SaaS ecosystem for high-speed field operations.',
      ctaText: 'Start Mission',
      ctaLink: '/apply',
      image: '/hero-mock.png'
    },
    styles: {
      background: 'linear-gradient(135deg, #0F172A 0%, #1E293B 100%)',
      headlineColor: '#FFFFFF',
      subheadlineColor: '#94A3B8',
      buttonBg: '#2563EB',
      buttonText: '#FFFFFF',
      padding: '80px 0',
      align: 'left'
    }
  },
  text_block: {
    type: 'text_block',
    name: 'Content Node',
    category: 'Content',
    props: {
      title: 'Our Purpose',
      content: 'We empower regional partners and field agents with data-driven orchestration nodes.'
    },
    styles: {
      background: '#F8FAFC',
      titleColor: '#0F172A',
      contentColor: '#475569',
      padding: '60px 0',
      align: 'center'
    }
  },
  gallery_v1: {
    type: 'gallery_v1',
    name: 'Visual Grid',
    category: 'Display',
    props: {
      images: [
        { url: '/mock1.png', alt: 'Mission 1' },
        { url: '/mock2.png', alt: 'Mission 2' }
      ]
    },
    styles: {
      background: '#FFFFFF',
      gridCols: '3',
      gap: '24px',
      padding: '40px 0'
    }
  },
  pricing_v1: {
    type: 'pricing_v1',
    name: 'Settlement Grid',
    category: 'Financial',
    props: {
      title: 'Choose Your Tier',
      plans: [
        { name: 'Partner', price: '₹9,999', features: ['Regional Hub', '30% Comm'] },
        { name: 'Admin', price: '₹4,999', features: ['Field Control', 'Manual Payout'] }
      ]
    },
    styles: {
      background: '#F1F5F9',
      cardBg: '#FFFFFF',
      primaryColor: '#2563EB',
      padding: '80px 0'
    }
  }
};

export const getTemplate = (type) => SECTION_TEMPLATES[type] || null;
export const getAllTemplates = () => Object.values(SECTION_TEMPLATES);
