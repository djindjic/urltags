export class Link {
    id: number;
    link: string;
    tags: string[];
    
    static fromObject(item: any): Link {
        const result = new Link();

        result.id = item.id;
        for (let key in item.attributes) {
            if (item.attributes.hasOwnProperty(key)) {
                result[key] = item.attributes[key];
            }
        }

        return result;
    }
}