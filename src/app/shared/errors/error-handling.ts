export function errorText(status: number) {
  if (status === 0) return 'დაფიქსირდა შეცდომა';
  if (status === 400) return 'არასწორი მოთხოვნა';
  if (status === 401) return 'გაიარე ავტორიზაცია';
  if (status === 403) return 'წვდომა აკრძალულია';
  if (status === 404) return 'მონაცემები ვერ მოიძებნა';
  if (status === 408) return 'მოთხოვნას ძალიან დიდი დრო დასჭირდა';
  if (status === 429) return 'ძალიან ბევრი მოთხოვნაა, სცადე ცოტახანში';
  if (status >= 500) return 'სერვერის შეცდომა, სცადე მოგვიანებით';
  return 'შეცდომა, სცადე თავიდან';
}
