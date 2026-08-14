import { useState, createContext, useContext } from 'react';
import { useSlideNavigation } from './hooks/useSlideNavigation';
import { SlideLayout } from './components/SlideLayout';
import { SlideDots } from './components/SlideDots';
import { HeroSlide, ServicesSlide, PortfolioSlide, ProcessSlide, ReviewsSlide, ContactsSlide } from './components/slides';
import { AuthModal } from './components/AuthModal';
import AdminPanel from './components/AdminPanel';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { LogIn, UserCircle, LogOut } from 'lucide-react';

const TOTAL_SLIDES = 6;

interface SlideContextType {
  currentSlide: number;
  goToSlide: (index: number) => void;
  nextSlide: () => void;
  prevSlide: () => void;
  totalSlides: number;
}

const SlideContext = createContext<SlideContextType | null>(null);

export const useSlide = () => {
  const ctx = useContext(SlideContext);
  if (!ctx) throw new Error('useSlide must be used within SlideProvider');
  return ctx;
};

function Header() {
  const { user, isAuthenticated, logout } = useAuth();
  const { goToSlide } = useSlide();
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');
  const [isAdminPanelOpen, setIsAdminPanelOpen] = useState(false);

  const handleLoginClick = () => {
    setAuthMode('login');
    setIsAuthModalOpen(true);
  };

  const handleRegisterClick = () => {
    setAuthMode('register');
    setIsAuthModalOpen(true);
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-40 bg-[#F4F4F2]/80 backdrop-blur-md border-b border-gray-200">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-[#FF5A2A] rounded-lg flex items-center justify-center">
              <span className="text-white font-unbounded font-bold text-xl">М</span>
            </div>
            <span className="font-unbounded font-bold text-2xl text-[#141414]">МЕТР</span>
          </div>

          <nav className="hidden md:flex items-center gap-6">
            <button onClick={() => goToSlide(1)} className="font-manrope text-[#141414] hover:text-[#FF5A2A] transition-colors">Услуги</button>
            <button onClick={() => goToSlide(2)} className="font-manrope text-[#141414] hover:text-[#FF5A2A] transition-colors">Портфолио</button>
            <button onClick={() => goToSlide(3)} className="font-manrope text-[#141414] hover:text-[#FF5A2A] transition-colors">Этапы</button>
            <button onClick={() => goToSlide(4)} className="font-manrope text-[#141414] hover:text-[#FF5A2A] transition-colors">Отзывы</button>
            <button onClick={() => goToSlide(5)} className="font-manrope text-[#141414] hover:text-[#FF5A2A] transition-colors">Контакты</button>
          </nav>

          <div className="flex items-center gap-3">
            {isAuthenticated && user ? (
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2 text-[#141414]">
                  <UserCircle className="w-6 h-6" />
                  <span className="font-manrope font-medium hidden sm:inline">{user.name}</span>
                </div>
                {user.role === 'admin' && (
                  <button
                    onClick={() => setIsAdminPanelOpen(true)}
                    className="px-3 py-1.5 bg-[#141414] text-white text-sm font-manrope font-medium rounded-lg hover:bg-[#333] transition-colors"
                  >
                    Админка
                  </button>
                )}
                <button
                  onClick={logout}
                  className="p-2 hover:bg-gray-200 rounded-full transition-colors"
                  title="Выйти"
                >
                  <LogOut className="w-5 h-5 text-[#141414]" />
                </button>
              </div>
            ) : (
              <>
                <button
                  onClick={handleLoginClick}
                  className="flex items-center gap-2 px-4 py-2 text-[#141414] font-manrope font-medium hover:bg-gray-200 rounded-lg transition-colors"
                >
                  <LogIn className="w-5 h-5" />
                  <span className="hidden sm:inline">Войти</span>
                </button>
                <button
                  onClick={handleRegisterClick}
                  className="px-4 py-2 bg-[#FF5A2A] text-white font-manrope font-medium rounded-lg hover:bg-[#e54d22] transition-colors"
                >
                  Зарегистрироваться
                </button>
              </>
            )}
          </div>
        </div>
      </header>

      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        defaultMode={authMode}
      />

      <AdminPanel
        isOpen={isAdminPanelOpen}
        onClose={() => setIsAdminPanelOpen(false)}
      />
    </>
  );
}

function AppContent() {
  const slideNav = useSlideNavigation(TOTAL_SLIDES);

  return (
    <SlideContext.Provider value={slideNav}>
      <Header />
      <main className="relative w-full h-screen overflow-hidden bg-[#F4F4F2] pt-16">
        <div className="relative w-full h-full">
          <SlideLayout
            isActive={slideNav.currentSlide === 0}
            onNext={slideNav.nextSlide}
            showNav={false}
            isFirst
          >
            <HeroSlide />
          </SlideLayout>

          <SlideLayout
            isActive={slideNav.currentSlide === 1}
            onPrev={slideNav.prevSlide}
            onNext={slideNav.nextSlide}
          >
            <ServicesSlide />
          </SlideLayout>

          <SlideLayout
            isActive={slideNav.currentSlide === 2}
            onPrev={slideNav.prevSlide}
            onNext={slideNav.nextSlide}
          >
            <PortfolioSlide />
          </SlideLayout>

          <SlideLayout
            isActive={slideNav.currentSlide === 3}
            onPrev={slideNav.prevSlide}
            onNext={slideNav.nextSlide}
          >
            <ProcessSlide />
          </SlideLayout>

          <SlideLayout
            isActive={slideNav.currentSlide === 4}
            onPrev={slideNav.prevSlide}
            onNext={slideNav.nextSlide}
          >
            <ReviewsSlide />
          </SlideLayout>

          <SlideLayout
            isActive={slideNav.currentSlide === 5}
            onPrev={slideNav.prevSlide}
            showNav={false}
            isLast
          >
            <ContactsSlide />
          </SlideLayout>
        </div>

        <SlideDots
          totalSlides={TOTAL_SLIDES}
          currentSlide={slideNav.currentSlide}
          onSlideChange={slideNav.goToSlide}
        />
      </main>
    </SlideContext.Provider>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;