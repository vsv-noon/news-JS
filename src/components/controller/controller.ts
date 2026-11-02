import { SourcesResponse } from '../view/appView';
import AppLoader from './appLoader';

export interface NewsEvent extends Event {
    target: HTMLElement | null;
    currentTarget: HTMLElement;
}

enum Endpoints {
    Sources = 'sources',
    Everything = 'everything',
}

class AppController extends AppLoader {
    getSources(callback: (data?: SourcesResponse) => void): void {
        super.getResp<SourcesResponse>(
            {
                endpoint: Endpoints.Sources,
            },
            callback
        );
    }

    getNews(e: NewsEvent, callback: () => void): void {
        if (!(e.target instanceof HTMLElement) || !(e.currentTarget instanceof HTMLElement)) return;
        let target: HTMLElement | null = e.target;
        const newsContainer = e.currentTarget;

        while (target !== newsContainer) {
            if (target.classList.contains('source__item')) {
                const sourceId = target.getAttribute('data-source-id');
                if (!sourceId) return;
                if (newsContainer.getAttribute('data-source') !== sourceId) {
                    newsContainer.setAttribute('data-source', sourceId);
                    super.getResp(
                        {
                            endpoint: Endpoints.Everything,
                            options: {
                                sources: sourceId,
                            },
                        },
                        callback
                    );
                }
                return;
            }
            target = target.parentNode as HTMLElement;
        }
    }
}

export default AppController;
