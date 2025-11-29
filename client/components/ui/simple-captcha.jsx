import { useState, useImperativeHandle, forwardRef, useEffect } from 'react';
import { RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const SimpleCaptcha = forwardRef((props, ref) => {
    const [num1, setNum1] = useState(0);
    const [num2, setNum2] = useState(0);
    const [operation, setOperation] = useState('+');
    const [userAnswer, setUserAnswer] = useState('');
    const [error, setError] = useState('');

    const generateCaptcha = () => {
        const n1 = Math.floor(Math.random() * 20) + 1;
        const n2 = Math.floor(Math.random() * 20) + 1;
        const ops = ['+', '-'];
        const op = ops[Math.floor(Math.random() * ops.length)];

        setNum1(n1);
        setNum2(n2);
        setOperation(op);
        setUserAnswer('');
        setError('');
    };

    useEffect(() => {
        generateCaptcha();
    }, []);

    const getCorrectAnswer = () => {
        if (operation === '+') {
            return num1 + num2;
        } else {
            return num1 - num2;
        }
    };

    const validate = () => {
        const correctAnswer = getCorrectAnswer();
        const isCorrect = parseInt(userAnswer) === correctAnswer;

        if (!isCorrect) {
            setError('Incorrect answer. Please try again.');
            generateCaptcha();
        }

        return isCorrect;
    };

    const reset = () => {
        generateCaptcha();
    };

    // Expose validate and reset methods to parent
    useImperativeHandle(ref, () => ({
        validate,
        reset
    }));

    return (
        <div className="space-y-2">
            <Label htmlFor="captcha">Security Check</Label>
            <div className="flex items-center gap-2">
                <div className="flex-1 flex items-center gap-2">
                    <div className="flex items-center justify-center gap-2 px-4 py-2 bg-muted rounded-md border border-border font-mono text-lg font-semibold">
                        <span>{num1}</span>
                        <span className="text-primary">{operation}</span>
                        <span>{num2}</span>
                        <span>=</span>
                        <span className="text-muted-foreground">?</span>
                    </div>
                    <Input
                        id="captcha"
                        type="number"
                        placeholder="Answer"
                        value={userAnswer}
                        onChange={(e) => {
                            setUserAnswer(e.target.value);
                            setError('');
                        }}
                        className="w-24"
                        required
                    />
                </div>
                <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    onClick={generateCaptcha}
                    title="Refresh CAPTCHA"
                >
                    <RefreshCw className="h-4 w-4" />
                </Button>
            </div>
            {error && (
                <p className="text-sm text-destructive">{error}</p>
            )}
        </div>
    );
});

SimpleCaptcha.displayName = 'SimpleCaptcha';

export default SimpleCaptcha;
