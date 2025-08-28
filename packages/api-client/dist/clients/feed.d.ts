import { type Post as FeedPost, type CreatePostRequest } from "@hive/core";
export declare class FeedApiClient {
    private baseUrl;
    constructor(baseUrl: string);
    getPosts(): Promise<FeedPost[]>;
    createPost(input: CreatePostRequest): Promise<FeedPost>;
}
//# sourceMappingURL=feed.d.ts.map