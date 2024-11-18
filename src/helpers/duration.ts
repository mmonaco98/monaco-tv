export const formatDuration = (durationInMinutes: number): string => {
    const hours = Math.floor(durationInMinutes / 60);
    const minutes = durationInMinutes - hours * 60;
    return `${hours}h${minutes}m`;
};
