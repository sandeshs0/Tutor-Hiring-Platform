import React from 'react';
import { Link } from 'react-router-dom';

interface ButtonLinkProps {
    path: string;
    text: string;
    isMain?: boolean;
    className?: string;
}

const ButtonLink: React.FC<ButtonLinkProps> = ({ path, text, isMain, className }) => (
    <Link
        to={path}
        className={`inline-block rounded-full font-bold font-krona text-xs ${
            isMain ? 'bg-yellow py-4 px-10' : 'bg-dark text-white py-2 px-4'
        } ${className}`}
    >
        {text}
    </Link>
);

export { ButtonLink };

