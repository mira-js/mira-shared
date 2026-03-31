import { z } from 'zod'

// ─── Sources ─────────────────────────────────────────────────────────────────

export enum Source {
  reddit = 'reddit',
  hackernews = 'hackernews',
  news = 'news'
}

export const SourceSchema = z.nativeEnum(Source)

// ─── Collected item (common schema across all collectors) ─────────────────────

export interface Engagement {
  upvotes: number
  comments: number
}

export interface CollectedItem {
  source: Source
  url: string
  title: string
  body: string
  author: string
  timestamp: string
  engagement: Engagement
  raw_replies: string[]
  // Source-specific optional fields
  subreddit?: string  // reddit
  category?: string  // news/rss feed name
}

// ─── LLM extraction result ────────────────────────────────────────────────────

export type Sentiment = 'negative' | 'neutral' | 'positive'

export type Category =
  | 'complaint'
  | 'feature-request'
  | 'workflow-friction'
  | 'pricing'
  | 'switching-signal'

export interface ExtractionResult {
  pain_points: string[]
  sentiment: Sentiment
  category: Category
  mentioned_tools: string[]
  key_quote: string
}

// ─── Research job ─────────────────────────────────────────────────────────────

export type ResearchDepth = 'quick' | 'deep'

export type JobStatus = 'queued' | 'active' | 'completed' | 'failed'

export interface ResearchJobInput {
  query: string
  sources?: Source[]
  depth?: ResearchDepth
}

export interface ResearchJob extends ResearchJobInput {
  jobId: string
  status: JobStatus
  progress?: number
  createdAt: string
  result?: ResearchResult
}

// ─── Research result ──────────────────────────────────────────────────────────

export interface Evidence {
  source: Source
  url: string
  excerpt: string
}

export interface PainPointTheme {
  theme: string
  frequency: number
  sources: Source[]
  sentiment: number  // -1.0 to 1.0
  evidence: Evidence[]
}

export interface ResearchResult {
  query: string
  summary: string
  painPoints: PainPointTheme[]
  competitorWeaknesses: PainPointTheme[]
  emergingGaps: PainPointTheme[]
  rawItems: CollectedItem[]
}

// ─── OpenViking ───────────────────────────────────────────────────────────────

export interface OpenVikingResourceMetadata {
  title: string
  url: string
  timestamp: string
  engagement: Engagement
}

export interface OpenVikingResource {
  uri: string
  content: string
  metadata: OpenVikingResourceMetadata
}

export interface OpenVikingFindOptions {
  scope: string
  maxResults: number
  layers: ('L0' | 'L1' | 'L2')[]
}

// ─── Result type ──────────────────────────────────────────────────────────────

export type Result<T, E = Error> =
  | { ok: true; value: T }
  | { ok: false; error: E }

// ─── Collector interface ──────────────────────────────────────────────────────

export interface CollectorOptions {
  query: string
  limit?: number
}

export interface Collector {
  collect(options: CollectorOptions): Promise<CollectedItem[]>
}