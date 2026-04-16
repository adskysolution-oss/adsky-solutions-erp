/**
 * AdSky 25X Universal Filter Engine
 * Transforms complex frontend filter logic into Prisma 'where' clauses.
 * Supports AND/OR grouping, partial searches, and date orchestrations.
 */

export function buildPrismaQuery(filters, logic = 'AND') {
  if (!filters || filters.length === 0) return {};

  const conditions = filters.map(filter => {
    const { field, operator, value } = filter;

    switch (operator) {
      case 'equals':
        return { [field]: value };
      case 'contains':
        return { [field]: { contains: value, mode: 'insensitive' } };
      case 'gt':
        return { [field]: { gt: parseFloat(value) } };
      case 'lt':
        return { [field]: { lt: parseFloat(value) } };
      case 'after':
        return { [field]: { gte: new Date(value) } };
      case 'before':
        return { [field]: { lte: new Date(value) } };
      case 'in':
        return { [field]: { in: Array.isArray(value) ? value : [value] } };
      default:
        return { [field]: value };
    }
  });

  return logic === 'OR' ? { OR: conditions } : { AND: conditions };
}

/**
 * Advanced Location Filter (Flattened Search)
 */
export function buildLocationQuery(params) {
  const { state, district, tehsil, village, pincode } = params;
  const query = {};

  if (state) query.state = state;
  if (district) query.district = district;
  if (tehsil) query.tehsil = tehsil;
  if (village) query.village = village;
  if (pincode) query.pincode = pincode;

  return query;
}

/**
 * Relative Date Resolver
 * Resolves strings like 'today', 'this_week' into Prisma date objects.
 */
export function resolveRelativeDate(period) {
  const now = new Date();
  const start = new Date();

  switch (period) {
    case 'today':
      start.setHours(0, 0, 0, 0);
      break;
    case 'this_week':
      const day = now.getDay();
      start.setDate(now.getDate() - day);
      start.setHours(0, 0, 0, 0);
      break;
    case 'this_month':
      start.setDate(1);
      start.setHours(0, 0, 0, 0);
      break;
    default:
      return null;
  }

  return { gte: start };
}
