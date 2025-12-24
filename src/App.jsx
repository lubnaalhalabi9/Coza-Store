import { Routes, Route, useLocation } from 'react-router-dom';
import Layout from './layout/Layout';
import Home from './pages/Home1';
import About from './pages/About';
import Contact from './pages/Contact';
import Blog from './pages/Blog';
import Features from './pages/Features';
import BlogDetails from './components/BlogDetails';
import Shop from './pages/Shop';
import Home2 from './pages/Home2';
import Home3 from './pages/Home3';
import NotFound from './components/NotFound'; 
import { AnimatePresence } from 'framer-motion';
import PageTransition from './components/PageTransition';

const App = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        
        {/* المجموعة الأولى: الصفحات التي تظهر داخل header and footer */}
        <Route element={<Layout />}>
          <Route path="/" element={
            <PageTransition>
              <Home />
            </PageTransition>
          } />
          <Route path="/home2" element={
            <PageTransition>
              <Home2 />
            </PageTransition>
          } />
          <Route path="/home3" element={
            <PageTransition>
              <Home3 />
            </PageTransition>
          } />
          <Route path="/about" element={
            <PageTransition>
              <About />
            </PageTransition>
          } />
          <Route path="/contact" element={
            <PageTransition>
              <Contact />
            </PageTransition>
          } />
          <Route path="/Blog" element={
            <PageTransition>
              <Blog />
            </PageTransition>
          } />
          <Route path="/features" element={
            <PageTransition>
              <Features />
            </PageTransition>
          } />
          <Route path="/blog-detail/:id" element={
            <PageTransition>
              <BlogDetails />
            </PageTransition>
          } />
          <Route path="/shop" element={
            <PageTransition>
              <Shop />
            </PageTransition>
          } />
        </Route>

        {/* المجموعة الثانية: صفحة 404 تظهر بمفردها تماماً بدون header or footer*/}
        <Route path="*" element={
          <PageTransition>
            <NotFound />
          </PageTransition>
        } />

      </Routes>
    </AnimatePresence>
  );
};

export default App;