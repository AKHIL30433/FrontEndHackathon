import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import DashboardLayout from '@/components/layouts/DashboardLayout';
import FeedbackForm from '@/components/feedback/FeedbackForm';
import FeedbackList from '@/components/feedback/FeedbackList';
import FeedbackStats from '@/components/feedback/FeedbackStats';
import { feedbackService } from '@/services/feedbackService';
import { Loader2, Search, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Card } from '@/components/ui/card';

const FeedbackPage = () => {
    const { user, token, role } = useAuth();
    const [feedback, setFeedback] = useState([]);
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [showForm, setShowForm] = useState(false);
    const [showFilters, setShowFilters] = useState(false);

    // Filter and sort states
    const [searchQuery, setSearchQuery] = useState('');
    const [ratingFilter, setRatingFilter] = useState('');
    const [courseFilter, setCourseFilter] = useState('');
    const [studentFilter, setStudentFilter] = useState('');
    const [sortBy, setSortBy] = useState('createdAt');
    const [sortOrder, setSortOrder] = useState('desc');

    const fetchData = async () => {
        setLoading(true);
        try {
            const params = {
                page,
                limit: 10,
                sortBy,
                order: sortOrder,
            };

            if (searchQuery) params.search = searchQuery;
            if (ratingFilter) params.rating = ratingFilter;
            if (courseFilter) params.course = courseFilter;
            if (studentFilter) params.student = studentFilter;

            const [feedbackData, statsData] = await Promise.all([
                feedbackService.getAllFeedback(params),
                feedbackService.getStats(),
            ]);
            setFeedback(feedbackData.feedback);
            setTotalPages(feedbackData.totalPages);
            setStats(statsData);
        } catch (error) {
            console.error('Failed to fetch data:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, [page, sortBy, sortOrder, searchQuery, ratingFilter, courseFilter, studentFilter]);

    const handleSuccess = () => {
        setShowForm(false);
        setPage(1);
        fetchData();
    };

    const handleClearFilters = () => {
        setSearchQuery('');
        setRatingFilter('');
        setCourseFilter('');
        setStudentFilter('');
        setSortBy('createdAt');
        setSortOrder('desc');
        setPage(1);
    };

    return (
        <DashboardLayout role={role} user={user}>
            <div className="space-y-8 max-w-6xl mx-auto pb-12">
                <div className="flex justify-between items-center">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">Student Feedback</h1>
                        <p className="text-muted-foreground mt-1">
                            {role === 'admin' || role === 'super-admin'
                                ? 'Manage and review all student feedback'
                                : 'Share your thoughts and help us improve the learning experience'}
                        </p>
                    </div>
                    {role === 'student' && (
                        <Button onClick={() => setShowForm(!showForm)}>
                            {showForm ? 'Cancel' : 'Write a Review'}
                        </Button>
                    )}
                </div>

                {/* Stats Section */}
                <FeedbackStats stats={stats} />

                {/* Submission Form */}
                {showForm && (
                    <div className="animate-in fade-in slide-in-from-top-4 duration-300">
                        <FeedbackForm onSuccess={handleSuccess} token={token} />
                    </div>
                )}

                {/* Filters and Search */}
                <Card className="p-4">
                    <div className="flex flex-col gap-4">
                        <div className="flex items-center justify-between">
                            <h2 className="text-lg font-semibold flex items-center gap-2">
                                <Filter className="h-5 w-5" />
                                Filters & Search
                            </h2>
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => setShowFilters(!showFilters)}
                            >
                                {showFilters ? 'Hide' : 'Show'} Filters
                            </Button>
                        </div>

                        {/* Search Bar */}
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <Input
                                placeholder="Search feedback by text, course, or student name..."
                                value={searchQuery}
                                onChange={(e) => {
                                    setSearchQuery(e.target.value);
                                    setPage(1);
                                }}
                                className="pl-10"
                            />
                        </div>

                        {/* Advanced Filters */}
                        {showFilters && (
                            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 pt-2">
                                <div className="space-y-2">
                                    <Label>Rating</Label>
                                    <Select
                                        value={ratingFilter}
                                        onValueChange={(value) => {
                                            setRatingFilter(value);
                                            setPage(1);
                                        }}
                                    >
                                        <SelectTrigger>
                                            <SelectValue placeholder="All Ratings" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="">All Ratings</SelectItem>
                                            <SelectItem value="5">5 Stars</SelectItem>
                                            <SelectItem value="4">4 Stars</SelectItem>
                                            <SelectItem value="3">3 Stars</SelectItem>
                                            <SelectItem value="2">2 Stars</SelectItem>
                                            <SelectItem value="1">1 Star</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>

                                <div className="space-y-2">
                                    <Label>Course</Label>
                                    <Input
                                        placeholder="Filter by course"
                                        value={courseFilter}
                                        onChange={(e) => {
                                            setCourseFilter(e.target.value);
                                            setPage(1);
                                        }}
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label>Student</Label>
                                    <Input
                                        placeholder="Filter by student"
                                        value={studentFilter}
                                        onChange={(e) => {
                                            setStudentFilter(e.target.value);
                                            setPage(1);
                                        }}
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label>Sort By</Label>
                                    <Select
                                        value={`${sortBy}-${sortOrder}`}
                                        onValueChange={(value) => {
                                            const [newSortBy, newOrder] = value.split('-');
                                            setSortBy(newSortBy);
                                            setSortOrder(newOrder);
                                            setPage(1);
                                        }}
                                    >
                                        <SelectTrigger>
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="createdAt-desc">Newest First</SelectItem>
                                            <SelectItem value="createdAt-asc">Oldest First</SelectItem>
                                            <SelectItem value="grade-desc">Highest Rating</SelectItem>
                                            <SelectItem value="grade-asc">Lowest Rating</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>
                        )}

                        {/* Clear Filters Button */}
                        {(searchQuery || ratingFilter || courseFilter || studentFilter || sortBy !== 'createdAt' || sortOrder !== 'desc') && (
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={handleClearFilters}
                                className="w-fit"
                            >
                                Clear All Filters
                            </Button>
                        )}
                    </div>
                </Card>

                {/* Feedback List */}
                <div className="space-y-4">
                    <h2 className="text-xl font-semibold">
                        {searchQuery || ratingFilter || courseFilter || studentFilter
                            ? 'Filtered Reviews'
                            : 'Recent Reviews'}
                    </h2>
                    {loading ? (
                        <div className="flex justify-center py-12">
                            <Loader2 className="h-8 w-8 animate-spin text-primary" />
                        </div>
                    ) : (
                        <>
                            <FeedbackList
                                feedback={feedback}
                                currentUser={user}
                                userRole={role}
                                onUpdate={fetchData}
                                token={token}
                            />

                            {/* Pagination */}
                            {totalPages > 1 && (
                                <div className="flex justify-center gap-2 mt-6">
                                    <Button
                                        variant="outline"
                                        disabled={page === 1}
                                        onClick={() => setPage((p) => Math.max(1, p - 1))}
                                    >
                                        Previous
                                    </Button>
                                    <span className="flex items-center px-4 text-sm text-muted-foreground">
                                        Page {page} of {totalPages}
                                    </span>
                                    <Button
                                        variant="outline"
                                        disabled={page === totalPages}
                                        onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                                    >
                                        Next
                                    </Button>
                                </div>
                            )}
                        </>
                    )}
                </div>
            </div>
        </DashboardLayout>
    );
};

export default FeedbackPage;
