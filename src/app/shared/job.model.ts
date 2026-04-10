export class Job {
    constructor(
        public id: string,
        public title: string,
        public description: string,
        public location: string,
        public salary: number,
        public type: string,
        public companyId: string | { id?: string, _id?: string }
    ) {}
}