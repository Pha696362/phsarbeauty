import { observable, action } from 'mobx'

import { appConfig } from '../dummy/appConfig';
import { contentByCategoryRef } from '../services/data.service';
import { pushToArray } from '../services/mapping.service';

export default class HEALTH {
    @observable health: any[] = [];
    @observable loading: boolean = false;
    @observable lastVisable: any = null
    @observable loadingMore: boolean = false
    @observable loadingRefresh: boolean = false

    @action
    async fetchHealth() {
        this.loading = true
        const docs = await contentByCategoryRef( 'JTkSqnEaWOZUT9ZLwgsp').get()
        const items = pushToArray(docs)
        if (docs.size === appConfig.size) {
            this.lastVisable = items[items.length - 1]
        } else {
            this.lastVisable = null;
        }
        this.health = items
        this.loading = false
        
    }
    @action
    async fetchRefreshHealth() {
        this.loadingRefresh = true
        const docs = await contentByCategoryRef( 'JTkSqnEaWOZUT9ZLwgsp').get()
        const items = pushToArray(docs)
        if (docs.size === appConfig.size) {
            this.lastVisable = items[items.length - 1]
        } else {
            this.lastVisable = null;
        }
        this.health = items
        this.loadingRefresh = false
    }

    @action
    async fetchMoreHealth() {
        // console.log(this.lastVisable)
        // console.log(this.loadingMore)
        if (!this.lastVisable || this.loadingMore) return
        this.loadingMore = true
        const docs = await contentByCategoryRef('JTkSqnEaWOZUT9ZLwgsp',this.lastVisable,).get()
        const items = pushToArray(docs)
        if (docs.size === appConfig.size) {
            this.lastVisable = items[items.length - 1]
        } else {
            this.lastVisable = null;
        }
        this.health = this.health.concat(items)
        this.loadingMore = false
    }

}