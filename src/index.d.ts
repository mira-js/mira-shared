import { z } from 'zod';
export declare enum Source {
    reddit = "reddit",
    hackernews = "hackernews",
    news = "news"
}
export declare const SourceSchema: z.ZodNativeEnum<typeof Source>;
export interface Engagement {
    upvotes: number;
    comments: number;
}
export interface CollectedItem {
    source: Source;
    url: string;
    title: string;
    body: string;
    author: string;
    timestamp: string;
    engagement: Engagement;
    raw_replies: string[];
    subreddit?: string;
    category?: string;
}
export type Sentiment = 'negative' | 'neutral' | 'positive';
export type Category = 'complaint' | 'feature-request' | 'workflow-friction' | 'pricing' | 'switching-signal';
export interface ExtractionResult {
    pain_points: string[];
    sentiment: Sentiment;
    category: Category;
    mentioned_tools: string[];
    key_quote: string;
}
export type ResearchDepth = 'quick' | 'deep';
export type JobStatus = 'queued' | 'active' | 'completed' | 'failed';
export interface ResearchJobInput {
    query: string;
    sources?: Source[];
    depth?: ResearchDepth;
}
export interface ResearchJob extends ResearchJobInput {
    jobId: string;
    status: JobStatus;
    progress?: number;
    createdAt: string;
    result?: ResearchResult;
}
export interface Evidence {
    source: Source;
    url: string;
    excerpt: string;
}
export interface PainPointTheme {
    theme: string;
    frequency: number;
    sources: Source[];
    sentiment: number;
    evidence: Evidence[];
}
export interface ResearchResult {
    query: string;
    summary: string;
    painPoints: PainPointTheme[];
    competitorWeaknesses: PainPointTheme[];
    emergingGaps: PainPointTheme[];
    rawItems: CollectedItem[];
}
export interface OpenVikingResourceMetadata {
    title: string;
    url: string;
    timestamp: string;
    engagement: Engagement;
}
export interface OpenVikingResource {
    uri: string;
    content: string;
    metadata: OpenVikingResourceMetadata;
}
export interface OpenVikingFindOptions {
    scope: string;
    maxResults: number;
    layers: ('L0' | 'L1' | 'L2')[];
}
export type Result<T, E = Error> = {
    ok: true;
    value: T;
} | {
    ok: false;
    error: E;
};
export interface CollectorOptions {
    query: string;
    limit?: number;
}
export interface Collector {
    collect(options: CollectorOptions): Promise<CollectedItem[]>;
}
//# sourceMappingURL=index.d.ts.map