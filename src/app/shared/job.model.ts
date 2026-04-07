export class Job {
    public id: number;
    public title: string;
    public description: string;
    public location: string;
    public salary: number;
    public type: string;
    public companyId: number;

    constructor(id: number, title: string, description: string, location: string, salary: number, type: string, companyId: number) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.location = location;
        this.salary = salary;
        this.type = type;
        this.companyId = companyId;
    }
}