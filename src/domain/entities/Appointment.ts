export type CitaStatus = 'pending' | 'confirmed' | 'cancelled' | 'completed';

export class Cita {
    constructor(
        public id: string,
        public providerId: string,
        public providerName: string,
        public providerCategory: string,
        public userId: string,
        public userName: string,
        public date: string,     // YYYY-MM-DD
        public time: string,     // HH:mm
        public duration: number,
        public status: CitaStatus,
        public createdAt: string
    ) {}
}