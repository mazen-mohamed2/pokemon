import { NavLink } from 'react-router-dom';
import type {FC, ReactNode } from 'react';

 const Layout: FC<{ children: ReactNode }> = ({ children })=> {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4 text-center">⚡ Pokédex</h1>
      <p className="text-center">Discover and explore Pokemon with page controls</p>
      <div className="p-4 justify-center flex gap-4">
        <NavLink
          to="/"
          end
          className={({ isActive }) =>
            isActive
              ? 'bg-black text-white px-4 py-2 rounded'
              : 'bg-white text-black border border-black px-4 py-2 rounded'
          }
        >
          Pagination
        </NavLink>
        <NavLink
          to="/load-more"
          className={({ isActive }) =>
            isActive
              ? 'bg-black text-white px-4 py-2 rounded'
              : 'bg-white text-black border border-black px-4 py-2 rounded'
          }
        >
          Load More
        </NavLink>
      </div>
      <div className="mt-6">{children}</div>
    </div>
  );
}
export default Layout