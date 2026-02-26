import Sidebar from './Sidebar';
import Header from './Header';
import { Outlet } from 'react-router-dom';


export default function MainLayout() {
  return (
    <div className="flex ">
      <Sidebar />
      <main className="flex-1 h-screen overflow-y-auto">
       <Header/>
        <div >
          <Outlet/>
        </div>
      </main>
    </div>
  );
}