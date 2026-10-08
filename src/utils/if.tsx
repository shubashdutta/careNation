interface IfProps {
  condition: boolean;
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

/* Renders `children` if `condition` is true, otherwise renders optional `fallback`. */
/* Props: condition - boolean, children - content to render, fallback - optional content if false */
export const If = ({ condition, children, fallback = null }: IfProps) => {
  return condition ? <>{children}</> : <>{fallback}</>;
};
