export function shortenAccountId(
  accountId: string,
  start = 8,
  end = 6,
): string {
  if (accountId.length <= start + end + 3) {
    return accountId;
  }

  return `${accountId.slice(0, start)}...${accountId.slice(-end)}`;
}

export function formatNear(amount: string | number): string {
  const value = Number(amount);

  if (!Number.isFinite(value)) {
    return '0 NEAR';
  }

  return `${new Intl.NumberFormat('en-US', {
    maximumFractionDigits: 4,
  }).format(value)} NEAR`;
}

export function isValidNearAmount(amount: string): boolean {
  if (!amount.trim()) return false;

  const value = Number(amount);

  return Number.isFinite(value) && value > 0;
}

export function formatDate(date: string): string {
  const parsed = new Date(date);

  if (Number.isNaN(parsed.getTime())) {
    return 'Date unavailable';
  }

  return new Intl.DateTimeFormat('en', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  }).format(parsed);
}
