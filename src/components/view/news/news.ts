import './news.css';

export interface NewsItem {
    source: {
        id?: string | null;
        name: string;
    };
    author?: string | null;
    title: string;
    description?: string | null;
    url: string;
    urlToImage?: string | null;
    publishedAt: string;
}

class News {
    draw(data: NewsItem[]): void {
        const news = data.length >= 10 ? data.filter((_item, idx) => idx < 10) : data;

        const fragment: DocumentFragment = document.createDocumentFragment();
        const newsItemTemp = document.querySelector<HTMLTemplateElement>('#newsItemTemp');

        news.forEach((item, idx) => {
            if (!newsItemTemp) return;
            const newsClone = newsItemTemp.content.cloneNode(true) as DocumentFragment;

            const newsItem = newsClone.querySelector<HTMLElement>('.news__item');
            if (!newsItem) return;
            if (idx % 2) newsItem.classList.add('alt');

            const newsMetaProto = newsClone.querySelector<HTMLElement>('.news__meta-photo');
            if (!newsMetaProto) return;
            newsMetaProto.style.backgroundImage = `url(${item.urlToImage || 'img/news_placeholder.jpg'})`;

            const newsMetaAuthor = newsClone.querySelector<HTMLElement>('.news__meta-author');
            if (!newsMetaAuthor) return;
            newsMetaAuthor.textContent = item.author || item.source.name;

            const newsMetaData = newsClone.querySelector<HTMLElement>('.news__meta-date');
            if (!newsMetaData) return;
            newsMetaData.textContent = item.publishedAt.slice(0, 10).split('-').reverse().join('-');

            const newsDescriptionTitle = newsClone.querySelector<HTMLElement>('.news__description-title');
            if (!newsDescriptionTitle) return;
            newsDescriptionTitle.textContent = item.title;

            const newsDescriptionSource = newsClone.querySelector<HTMLElement>('.news__description-source');
            if (!newsDescriptionSource) return;
            newsDescriptionSource.textContent = item.source.name;

            const newsDescriptionContent = newsClone.querySelector<HTMLElement>('.news__description-content');
            if (!newsDescriptionContent) return;
            newsDescriptionContent.textContent = item.description || '';

            const newsReadMore = newsClone.querySelector<HTMLElement>('.news__read-more a');
            if (!newsReadMore) return;
            newsReadMore.setAttribute('href', item.url);

            fragment.append(newsClone);
        });

        const newsItem = document.querySelector<HTMLElement>('.news');
        if (!newsItem) return;
        newsItem.innerHTML = '';
        newsItem.appendChild(fragment);
    }
}

export default News;
