import { useState, useEffect, createContext, useContext } from 'react';

const RouterContext = createContext();

export const Router = ({ children }) => {
  const [currentPath, setCurrentPath] = useState(window.location.pathname);

  useEffect(() => {
    const onLocationChange = () => {
      setCurrentPath(window.location.pathname);
      // Scroll to top when route changes
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    // Listen for browser back/forward buttons
    window.addEventListener('popstate', onLocationChange);

    return () => {
      window.removeEventListener('popstate', onLocationChange);
    };
  }, []);

  // Scroll to top when currentPath changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentPath]);

  return (
    <RouterContext.Provider value={{ currentPath }}>
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
  const handleClick = (e) => {
    e.preventDefault();
    window.history.pushState({}, '', to);
    // Trigger navigation update by dispatching popstate event
    window.dispatchEvent(new PopStateEvent('popstate'));
    // Scroll to top immediately for instant feedback
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <a href={to} onClick={handleClick} className={className} {...props}>
      {children}
    </a>
  );
};

