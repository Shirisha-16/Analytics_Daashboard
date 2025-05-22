'use client';

import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { fetchNewsData } from '@/lib/api/news-api';
import { NewsCard } from '@/components/news/news-card';
import { NewsModal } from '@/components/news/news-modal';
import { Skeleton } from '@/components/ui/skeleton';
import { SectionHeader } from '@/components/ui/section-header';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export type NewsArticle = {
    id: string;
    title: string;
    description: string;
    content: string;
    url: string;
    image: string;
    publishedAt: string;
    source: {
        name: string;
        url: string;
    };
};

type NewsDataResponse = { // Define the type for the expected response
    articles: NewsArticle[];
    totalResults: number;
    totalPages: number;
} | null; // Allow for null in case of errors or empty responses

interface NewsSectionProps {
    category: string;
}

const NewsSection: React.FC<NewsSectionProps> = ({ category }) => { // Change to a function component
    const [activeCategory, setActiveCategory] = useState(category || "business");
    const [selectedArticle, setSelectedArticle] = useState<NewsArticle | null>(null);
    const [page, setPage] = useState(1);

    const { data, isLoading, error } = useQuery<NewsDataResponse, Error>({
    queryKey: ['news', activeCategory, page],
    queryFn: () => fetchNewsData(activeCategory, page),
    staleTime: 1000 * 60 * 5, // Optional: avoid refetching for 5 minutes
   });


    const handleCategoryChange = (category: string) => {
        setActiveCategory(category);
        setPage(1);
    };


    const handleNextPage = () => {
        if (data && data.totalPages > 1) { // Check if data exists and has totalPages
            setPage(prevPage => prevPage + 1);
        }
    };

    const handlePrevPage = () => {
        if (page > 1) {
            setPage(prevPage => prevPage - 1);
        }
    };

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
        });
    };

    return (
        <section className="py-8">
            <SectionHeader title="Latest News" description="Stay updated with the latest news from around the world" />

            <Card className="mt-6">
                <CardHeader>
                    <Tabs defaultValue={activeCategory} onValueChange={handleCategoryChange} className="w-full">
                        <TabsList className="grid w-full grid-cols-4">
                            <TabsTrigger value="business">Business</TabsTrigger>
                            <TabsTrigger value="sports">Sports</TabsTrigger>
                            <TabsTrigger value="technology">Technology</TabsTrigger>
                             <TabsTrigger value="general">General</TabsTrigger>
                        </TabsList>
                    </Tabs>
                </CardHeader>
                <CardContent>
                    {isLoading ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {Array.from({ length: 6 }).map((_, i) => (
                                <Skeleton key={i} className="h-[400px] w-full" />
                            ))}
                        </div>
                    ) : error ? (
                        <div className="rounded-lg bg-destructive/10 p-4 text-destructive">
                            <p>Failed to load news. Please try again later.</p>
                        </div>
                    ) : (
                        <>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {data?.articles.map((article, index: number) => (
                                    <motion.div
                                        key={article.id}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.3, delay: index * 0.05 }}
                                    >
                                        <NewsCard article={article} onClick={() => setSelectedArticle(article)} />
                                    </motion.div>
                                ))}
                            </div>

                            {data && data.totalPages > 1 && ( // Check if data exists and has totalPages
                                <div className="mt-6 flex items-center justify-between">
                                    <Button variant="outline" onClick={handlePrevPage} disabled={page === 1}>
                                        <ChevronLeft className="mr-2 h-4 w-4" />
                                        Previous
                                    </Button>
                                    <span className="text-sm text-muted-foreground">
                                        Page {page} of {data.totalPages}
                                    </span>
                                    <Button variant="outline" onClick={handleNextPage} disabled={data ? page >= data.totalPages : true}>
                                        Next
                                        <ChevronRight className="ml-2 h-4 w-4" />
                                    </Button>
                                </div>
                            )}
                        </>
                    )}
                </CardContent>
            </Card>

            {selectedArticle && <NewsModal article={selectedArticle} onClose={() => setSelectedArticle(null)} />}
        </section>
    );
};

export default NewsSection; // Make sure NewsSection is the default export
