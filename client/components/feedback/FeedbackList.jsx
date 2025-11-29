import { useState } from 'react';
import { formatDistanceToNow } from 'date-fns';
import { Star, ThumbsUp, Trash2, Edit2, MoreVertical, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
import { feedbackService } from '@/services/feedbackService';

const FeedbackList = ({ feedback, currentUser, userRole, onUpdate, token }) => {
    const [liking, setLiking] = useState(null);
    const [editingFeedback, setEditingFeedback] = useState(null);
    const [editForm, setEditForm] = useState({ course: '', review: '', grade: 0 });
    const [saving, setSaving] = useState(false);
    const [deleteId, setDeleteId] = useState(null);

    const handleLike = async (id) => {
        if (liking === id) return;
        setLiking(id);
        try {
            await feedbackService.toggleLike(id, token);
            onUpdate(); // Refresh list to show new like count
        } catch (error) {
            toast.error('Failed to like feedback');
        } finally {
            setLiking(null);
        }
    };

    const handleEdit = (item) => {
        setEditingFeedback(item);
        setEditForm({
            course: item.course,
            review: item.review,
            grade: item.grade,
        });
    };

    const handleSaveEdit = async () => {
        setSaving(true);
        try {
            await feedbackService.updateFeedback(editingFeedback._id, editForm, token);
            toast.success('Feedback updated successfully');
            setEditingFeedback(null);
            onUpdate();
        } catch (error) {
            toast.error(error.message || 'Failed to update feedback');
        } finally {
            setSaving(false);
        }
    };

    const handleDelete = async () => {
        try {
            await feedbackService.deleteFeedback(deleteId, token);
            toast.success('Feedback deleted');
            setDeleteId(null);
            onUpdate();
        } catch (error) {
            toast.error('Failed to delete feedback');
        }
    };

    if (!feedback.length) {
        return (
            <div className="text-center py-12 text-muted-foreground">
                No feedback submitted yet. Be the first!
            </div>
        );
    }

    return (
        <>
            <div className="space-y-4">
                {feedback.map((item) => {
                    const isOwner = currentUser?._id === item.student;
                    const canModify = isOwner || userRole === 'admin' || userRole === 'super-admin';
                    const isLiked = item.likes?.includes(currentUser?._id);

                    return (
                        <Card key={item._id} className="transition-all hover:shadow-md">
                            <CardHeader className="pb-2">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <div className="flex items-center gap-2 mb-1">
                                            <h3 className="font-semibold text-lg">{item.course}</h3>
                                            <Badge variant="secondary" className="text-xs">
                                                {item.studentName}
                                            </Badge>
                                        </div>
                                        <div className="flex items-center gap-1">
                                            {[1, 2, 3, 4, 5].map((star) => (
                                                <Star
                                                    key={star}
                                                    className={`w-4 h-4 ${star <= item.grade
                                                            ? 'fill-yellow-400 text-yellow-400'
                                                            : 'text-muted-foreground/30'
                                                        }`}
                                                />
                                            ))}
                                            <span className="text-sm text-muted-foreground ml-2">
                                                {formatDistanceToNow(new Date(item.createdAt), {
                                                    addSuffix: true,
                                                })}
                                            </span>
                                        </div>
                                    </div>

                                    {canModify && (
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button variant="ghost" size="icon" className="h-8 w-8">
                                                    <MoreVertical className="h-4 w-4" />
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end">
                                                <DropdownMenuItem onClick={() => handleEdit(item)}>
                                                    <Edit2 className="mr-2 h-4 w-4" />
                                                    Edit
                                                </DropdownMenuItem>
                                                <DropdownMenuItem
                                                    className="text-destructive focus:text-destructive"
                                                    onClick={() => setDeleteId(item._id)}
                                                >
                                                    <Trash2 className="mr-2 h-4 w-4" />
                                                    Delete
                                                </DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    )}
                                </div>
                            </CardHeader>
                            <CardContent>
                                <p className="text-muted-foreground mb-4 whitespace-pre-wrap">
                                    {item.review}
                                </p>
                                <div className="flex items-center gap-4">
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        className={`gap-2 ${isLiked ? 'text-primary' : ''}`}
                                        onClick={() => handleLike(item._id)}
                                        disabled={liking === item._id}
                                    >
                                        <ThumbsUp className={`h-4 w-4 ${isLiked ? 'fill-current' : ''}`} />
                                        {item.likes?.length || 0} {item.likes?.length === 1 ? 'Like' : 'Likes'}
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    );
                })}
            </div>

            {/* Edit Dialog */}
            <Dialog open={!!editingFeedback} onOpenChange={() => setEditingFeedback(null)}>
                <DialogContent className="sm:max-w-[500px]">
                    <DialogHeader>
                        <DialogTitle>Edit Feedback</DialogTitle>
                        <DialogDescription>
                            Make changes to the feedback. Click save when you're done.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4 py-4">
                        <div className="space-y-2">
                            <Label htmlFor="edit-course">Course / Subject</Label>
                            <Input
                                id="edit-course"
                                value={editForm.course}
                                onChange={(e) => setEditForm({ ...editForm, course: e.target.value })}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label>Rating</Label>
                            <div className="flex gap-1">
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <button
                                        key={star}
                                        type="button"
                                        onClick={() => setEditForm({ ...editForm, grade: star })}
                                        className="focus:outline-none transition-transform hover:scale-110"
                                    >
                                        <Star
                                            className={`w-8 h-8 ${star <= editForm.grade
                                                    ? 'fill-yellow-400 text-yellow-400'
                                                    : 'text-muted-foreground'
                                                }`}
                                        />
                                    </button>
                                ))}
                            </div>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="edit-review">Review</Label>
                            <Textarea
                                id="edit-review"
                                value={editForm.review}
                                onChange={(e) => setEditForm({ ...editForm, review: e.target.value })}
                                rows={6}
                            />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setEditingFeedback(null)} disabled={saving}>
                            Cancel
                        </Button>
                        <Button onClick={handleSaveEdit} disabled={saving}>
                            {saving ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Saving...
                                </>
                            ) : (
                                'Save Changes'
                            )}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* Delete Confirmation Dialog */}
            <AlertDialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                            This action cannot be undone. This will permanently delete this feedback.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={handleDelete} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
                            Delete
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    );
};

export default FeedbackList;
