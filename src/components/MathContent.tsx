import React, { useEffect, useRef } from 'react';

declare global {
    interface Window {
        MathJax?: {
            typesetPromise?: (elements?: HTMLElement[]) => Promise<void>;
            startup?: { promise: Promise<void> };
        };
    }
}

interface MathContentProps {
    children: string;
    className?: string;
    tag?: 'p' | 'span' | 'div';
    style?: React.CSSProperties;
}

export default function MathContent({ children, className = '', tag: Tag = 'p', style }: MathContentProps) {
    const ref = useRef<HTMLElement>(null);

    useEffect(() => {
        const el = ref.current;
        if (!el || !children) return;

        const typeset = () => {
            if (window.MathJax?.typesetPromise) {
                // Clear previous MathJax rendering
                window.MathJax.typesetPromise([el]).catch((err: any) => {
                    console.warn('MathJax typeset error:', err);
                });
            }
        };

        // MathJax might still be loading
        if (window.MathJax?.startup?.promise) {
            window.MathJax.startup.promise.then(typeset);
        } else {
            // Retry after a short delay if MathJax isn't ready yet
            const timer = setTimeout(typeset, 500);
            return () => clearTimeout(timer);
        }
    }, [children]);

    return (
        <Tag
            ref={ref as any}
            className={className}
            style={style}
            dangerouslySetInnerHTML={{ __html: children }}
        />
    );
}
