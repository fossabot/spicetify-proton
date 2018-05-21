export class Page {
    public totalPage: number;
    public currentPage: number = 0;

    private collection: React.Component[];
    private itemCount: number;
    private itemPerPage: number;

    public constructor(collection: React.Component[], itemPerPage: number) {
        this.collection = collection;
        this.itemCount = this.collection.length;
        this.itemPerPage = itemPerPage;
        this.totalPage = Math.ceil(this.itemCount / this.itemPerPage);
    }

    public changePage(direction: -1 | 0 | 1): React.ReactNode[] {
        const newPage = this.currentPage + direction;
        if (newPage >= 0 && newPage < this.totalPage)  {
            this.currentPage = newPage;
        }
        return this.render();
    }

    public render(): React.ReactNode[] {
        const start = this.currentPage * this.itemPerPage;
        return this.collection.slice(start, start + this.itemPerPage).map((item: React.Component) => item.render());
    }
}
