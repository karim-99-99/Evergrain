import { useState, useEffect, createContext, useContext } from 'react';

const RouterContext = createContext();

export const Router = ({ children }) => {
  const [currentPath, setCurrentPath] = useState(() => {
    if (typeof window !== 'undefined') {
      return window.location.pathname;
    }
    return '/';
  });

  useEffect(() => {
    const onLocationChange = () => {
      if (typeof window !== 'undefined') {
        setCurrentPath(window.location.pathname);
        // Scroll to top when route changes
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    };

    // Listen for browser back/forward buttons
    if (typeof window !== 'undefined') {
      window.addEventListener('popstate', onLocationChange);
    }

    return () => {
      if (typeof window !== 'undefined') {
        window.removeEventListener('popstate', onLocationChange);
      }
    };
  }, []);

  // Scroll to top when currentPath changes
  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [currentPath]);

  return (
    <RouterContext.Provider value={{ currentPath, setCurrentPath }}>
      {children}
    </RouterContext.Provider>
  );
};

export const Route = ({ path, element }) => {
  const context = useContext(RouterContext);
  if (!context) {
    return null;
  }
  const { currentPath } = context;
  
  // Handle dynamic routes like /product/:id
  if (path.includes(':id')) {
    const pathPattern = path.replace(':id', '([^/]+)');
    const regex = new RegExp(`^${pathPattern}$`);
    if (regex.test(currentPath)) {
      return element;
    }
  }
  
  return currentPath === path ? element : null;
};

export const useRouter = () => {
  const context = useContext(RouterContext);
  return context ? context.currentPath : window.location.pathname;
};

export const Link = ({ to, children, className, ...props }) => {
  const context = useContext(RouterContext);
  
  const handleClick = (e) => {
    e.preventDefault();
    
    if (typeof window === 'undefined') {
      return;
    }
    
    try {
      window.history.pushState({}, '', to);
      
      // Update the Router's state directly if context is available
      if (context && context.setCurrentPath) {
        context.setCurrentPath(to);
      } else {
        // Fallback: trigger navigation update by dispatching popstate event
        window.dispatchEvent(new PopStateEvent('popstate'));
      }
      
      // Scroll to top immediately for instant feedback
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (error) {
      console.error('Navigation error:', error);
      // Fallback: just update the path
      if (context && context.setCurrentPath) {
        context.setCurrentPath(to);
      }
    }
  };

  return (
    <a href={to} onClick={handleClick} className={className} {...props}>
      {children}
    </a>
  );
};

