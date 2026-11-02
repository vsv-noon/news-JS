import News, { NewsItem } from './news/news';
import Sources, { SourceItem } from './sources/sources';

export interface NewsResponse {
    articles?: NewsItem[];
}

export interface SourcesResponse {
    sources?: SourceItem[];
}

export class AppView {
    public news: News;
    public sources: Sources;

    constructor() {
        this.news = new News();
        this.sources = new Sources();
    }

    drawNews(data?: NewsResponse) {
        const values = data?.articles ? data?.articles : [];
        this.news.draw(values);
    }

    drawSources(data?: SourcesResponse) {
        const values = data?.sources ? data?.sources : [];
        this.sources.draw(values);
    }
}

export default AppView;
