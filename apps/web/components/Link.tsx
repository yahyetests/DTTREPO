import React from 'react';

interface LinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
 href: string;
 className?: string;
 children: React.ReactNode;
}

export const Link: React.FC<LinkProps> = ({ href, className, children, ...props }) => {
 const isInternal = href.startsWith('/') || href.startsWith('#');

 if (isInternal) {
 return (
 <a href={href} className={className} {...props}>
 {children}
 </a>
 );
 }

 return (
 <a href={href} className={className} target="_blank" rel="noopener noreferrer" {...props}>
 {children}
 </a>
 );
};
