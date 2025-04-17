/**
 * Formats a given date into a human-readable string based on its relation to the current date.
 *
 * @param {string|Date} date - The date to format. Can be a string or a Date object.
 * @param {string} [month='short'] - The format for the month in the output.
 *                                   Accepts 'short' (e.g., "Jan") or 'long' (e.g., "January").
 * @returns {string} - A formatted date string:
 *                     - If the date is today, returns the time (e.g., "2:30 PM").
 *                     - If the date is within the current year, returns the month and day (e.g., "Jan 15").
 *                     - Otherwise, returns the full date (e.g., "Jan 15, 2022").
 */
export function formatDate(date, month = 'short') {
    const now = new Date()
    const messageDate = new Date(date)
    if (messageDate.toDateString() === now.toDateString()) {
        return messageDate.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' })
    } else if (messageDate.getFullYear() === now.getFullYear()) {
        return messageDate.toLocaleDateString([], { month: month, day: 'numeric' })
    }
    return messageDate.toLocaleDateString([], { month: month, day: 'numeric', year: 'numeric' })
}