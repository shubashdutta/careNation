import { format, parseISO, formatDistance, formatRelative } from "date-fns";

/**
 * Generic format using date-fns
 */
export function formatDate(date: Date | string, formatString: string): string {
  const d = typeof date === "string" ? parseISO(date) : date;
  return format(d, formatString);
}

/**
 * Format date to "MMM d, yyyy, hh:mm AM/PM" (using toLocaleString)
 */
export const formatDateTime = (date: string | Date) => {
  const d = typeof date === "string" ? new Date(date) : date;
  return d.toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
};

/**
 * Format date to "MMM d, yyyy" (using toLocaleString)
 */
export const formatDateTimeToShort = (date: string | Date) => {
  const d = typeof date === "string" ? new Date(date) : date;
  return d.toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};

/**
 * Format a date to "YYYY-MM-DD"
 */
export const formatLocalDateToYMD = (date: Date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

/**
 * Format a date to "DD/MM/YYYY"
 */
export const formatDateDDMMYYYY = (date: Date | string) => {
  const d = typeof date === "string" ? parseISO(date) : date;
  return format(d, "dd/MM/yyyy");
};

/**
 * Format a date to long format "MMMM do, yyyy"
 */
export const formatDateLong = (date: Date | string) => {
  const d = typeof date === "string" ? parseISO(date) : date;
  return format(d, "MMMM do, yyyy");
};

/**
 * Relative distance, e.g., "3 days ago"
 */
export const formatDateDistance = (
  date: Date | string,
  baseDate: Date = new Date()
) => {
  const d = typeof date === "string" ? parseISO(date) : date;
  return formatDistance(d, baseDate, { addSuffix: true });
};

/**
 * Relative date format, e.g., "last Monday at 12:00 PM"
 */
export const formatDateRelative = (
  date: Date | string,
  baseDate: Date = new Date()
) => {
  const d = typeof date === "string" ? parseISO(date) : date;
  return formatRelative(d, baseDate);
};

/**
 * Get difference in full days between today and given date
 * @param dateInput - Date string or Date object
 * @returns {string} - Difference in days, e.g., "0 day" or "3 days"
 */

export function getDaysDifference(dateInput: string | Date): string {
  const givenDate = new Date(dateInput);
  const now = new Date();
  let diffMs = givenDate.getTime() - now.getTime();

  if (diffMs <= 0) return "0s";

  const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  diffMs -= days * 24 * 60 * 60 * 1000;

  const hours = Math.floor(diffMs / (1000 * 60 * 60));
  diffMs -= hours * 60 * 60 * 1000;

  const minutes = Math.floor(diffMs / (1000 * 60));
  diffMs -= minutes * 60 * 1000;

  const seconds = Math.floor(diffMs / 1000);

  let result = "";
  if (days > 0) result += `${days}d `;
  if (hours > 0) result += `${hours}h `;
  if (minutes > 0) result += `${minutes}m `;
  if (seconds > 0) result += `${seconds}s`;

  return result.trim();
}

export function getPastDaysDifference(dateInput: string | Date): string {
  const givenDate = new Date(dateInput);
  const now = new Date();
  let diffMs = now.getTime() - givenDate.getTime();

  if (diffMs <= 0) return "0s";

  const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  diffMs -= days * 24 * 60 * 60 * 1000;

  const hours = Math.floor(diffMs / (1000 * 60 * 60));
  diffMs -= hours * 60 * 60 * 1000;

  const minutes = Math.floor(diffMs / (1000 * 60));
  diffMs -= minutes * 60 * 1000;

  const seconds = Math.floor(diffMs / 1000);

  let result = "";
  if (days > 0) result += `${days}d `;
  if (hours > 0) result += `${hours}h `;
  if (minutes > 0) result += `${minutes}m `;
  if (seconds > 0) result += `${seconds}s`;

  return result.trim();
}

export function formatDateTimeDiff(dateTime: Date) {
  const now = new Date();
  const diff = Math.abs(dateTime.getTime() - now.getTime());

  const minutes = Math.floor(diff / (1000 * 60)) % 60;
  const hours = Math.floor(diff / (1000 * 60 * 60)) % 24;
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));

  const parts = [];
  if (days) parts.push(`${days} day${days > 1 ? "s" : ""}`);
  if (hours) parts.push(`${hours} hour${hours > 1 ? "s" : ""}`);
  if (minutes) parts.push(`${minutes} minute${minutes > 1 ? "s" : ""}`);

  return parts.length ? parts.join(" ") : "0 minutes";
}

export const formatTime = (timeStr: string): string => {
  const parts = timeStr.split(":");
  const hours = parseInt(parts[0]);
  const minutes = parseInt(parts[1]);
  const seconds = parseFloat(parts[2]);
  const totalMinutes = hours * 60 + minutes + seconds / 60;
  const displayHours = Math.floor(totalMinutes / 60);
  const displayMinutes = Math.round(totalMinutes % 60);
  return displayHours === 0
    ? `${displayMinutes} minutes`
    : `${displayHours} hours ${displayMinutes} minutes`;
};
