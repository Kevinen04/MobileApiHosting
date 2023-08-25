export interface Forecast {
    id: number;
    region: string;
    weather: string;
    date: Date;
    rainfall?: string;
}
