import React from 'react';

const VerifiedBadge: React.FC<{ className?: string }> = ({ className }) => (
    <svg 
        className={className}
        viewBox="0 0 24 24" 
        fill="currentColor"
        color="var(--color-primary)"
        xmlns="http://www.w3.org/2000/svg"
        aria-label="Verified account"
    >
        <path d="M22.25 12c0-1.43-.88-2.67-2.19-3.34.46-1.39.2-2.9-.81-3.91s-2.52-1.27-3.91-.81c-.67-1.31-1.91-2.19-3.34-2.19s-2.67.88-3.33 2.19c-1.4-.46-2.91-.2-3.92.81s-1.27 2.52-.8 3.91c-1.31.67-2.2 1.91-2.2 3.34s.89 2.67 2.2 3.33c-.46 1.4-.2 2.91.81 3.92s2.52 1.27 3.91.81c.67 1.31 1.91 2.19 3.34 2.19s2.67-.88 3.33-2.19c1.4.46 2.91.2 3.92-.81s1.27-2.52.8-3.91c1.31-.67 2.19-1.91 2.19-3.34zm-11.5 4.84l-3.54-3.54 1.41-1.41 2.12 2.12 4.24-4.24 1.42 1.42-5.66 5.65z" />
    </svg>
);

export default VerifiedBadge;
