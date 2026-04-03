
export class Company {
    public id: number;
    public name: string;
    public description: string;
    public logoUrl: string;
    public websiteUrl: string;

    constructor(id: number, name: string, description: string, logoUrl: string, websiteUrl: string) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.logoUrl = logoUrl;
        this.websiteUrl = websiteUrl;
    }
}